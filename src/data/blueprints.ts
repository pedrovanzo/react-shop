// Blueprints: the roles Pedro can play in a company, each made of existing skills.
// Mock content: names are final; descriptions, topic picks and goals are placeholders to shape the build page.
export interface Blueprint {
    id: string;
    name: string;
    description: string;
    // Topics (skill categories) the role draws on; shown under "Skills" on the card, as it reads better
    topics: string[];
    // What can be achieved with this build (not shown on the cards for now)
    goals: string[];
}

export const BLUEPRINTS: Blueprint[] = [
    {
        id: "frontend-engineer",
        name: "Frontend Engineer",
        description: "Mock description. Builds fast, accessible interfaces in React and TypeScript.",
        topics: ["JS fundamentals", "React", "Styling", "Browser and performance", "Languages", "Data structures"],
        goals: [
            "Mock goal. Ship a design system the whole team builds on.",
            "Mock goal. Cut page load time with lazy loading and leaner bundles.",
        ],
    },
    {
        id: "ai-assisted-developer",
        name: "AI-assisted Developer",
        description: "Mock description. Ships with AI agents end to end, with a human reviewing every merge.",
        topics: ["Engineering practices", "Git operations", "Languages"],
        goals: [
            "Mock goal. Turn specs and tickets into reviewed code with agent loops.",
            "Mock goal. Set up AI skills and project instructions the whole team can reuse.",
        ],
    },
    {
        id: "product-engineer",
        name: "Product Engineer",
        description: "Mock description. Owns outcomes: decides what to build, ships it and measures it.",
        topics: ["Engineering practices", "Browser and performance", "Git operations", "This project"],
        goals: [
            "Mock goal. Take a feature from idea to launch behind a flag.",
            "Mock goal. Run experiments and roll back safely when they miss.",
        ],
    },
];
