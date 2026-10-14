import { ReactNode } from "react";
// The components of a library section, one under the other
export default function PreviewGrid({ children }: { children: ReactNode }) {
    return <ul className="flex flex-col gap-10">{children}</ul>;
}
