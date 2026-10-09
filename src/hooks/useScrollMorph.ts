import { RefObject, useLayoutEffect } from "react";

export interface MorphPair {
    // Invisible placeholder marking where the element appears before scrolling
    from: RefObject<HTMLElement | null>;
    // The real element, in its final place; it is moved and scaled onto `from` while scrolling
    to: RefObject<HTMLElement | null>;
    // Optional look-alike of `from`'s styling inside `to`, faded out as the scroll goes on
    startLayer?: RefObject<HTMLElement | null>;
    // Optional layer with `to`'s own styling, faded in
    endLayer?: RefObject<HTMLElement | null>;
}

interface ScrollMorphOptions {
    // Off for reduced motion: elements just sit in their final place
    enabled: boolean;
    // The morph runs while `end` scrolls up to where `start` was at the top of the page
    start: RefObject<HTMLElement | null>;
    end: RefObject<HTMLElement | null>;
    pairs: MorphPair[];
    // Elements that only belong to the start state, faded out early
    fadeOut?: RefObject<HTMLElement | null>[];
    // Elements that only belong to the end state, faded in late
    fadeIn?: RefObject<HTMLElement | null>[];
    // A sticky ancestor of the `to` elements; measured in its normal place and style, not stuck
    // (its stuck look comes from a data-stuck="true" attribute)
    sticky?: RefObject<HTMLElement | null>;
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));
// Progress between two points of the scroll, e.g. crossfades that only run mid-way
const between = (progress: number, from: number, to: number) => clamp((progress - from) / (to - from));
const easeInOutSine = (progress: number) => -(Math.cos(Math.PI * progress) - 1) / 2;

// Morphs elements from one layout into another as the page scrolls, without pinning the page.
// Positions are measured, so it follows any layout (desktop, mobile, resized windows).
export function useScrollMorph({ enabled, start, end, pairs, fadeOut = [], fadeIn = [], sticky }: ScrollMorphOptions) {
    useLayoutEffect(() => {
        if (!enabled) return;
        let distance = 1;
        let cancelled = false;
        // Cleanup resets the same element the effect styled
        const endEl = end.current;
        const measured = pairs.map(() => ({ dx: 0, dy: 0, scale: 1 }));

        function measure() {
            const startEl = start.current;
            if (!startEl || !endEl) return;
            const stickyEl = sticky?.current;
            const stuck = stickyEl?.dataset.stuck;
            // The sticky element and everything inside it may animate between looks
            const transitioned = stickyEl ? [stickyEl, ...stickyEl.querySelectorAll<HTMLElement>("*")] : [];
            if (stickyEl) {
                // Unstick without animating, so sizes are read at their final unstuck values
                transitioned.forEach((el) => (el.style.transition = "none"));
                // Static, not relative: a relative element would still be shifted by its sticky `top` offset
                stickyEl.style.position = "static";
                stickyEl.dataset.stuck = "false";
            }
            pairs.forEach((pair, index) => {
                const from = pair.from.current;
                const to = pair.to.current;
                if (!from || !to) return;
                to.style.transform = ""; // measure the untransformed layout
                const fromRect = from.getBoundingClientRect();
                const toRect = to.getBoundingClientRect();
                const scale =
                    parseFloat(getComputedStyle(from).fontSize) / parseFloat(getComputedStyle(to).fontSize);
                measured[index] = {
                    dx: fromRect.left + fromRect.width / 2 - (toRect.left + toRect.width / 2),
                    dy: fromRect.top + fromRect.height / 2 - (toRect.top + toRect.height / 2),
                    scale,
                };
                // Same line breaks as the placeholder once scaled down
                if (pair.startLayer?.current) pair.startLayer.current.style.width = `${fromRect.width / scale}px`;
            });
            if (stickyEl) {
                stickyEl.style.position = "";
                if (stuck !== undefined) stickyEl.dataset.stuck = stuck;
                void stickyEl.offsetHeight; // apply the restored look before transitions come back
                transitioned.forEach((el) => (el.style.transition = ""));
            }
            const startTop = startEl.getBoundingClientRect().top;
            distance = Math.max(1, endEl.getBoundingClientRect().top - startTop);
            // Links that scroll to `end` land exactly where the morph finishes
            endEl.style.scrollMarginTop = `${startTop + window.scrollY}px`;
        }

        function update() {
            const progress = clamp(window.scrollY / distance);
            const remaining = 1 - easeInOutSine(progress);
            const crossfade = between(progress, 0.25, 0.55);
            pairs.forEach((pair, index) => {
                const to = pair.to.current;
                if (!to) return;
                const { dx, dy, scale } = measured[index];
                to.style.transform =
                    remaining === 0
                        ? ""
                        : `translate(${dx * remaining}px, ${dy * remaining}px) scale(${1 + (scale - 1) * remaining})`;
                if (pair.startLayer?.current) pair.startLayer.current.style.opacity = String(1 - crossfade);
                if (pair.endLayer?.current) pair.endLayer.current.style.opacity = String(crossfade);
            });
            const fade = String(1 - between(progress, 0, 0.2));
            fadeOut.forEach((ref) => {
                if (ref.current) ref.current.style.opacity = fade;
            });
            const appear = String(between(progress, 0.7, 1));
            fadeIn.forEach((ref) => {
                if (ref.current) ref.current.style.opacity = appear;
            });
        }

        let frame = 0;
        function onScroll() {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        }
        function onResize() {
            measure();
            update();
        }

        onResize();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        // Fonts and late layout changes move the measured positions. `end` itself isn't watched: its height
        // changes (list loading, the sticky header animating) don't move anything the morph uses, and
        // re-measuring mid-animation would cut the sticky header's transitions short
        const observer = new ResizeObserver(onResize);
        [start, ...pairs.map((pair) => pair.from)].forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });
        document.fonts?.ready.then(() => {
            if (!cancelled) onResize();
        });

        return () => {
            cancelled = true;
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            observer.disconnect();
            pairs.forEach((pair) => {
                if (pair.to.current) pair.to.current.style.transform = "";
                if (pair.startLayer?.current) pair.startLayer.current.style.opacity = "";
                if (pair.endLayer?.current) pair.endLayer.current.style.opacity = "";
            });
            [...fadeOut, ...fadeIn].forEach((ref) => {
                if (ref.current) ref.current.style.opacity = "";
            });
            if (endEl) endEl.style.scrollMarginTop = "";
        };
    }, [enabled, start, end, pairs, fadeOut, fadeIn, sticky]);
}
