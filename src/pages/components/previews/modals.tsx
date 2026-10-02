import { useState } from "react";
import PreviewCard from "../../../components/library/previewCard";
import PreviewGrid from "../../../components/library/previewGrid";
import ContactModal from "../../../components/contact/contactModal";
import Button from "../../../components/button/button";
export default function ModalsPreview() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <PreviewGrid>
            <PreviewCard label="ContactModal (uses Modal)" source="components/contact/contactModal.tsx, components/modal/modal.tsx" usedIn="contact widget">
                <Button onClick={() => setIsOpen(true)}>Open modal</Button>
                {isOpen && <ContactModal onClose={() => setIsOpen(false)} />}
            </PreviewCard>
        </PreviewGrid>
    );
}
