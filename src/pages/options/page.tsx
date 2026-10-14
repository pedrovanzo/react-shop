import { LuFlag, LuLayoutGrid, LuPalette } from "react-icons/lu";
import Navbar from "../../components/navigation/navbar";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";
import FeatureFlagsInfo from "../../components/feature/featureFlagsInfo";
import FeatureFlagDemo from "../../components/feature/featureFlagDemo";
import { SettingsGroup, SettingsSection } from "../../components/options/settingsSection";
import { ColorModePicker, ThemeModePicker } from "../../components/options/themePickers";
import ThemePreviewCard from "../../components/options/themePreviewCard";
import SettingsNav, { SettingsNavItem } from "../../components/options/settingsNav";
import { LIBRARY_GROUPS, librarySectionId } from "../../components/library/sections";

const SECTIONS: SettingsNavItem[] = [
    { id: "appearance", label: "Appearance", Icon: LuPalette },
    { id: "feature-flags", label: "Feature flags", Icon: LuFlag },
    {
        id: "components-library",
        label: "Components library",
        Icon: LuLayoutGrid,
        groups: LIBRARY_GROUPS.map((group) => ({
            title: group.title,
            items: group.sections.map((section) => ({ id: librarySectionId(section.id), label: section.label })),
        })),
    },
];

export default function Options() {
    return (
        <>
            <Navbar />
            <ThreeColumnLayout left={
                    // The menu scrolls on its own, as tall as the screen below the navbar
                    <div className="max-h-[calc(100dvh-var(--navbar-height,0px)-2rem)] overflow-y-auto overscroll-contain pl-2 pr-1">
                        <SettingsNav label="Options sections" sections={SECTIONS} />
                    </div>
                }>
                <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 text-foreground">
                    <SettingsSection id="appearance" title="Appearance">
                        <SettingsGroup
                            title="Theme mode"
                            description="Choose how the shop looks. Sync with system follows your operating system's light or dark setting."
                        >
                            <ThemeModePicker />
                        </SettingsGroup>
                        <SettingsGroup
                            title="Color mode"
                            description="Repaint everything in shades of one color: the lightest for backgrounds, the darkest for text, a mid shade for accents."
                        >
                            <ColorModePicker />
                        </SettingsGroup>
                        <SettingsGroup title="Preview" description="The current theme on a few components. Try them.">
                            <ThemePreviewCard />
                        </SettingsGroup>
                    </SettingsSection>
                    <SettingsSection id="feature-flags" title="Feature flags">
                        <FeatureFlagDemo />
                        <FeatureFlagsInfo />
                    </SettingsSection>
                    <SettingsSection id="components-library" title="Components library">
                        <p className="text-sm text-muted-foreground">
                            Every component this app is built from, each with a live preview, where its source lives
                            and which pages use it.
                        </p>
                        {LIBRARY_GROUPS.map((group) => (
                            <div key={group.title} className="flex flex-col gap-16">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                                    {group.title}
                                </p>
                                {group.sections.map(({ id, label, description, preview: Preview }) => (
                                    // Docs style: a large title and a line about it, then each component with its preview
                                    <section
                                        key={id}
                                        id={librarySectionId(id)}
                                        aria-labelledby={`${librarySectionId(id)}-title`}
                                        className="flex flex-col gap-8 scroll-mt-[calc(var(--navbar-height,0px)+1rem)]"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <h3
                                                id={`${librarySectionId(id)}-title`}
                                                className="text-3xl font-bold tracking-tight"
                                            >
                                                {label}
                                            </h3>
                                            <p className="text-lg text-muted-foreground">{description}</p>
                                        </div>
                                        <Preview />
                                    </section>
                                ))}
                            </div>
                        ))}
                    </SettingsSection>
                </div>
            </ThreeColumnLayout>
        </>
    );
}
