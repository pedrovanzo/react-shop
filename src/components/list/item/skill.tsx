import SkillInterface from "../../../interfaces/skill";
import { getSkillById } from "../../../data/skills";
import SkillItemLayout from "./skillItemLayout";

interface SkillFromProps {
    skill: SkillInterface;
    condensed?: boolean;
    // Already in the build: muted, with an "Equipped" badge
    equipped?: boolean;
}

const SkillItemOfList: React.FC<SkillFromProps> = ({ skill, condensed, equipped = false }) => {
    const parent = getSkillById(skill.parentId);
    return (
        <SkillItemLayout
            badge={parent?.name}
            status={equipped ? "Equipped" : undefined}
            muted={equipped}
            title={skill.name}
            description={skill.summary}
            condensed={condensed}
        />
    );
};
export default SkillItemOfList;
