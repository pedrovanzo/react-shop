import { useEffect, useState, ReactNode } from "react";
import { BuildContext, BuildSkill } from "./buildContext";
const BUILD_STORAGE_KEY = "react-shop-build";
// Before skills and builds, the same list was saved as a cart of { productName } entries
const LEGACY_CART_STORAGE_KEY = "react-shop-cart";

function loadBuild(): BuildSkill[] {
    const saved = localStorage.getItem(BUILD_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    const legacy = localStorage.getItem(LEGACY_CART_STORAGE_KEY);
    if (!legacy) return [];
    return (JSON.parse(legacy) as { productName: string }[]).map((item) => ({ skillName: item.productName }));
}
interface BuildProviderProps {
    children: ReactNode;
}
export const BuildProvider: React.FC<BuildProviderProps> = ({ children }) => {
    const [build, setBuild] = useState<BuildSkill[]>(loadBuild);
    // Single place where the build is persisted; the legacy cart goes once its contents are saved here
    useEffect(() => {
        localStorage.setItem(BUILD_STORAGE_KEY, JSON.stringify(build));
        localStorage.removeItem(LEGACY_CART_STORAGE_KEY);
    }, [build]);
    return (
        <BuildContext.Provider value={{ build, setBuild }}>
            {children}
        </BuildContext.Provider>
    );
};
