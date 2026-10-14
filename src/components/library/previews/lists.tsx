import PreviewCard from "../../library/previewCard";
import PreviewGrid from "../../library/previewGrid";
import SkillItemOfList from "../../list/item/skill";
import SkillItemLayout from "../../list/item/skillItemLayout";
import SkillImagePlaceholder from "../../skill/skillImagePlaceholder";
import TopicTag from "../../skill/topicTag";
import { SKILLS } from "../../../data/skills";
export default function ListsPreview() {
    const skill = SKILLS[0];
    return (
        <>
        <PreviewGrid>
            <PreviewCard label="SkillItemOfList" source="components/list/item/skill.tsx" usedIn="skills list, skill page subtopics">
                <SkillItemOfList skill={skill} />
            </PreviewCard>
            <PreviewCard label="SkillItemLayout (plain slots)" source="components/list/item/skillItemLayout.tsx" usedIn="SkillItemOfList, LoadingSkillItemOfList">
                <SkillItemLayout title="title slot" description="description slot, clamped to two lines" />
            </PreviewCard>
            <PreviewCard label="SkillImagePlaceholder (default and size-40)" source="components/skill/skillImagePlaceholder.tsx" usedIn="skill list items, skill page header">
                <div className="flex flex-row items-center gap-4">
                    <SkillImagePlaceholder />
                    <SkillImagePlaceholder className="size-40" />
                </div>
            </PreviewCard>
            <PreviewCard label="TopicTag" source="components/skill/topicTag.tsx" usedIn="skill page, Related topics">
                <div className="flex flex-row flex-wrap justify-center gap-2">
                    <TopicTag name="Closures" />
                    <TopicTag name="Event loop" />
                    <TopicTag name="Common patterns (map/filter/reduce)" />
                </div>
            </PreviewCard>
        </PreviewGrid>
        </>
    );
}
