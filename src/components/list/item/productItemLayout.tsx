import { ReactNode } from "react";

interface ProductItemLayoutProps {
    image: ReactNode;
    name: ReactNode;
    price: ReactNode;
    delivery: ReactNode;
    className?: string;
    imageLabel?: string;
}

// Shared by the product list item and its loading skeleton so both stay in sync
export default function ProductItemLayout({
    image,
    name,
    price,
    delivery,
    className = "",
    imageLabel,
}: ProductItemLayoutProps) {
    return (
        <div className={"flex flex-row gap-2 " + className}>
            <div
                className="flex items-center justify-center size-24 rounded-md shadow bg-default/5"
                aria-label={imageLabel}
            >
                {image}
            </div>
            <div className="flex flex-col gap-1 justify-center text-default">
                <div className="text-sm leading-none" aria-label="Product Name">
                    {name}
                </div>
                <div
                    className="text-2xl leading-none italic font-semibold"
                    aria-label="Product Price"
                >
                    {price}
                </div>
                <div
                    className="flex flex-row gap-2 items-center text-sm leading-none"
                    aria-label="Delivery mode"
                >
                    {delivery}
                </div>
            </div>
        </div>
    );
}
