// Placeholder for a profile photo: a plain color fill until a real image is added
interface ProfilePhotoProps {
    className?: string;
}
export default function ProfilePhoto({ className = "" }: ProfilePhotoProps) {
    return (
        <span
            className={"inline-block shrink-0 rounded-full bg-default " + className}
            aria-hidden="true"
        ></span>
    );
}
