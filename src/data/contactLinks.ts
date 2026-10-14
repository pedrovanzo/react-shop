import { IconType } from "react-icons";
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export interface ContactLink {
    label: string;
    // Shown next to the label, e.g. the handle or address
    detail: string;
    href: string;
    icon: IconType;
}

export const CONTACT_LINKS: ContactLink[] = [
    { label: "Email", detail: "pedro_vanzo@hotmail.com", href: "mailto:pedro_vanzo@hotmail.com", icon: FaEnvelope },
    {
        label: "LinkedIn",
        detail: "in/pedro-vanzo-b77975143",
        // www instead of a country subdomain, so LinkedIn picks the visitor's own region
        href: "https://www.linkedin.com/in/pedro-vanzo-b77975143",
        icon: FaLinkedin,
    },
    { label: "GitHub", detail: "pedrovanzo", href: "https://github.com/pedrovanzo", icon: FaGithub },
    // TODO: mock URLs, replace with real ones
    { label: "Instagram", detail: "@example", href: "https://www.instagram.com/example", icon: FaInstagram },
    { label: "Facebook", detail: "example", href: "https://www.facebook.com/example", icon: FaFacebook },
];

// TODO: placeholder until the CV exists. Put the PDF in public/ (e.g. public/pedro-vanzo-cv.pdf), point href at it
// and flip available to true
export const CV_DOWNLOAD = {
    label: "Download CV",
    detail: "PDF",
    href: "/pedro-vanzo-cv.pdf",
    fileName: "pedro-vanzo-cv.pdf",
    available: false,
};
