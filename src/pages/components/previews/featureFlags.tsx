import PreviewCard from "../../../components/library/previewCard";
import PreviewGrid from "../../../components/library/previewGrid";
import { FeatureEnabled } from "../../../components/feature/featureEnabled";
import FeatureFlagsInfo from "../../../components/feature/featureFlagsInfo";
import { FEATURE_FLAG_DEFINITIONS, FEATURE_FLAGS, FeatureFlagName } from "../../../lib/featureFlags";
export default function FeatureFlagsPreview() {
    const flagNames = Object.keys(FEATURE_FLAG_DEFINITIONS) as FeatureFlagName[];
    return (
        <PreviewGrid>
            {flagNames.map((name) => (
                <PreviewCard
                    key={name}
                    label={`FeatureEnabled (featureFlag="${name}")`}
                    source="components/feature/featureEnabled.tsx"
                    usedIn="navbar"
                >
                    <div className="text-sm">
                        <FeatureEnabled featureFlag={name}>
                            <span>Visible: {FEATURE_FLAG_DEFINITIONS[name].envVar} is on</span>
                        </FeatureEnabled>
                        {!FEATURE_FLAGS[name] && (
                            <span className="text-default/50">
                                Hidden: {FEATURE_FLAG_DEFINITIONS[name].envVar} is off
                            </span>
                        )}
                    </div>
                </PreviewCard>
            ))}
            <PreviewCard label="FeatureFlagsInfo" source="components/feature/featureFlagsInfo.tsx" usedIn="options page">
                <div className="w-full text-left">
                    <FeatureFlagsInfo />
                </div>
            </PreviewCard>
        </PreviewGrid>
    );
}
