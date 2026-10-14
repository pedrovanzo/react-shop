import { LuFlag } from "react-icons/lu";
import { FeatureEnabled } from "./featureEnabled";

// Only rendered while FEATURE_FLAG_MENU is on: a live example of a flag hiding part of the UI
export default function FeatureFlagDemo() {
    return (
        <FeatureEnabled featureFlag="FEATURE_FLAG_MENU">
            <div className="flex flex-row items-start gap-3 rounded-md border border-dashed border-brand p-4 text-sm">
                <LuFlag className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                    <p className="font-semibold text-foreground">This is a feature flag demo</p>
                    <p className="text-muted-foreground">
                        This box is gated by a feature flag: it only shows while <code>FEATURE_FLAG_MENU</code> is on.
                        Set it to <code>false</code> in <code>.env</code> and restart the dev server, and it's gone
                        without touching any code.
                    </p>
                </div>
            </div>
        </FeatureEnabled>
    );
}
