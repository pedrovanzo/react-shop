export interface CareerBullet {
    text: string,
    // Marks a Notable Work item
    notable?: boolean,
    // Work done on personal time (side projects), not for an employer
    personal?: boolean
}

export default interface CareerEntry {
    id: string,
    // Shown as is: "2024", "Nov 2021", "2017–2019"
    period: string,
    // Machine-readable start and end for <time>: "2024", "2021-11"
    start: string,
    end?: string,
    // Career phase labels, e.g. ["Design to Code"]; two when the period spans a change of phase
    phases?: string[],
    // Key in components/history/historyIcon.tsx
    icon: string,
    title: string,
    // One line under the title
    summary: string,
    bullets: CareerBullet[],
    // Topic names; each links to its skill page when the Skill Shop has it
    tags: string[]
}
