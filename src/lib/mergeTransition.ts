// Transition between the blueprint cards and the merged contact card (build page).
//
// Merging: the plots fly into the contact card, and shortly after (STAGGER_MS) the cards slide into it while
// their content fades. Splitting reverses it: the cards slide out first, the plots follow STAGGER_MS later.
//
// React swaps the layout in one render, so the old pieces are kept on screen as visual copies (clones in an
// overlay above the page) while the real new layout is revealed underneath; the copies go away at the end.
// Cards are marked with data-merge-card (blueprint id, or "contact"); plots with data-flip-id.

export const PLOTS_MS = 800;
export const CARDS_MS = 900;
// How long the second group waits after the first starts
export const STAGGER_MS = 300;
const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

interface Piece {
    id: string;
    rect: DOMRect;
    clone: HTMLElement | SVGElement;
}

export interface MergeSnapshot {
    layer: HTMLDivElement;
    cards: Piece[];
    plots: Piece[];
}

// Pins a copy over the page exactly where the original is now
function pin(element: HTMLElement | SVGElement, rect: DOMRect) {
    Object.assign(element.style, {
        position: "absolute",
        margin: "0",
        boxSizing: "border-box",
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
    });
}

// Copies are static pictures: no entrance animations replaying, no clicks
function freeze(clone: Element) {
    for (const element of [clone, ...clone.querySelectorAll("*")]) {
        (element as HTMLElement).style.animation = "none";
    }
}

// Call before the layout switches: copies every card and plot currently shown
export function captureMergeSnapshot(root: HTMLElement): MergeSnapshot {
    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    Object.assign(layer.style, { position: "absolute", top: "0", left: "0", zIndex: "20", pointerEvents: "none" });
    const cards = [...root.querySelectorAll<HTMLElement>("[data-merge-card]")].map((card) => {
        const rect = card.getBoundingClientRect();
        const clone = card.cloneNode(true) as HTMLElement;
        freeze(clone);
        // Plots are copied on their own, so they can move separately
        clone.querySelectorAll<SVGElement>("[data-flip-id]").forEach((plot) => (plot.style.visibility = "hidden"));
        pin(clone, rect);
        return { id: card.dataset.mergeCard!, rect, clone };
    });
    const plots = [...root.querySelectorAll<SVGElement>("[data-flip-id]")].map((plot) => {
        const rect = plot.getBoundingClientRect();
        const clone = plot.cloneNode(true) as SVGElement;
        freeze(clone);
        pin(clone, rect);
        return { id: plot.dataset.flipId!, rect, clone };
    });
    layer.append(...cards.map((piece) => piece.clone), ...plots.map((piece) => piece.clone));
    document.body.append(layer);
    return { layer, cards, plots };
}

// Transform that takes something drawn at `from` to sit over `to`
function moveTo(from: DOMRect, to: DOMRect) {
    return `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width}, ${to.height / from.height})`;
}

// Call after the layout switched (in a layout effect). Returns when the animation is over.
export function playMergeTransition(snapshot: MergeSnapshot, root: HTMLElement, direction: "merge" | "split") {
    const merging = direction === "merge";
    const plotDelay = merging ? 0 : STAGGER_MS;
    const cardDelay = merging ? STAGGER_MS : 0;

    // Measure every destination before anything moves: an element mid-animation reports its animated position
    const realPlots = [...root.querySelectorAll<SVGElement>("[data-flip-id]")];
    const realCards = [...root.querySelectorAll<HTMLElement>("[data-merge-card]")];
    const plotTargets = new Map(realPlots.map((plot) => [plot.dataset.flipId!, plot.getBoundingClientRect()]));
    const cardRects = new Map(realCards.map((card) => [card, card.getBoundingClientRect()]));
    const contactCopy = snapshot.cards.find((piece) => piece.id === "contact");
    const contactReal = realCards.find((card) => card.dataset.mergeCard === "contact");

    // The real plots stay hidden while their copies travel
    const copiedPlots = new Set(snapshot.plots.map((piece) => piece.id));
    const hiddenPlots = realPlots.filter((plot) => copiedPlots.has(plot.dataset.flipId!));
    hiddenPlots.forEach((plot) => (plot.style.visibility = "hidden"));

    // Plots
    for (const piece of snapshot.plots) {
        const target = plotTargets.get(piece.id);
        if (target) {
            piece.clone.animate(
                [
                    { transformOrigin: "top left", transform: "none" },
                    { transformOrigin: "top left", transform: moveTo(piece.rect, target) },
                ],
                { duration: PLOTS_MS, delay: plotDelay, easing: EASE, fill: "both" }
            );
        } else {
            // A plot with nowhere to go (its card hides) fades with its card
            piece.clone.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: CARDS_MS,
                delay: cardDelay,
                easing: EASE,
                fill: "both",
            });
        }
    }

    // Cards
    const cardTiming = { duration: CARDS_MS, delay: cardDelay, easing: EASE, fill: "both" as const };
    if (merging) {
        // The cards slide into the contact card and fade while it fades in
        const contactRect = contactReal ? cardRects.get(contactReal) : undefined;
        for (const piece of snapshot.cards) {
            piece.clone.animate(
                contactRect
                    ? [
                          { transformOrigin: "top left", transform: "none", opacity: 1 },
                          { transformOrigin: "top left", transform: moveTo(piece.rect, contactRect), opacity: 0 },
                      ]
                    : [{ opacity: 1 }, { opacity: 0 }],
                cardTiming
            );
        }
        contactReal?.animate([{ opacity: 0 }, { opacity: 1 }], cardTiming);
    } else {
        // The cards slide out of the contact card and fade in while it fades out
        contactCopy?.clone.animate([{ opacity: 1 }, { opacity: 0 }], cardTiming);
        for (const [card, rect] of cardRects) {
            card.animate(
                contactCopy
                    ? [
                          { transformOrigin: "top left", transform: moveTo(rect, contactCopy.rect), opacity: 0 },
                          { transformOrigin: "top left", transform: "none", opacity: 1 },
                      ]
                    : [{ opacity: 0 }, { opacity: 1 }],
                cardTiming
            );
        }
    }

    const total = Math.max(plotDelay + PLOTS_MS, cardDelay + CARDS_MS);
    return new Promise<void>((resolve) => {
        window.setTimeout(() => {
            hiddenPlots.forEach((plot) => (plot.style.visibility = ""));
            snapshot.layer.remove();
            realCards.forEach((card) => card.getAnimations().forEach((animation) => animation.cancel()));
            resolve();
        }, total);
    });
}

// Skips the animation (reduced motion)
export function dropMergeSnapshot(snapshot: MergeSnapshot) {
    snapshot.layer.remove();
}
