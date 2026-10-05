import { ReactNode } from "react";
import Modal from "./modal";
import Button from "../button/button";

interface ConfirmModalProps {
    title: string;
    message: ReactNode;
    confirmLabel?: string;
    // Leave out for an informational dialog with a single button
    cancelLabel?: string;
    onConfirm?: () => void;
    onClose: () => void;
}

// Replaces window.confirm and window.alert with the app's modal design
export default function ConfirmModal({
    title,
    message,
    confirmLabel = "OK",
    cancelLabel,
    onConfirm,
    onClose,
}: ConfirmModalProps) {
    function handleConfirm() {
        onConfirm?.();
        onClose();
    }
    return (
        <Modal title={title} onClose={onClose}>
            <p>{message}</p>
            <div className="flex flex-row flex-wrap justify-end gap-2">
                {cancelLabel && (
                    <Button variant="soft" onClick={onClose}>
                        {cancelLabel}
                    </Button>
                )}
                <Button variant="primary" className="p-2 leading-none" onClick={handleConfirm}>
                    {confirmLabel}
                </Button>
            </div>
        </Modal>
    );
}
