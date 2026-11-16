export default interface Highlight {
    id: string,
    // Key in components/history/historyIcon.tsx
    icon: string,
    title: string,
    // Shown as is: "2023", "2023–2025"
    period: string,
    summary: string,
    bullets: string[],
    // Topic names; each links to its skill page when the Skill Shop has it
    tags: string[]
}
