import { ComponentType } from "react";
import LoadingPreview from "./previews/loading";
import ListsPreview from "./previews/lists";
import NavigationPreview from "./previews/navigation";
import ModalsPreview from "./previews/modals";
import FeatureFlagsPreview from "./previews/featureFlags";
import ButtonsPreview from "./previews/buttons";
import ThemePreview from "./previews/theme";
import TimelinePreview from "./previews/timeline";
import TypographyPreview from "./previews/typography";
export interface LibrarySection {
    id: string;
    label: string;
    // Sections without a preview are placeholders to be built later
    preview?: ComponentType;
}
export const LIBRARY_SECTIONS: LibrarySection[] = [
    { id: "loading", label: "Loading", preview: LoadingPreview },
    { id: "lists", label: "Lists", preview: ListsPreview },
    { id: "navigation", label: "Navigation", preview: NavigationPreview },
    { id: "modals", label: "Modals", preview: ModalsPreview },
    { id: "feature-flags", label: "Feature flags", preview: FeatureFlagsPreview },
    { id: "buttons", label: "Buttons", preview: ButtonsPreview },
    { id: "theme", label: "Theme", preview: ThemePreview },
    { id: "timeline", label: "Timeline", preview: TimelinePreview },
    { id: "inputs", label: "Inputs" },
    { id: "forms", label: "Forms" },
    { id: "selects", label: "Selects" },
    { id: "checkboxes", label: "Checkboxes" },
    { id: "radios", label: "Radios" },
    { id: "switches", label: "Switches" },
    { id: "cards", label: "Cards" },
    { id: "tables", label: "Tables" },
    { id: "tabs", label: "Tabs" },
    { id: "accordions", label: "Accordions" },
    { id: "dropdowns", label: "Dropdowns" },
    { id: "drawers", label: "Drawers" },
    { id: "tooltips", label: "Tooltips" },
    { id: "toasts", label: "Toasts" },
    { id: "alerts", label: "Alerts" },
    { id: "badges", label: "Badges" },
    { id: "avatars", label: "Avatars" },
    { id: "breadcrumbs", label: "Breadcrumbs" },
    { id: "pagination", label: "Pagination" },
    { id: "progress", label: "Progress" },
    { id: "typography", label: "Typography", preview: TypographyPreview },
    { id: "icons", label: "Icons" },
];
