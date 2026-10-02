// Product URLs use the product name, percent-encoded so spaces, "/", "?", "#" and "%" are URL-safe
export function productPath(name: string) {
    return `/product/${encodeURIComponent(name)}`
}
