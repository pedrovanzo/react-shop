import { createElement } from "react";
import { IconType } from "react-icons";
import {
    LuAudioLines, LuBriefcase, LuBuilding2, LuCircleDot, LuCode, LuFlaskConical, LuGraduationCap, LuLaptop,
    LuMegaphone, LuNewspaper, LuPackage, LuPalette, LuRocket, LuServer, LuSparkles, LuSprout, LuUsers, LuWorkflow,
} from "react-icons/lu";

// The data files name icons by key, since JSON can't hold components
const HISTORY_ICONS: Record<string, IconType> = {
    audio: LuAudioLines,
    briefcase: LuBriefcase,
    building: LuBuilding2,
    code: LuCode,
    graduation: LuGraduationCap,
    lab: LuFlaskConical,
    laptop: LuLaptop,
    megaphone: LuMegaphone,
    newspaper: LuNewspaper,
    package: LuPackage,
    palette: LuPalette,
    rocket: LuRocket,
    server: LuServer,
    sparkles: LuSparkles,
    sprout: LuSprout,
    users: LuUsers,
    workflow: LuWorkflow,
};

// createElement, so the icon type comes from the static map rather than a component made during render
export default function HistoryIcon({ name, className }: { name: string; className?: string }) {
    return createElement(HISTORY_ICONS[name] ?? LuCircleDot, { className, "aria-hidden": true });
}
