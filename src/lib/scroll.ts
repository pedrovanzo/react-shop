// Home renders the skills list below the hero, in a section with this id
export const SKILL_SHOP_SECTION_ID = "skills";

// Smooth scrolling unless the user asked the system for less motion
export function scrollBehavior(): ScrollBehavior {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

// Scrolls to the skills section when the current page has one.
// Returns false when there is none, so links can fall back to the skills page.
export function scrollToSkillShop() {
    const section = document.getElementById(SKILL_SHOP_SECTION_ID);
    if (!section) return false;
    section.scrollIntoView({ behavior: scrollBehavior() });
    return true;
}
