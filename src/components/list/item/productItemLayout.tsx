import { ReactNode } from "react";
import ProductImagePlaceholder from "../../product/productImagePlaceholder";

interface ProductItemLayoutProps {
    title: ReactNode;
    description: ReactNode;
    // Optional small label above the title, e.g. the parent product's name
    badge?: ReactNode;
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
    condensed = false,
    className = "",
    imageLabel,
}: ProductItemLayoutProps) {
    if (condensed) {
        return (
            <div className={"flex flex-row items-center gap-3 " + className}>
                <ProductImagePlaceholder className="size-8 rounded" label={imageLabel} />
                <div className="min-w-0 truncate font-medium text-default" aria-label="Product name">
                    {title}
                </div>
            </div>
        );
    }
    return (
        <div className={"flex flex-row items-center gap-4 " + className}>
            <ProductImagePlaceholder className="size-20" label={imageLabel} />
            <div className="flex flex-col items-start gap-1 min-w-0 text-default">
                {badge && (
                    <span className="max-w-full truncate rounded-full px-2 py-0.5 text-xs bg-default/10 text-default/70">
                        {badge}
                    </span>
                )}
                <div className="text-lg font-semibold leading-tight" aria-label="Product name">
                    {title}
                </div>
                <div className="text-sm leading-snug text-default/60 line-clamp-2" aria-label="Product summary">
                    {description}
                </div>
            </div>
        </div>
    );
}
