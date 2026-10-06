import { ReactNode } from "react";
import ProductImagePlaceholder from "../../product/productImagePlaceholder";

interface ProductItemLayoutProps {
    title: ReactNode;
    description: ReactNode;
    // Optional small label above the title, e.g. the parent product's name
    badge?: ReactNode;
    // Optional highlighted label, e.g. "In cart"; stays fully visible when the item is muted
    status?: ReactNode;
    // Muted: dims the image and text, e.g. for items already in the cart
    muted?: boolean;
    // Condensed: one line with a small image and the title only
    condensed?: boolean;
    className?: string;
    imageLabel?: string;
}

// Shared by the product list item and its loading skeleton so both stay in sync
export default function ProductItemLayout({
    title,
    description,
    badge,
    status,
    muted = false,
    condensed = false,
    className = "",
    imageLabel,
}: ProductItemLayoutProps) {
    const dim = muted ? "opacity-50" : "";
    const statusBadge = status && (
        <span className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium bg-blue-500/15 text-blue-500">
            {status}
        </span>
    );
    if (condensed) {
        return (
            <div className={"flex flex-row items-center gap-3 " + className}>
                <ProductImagePlaceholder className={"size-8 rounded " + dim} label={imageLabel} />
                <div className={"min-w-0 truncate font-medium text-default " + dim} aria-label="Product name">
                    {title}
                </div>
                {statusBadge}
            </div>
        );
    }
    return (
        <div className={"flex flex-row items-center gap-4 " + className}>
            <ProductImagePlaceholder className={"size-20 " + dim} label={imageLabel} />
            <div className="flex flex-col items-start gap-1 min-w-0 text-default">
                {(badge || status) && (
                    <div className="flex flex-row flex-wrap items-center gap-1 max-w-full">
                        {badge && (
                            <span className={"max-w-full truncate rounded-full px-2 py-0.5 text-xs bg-default/10 text-default/70 " + dim}>
                                {badge}
                            </span>
                        )}
                        {statusBadge}
                    </div>
                )}
                <div className={"text-lg font-semibold leading-tight " + dim} aria-label="Product name">
                    {title}
                </div>
                <div className={"text-sm leading-snug text-default/60 line-clamp-2 " + dim} aria-label="Product summary">
                    {description}
                </div>
            </div>
        </div>
    );
}
