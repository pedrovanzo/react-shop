// The background keeps the icon visible on both light and dark browser tabs
export function setFavicon(color: string, background: string) {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" rx="20" fill="${background}" />
      <path d="M20 20 H45 Q60 20 60 35 V50 L40 50 L60 75 H45 L25 50 V20 Z M60 40 H80 L85 55 H60 Z M65 55 A5 5 0 1 0 75 55 A5 5 0 1 0 65 55" fill="${color}" />
    </svg>
    `
    const svgDataUrl = "data:image/svg+xml," + encodeURIComponent(svg)
    document.getElementById("favicon")?.setAttribute("href", svgDataUrl)
}
