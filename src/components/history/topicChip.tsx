import { getSkillByName } from "../../data/skills";
import TopicTag from "../skill/topicTag";

// Links to the skill page when the Skill Shop has that skill; a plain chip in the same style otherwise
export default function TopicChip({ name }: { name: string }) {
    if (getSkillByName(name)) return <TopicTag name={name} />;
    return (
        <span className="inline-block max-w-full truncate rounded-full px-3 py-1 text-sm bg-default/10 text-default/80">
            {name}
        </span>
    );
}
