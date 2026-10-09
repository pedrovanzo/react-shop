import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoCheckmarkCircle } from "react-icons/io5";
import Modal from "../modal/modal";
import Button from "../button/button";
import LoadingSpinnerIcon from "../loading/spinnerIcon";

const REDIRECT_SECONDS = 5;

interface EquipModalProps {
    // What is being added, e.g. a skill name or "6 JS fundamentals skills"
    skillName: string;
    // True when skillName describes several skills (adjusts the wording)
    plural?: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

// One modal instance for both steps (confirm, then added) to avoid flicker between them
export default function EquipModal({ skillName, plural = false, onConfirm, onClose }: EquipModalProps) {
    const navigate = useNavigate();
    const [isAdded, setIsAdded] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

    useEffect(() => {
        if (!isAdded) return;
        const interval = setInterval(() => setSecondsLeft((seconds) => seconds - 1), 1000);
        return () => clearInterval(interval);
    }, [isAdded]);
    useEffect(() => {
        if (isAdded && secondsLeft <= 0) navigate("/build");
    }, [isAdded, secondsLeft, navigate]);

    function handleConfirm() {
        onConfirm();
        setIsAdded(true);
    }

    return (
        <Modal title={isAdded ? "Equipped" : "Equip"} onClose={onClose}>
            {isAdded ? (
                <>
                    <div className="flex flex-col items-center gap-3 py-2 text-center">
                        <IoCheckmarkCircle
                            className="size-16 text-blue-500 motion-safe:animate-pop-in"
                            aria-hidden="true"
                        />
                        <p className="text-lg motion-safe:animate-fade-up [animation-delay:150ms]">
                            <span className="font-semibold">{skillName}</span> {plural ? "are" : "is"} equipped in your build!
                        </p>
                    </div>
                    <div
                        className="flex flex-row items-center justify-center gap-3 text-sm text-default/70 motion-safe:animate-fade-up [animation-delay:300ms]"
                        aria-live="polite"
                    >
                        <LoadingSpinnerIcon variant="primary" />
                        Going to your build in {Math.max(secondsLeft, 0)}s
                    </div>
                    <div className="flex flex-row flex-wrap justify-end gap-2 motion-safe:animate-fade-up [animation-delay:300ms]">
                        <Button variant="soft" onClick={onClose}>
                            Keep browsing
                        </Button>
                        <Button variant="primary" className="p-2 leading-none" onClick={() => navigate("/build")}>
                            Go to build
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <p>
                        Equip <span className="font-semibold">{skillName}</span>?
                    </p>
                    <div className="flex flex-row flex-wrap justify-end gap-2">
                        <Button variant="soft" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" className="p-2 leading-none" onClick={handleConfirm}>
                            Equip
                        </Button>
                    </div>
                </>
            )}
        </Modal>
    );
}
