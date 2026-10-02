import { ReactNode } from "react";
export default function PreviewGrid({ children }: { children: ReactNode }) {
    return <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</ul>;
}
