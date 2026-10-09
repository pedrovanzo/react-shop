import { Blueprint } from "../data/blueprints";
import { getSkillsInTopic } from "../data/skills";
import { TOPIC_SHORT_LABELS } from "./skillSort";

// A blueprint's topics with how many skills each has and how many the visitor equipped
export function getBlueprintTopics(blueprint: Blueprint, equippedNames: Set<string>) {
    return blueprint.topics.map((name) => {
        const skills = getSkillsInTopic(name);
        return {
            name,
            skills,
            count: skills.length,
            equipped: skills.filter((skill) => equippedNames.has(skill.name)).length,
        };
    });
}

export function isBlueprintFullyEquipped(blueprint: Blueprint, equippedNames: Set<string>) {
    return getBlueprintTopics(blueprint, equippedNames).every((topic) => topic.equipped === topic.count);
}

// Star plot axes for a blueprint: the topic with the most skills is the strongest point, the others scale
// against it. `overlay` overrides the blue shape (e.g. mid-animation); by default it shows what is equipped.
export function getBlueprintAxes(blueprint: Blueprint, equippedNames: Set<string>, overlay?: number[]) {
    const topics = getBlueprintTopics(blueprint, equippedNames);
    const strongest = Math.max(1, ...topics.map((topic) => topic.count));
    return topics.map((topic, i) => ({
        label: TOPIC_SHORT_LABELS[topic.name] ?? topic.name.slice(0, 4).toUpperCase(),
        name: topic.name,
        // Floor keeps one-skill topics visible as a point, not a dot in the middle
        value: Math.max(0.15, topic.count / strongest),
        overlay: overlay ? overlay[i] : topic.equipped / strongest,
    }));
}

export function getBlueprintPlotTitle(blueprint: Blueprint) {
    return `${blueprint.name}: ${blueprint.topics.map((name) => `${name} ${getSkillsInTopic(name).length}`).join(", ")}`;
}
