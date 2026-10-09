import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { GiAnvilImpact } from "react-icons/gi";
import ConfirmModal from "../../components/modal/confirmModal";
import {
    SIMULATED_DELAY,
    useSimulatedLoading,
} from "../../hooks/useSimulatedLoading";
import LoadingSpinner from "../../components/loading/spinner";
import { useBuild } from "../../contexts/buildContext";
import Navbar from "../../components/navigation/navbar";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";
import Button from "../../components/button/button";
import SkillImagePlaceholder from "../../components/skill/skillImagePlaceholder";
import SkillItemOfList from "../../components/list/item/skill";
import EquipModal from "../../components/build/equipModal";
import { InsightType } from "../../interfaces/skill";
import { getChildSkills, getSkillById, getSkillByName, getRelatedSkills, getSkillsInTopic } from "../../data/skills";
import TopicTag from "../../components/skill/topicTag";
import { skillPath } from "../../lib/skillPath";
import NotFound from "../notFound/page";

const insightTypeLabels: Record<InsightType, string> = {
    explored: "How I explored it",
    gotcha: "Gotcha",
    "in-production": "In production",
    opinion: "Opinion",
};

function SectionTitle({ children }: { children: string }) {
    return <h2 className="text-xl font-semibold tracking-tight">{children}</h2>;
}

export default function Skill() {
    const { name } = useParams();
    const skill = getSkillByName(name);
    const navigate = useNavigate();
    // Document loads first, then user
    const isDocLoading = useSimulatedLoading();
    const userIsLoading = useSimulatedLoading(SIMULATED_DELAY * 2);
    const { build, setBuild } = useBuild();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    // Filters of the skills list this page was opened from, if any
    const location = useLocation();
    const skillsSearch: string = location.state?.skillsSearch ?? "";
    if (!skill) return <NotFound />;
    if (isDocLoading)
        return (
            <div className="absolute inset-0 w-full h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    const parent = getSkillById(skill.parentId);
    const isEquipped = build.some((item) => item.skillName === skill.name);
    // Skills are equipped by topic: equipping from here adds every skill in this one's topic
    const topicSkills = getSkillsInTopic(skill.category);
    const equippedNames = new Set(build.map((item) => item.skillName));
    const topicSkillsToEquip = topicSkills.filter((item) => !equippedNames.has(item.name));
    const children = getChildSkills(skill.id);
    const related = getRelatedSkills(skill);
    return (
        <>
            <Navbar />
            <ThreeColumnLayout>
                <article className="mx-auto w-full max-w-3xl flex flex-col gap-10 text-default">
                    <header className="flex flex-col sm:flex-row items-start gap-6">
                        <SkillImagePlaceholder className="size-28 sm:size-32" />
                        <div className="flex flex-col gap-3 min-w-0">
                            {/* Title, then the eyebrow (parent, category, draft) right below it */}
                            <div className="flex flex-col gap-1">
                                {/* Title on the left, "Return to Skill Shop" at the far right of the same line */}
                                <div className="flex flex-row flex-wrap items-center justify-between gap-x-6 gap-y-2">
                                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] leading-tight">
                                        {skill.name}
                                    </h1>
                                    <Button
                                        variant="text"
                                        className="shrink-0"
                                        onClick={() => navigate(`/skill-shop${skillsSearch ? `?${skillsSearch}` : ""}`)}
                                    >
                                        Return to Skill Shop
                                    </Button>
                                </div>
                                <div className="flex flex-row flex-wrap items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-default/50">
                                    {parent && (
                                        <Link to={{ pathname: skillPath(parent.name) }} className="hover:text-default">
                                            {parent.name}
                                        </Link>
                                    )}
                                    {/* Skip the category when it repeats the parent's name (e.g. Git operations / Git operations) */}
                                    {skill.category !== parent?.name && (
                                        <>
                                            {parent && <span aria-hidden="true">/</span>}
                                            <span>{skill.category}</span>
                                        </>
                                    )}
                                    {skill.draft && (
                                        <span className="rounded-full px-1.5 normal-case tracking-normal bg-default/10 text-default/70">
                                            Draft content
                                        </span>
                                    )}
                                </div>
                            </div>
                            <p className="text-lg font-light leading-relaxed text-default/70">
                                {skill.summary}
                            </p>
                            <div className="flex flex-row flex-wrap items-center gap-4">
                                {userIsLoading ? (
                                    <LoadingSpinner text="loading user" />
                                ) : isEquipped ? (
                                    // Build-aware: same states as the skills list (blue "Equipped", red remove)
                                    <div className="flex flex-row flex-wrap items-center gap-3">
                                        <Link
                                            to={{ pathname: "/build" }}
                                            title="Go to build"
                                            className="flex flex-row items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium bg-blue-500/15 text-blue-500 transition-colors hover:bg-blue-500/25"
                                        >
                                            <GiAnvilImpact className="size-4" aria-hidden="true" />
                                            Equipped
                                        </Link>
                                        <Button
                                            variant="text"
                                            className="transition-colors hover:text-red-500"
                                            onClick={() => setIsRemoveModalOpen(true)}
                                        >
                                            Remove topic from build
                                        </Button>
                                    </div>
                                ) : (
                                    <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
                                        Equip topic
                                    </Button>
                                )}
                            </div>
                        </div>
                    </header>

                    {related.length > 0 && (
                        <section className="flex flex-col gap-3">
                            <SectionTitle>Related topics</SectionTitle>
                            <ul className="flex flex-row flex-wrap gap-2">
                                {related.map((item) => (
                                    <li key={item.id} className="max-w-full">
                                        <TopicTag name={item.name} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {skill.insights.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <SectionTitle>Insights</SectionTitle>
                            <ul className="flex flex-col gap-3">
                                {skill.insights.map((insight) => (
                                    <li key={insight.title} className="flex flex-col gap-2 rounded-lg p-4 bg-default/5">
                                        <span className="text-xs font-medium uppercase tracking-widest text-default/50">
                                            {insightTypeLabels[insight.type]}
                                        </span>
                                        <h3 className="font-semibold leading-snug">{insight.title}</h3>
                                        <p className="leading-relaxed text-default/70">{insight.body}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {children.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <SectionTitle>Subtopics</SectionTitle>
                            <ul className="flex flex-col gap-4">
                                {children.map((child) => (
                                    <li key={child.id}>
                                        <Link
                                            to={{ pathname: skillPath(child.name) }}
                                            className="block rounded-lg p-2 -m-2 hover:bg-default/5"
                                        >
                                            <SkillItemOfList skill={child} />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {skill.inProject && skill.inProject.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <SectionTitle>See it in this project</SectionTitle>
                            <ul className="flex flex-col gap-2">
                                {skill.inProject.map((example) => (
                                    <li key={example.path + example.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                        <span>{example.label}</span>
                                        <code className="text-sm text-default/60 break-all">{example.path}</code>
                                        {example.route && (
                                            <Link to={{ pathname: example.route }} className="text-sm underline">
                                                open
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {skill.references && skill.references.length > 0 && (
                        <section className="flex flex-col gap-4">
                            <SectionTitle>References</SectionTitle>
                            <ul className="flex flex-col gap-2">
                                {skill.references.map((reference) => (
                                    <li key={reference.url}>
                                        <a
                                            href={reference.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline"
                                        >
                                            {reference.title}
                                        </a>
                                        {reference.author && (
                                            <span className="text-default/60"> · {reference.author}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </article>
                {isRemoveModalOpen && (
                    <ConfirmModal
                        title="Remove topic"
                        message={`Remove the ${skill.category} topic (${topicSkills.length} skills) from the build?`}
                        confirmLabel="Remove"
                        cancelLabel="Cancel"
                        onConfirm={() => {
                            // Removes every skill in this topic, including repeated entries
                            const topicNames = new Set(topicSkills.map((item) => item.name));
                            setBuild((currentBuild) => currentBuild.filter((item) => !topicNames.has(item.skillName)));
                        }}
                        onClose={() => setIsRemoveModalOpen(false)}
                    />
                )}
                {isAddModalOpen && (
                    <EquipModal
                        skillName={
                            topicSkillsToEquip.length === 1
                                ? topicSkillsToEquip[0].name
                                : `${topicSkillsToEquip.length} ${skill.category} skills`
                        }
                        plural={topicSkillsToEquip.length > 1}
                        onConfirm={() =>
                            setBuild((currentBuild) => [
                                ...currentBuild,
                                ...topicSkillsToEquip.map((item) => ({ skillName: item.name })),
                            ])
                        }
                        onClose={() => setIsAddModalOpen(false)}
                    />
                )}
            </ThreeColumnLayout>
        </>
    );
}
