import { FaRegFileImage } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface SkillImagePlaceholderProps {
    // Resize by passing a size class, e.g. "size-40"; the icon scales with it
    className?: string;
    label?: string;
}

export default function SkillImagePlaceholder({
    className,
    label,
}: SkillImagePlaceholderProps) {
    return (
        <div
            className={twMerge(
                "flex shrink-0 items-center justify-center size-24 rounded-md shadow bg-default/5",
                className
            )}
            aria-label={label}
        >
            {/* 58% matches the original size-14 icon inside the size-24 box */}
            <FaRegFileImage className="rotate-345 size-[58%] text-default/20" />
        </div>
    );
}
