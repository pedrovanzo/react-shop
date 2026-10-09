// Skill URLs use the skill name, percent-encoded so spaces, "/", "?", "#" and "%" are URL-safe
export function skillPath(name: string) {
    return `/skill/${encodeURIComponent(name)}`
}
