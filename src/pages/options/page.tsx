import Navbar from "../../components/navigation/navbar";
import ThemeSelector from "../../components/theme/themeSelector";
import FeatureFlagsInfo from "../../components/feature/featureFlagsInfo";
export default function Options() {
    return (
        <>
            <Navbar />
            <ThemeSelector />
            <br />
            <div className="w-60 bg-primary/15">
                <div className="w-full p-2 bg-primary"></div>
                <div className="p-2 text-default">Theme building</div>
            </div>
            <br />
            <div className="w-60 bg-primary/15">
                <div className="w-full p-2 bg-primary">
                    <div className="p-2 text-secondary">Theme building</div>
                </div>
            </div>
            <p className="text-default">
                Light and Dark mode changes between preset light and dark
                colors. System mode follows the operating system setting.
                <br />
                Colored Modes add different color on elements that are able to
                have an ordinal color attributed to (primary, secondary...)
            </p>
            <section className="mt-8 max-w-lg flex flex-col gap-4 text-default">
                <h2 className="text-xl font-semibold">Feature flags</h2>
                <FeatureFlagsInfo />
            </section>
        </>
    );
}
