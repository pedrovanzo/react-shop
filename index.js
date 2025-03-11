function setFavicon(color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <path d="M20 20 H45 Q60 20 60 35 V50 L40 50 L60 75 H45 L25 50 V20 Z M60 40 H80 L85 55 H60 Z M65 55 A5 5 0 1 0 75 55 A5 5 0 1 0 65 55" fill="${color}" />
    </svg>
    `;
  // Create a data URL from the SVG
  const svgDataUrl = "data:image/svg+xml," + encodeURIComponent(svg);
  // Set the favicon to the newly generated SVG
  const favicon = document.getElementById("favicon");
  favicon?.setAttribute("href", svgDataUrl);
}
function updateFaviconBasedOnTheme() {
  const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (darkTheme) {
    // Set the favicon to a light color when dark theme is active
    setFavicon("#ffffff"); // Light color (white)
  } else {
    // Set the favicon to a dark color when light theme is active
    setFavicon("#000000"); // Dark color (black)
  }
}
// Call this function on page load
updateFaviconBasedOnTheme();
// Watch for theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateFaviconBasedOnTheme);
const [theme, setTheme] = useState(() => {
  const storedTheme = localStorage.getItem("theme");
  return (
    storedTheme ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
});
