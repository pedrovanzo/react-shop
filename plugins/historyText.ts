import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

// Plain-text versions of the history page for AI readers and crawlers that don't run JavaScript.
// Built from the same data files as the page: /history.md (the page as Markdown) and /llms.txt (the index).

interface Bullet { text: string, notable?: boolean, personal?: boolean }
interface Entry { period: string, phases?: string[], title: string, summary: string, bullets: Bullet[], tags: string[] }
interface Highlight { title: string, period: string, summary: string, bullets: string[], tags: string[] }
interface HistoryPage { headline: string, highlightsIntro: string, highlights: Highlight[], lessons: string[] }

function readJson<T>(path: string): T {
    return JSON.parse(readFileSync(fileURLToPath(new URL(path, import.meta.url)), "utf8"));
}

interface Entity { name: string, url: string }

// "{four portals|agazeta,hz}" becomes "four portals ([A Gazeta](url), [HZ](url))"
function expandGroups(text: string) {
    const entities = readJson<Record<string, Entity>>("../src/data/entities.json");
    return text.replace(/\{([^|}]+)\|([a-z0-9,-]+)\}/g, (_, label: string, ids: string) =>
        `${label} (${ids.split(",").map((id) => entities[id]).filter(Boolean)
            .map((entity) => `[${entity.name}](${entity.url})`).join(", ")})`);
}

function topics(tags: string[]) {
    return tags.length > 0 ? `Topics: ${tags.join(", ")}\n` : "";
}

export function historyMarkdown() {
    const entries = readJson<Entry[]>("../src/data/history.json");
    const page = readJson<HistoryPage>("../src/data/historyPage.json");
    const highlights = page.highlights.map((highlight) =>
        `### ${highlight.title} (${highlight.period})\n\n${highlight.summary}\n\n` +
        highlight.bullets.map((bullet) => `- ${bullet}`).join("\n") + "\n\n" + topics(highlight.tags));
    const timeline = entries.map((entry) => {
        const phase = entry.phases ? ` (${entry.phases.join(", then ")})` : "";
        const bullets = entry.bullets.map((bullet) =>
            `- ${bullet.notable ? "Notable: " : ""}${bullet.text}${bullet.personal ? " (side project)" : ""}`);
        return `### ${entry.period}${phase}: ${entry.title}\n\n${entry.summary}\n\n${bullets.join("\n")}\n\n${topics(entry.tags)}`;
    });
    return [
        "# History",
        page.headline,
        "## Highlights",
        page.highlightsIntro,
        ...highlights,
        "## Timeline (newest first)",
        ...timeline,
        "## Lessons",
        page.lessons.map((lesson) => `- ${lesson}`).join("\n"),
    ].map(expandGroups).join("\n\n").replace(/\n{3,}/g, "\n\n") + "\n";
}

export function llmsTxt() {
    const page = readJson<HistoryPage>("../src/data/historyPage.json");
    return [
        "# Skill Shop",
        `> A showcase of the topics covered over a career. ${page.headline}`,
        "## Pages",
        "- [History](/history.md): highlights, a year-by-year timeline and lessons, as Markdown",
    ].join("\n\n") + "\n";
}

const FILES: Record<string, () => string> = {
    "history.md": historyMarkdown,
    "llms.txt": llmsTxt,
};

export default function historyText(): Plugin {
    return {
        name: "history-text",
        // Dev: answer the two paths before the app's fallback to index.html
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const name = req.url?.split("?")[0].replace(/^\//, "") ?? "";
                const build = FILES[name];
                if (!build) return next();
                res.setHeader("Content-Type", "text/plain; charset=utf-8");
                res.end(build());
            });
        },
        // Build: write them to the output root, next to index.html
        generateBundle() {
            Object.entries(FILES).forEach(([fileName, build]) => {
                this.emitFile({ type: "asset", fileName, source: build() });
            });
        },
    };
}
