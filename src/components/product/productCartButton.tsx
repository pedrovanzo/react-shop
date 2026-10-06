import { IoCart, IoCartOutline, IoTrashOutline } from "react-icons/io5";

interface ProductCartButtonProps {
    productName: string;
    inCart: boolean;
    onAdd: () => void;
    onRemove: () => void;
}

// Cart action for a product row: add when not in the cart, remove when it is
export default function ProductCartButton({ productName, inCart, onAdd, onRemove }: ProductCartButtonProps) {
    if (inCart) {
        // In cart: blue filled cart; on hover it flips into a red trash icon
        return (
            <button
                type="button"
                onClick={onRemove}
                aria-label={`Remove ${productName} from cart`}
                title="Remove from cart"
                className="group shrink-0 p-2 text-blue-500 transition-colors duration-200 hover:text-red-500"
            >
                {/*
                  Flip swap: the cart turns edge-on (90deg on the Y axis), then the trash turns in from -90deg.
                  Each half takes 80ms; the delays chain them in both directions so the swap happens mid-turn.
                */}
                <span className="relative block size-6">
                    <IoCart
                        className="absolute inset-0 size-6 transition-transform duration-[80ms] ease-in delay-[80ms] group-hover:delay-0 group-hover:[transform:rotateY(90deg)] motion-reduce:transition-none"
                        aria-hidden="true"
                    />
                    <IoTrashOutline
                        className="absolute inset-0 size-6 [transform:rotateY(-90deg)] transition-transform duration-[80ms] ease-out group-hover:delay-[80ms] group-hover:[transform:rotateY(0deg)] motion-reduce:transition-none"
                        aria-hidden="true"
                    />
                </span>
            </button>
        );
    }
    return (
        <button
            type="button"
            onClick={onAdd}
            aria-label={`Add ${productName} to cart`}
            title="Add to cart"
            className="group shrink-0 p-2 text-default/60 transition-colors duration-200 hover:text-blue-500"
        >
            {/*
              Half shake in two layers:
              inner: quick nudge to -8deg and back (animation, ends at 0);
              outer: after the nudge, tilts to 12deg and holds (transition),
              then transitions back to 0 smoothly when the hover ends.
            */}
            <span className="block origin-bottom transition-[rotate] duration-150 ease-out motion-safe:group-hover:rotate-12 group-hover:delay-[120ms] group-hover:duration-100">
                <span className="block origin-bottom motion-safe:group-hover:animate-cart-nudge">
                    <IoCartOutline className="size-6 group-hover:hidden" aria-hidden="true" />
                    <IoCart className="size-6 hidden group-hover:block" aria-hidden="true" />
                </span>
            </span>
        </button>
    );
}
