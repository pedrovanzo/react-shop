import PreviewCard from "../../../components/library/previewCard";
import PreviewGrid from "../../../components/library/previewGrid";
import LoadingSpinner from "../../../components/loading/spinner";
import LoadingSpinnerIcon from "../../../components/loading/spinnerIcon";
import LoadingDash from "../../../components/loading/dash";
import LoadingProductItemOfList from "../../../components/list/item/loadingProduct";
export default function LoadingPreview() {
    return (
        <PreviewGrid>
            <PreviewCard label="LoadingSpinner (default text)" source="components/loading/spinner.tsx" usedIn="product page, full-screen document loading">
                <LoadingSpinner />
            </PreviewCard>
            <PreviewCard label='LoadingSpinner (text="loading user")' source="components/loading/spinner.tsx" usedIn="product page, before the Add to cart button">
                <LoadingSpinner text="loading user" />
            </PreviewCard>
            <PreviewCard label="LoadingSpinnerIcon (variant default, size default)" source="components/loading/spinnerIcon.tsx" usedIn="unused">
                <LoadingSpinnerIcon />
            </PreviewCard>
            <PreviewCard label="LoadingSpinnerIcon (variant primary, size default)" source="components/loading/spinnerIcon.tsx" usedIn="unused">
                <LoadingSpinnerIcon variant="primary" />
            </PreviewCard>
            <PreviewCard label="LoadingSpinnerIcon (variant default, size large)" source="components/loading/spinnerIcon.tsx" usedIn="unused">
                <LoadingSpinnerIcon size="large" />
            </PreviewCard>
            <PreviewCard label="LoadingSpinnerIcon (variant primary, size large)" source="components/loading/spinnerIcon.tsx" usedIn="unused">
                <LoadingSpinnerIcon variant="primary" size="large" />
            </PreviewCard>
            <PreviewCard label='LoadingDash (classes="w-40")' source="components/loading/dash.tsx" usedIn="unused">
                <LoadingDash classes="w-40" />
            </PreviewCard>
            <PreviewCard label="LoadingProductItemOfList" source="components/list/item/loadingProduct.tsx" usedIn="products list skeleton">
                <LoadingProductItemOfList />
            </PreviewCard>
        </PreviewGrid>
    );
}
