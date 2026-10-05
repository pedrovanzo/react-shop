import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoCheckmarkCircle } from "react-icons/io5";
import Modal from "../modal/modal";
import Button from "../button/button";
import LoadingSpinnerIcon from "../loading/spinnerIcon";

const REDIRECT_SECONDS = 5;

interface AddToCartModalProps {
    productName: string;
    onConfirm: () => void;
    onClose: () => void;
}

// One modal instance for both steps (confirm, then added) to avoid flicker between them
export default function AddToCartModal({ productName, onConfirm, onClose }: AddToCartModalProps) {
    const navigate = useNavigate();
    const [isAdded, setIsAdded] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

    useEffect(() => {
        if (!isAdded) return;
        const interval = setInterval(() => setSecondsLeft((seconds) => seconds - 1), 1000);
        return () => clearInterval(interval);
    }, [isAdded]);
    useEffect(() => {
        if (isAdded && secondsLeft <= 0) navigate("/cart");
    }, [isAdded, secondsLeft, navigate]);

    function handleConfirm() {
        onConfirm();
        setIsAdded(true);
    }

    return (
        <Modal title={isAdded ? "Added to cart" : "Add to cart"} onClose={onClose}>
            {isAdded ? (
                <>
                    <div className="flex flex-col items-center gap-3 py-2 text-center">
                        <IoCheckmarkCircle
                            className="size-16 text-blue-500 motion-safe:animate-pop-in"
                            aria-hidden="true"
                        />
                        <p className="text-lg motion-safe:animate-fade-up [animation-delay:150ms]">
                            <span className="font-semibold">{productName}</span> is in your cart!
                        </p>
                    </div>
                    <div
                        className="flex flex-row items-center justify-center gap-3 text-sm text-default/70 motion-safe:animate-fade-up [animation-delay:300ms]"
                        aria-live="polite"
                    >
                        <LoadingSpinnerIcon variant="primary" />
                        Going to your cart in {Math.max(secondsLeft, 0)}s
                    </div>
                    <div className="flex flex-row flex-wrap justify-end gap-2 motion-safe:animate-fade-up [animation-delay:300ms]">
                        <Button variant="soft" onClick={onClose}>
                            Keep browsing
                        </Button>
                        <Button variant="primary" className="p-2 leading-none" onClick={() => navigate("/cart")}>
                            Go to cart
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <p>
                        Add <span className="font-semibold">{productName}</span> to your cart?
                    </p>
                    <div className="flex flex-row flex-wrap justify-end gap-2">
                        <Button variant="soft" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" className="p-2 leading-none" onClick={handleConfirm}>
                            Add to cart
                        </Button>
                    </div>
                </>
            )}
        </Modal>
    );
}
