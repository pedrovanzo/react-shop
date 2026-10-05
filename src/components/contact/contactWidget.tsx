import { useEffect, useRef, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import ContactModal from "./contactModal";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";
const CORNER_STORAGE_KEY = "react-shop-contact-widget-corner";
const CORNERS: Corner[] = ["top-left", "top-right", "bottom-left", "bottom-right"];
const cornerClasses: Record<Corner, string> = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
};
// Pointer movement (px) below this counts as a click, not a drag
const DRAG_THRESHOLD = 5;

function getStoredCorner(): Corner {
    const stored = localStorage.getItem(CORNER_STORAGE_KEY);
    return CORNERS.includes(stored as Corner) ? (stored as Corner) : "bottom-right";
}

export default function ContactWidget() {
    const [corner, setCorner] = useState<Corner>(getStoredCorner);
    const [isOpen, setIsOpen] = useState(false);
    const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);
    const dragStart = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);
    const wasDragged = useRef(false);

    useEffect(() => {
        localStorage.setItem(CORNER_STORAGE_KEY, corner);
    }, [corner]);

    function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.setPointerCapture(event.pointerId);
        dragStart.current = {
            x: event.clientX,
            y: event.clientY,
            offsetX: event.clientX - rect.left,
            offsetY: event.clientY - rect.top,
        };
        wasDragged.current = false;
    }
    function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
        const start = dragStart.current;
        if (!start) return;
        const distance = Math.hypot(event.clientX - start.x, event.clientY - start.y);
        if (!wasDragged.current && distance < DRAG_THRESHOLD) return;
        wasDragged.current = true;
        setDragPosition({
            x: event.clientX - start.offsetX,
            y: event.clientY - start.offsetY,
        });
    }
    function handlePointerUp(event: React.PointerEvent<HTMLButtonElement>) {
        event.currentTarget.releasePointerCapture(event.pointerId);
        dragStart.current = null;
        if (!wasDragged.current) return;
        // Snap to the corner closest to where the widget was dropped
        const isTop = event.clientY < window.innerHeight / 2;
        const isLeft = event.clientX < window.innerWidth / 2;
        setCorner(`${isTop ? "top" : "bottom"}-${isLeft ? "left" : "right"}`);
        setDragPosition(null);
    }
    function handleClick() {
        if (wasDragged.current) {
            wasDragged.current = false;
            return;
        }
        setIsOpen(true);
    }

    return (
        <>
            <button
                type="button"
                aria-label="Open contact"
                title="Contact (drag to move)"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onClick={handleClick}
                style={dragPosition ? { left: dragPosition.x, top: dragPosition.y } : undefined}
                className={
                    "fixed z-50 flex items-center justify-center size-10 rounded-full shadow-lg touch-none select-none bg-default text-contrast " +
                    (dragPosition ? "cursor-grabbing" : cornerClasses[corner])
                }
            >
                <FaAddressCard className="size-4" />
            </button>
            {isOpen && <ContactModal onClose={() => setIsOpen(false)} />}
        </>
    );
}
