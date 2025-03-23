import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { fetchEnvironmentVariables } from "../lib/featureFlagsFromDatabase";

interface FEATURE_FLAGS_FROM_DATABASE {
    FEATURE_FLAG_SANDBOX: boolean;
    FEATURE_FLAG_SNAKE: boolean;
}
interface FeatureFlagsContextType {
    flags: FEATURE_FLAGS_FROM_DATABASE;
}
const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(
    undefined
);
interface FeatureFlagsProps {
    children: ReactNode;
}
export const FeatureFlagsProvider: React.FC<FeatureFlagsProps> = ({
    children,
}) => {
    const [flags, setFlags] = useState<FEATURE_FLAGS_FROM_DATABASE>({
        FEATURE_FLAG_SANDBOX: false,
        FEATURE_FLAG_SNAKE: false,
    });
    useEffect(() => {
        // fetch flags from database
        fetchEnvironmentVariables().then((result) => {
            setFlags({
                FEATURE_FLAG_SANDBOX: result.FEATURE_FLAG_SANDBOX,
                FEATURE_FLAG_SNAKE: result.FEATURE_FLAG_SNAKE,
            });
        });
    }, []);
    return (
        <FeatureFlagsContext.Provider value={{ flags }}>
            {children}
        </FeatureFlagsContext.Provider>
    );
};
export const useFeatureFlagsContext = (): FeatureFlagsContextType => {
    const context = useContext(FeatureFlagsContext);
    if (!context) {
        throw new Error(
            "useFeatureFlagsContext must be used within a FeatureFlagsProvider"
        );
    }
    return context;
};
