import { IoOptions } from "react-icons/io5";

// Navbar control that opens the skills filters drawer, below lg only
export default function FiltersButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="lg:hidden flex flex-row items-center gap-1.5"
            aria-label="Open filters"
        >
            <IoOptions className="size-5" aria-hidden="true" />
            filters
        </button>
    );
}
