import Modal from "../modal/modal";
import { CONTACT_LINKS } from "../../data/contactLinks";

interface ContactModalProps {
    onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
    return (
        <Modal title="Contact" onClose={onClose}>
            <ul className="flex flex-col gap-2">
                {CONTACT_LINKS.map(({ label, detail, href, icon: Icon }) => {
                    const isExternal = href.startsWith("http");
                    return (
                        <li key={label}>
                            <a
                                href={href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="flex flex-row items-center gap-3 rounded-md p-3 bg-default/5 hover:bg-default/10"
                            >
                                <Icon className="size-5 shrink-0" aria-hidden="true" />
                                <span className="font-medium">{label}</span>
                                <span className="ml-auto text-sm text-default/60 truncate">
                                    {detail}
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </Modal>
    );
}
