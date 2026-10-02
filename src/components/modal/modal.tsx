import { ReactNode, useEffect, useId } from "react";
import Button from "../button/button";

interface ModalProps {
    title: string;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({ title, onClose, children }: ModalProps) {
    const titleId = useId();
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="w-full max-w-lg rounded-lg p-6 shadow-lg bg-contrast text-default flex flex-col gap-4"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex flex-row items-center justify-between">
                    <h2 id={titleId} className="text-xl font-semibold">
                        {title}
                    </h2>
                    <Button variant="text" onClick={onClose} aria-label={`Close ${title}`}>
                        close
                    </Button>
                </div>
                {children}
            </div>
        </div>
    );
}
