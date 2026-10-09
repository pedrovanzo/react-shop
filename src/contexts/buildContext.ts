import { createContext, useContext } from "react";
export interface BuildSkill {
    skillName: string;
}
interface BuildContextType {
    build: BuildSkill[];
    setBuild: React.Dispatch<React.SetStateAction<BuildSkill[]>>;
}
export const BuildContext = createContext<BuildContextType | undefined>(undefined);
export const useBuild = (): BuildContextType => {
    const context = useContext(BuildContext);
    if (!context) {
        throw new Error("useBuild must be used within a BuildProvider");
    }
    return context;
};
