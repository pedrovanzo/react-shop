import { CSSProperties, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { GiAnvilImpact } from "react-icons/gi";
import { IoTrashOutline } from "react-icons/io5";
import { LuMousePointerClick } from "react-icons/lu";
import { Blueprint } from "../../data/blueprints";
import { useBuild } from "../../contexts/buildContext";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { getBlueprintAxes, getBlueprintPlotTitle, getBlueprintTopics } from "../../lib/blueprintPlot";
import { cn } from "@/lib/utils";
import SkillImagePlaceholder from "../skill/skillImagePlaceholder";
import StarPlot, { PLOT_PANEL_CLASS } from "./starPlot";
import SpecLine from "./specLine";

// Timing of the equip / unequip animation, per topic line (keep in sync with the line-* keyframes in App.css)
const FILL_MS = 450;
const FLASH_MS = 180;
const STEP_MS = FILL_MS + FLASH_MS;

interface BlueprintCardProps {
    blueprint: Blueprint;
    // Clicking the plot of a fully equipped card merges the cards into the contact card
    onMerge: () => void;
}

// The animation in progress: which topic lines fill (equip) or drain (unequip), in order
interface LineAnimation {
    kind: "fill" | "drain";
    topics: string[];
    // Plot values per axis before and after, so the blue shape can follow the lines
    from: number[];
    to: number[];
    run: number;
}

const easeOut = (t: number) => 1 - (1 - t) ** 2;

// A role: name and description, a star plot of its topics, and the topics as a spec list.
// Topics are what a blueprint is made of; the list is labeled "Blueprint".
export default function BlueprintCard({ blueprint, onMerge }: BlueprintCardProps) {
    const { build, setBuild } = useBuild();
    const reduceMotion = usePrefersReducedMotion();
    const equippedNames = new Set(build.map((item) => item.skillName));
    const topics = getBlueprintTopics(blueprint, equippedNames);
    const strongest = Math.max(1, ...topics.map((topic) => topic.count));
    const overlayValues = topics.map((topic) => topic.equipped / strongest);
    const isFullyEquipped = topics.every((topic) => topic.equipped === topic.count);
    const hasEquipped = topics.some((topic) => topic.equipped > 0);

    const [animation, setAnimation] = useState<LineAnimation | null>(null);
    const [plotOverlay, setPlotOverlay] = useState<number[] | null>(null);
    const runs = useRef(0);

    function animate(kind: LineAnimation["kind"], changed: string[], to: number[]) {
        runs.current += 1;
        setAnimation({ kind, topics: changed, from: overlayValues, to, run: runs.current });
    }
    function equip() {
        const missing = topics.filter((topic) => topic.equipped < topic.count);
        const missingSkills = missing.flatMap((topic) => topic.skills.filter((skill) => !equippedNames.has(skill.name)));
        setBuild((current) => [...current, ...missingSkills.map((skill) => ({ skillName: skill.name }))]);
        animate("fill", missing.map((topic) => topic.name), topics.map((topic) => topic.count / strongest));
    }
    function unequip() {
        const present = topics.filter((topic) => topic.equipped > 0);
        const names = new Set(present.flatMap((topic) => topic.skills.map((skill) => skill.name)));
        setBuild((current) => current.filter((item) => !names.has(item.skillName)));
        animate("drain", present.map((topic) => topic.name), topics.map(() => 0));
    }
    function onPlotKeyDown(event: KeyboardEvent) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        onMerge();
    }

    // Drives the plot's blue shape axis by axis, in step with the lines, then hands back to the real values
    useEffect(() => {
        if (!animation) return;
        const duration = reduceMotion ? 0 : animation.topics.length * STEP_MS;
        const order = animation.topics.map((name) => blueprint.topics.indexOf(name));
        let frame = 0;
        const start = performance.now();
        function tick(now: number) {
            const elapsed = now - start;
            if (elapsed >= duration) {
                setPlotOverlay(null);
                setAnimation(null);
                return;
            }
            setPlotOverlay(
                animation!.from.map((from, axis) => {
                    const step = order.indexOf(axis);
                    if (step === -1) return animation!.to[axis];
                    const progress = Math.min(1, Math.max(0, (elapsed - step * STEP_MS) / FILL_MS));
                    return from + (animation!.to[axis] - from) * easeOut(progress);
                })
            );
            frame = requestAnimationFrame(tick);
        }
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [animation, reduceMotion, blueprint.topics]);

    // Merging waits for the fill to finish, so the last line isn't cut short
    const canMerge = isFullyEquipped && !animation;
    const plot = (
        <StarPlot
            flipId={`plot-${blueprint.id}`}
            title={getBlueprintPlotTitle(blueprint)}
            axes={getBlueprintAxes(blueprint, equippedNames, plotOverlay ?? undefined)}
        />
    );

    return (
        <article
            data-merge-card={blueprint.id}
            className="w-full min-w-0 flex flex-col gap-4 rounded-lg p-4 bg-default/5 text-default"
        >
            {/* Header and list fade in (e.g. when the contact card splits back); the plot moves instead */}
            <header className="flex flex-row items-start gap-3 motion-safe:animate-fade-up">
                <SkillImagePlaceholder className="size-12" />
                <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-lg font-semibold leading-tight">{blueprint.name}</h3>
                    <p className="text-sm leading-snug text-default/70">{blueprint.description}</p>
                </div>
            </header>
            {canMerge ? (
                // Fully equipped: the whole plot area merges the cards into the contact card
                <div
                    role="button"
                    tabIndex={0}
                    onClick={onMerge}
                    onKeyDown={onPlotKeyDown}
                    aria-label="Merge the equipped blueprints into a contact card"
                    className={cn(
                        PLOT_PANEL_CLASS,
                        "relative cursor-pointer transition-colors hover:border-blue-500 outline-none focus-visible:border-blue-500"
                    )}
                >
                    {plot}
                    <LuMousePointerClick
                        className="absolute bottom-2 right-2 size-5 text-white motion-safe:animate-pulse"
                        aria-hidden="true"
                    />
                </div>
            ) : (
                <div className={PLOT_PANEL_CLASS}>{plot}</div>
            )}
            <section className="flex flex-col gap-2 motion-safe:animate-fade-up">
                <div className="flex flex-row items-center justify-between gap-2">
                    <h4 className="text-xs font-medium uppercase tracking-widest text-default/50">Blueprint</h4>
                    <div className="flex flex-row items-center gap-1.5">
                        {hasEquipped && (
                            <button
                                type="button"
                                onClick={unequip}
                                aria-label={`Remove the ${blueprint.name} blueprint's topics from the build`}
                                title="Remove from build"
                                className="rounded-md p-1.5 text-default/60 transition-colors hover:bg-red-500/15 hover:text-red-500"
                            >
                                <IoTrashOutline className="size-4" aria-hidden="true" />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={equip}
                            disabled={isFullyEquipped}
                            className={cn(
                                "flex flex-row items-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium transition-colors",
                                isFullyEquipped
                                    ? "cursor-default bg-blue-500/15 text-blue-500"
                                    : "bg-default/10 text-default hover:bg-blue-500/15 hover:text-blue-500"
                            )}
                        >
                            <GiAnvilImpact className="size-4 shrink-0" aria-hidden="true" />
                            {isFullyEquipped ? "Equipped" : "Equip"}
                        </button>
                    </div>
                </div>
                <ul className="flex flex-col gap-1 text-sm">
                    {topics.map((topic) => {
                        const step = animation ? animation.topics.indexOf(topic.name) : -1;
                        const animating = step !== -1;
                        const showOverlay = topic.equipped > 0 || animating;
                        const lineStyle = {
                            "--line-delay": `${Math.max(0, step) * STEP_MS}ms`,
                            "--line-fill": `${FILL_MS}ms`,
                            "--line-flash": `${FLASH_MS}ms`,
                        } as CSSProperties;
                        return (
                            <li
                                // A new run remounts the line, restarting its animation
                                key={animating ? `${topic.name}-${animation!.run}` : topic.name}
                                className={cn(
                                    "relative",
                                    animating && (animation!.kind === "fill" ? "line-filling" : "line-draining")
                                )}
                                style={lineStyle}
                            >
                                <Link
                                    to={{ pathname: "/skill-shop", search: `?topic=${encodeURIComponent(topic.name)}` }}
                                    className="flex flex-row items-baseline gap-1 text-default/80 hover:underline"
                                >
                                    <SpecLine label={topic.name} value={topic.count} />
                                </Link>
                                {/* Blue copy of the line on top: static when equipped, revealed or hidden by the animation */}
                                {showOverlay && (
                                    <div
                                        aria-hidden="true"
                                        className="line-overlay pointer-events-none absolute inset-0 flex flex-row items-baseline gap-1 text-blue-500"
                                    >
                                        <SpecLine label={topic.name} value={topic.count} />
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </section>
        </article>
    );
}
