import { IconType } from "react-icons";
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export interface ContactLink {
    label: string;
    // Shown next to the label, e.g. the handle or address
    detail: string;
    href: string;
    icon: IconType;
}

// TODO: mock URLs, replace with real ones
export const CONTACT_LINKS: ContactLink[] = [
    { label: "Email", detail: "hello@example.com", href: "mailto:hello@example.com", icon: FaEnvelope },
    { label: "LinkedIn", detail: "in/example", href: "https://www.linkedin.com/in/example", icon: FaLinkedin },
    { label: "GitHub", detail: "example", href: "https://github.com/example", icon: FaGithub },
    { label: "Instagram", detail: "@example", href: "https://www.instagram.com/example", icon: FaInstagram },
    { label: "Facebook", detail: "example", href: "https://www.facebook.com/example", icon: FaFacebook },
];
