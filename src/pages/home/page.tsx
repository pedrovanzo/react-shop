import { useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import Navbar from "../../components/navigation/navbar";
import ProfilePhoto from "../../components/profile/profilePhoto";
import PatternText from "../../components/pattern/patternText";
import FiltersButton from "../../components/skill/filtersButton";
import SkillShopSection from "../../components/skill/skillShopSection";
import {
    PAGE_HEADER_CLASS,
    PAGE_HEADER_DESCRIPTION_CLASS,
    PAGE_HEADER_TITLE_CLASS,
} from "../../components/header/pageHeader";
import { useScrollMorph } from "../../hooks/useScrollMorph";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { SKILL_SHOP_SECTION_ID, scrollToSkillShop } from "../../lib/scroll";

// Home: a hero, then the skills list. Scrolling moves the hero's title and description
// into the skills header (see useScrollMorph); the hero-only bits fade out on the way.
// The title already has the header's look in the hero, so it only moves and grows.
export default function Home() {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const morph = !usePrefersReducedMotion();

    const heroRef = useRef<HTMLElement>(null);
    const skillShopRef = useRef<HTMLElement>(null);
    const stickyHeaderRef = useRef<HTMLDivElement>(null);
    // Hero placeholders: where the title and description start
    const heroTitleRef = useRef<HTMLElement>(null);
    const heroDescriptionRef = useRef<HTMLSpanElement>(null);
    // Header elements: the real title and description; the description crossfades from the hero text
    const titleRef = useRef<HTMLElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const descriptionHeroLayerRef = useRef<HTMLSpanElement>(null);
    const descriptionHeaderLayerRef = useRef<HTMLSpanElement>(null);
    // Only in the hero
    const photoRef = useRef<HTMLSpanElement>(null);
    const eyebrowRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    // Only in the header: its build and scroll-to-top buttons
    const headerActionsRef = useRef<HTMLDivElement>(null);

    const pairs = useMemo(
        () => [
            { from: heroTitleRef, to: titleRef },
            {
                from: heroDescriptionRef,
                to: descriptionRef,
                startLayer: descriptionHeroLayerRef,
                endLayer: descriptionHeaderLayerRef,
            },
        ],
        []
    );
    const fadeOut = useMemo(() => [photoRef, eyebrowRef, buttonRef], []);
    const fadeIn = useMemo(() => [headerActionsRef], []);
    useScrollMorph({
        enabled: morph,
        start: heroRef,
        end: skillShopRef,
        pairs,
        fadeOut,
        fadeIn,
        sticky: stickyHeaderRef,
    });

    // With the morph on, the hero keeps empty placeholders and the header draws the title and description
    const placeholder = morph ? "invisible" : "";

    return (
        <>
            {/* Outside the hero so it can stick for the whole page */}
            <Navbar actions={<FiltersButton onClick={() => setIsFiltersOpen(true)} />} />
            {/*
              The hero fills the rest of the first screen: 100dvh minus the navbar, its 0.25rem bottom margin
              and the body's 1rem bottom padding
            */}
            <section
                ref={heroRef}
                className="h-[calc(100dvh-var(--navbar-height,0px)-1.25rem)] flex items-center justify-center px-2 text-default"
            >
                {/* Below lg: centered vertical stack. lg+: photo left, text rows follow its curve */}
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
                    <ProfilePhoto ref={photoRef} className="size-28 lg:size-64" />
                    {/*
                      Each row's lg margin keeps ~40px between its left edge and the circle (256px).
                      Offsets come from the circle's edge at each row's vertical center:
                      rows near the top and bottom sit closer (negative margins), middle rows further out.
                    */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <p
                            ref={eyebrowRef}
                            className="mb-2 lg:-ml-[16px] text-sm font-medium uppercase tracking-[0.25em] leading-5 text-default/60"
                        >
                            Pedro Vanzo's
                        </p>
                        <PatternText
                            ref={heroTitleRef}
                            as="div"
                            aria-hidden="true"
                            className={`lg:ml-[34px] whitespace-nowrap text-[clamp(3rem,18vw,6rem)] font-black tracking-tight leading-none ${placeholder}`}
                        >
                            Skill Shop
                        </PatternText>
                        <p
                            aria-hidden="true"
                            className={`mt-4 max-w-md lg:max-w-none text-base lg:text-lg font-light leading-relaxed text-default/60 ${placeholder}`}
                        >
                            <span ref={heroDescriptionRef} className="lg:block lg:ml-[34px]">
                                Browse the frontend concepts I work with every day.
                            </span>
                        </p>
                        <Link
                            ref={buttonRef}
                            to={{ pathname: "/skill-shop" }}
                            onClick={(event) => {
                                if (scrollToSkillShop()) event.preventDefault();
                            }}
                            className="mt-6 lg:-ml-[4px] px-6 py-3 rounded-full text-sm font-medium tracking-wide leading-none text-contrast bg-default"
                        >
                            Browse skills
                        </Link>
                    </div>
                </div>
            </section>
            <SkillShopSection
                id={SKILL_SHOP_SECTION_ID}
                ref={skillShopRef}
                stickyHeaderRef={stickyHeaderRef}
                headerActionsRef={headerActionsRef}
                // At least a screen tall, so even a short filtered list can scroll far enough to finish the morph
                className="min-h-dvh"
                header={
                    <header className={PAGE_HEADER_CLASS}>
                        <PatternText ref={titleRef} as="h1" className={PAGE_HEADER_TITLE_CLASS}>
                            Skill Shop
                        </PatternText>
                        <p ref={descriptionRef} className={`relative ${PAGE_HEADER_DESCRIPTION_CLASS}`}>
                            <span ref={descriptionHeaderLayerRef}>
                                Browse the skills and equip them to make a build
                            </span>
                            {morph && (
                                <span
                                    ref={descriptionHeroLayerRef}
                                    aria-hidden="true"
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-default/60"
                                >
                                    Browse the frontend concepts I work with every day.
                                </span>
                            )}
                        </p>
                    </header>
                }
                isFiltersOpen={isFiltersOpen}
                onFiltersOpenChange={setIsFiltersOpen}
            />
        </>
    );
}
