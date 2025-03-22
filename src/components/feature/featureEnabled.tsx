import { FEATURE_FLAGS, FeatureFlagName } from "../../lib/featureFlags";
import { ReactNode } from "react";
export function FeatureEnabled({
    featureFlag,
    children,
}: {
    featureFlag: FeatureFlagName;
    children: ReactNode;
}) {
    return FEATURE_FLAGS[featureFlag] ? children : null;
}
