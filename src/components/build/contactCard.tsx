import { KeyboardEvent } from "react";
import { LuMousePointerClick } from "react-icons/lu";
import { Blueprint } from "../../data/blueprints";
import { CONTACT_LINKS } from "../../data/contactLinks";
import { useBuild } from "../../contexts/buildContext";
import { getBlueprintAxes, getBlueprintPlotTitle } from "../../lib/blueprintPlot";
import { cn } from "@/lib/utils";
import ProfilePhoto from "../profile/profilePhoto";
import StarPlot, { PLOT_PANEL_CLASS } from "./starPlot";
import SpecLine from "./specLine";

interface ContactCardProps {
    // The fully equipped blueprints whose plots merged into this card
    blueprints: Blueprint[];
    // Clicking the plot area splits it back into the blueprint cards
    onSplit: () => void;
}

// The blueprint cards merged into one: Pedro Vanzo, the equipped blueprints' plots, and the contact links
// in the same spec-line style as a blueprint's topics
export default function ContactCard({ blueprints, onSplit }: ContactCardProps) {
    const { build } = useBuild();
    const equippedNames = new Set(build.map((item) => item.skillName));
    function onPlotKeyDown(event: KeyboardEvent) {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        onSplit();
    }
    return (
        <article data-merge-card="contact" className="w-full flex flex-col gap-4 rounded-lg p-4 bg-default/5 text-default">
            <header className="flex flex-row items-center gap-3 motion-safe:animate-fade-up">
                <ProfilePhoto className="size-12" />
                <h3 className="text-lg font-semibold leading-tight">Pedro Vanzo</h3>
            </header>
            <div
                role="button"
                tabIndex={0}
                onClick={onSplit}
                onKeyDown={onPlotKeyDown}
                aria-label="Split the contact card back into blueprint cards"
                className={cn(
                    PLOT_PANEL_CLASS,
                    "relative cursor-pointer transition-colors hover:border-blue-500 outline-none focus-visible:border-blue-500"
                )}
            >
                {/* About a third of a card's plot, stacked from lg up; in a row on narrow screens */}
                <div className="flex flex-row lg:flex-col items-center justify-center gap-2 py-1">
                    {blueprints.map((blueprint) => (
                        <div key={blueprint.id} className="w-[90px] shrink-0">
                            <StarPlot
                                flipId={`plot-${blueprint.id}`}
                                title={getBlueprintPlotTitle(blueprint)}
                                axes={getBlueprintAxes(blueprint, equippedNames)}
                            />
                        </div>
                    ))}
                </div>
                <LuMousePointerClick className="absolute bottom-2 right-2 size-5 text-white" aria-hidden="true" />
            </div>
            <section className="flex flex-col gap-2 motion-safe:animate-fade-up">
                <h4 className="text-xs font-medium uppercase tracking-widest text-default/50">Contact</h4>
                <ul className="flex flex-col gap-1 text-sm">
                    {CONTACT_LINKS.map(({ label, detail, href }) => {
                        const isExternal = href.startsWith("http");
                        return (
                            <li key={label}>
                                <a
                                    href={href}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    className="flex flex-row items-baseline gap-1 text-default/80 hover:text-blue-500 hover:underline"
                                >
                                    <SpecLine label={label} value={detail} />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </article>
    );
}
