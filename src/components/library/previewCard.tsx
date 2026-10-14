import { ReactNode } from "react";
interface PreviewCardProps {
    label: string;
    source: string;
    usedIn: string;
    children: ReactNode;
}
// One component in the library, docs style: its name, where it lives and is used, then a roomy preview area
export default function PreviewCard({ label, source, usedIn, children }: PreviewCardProps) {
    return (
        <li className="flex flex-col gap-3 text-foreground">
            <div className="flex flex-col gap-1">
                <h4 className="text-base font-semibold">{label}</h4>
                <p className="text-sm text-muted-foreground">
                    <code className="text-xs break-all">{source}</code>
                    <span aria-hidden="true"> · </span>
                    Used in: {usedIn}
                </p>
            </div>
            <div className="flex min-h-56 items-center justify-center rounded-xl border border-border bg-background p-4 sm:p-8">
                <div className="flex w-full max-w-xl items-center justify-center">{children}</div>
            </div>
        </li>
    );
}
