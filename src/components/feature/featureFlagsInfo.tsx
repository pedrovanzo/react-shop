import { FEATURE_FLAG_DEFINITIONS, FEATURE_FLAGS, FeatureFlagName } from "../../lib/featureFlags";

const flagNames = Object.keys(FEATURE_FLAG_DEFINITIONS) as FeatureFlagName[];

export default function FeatureFlagsInfo() {
    return (
        <div className="flex flex-col gap-4 text-default">
            <ul className="flex flex-col gap-2">
                {flagNames.map((name) => {
                    const definition = FEATURE_FLAG_DEFINITIONS[name];
                    return (
                        <li
                            key={name}
                            className="flex flex-row items-start justify-between gap-4 rounded-md p-2 bg-default/5"
                        >
                            <div className="flex flex-col gap-1">
                                <code className="text-sm">{definition.envVar}</code>
                                <span className="text-sm text-default/70">
                                    {definition.description}. Default:{" "}
                                    {definition.defaultEnabled ? "on" : "off"}
                                </span>
                            </div>
                            <span className="text-sm font-semibold">
                                {FEATURE_FLAGS[name] ? "on" : "off"}
                            </span>
                        </li>
                    );
                })}
            </ul>
            <div className="flex flex-col gap-2 text-sm">
                <h3 className="font-semibold text-base">How to change a flag</h3>
                <p>
                    Add the flag to the <code>.env</code> file at the project root,
                    set to <code>true</code> or <code>false</code>:
                </p>
                <pre className="rounded-md p-2 bg-default/5 overflow-x-auto">
                    {flagNames
                        .map((name) => `${FEATURE_FLAG_DEFINITIONS[name].envVar}=true`)
                        .join("\n")}
                </pre>
                <p>
                    Then restart the dev server. Flags are read when it starts. A
                    flag missing from <code>.env</code> uses its default.
                </p>
            </div>
        </div>
    );
}
