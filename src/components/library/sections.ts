import { ComponentType } from "react";
import LoadingPreview from "./previews/loading";
import ListsPreview from "./previews/lists";
import NavigationPreview from "./previews/navigation";
import ModalsPreview from "./previews/modals";
import ButtonsPreview from "./previews/buttons";
import ThemePreview from "./previews/theme";
import TimelinePreview from "./previews/timeline";
import TypographyPreview from "./previews/typography";

export interface LibrarySection {
    id: string;
    label: string;
    // One line under the section title
    description: string;
    preview: ComponentType;
}

export interface LibraryGroup {
    title: string;
    sections: LibrarySection[];
}

// The components library, shown in the options page and its side menu, group by group
export const LIBRARY_GROUPS: LibraryGroup[] = [
    {
        title: "Foundations",
        sections: [
            { id: "typography", label: "Typography", description: "The page header and the pattern-filled titles.", preview: TypographyPreview },
            { id: "theme", label: "Theme", description: "The pieces the theme pickers and the theme preview card are made of.", preview: ThemePreview },
        ],
    },
    {
        title: "Components",
        sections: [
            { id: "buttons", label: "Buttons", description: "The shared button in each of its variants.", preview: ButtonsPreview },
            { id: "lists", label: "Lists", description: "Skill list items, the parts they are made of and their loading placeholders.", preview: ListsPreview },
            { id: "navigation", label: "Navigation", description: "The navbar that sits on top of every page.", preview: NavigationPreview },
            { id: "modals", label: "Modals", description: "Dialogs for confirming, equipping and getting in touch.", preview: ModalsPreview },
            { id: "loading", label: "Loading", description: "Spinners and placeholders shown while content loads.", preview: LoadingPreview },
            { id: "timeline", label: "Timeline", description: "The horizontal timeline that walks through the history page.", preview: TimelinePreview },
        ],
    },
];

// Page ids get a prefix, keeping them apart from the options page's own section ids
export const librarySectionId = (id: string) => `library-${id}`;
