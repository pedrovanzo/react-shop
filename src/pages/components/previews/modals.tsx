import { useState } from "react";
import PreviewCard from "../../../components/library/previewCard";
import PreviewGrid from "../../../components/library/previewGrid";
import ContactModal from "../../../components/contact/contactModal";
import EquipModal from "../../../components/build/equipModal";
import ConfirmModal from "../../../components/modal/confirmModal";
import Button from "../../../components/button/button";
export default function ModalsPreview() {
    const [openModal, setOpenModal] = useState<"contact" | "equip" | "confirm" | null>(null);
    const close = () => setOpenModal(null);
    return (
        <>
        <PreviewGrid>
            <PreviewCard label="ContactModal (uses Modal)" source="components/contact/contactModal.tsx, components/modal/modal.tsx" usedIn="contact widget">
                <Button onClick={() => setOpenModal("contact")}>Open modal</Button>
            </PreviewCard>
            <PreviewCard label="EquipModal (uses Modal)" source="components/build/equipModal.tsx" usedIn="skill page (preview adds nothing; the countdown still goes to the build)">
                <Button onClick={() => setOpenModal("equip")}>Open modal</Button>
            </PreviewCard>
            <PreviewCard label="ConfirmModal (uses Modal)" source="components/modal/confirmModal.tsx" usedIn="build remove and clear, replaces window.confirm and window.alert">
                <Button onClick={() => setOpenModal("confirm")}>Open modal</Button>
            </PreviewCard>
        </PreviewGrid>
        {openModal === "contact" && <ContactModal onClose={close} />}
        {openModal === "confirm" && (
            <ConfirmModal title="Remove item" message="Remove this item from the build?" confirmLabel="Remove" cancelLabel="Cancel" onClose={close} />
        )}
        {openModal === "equip" && (
            <EquipModal skillName="Preview skill" onConfirm={() => {}} onClose={close} />
        )}
        </>
    );
}
