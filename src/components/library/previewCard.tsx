import { ReactNode } from "react";
interface PreviewCardProps {
    label: string;
    source: string;
    usedIn: string;
    children: ReactNode;
}
export default function PreviewCard({ label, source, usedIn, children }: PreviewCardProps) {
    return (
        <li className="flex flex-col items-center justify-center gap-3 rounded-lg p-4 bg-default/5 text-center text-default">
            <div className="min-h-24 w-full flex items-center justify-center">{children}</div>
            <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">{label}</span>
                <code className="text-xs break-all">{source}</code>
                <span className="text-xs text-default/70">Used in: {usedIn}</span>
            </div>
        </li>
    );
}
