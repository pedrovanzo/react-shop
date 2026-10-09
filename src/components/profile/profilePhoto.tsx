import { Ref } from "react";

// Placeholder for a profile photo: a plain color fill until a real image is added
interface ProfilePhotoProps {
    className?: string;
    ref?: Ref<HTMLSpanElement>;
}
export default function ProfilePhoto({ className = "", ref }: ProfilePhotoProps) {
    return (
        <span
            ref={ref}
            className={"inline-block shrink-0 rounded-full bg-default " + className}
            aria-hidden="true"
        ></span>
    );
}
