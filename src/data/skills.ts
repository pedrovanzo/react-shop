import SkillInterface from "../interfaces/skill";
import skillsList from "./skillsList.json";

export const SKILLS = skillsList as SkillInterface[];

export function getSkillByName(name: string | undefined) {
    return SKILLS.find((skill) => skill.name === name);
}
export function getSkillById(id: string | undefined) {
    return SKILLS.find((skill) => skill.id === id);
}
// Every skill in a topic (category): the unit you equip
export function getSkillsInTopic(topic: string) {
    return SKILLS.filter((skill) => skill.category === topic);
}
export function getChildSkills(parentId: string) {
    return SKILLS.filter((skill) => skill.parentId === parentId);
}
// Skills in the same topic, excluding the skill itself and its children (listed as subtopics)
export function getRelatedSkills(skill: SkillInterface) {
    return SKILLS.filter(
        (item) =>
            item.category === skill.category &&
            item.id !== skill.id &&
            item.parentId !== skill.id
    ).sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
}
