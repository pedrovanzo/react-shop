import SkillItemLayout from "./skillItemLayout";

export default function LoadingSkillItemOfList({ condensed = false }: { condensed?: boolean }) {
  return (
    <SkillItemLayout
      className="animate-pulse"
      imageLabel="loading-image"
      title="skill name"
      description="skill summary"
      condensed={condensed}
    />
  );
}
