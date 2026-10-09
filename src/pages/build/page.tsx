import { useLayoutEffect, useRef, useState } from "react";
import { useBuild } from "../../contexts/buildContext";
import Navbar from "../../components/navigation/navbar";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";
import BlueprintCard from "../../components/build/blueprintCard";
import ContactCard from "../../components/build/contactCard";
import ConfirmModal from "../../components/modal/confirmModal";
import PageHeader from "../../components/header/pageHeader";
import { BLUEPRINTS } from "../../data/blueprints";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { isBlueprintFullyEquipped } from "../../lib/blueprintPlot";
import { captureMergeSnapshot, dropMergeSnapshot, MergeSnapshot, playMergeTransition } from "../../lib/mergeTransition";

// The build page: blueprint cards (roles) the visitor equips. Clicking a fully equipped card's plot merges the
// cards into a contact card (incomplete ones hide); clicking its plot area splits it back.
export default function Build() {
    const { build, setBuild } = useBuild();
    const reduceMotion = usePrefersReducedMotion();
    const [isClearOpen, setIsClearOpen] = useState(false);
    const [wantsMerged, setWantsMerged] = useState(false);
    const equippedNames = new Set(build.map((item) => item.skillName));
    const fullyEquipped = BLUEPRINTS.filter((blueprint) => isBlueprintFullyEquipped(blueprint, equippedNames));
    // Nothing left to merge (e.g. the build was cleared) shows the cards again
    const isMerged = wantsMerged && fullyEquipped.length > 0;

    // Merge and split animate in two phases (see lib/mergeTransition): copies of what's on screen are taken
    // before the layout switches, then animated over the new layout. Clicks wait until it's over
    const layoutRef = useRef<HTMLDivElement>(null);
    const snapshot = useRef<MergeSnapshot | null>(null);
    const isAnimating = useRef(false);
    function toggleMerged() {
        if (isAnimating.current || !layoutRef.current) return;
        snapshot.current = captureMergeSnapshot(layoutRef.current);
        setWantsMerged(!isMerged);
    }
    useLayoutEffect(() => {
        const taken = snapshot.current;
        snapshot.current = null;
        if (!taken || !layoutRef.current) return;
        if (reduceMotion) {
            dropMergeSnapshot(taken);
            return;
        }
        isAnimating.current = true;
        playMergeTransition(taken, layoutRef.current, isMerged ? "merge" : "split").then(() => {
            isAnimating.current = false;
        });
    }, [isMerged, reduceMotion]);

    return (
        <>
            <Navbar />
            <ThreeColumnLayout>
                <div className="flex flex-col gap-8 text-default">
                    <div className="flex flex-row flex-wrap items-end justify-between gap-4">
                        {/* Same look as the Skill Shop header at its compact (stuck) size; doesn't stick here */}
                        <PageHeader
                            compact
                            title="Build"
                            description="Different blueprints for different roles that compose my build"
                        />
                        {build.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setIsClearOpen(true)}
                                className="text-sm text-default/60 underline transition-colors hover:text-red-500"
                            >
                                Clear build
                            </button>
                        )}
                    </div>
                    <div ref={layoutRef}>
                        {isMerged ? (
                            // A bit wider than one card, centered
                            <div className="mx-auto w-full lg:max-w-sm">
                                <ContactCard blueprints={fullyEquipped} onSplit={toggleMerged} />
                            </div>
                        ) : (
                            <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                {BLUEPRINTS.map((blueprint) => (
                                    <li key={blueprint.id} className="flex min-w-0">
                                        <BlueprintCard blueprint={blueprint} onMerge={toggleMerged} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {isClearOpen && (
                    <ConfirmModal
                        title="Clear build"
                        message="Clear all skills in the build?"
                        confirmLabel="Clear build"
                        cancelLabel="Cancel"
                        onConfirm={() => setBuild([])}
                        onClose={() => setIsClearOpen(false)}
                    />
                )}
            </ThreeColumnLayout>
        </>
    );
}
