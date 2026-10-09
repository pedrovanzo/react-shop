export type InsightType = "explored" | "gotcha" | "in-production" | "opinion"
export interface Insight {
    type: InsightType,
    title: string,
    body: string
}
// A place in this project where the concept can be seen in use
export interface ProjectExample {
    label: string,
    path: string,
    // App route, when the example can be opened in the app
    route?: string
}
export interface Reference {
    title: string,
    author?: string,
    url: string
}
export default interface SkillInterface {
    id: string,
    name: string,
    category: string,
    // Short top layer: shows the concept is known, keeps the reader engaged
    summary: string,
    // When I first came in contact with the concept, as YYYY-MM
    firstContact: string,
    // Child skills point to their parent's id
    parentId?: string,
    // Content not yet reviewed and rewritten by its author
    draft?: boolean,
    insights: Insight[],
    inProject?: ProjectExample[],
    references?: Reference[]
}
