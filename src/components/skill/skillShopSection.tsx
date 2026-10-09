import { ReactNode, Ref, RefObject, useEffect, useRef, useState } from "react";
import { GiAnvilImpact } from "react-icons/gi";
import { IoArrowUp } from "react-icons/io5";
import { Link, useSearchParams } from "react-router";
import { useSimulatedLoading } from "../../hooks/useSimulatedLoading";
import LoadingSkillItemOfList from "../list/item/loadingSkill";
import SkillItemOfList from "../list/item/skill";
import ThreeColumnLayout from "../layout/threeColumnLayout";
import SkillFilters, { SkillFiltersValue } from "./skillFilters";
import { STUCK_TRANSITION } from "../header/pageHeader";
import EquipModal from "../build/equipModal";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { skillPath } from "../../lib/skillPath";
import { scrollBehavior } from "../../lib/scroll";
import { DEFAULT_SKILL_SORT, getSkillCategories, SKILL_SORTS, SkillSort, sortSkills } from "../../lib/skillSort";
import { SKILLS, getSkillsInTopic } from "../../data/skills";
import SkillInterface from "../../interfaces/skill";
import { useBuild } from "../../contexts/buildContext";

const CATEGORIES = getSkillCategories(SKILLS);

function isSkillSort(value: string | null): value is SkillSort {
    return SKILL_SORTS.some((sort) => sort.value === value);
}

// Equips a set of skills; shows how many are left to equip, or "All equipped" when none are.
// "pill" is the stronger look used on topic headers, where equipping happens
function EquipActionButton({
    remaining,
    label,
    onClick,
    pill = false,
}: {
    remaining: number;
    label: string;
    onClick: () => void;
    pill?: boolean;
}) {
    if (remaining === 0) {
        return (
            <span
                className={
                    "flex flex-row items-center gap-1 font-medium text-blue-500/70 " +
                    (pill ? "rounded-full px-3 py-1 text-sm bg-blue-500/10" : "text-xs")
                }
            >
                <GiAnvilImpact className="size-4" aria-hidden="true" />
                All equipped
            </span>
        );
    }
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                "flex flex-row items-center gap-1 font-medium text-blue-500 " +
                (pill
                    ? "rounded-full px-3 py-1 text-sm bg-blue-500/15 transition-colors hover:bg-blue-500/25"
                    : "text-xs hover:underline")
            }
        >
            <GiAnvilImpact className="size-4" aria-hidden="true" />
            {label} ({remaining})
        </button>
    );
}

interface SkillShopSectionProps {
    // Shown above the list, in the middle column
    header: ReactNode;
    // Below lg the filters live in a drawer; the page opens it from its navbar
    isFiltersOpen: boolean;
    onFiltersOpenChange: (open: boolean) => void;
    id?: string;
    ref?: Ref<HTMLElement>;
    // The sticky wrapper around the header, for pages that need to measure it
    stickyHeaderRef?: RefObject<HTMLDivElement | null>;
    // The header's buttons, for pages that animate them
    headerActionsRef?: Ref<HTMLDivElement>;
    className?: string;
}

// The skills list with its filters, build actions and modals.
// Used by the skills page and below the home hero.
export default function SkillShopSection({
    header,
    isFiltersOpen,
    onFiltersOpenChange,
    id,
    ref,
    stickyHeaderRef,
    headerActionsRef,
    className,
}: SkillShopSectionProps) {
    const loading = useSimulatedLoading();
    const ownStickyHeaderRef = useRef<HTMLDivElement>(null);
    const headerWrapperRef = stickyHeaderRef ?? ownStickyHeaderRef;
    const listRef = useRef<HTMLElement>(null);
    const columnRef = useRef<HTMLDivElement>(null);
    // Stuck: the header reached the top of the screen. List under header: items are hidden beneath it
    const [isHeaderStuck, setIsHeaderStuck] = useState(false);
    const [isListUnderHeader, setIsListUnderHeader] = useState(false);
    // Header heights once settled (no transition running), normal and stuck. The difference is the space the
    // compact header gives up, kept as extra margin so the list doesn't jump
    const headerHeights = useRef({ normal: 0, stuck: 0 });
    useEffect(() => {
        let frame = 0;
        function check() {
            const header = headerWrapperRef.current;
            const list = listRef.current;
            if (!header || !list) return;
            const headerRect = header.getBoundingClientRect();
            // Sticks below the sticky navbar: its CSS top is the navbar's height
            const stuck = headerRect.top <= parseFloat(getComputedStyle(header).top) + 0.5;
            if (header.getAnimations({ subtree: true }).length === 0) {
                // Only trust the height when it matches the state the header was rendered in
                if (stuck && header.dataset.stuck === "true") headerHeights.current.stuck = headerRect.height;
                if (!stuck && header.dataset.stuck === "false") headerHeights.current.normal = headerRect.height;
            }
            setIsHeaderStuck(stuck);
            setIsListUnderHeader(list.getBoundingClientRect().top < headerRect.bottom - 1);
        }
        function onChange() {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(check);
        }
        check();
        window.addEventListener("scroll", onChange, { passive: true });
        window.addEventListener("resize", onChange);
        // The header shrinks after sticking, which can uncover the list without any scroll
        const observer = new ResizeObserver(onChange);
        const header = headerWrapperRef.current;
        if (header) observer.observe(header);
        // Records the settled height once the shrink or grow animation ends
        header?.addEventListener("transitionend", onChange);
        return () => {
            observer.disconnect();
            header?.removeEventListener("transitionend", onChange);
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onChange);
            window.removeEventListener("resize", onChange);
        };
    }, [headerWrapperRef]);
    // Pending add: one skill, a whole group, or everything listed
    const [pendingAdd, setPendingAdd] = useState<{ label: string; skills: SkillInterface[] } | null>(null);
    const { build, setBuild } = useBuild();
    const skillNamesInBuild = new Set(build.map((item) => item.skillName));
    const notEquipped = (skills: SkillInterface[]) =>
        skills.filter((skill) => !skillNamesInBuild.has(skill.name));
    // Adds only the skills not in the build yet, so nothing is added twice
    function equip(skills: SkillInterface[]) {
        setBuild((currentBuild) => {
            const names = new Set(currentBuild.map((item) => item.skillName));
            const toAdd = skills.filter((skill) => !names.has(skill.name));
            return [...currentBuild, ...toAdd.map((skill) => ({ skillName: skill.name }))];
        });
    }
    function requestAdd(label: string, skills: SkillInterface[]) {
        const toAdd = notEquipped(skills);
        if (toAdd.length === 0) return;
        setPendingAdd({
            label: toAdd.length === 1 ? toAdd[0].name : `${toAdd.length} ${label}`,
            skills: toAdd,
        });
    }
    // View, sort and topic live in the URL (?view=condensed&sort=topic&topic=React)
    // so they survive refresh and back navigation
    const [searchParams, setSearchParams] = useSearchParams();
    const sortParam = searchParams.get("sort");
    const topicParam = searchParams.get("topic");
    const filters: SkillFiltersValue = {
        view: searchParams.get("view") === "condensed" ? "condensed" : "expanded",
        // By topic by default: topics are what you equip
        sort: isSkillSort(sortParam) ? sortParam : DEFAULT_SKILL_SORT,
        topic: CATEGORIES.some((category) => category.name === topicParam) ? topicParam : null,
    };
    const isCondensed = filters.view === "condensed";

    function updateFilters(changes: Partial<SkillFiltersValue>) {
        const next = new URLSearchParams(searchParams);
        if (changes.view !== undefined) {
            if (changes.view === "expanded") next.delete("view");
            else next.set("view", changes.view);
        }
        if (changes.sort !== undefined) {
            if (changes.sort === DEFAULT_SKILL_SORT) next.delete("sort");
            else next.set("sort", changes.sort);
        }
        if (changes.topic !== undefined) {
            if (changes.topic === null) next.delete("topic");
            else next.set("topic", changes.topic);
        }
        setSearchParams(next, { replace: true });
        scrollToListTop();
    }

    // Brings the list back up to its start if items are hidden under the stuck header.
    // Used after a filter change and by the header's scroll-to-top button.
    // The header sticks once its normal top (column top plus its negative margin) reaches the navbar.
    // Scrolling past that by the space the compact header gives up puts the list right under it,
    // as close as it sits under the full-size header, instead of leaving an empty band.
    function scrollToListTop() {
        const column = columnRef.current;
        const header = headerWrapperRef.current;
        if (!column || !header) return;
        const headerStyle = getComputedStyle(header);
        // Scroll position where the header reaches its sticky spot right below the navbar
        const stickTop =
            column.getBoundingClientRect().top + window.scrollY + parseFloat(headerStyle.marginTop) - parseFloat(headerStyle.top);
        const { normal, stuck } = headerHeights.current;
        const shrink = normal > 0 && stuck > 0 ? Math.max(0, normal - stuck) : 0;
        const top = stickTop + shrink;
        if (window.scrollY > top) window.scrollTo({ top, behavior: scrollBehavior() });
    }

    const visibleSkills = filters.topic
        ? SKILLS.filter((skill) => skill.category === filters.topic)
        : SKILLS;
    const groups = sortSkills(visibleSkills, filters.sort);

    return (
        <section id={id} ref={ref} className={className}>
            <ThreeColumnLayout left={<SkillFilters value={filters} onChange={updateFilters} />}>
                <div ref={columnRef} className="min-w-0 flex flex-col gap-10">
                    {/*
                      The header sticks to the top once it gets there, keeping its place in the layout.
                      Negative margins cancel the padding, which gives stuck text room from the screen edges.
                      Stuck, the header shrinks (title to 3/7 of its size, gap 12px to 4px); the bottom margin grows by
                      the same amount, with the same transition, so the list doesn't jump. With 7rem titles that's
                      72px: margin -16px to 56px. Below sm the title is clamp(3.75rem,19vw,6rem), hence the calc.
                      The shadow only shows while list items are hidden under it.
                    */}
                    <div
                        ref={headerWrapperRef}
                        data-stuck={isHeaderStuck}
                        className={
                            "group/sticky-header sticky top-[var(--navbar-height,0px)] z-10 -my-4 -mx-2 py-4 px-2 bg-contrast " +
                            "data-[stuck=true]:mb-[calc(clamp(3.75rem,19vw,6rem)*0.571429-0.5rem)] sm:data-[stuck=true]:mb-14 " +
                            `transition-[margin,box-shadow] ${STUCK_TRANSITION} ` +
                            (isListUnderHeader
                                ? "shadow-[0_14px_14px_-14px_color-mix(in_oklch,var(--color-default)_35%,transparent)]"
                                : "")
                        }
                    >
                        {/* Same width as the list, so the left-aligned header lines up with it */}
                        <div className="mx-auto w-full max-w-2xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                            <div className="min-w-0">{header}</div>
                            <div ref={headerActionsRef} className="shrink-0 flex flex-row items-center gap-2">
                                <Link
                                    to={{ pathname: "/build" }}
                                    className="flex flex-row items-center gap-1.5 px-3 py-2 rounded-md text-sm leading-none text-default bg-default/10 hover:bg-default/15"
                                >
                                    <GiAnvilImpact className="size-4" aria-hidden="true" />
                                    build
                                </Link>
                                <button
                                    type="button"
                                    onClick={scrollToListTop}
                                    aria-label="Scroll to top"
                                    title="Scroll to top"
                                    className="p-2 rounded-md leading-none text-default bg-default/10 hover:bg-default/15"
                                >
                                    <IoArrowUp className="size-4" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <main ref={listRef} className="mx-auto w-full max-w-2xl">
                        {loading ? (
                            <ul className={"flex flex-col " + (isCondensed ? "gap-3" : "gap-6")}>
                                <li key={1}>
                                    <LoadingSkillItemOfList condensed={isCondensed} />
                                </li>
                                <li key={2}>
                                    <LoadingSkillItemOfList condensed={isCondensed} />
                                </li>
                                <li key={3}>
                                    <LoadingSkillItemOfList condensed={isCondensed} />
                                </li>
                            </ul>
                        ) : visibleSkills.length != 0 ? (
                            <div className={"flex flex-col " + (isCondensed ? "gap-8" : "gap-10")}>
                                {groups.map((group, index) => (
                                    <section key={group.title ?? "all"} className="flex flex-col gap-4">
                                        {/*
                                          Header line: group title, emphasized since topics are what you equip.
                                          Topic groups get "Equip topic" (the whole topic); "Equip all" sits on the first line.
                                        */}
                                        {(group.title || index === 0) && (
                                            <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
                                                {group.title && (
                                                    <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
                                                        <h2 className="text-2xl font-semibold tracking-tight">
                                                            {group.title}
                                                        </h2>
                                                        {filters.sort === "topic" && (
                                                            <EquipActionButton
                                                                pill
                                                                remaining={notEquipped(getSkillsInTopic(group.title)).length}
                                                                label="Equip topic"
                                                                onClick={() =>
                                                                    requestAdd(`${group.title} skills`, getSkillsInTopic(group.title!))
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                                {index === 0 && (
                                                    <div className="ml-auto">
                                                        <EquipActionButton
                                                            remaining={notEquipped(visibleSkills).length}
                                                            label="Equip all"
                                                            onClick={() => requestAdd("skills", visibleSkills)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <ul className={"flex flex-col " + (isCondensed ? "gap-3" : "gap-6")}>
                                            {group.skills.map((skill) => (
                                                <li key={skill.id}>
                                                    {/* Skills are equipped by topic; the item opens the skill */}
                                                    <Link
                                                        to={{ pathname: skillPath(skill.name) }}
                                                        // Lets the skill page return to this list with the same filters
                                                        state={{ skillsSearch: searchParams.toString() }}
                                                        className="block rounded-lg p-2 -m-2 hover:bg-default/5"
                                                    >
                                                        <SkillItemOfList
                                                            skill={skill}
                                                            condensed={isCondensed}
                                                            equipped={skillNamesInBuild.has(skill.name)}
                                                        />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </div>
                        ) : (
                            <div>No skills found :(</div>
                        )}
                    </main>
                </div>
            </ThreeColumnLayout>
            {pendingAdd && (
                <EquipModal
                    skillName={pendingAdd.label}
                    plural={pendingAdd.skills.length > 1}
                    onConfirm={() => equip(pendingAdd.skills)}
                    onClose={() => setPendingAdd(null)}
                />
            )}
            <Drawer open={isFiltersOpen} onOpenChange={onFiltersOpenChange} direction="left">
                <DrawerContent className="text-default">
                    <DrawerHeader>
                        <DrawerTitle>Filters</DrawerTitle>
                        <DrawerDescription>View, sort and filter the skills.</DrawerDescription>
                    </DrawerHeader>
                    <div className="overflow-y-auto px-4 pb-4">
                        <SkillFilters value={filters} onChange={updateFilters} />
                    </div>
                </DrawerContent>
            </Drawer>
        </section>
    );
}
