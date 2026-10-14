import { Link } from "react-router";
import { LuDownload, LuGamepad2, LuLightbulb, LuMail, LuWrench } from "react-icons/lu";
import Navbar from "../../components/navigation/navbar";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";
import { SettingsSection } from "../../components/options/settingsSection";
import SettingsNav, { SettingsNavItem } from "../../components/options/settingsNav";
import { CONTACT_LINKS, CV_DOWNLOAD } from "../../data/contactLinks";
import { FEATURE_FLAGS } from "../../lib/featureFlags";

const SECTIONS: SettingsNavItem[] = [
    { id: "why", label: "Why", Icon: LuLightbulb },
    { id: "how", label: "How", Icon: LuWrench },
    { id: "snake", label: "Snake", Icon: LuGamepad2 },
    { id: "contact", label: "Contact", Icon: LuMail },
];

// The about page lists only these, in this order
const ABOUT_CONTACTS = ["Email", "LinkedIn", "GitHub"];
const contacts = ABOUT_CONTACTS.flatMap((label) => CONTACT_LINKS.filter((link) => link.label === label));

const PARAGRAPH_CLASS = "text-sm leading-relaxed text-muted-foreground";

// Same GitHub-like layout as the options page: a side menu tracking the section in view
export default function About() {
    return (
        <>
            <Navbar />
            <ThreeColumnLayout left={<SettingsNav label="About sections" sections={SECTIONS} />}>
                <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 text-foreground">
                    <SettingsSection id="why" title="Why">
                        <p className={PARAGRAPH_CLASS}>
                            This is a showcase app. It gathers the topics I've covered over my career into one place
                            you can browse: the Skill Shop lists them, a build groups them into the roles I work in,
                            and the history page follows the years they came from.
                        </p>
                    </SettingsSection>

                    <SettingsSection id="how" title="How">
                        <p className={PARAGRAPH_CLASS}>
                            It started before AI, as a small React shop I built to practice: products, a cart, the
                            usual. I took that react-shop app and adapted it into the Skill Shop, where the products
                            are now skills and the cart is now a build.
                        </p>
                        <p className={PARAGRAPH_CLASS}>
                            The reshaping happened in the AI era, with AI-assisted development: I set the direction
                            and review every change, and AI does much of the typing. It's built with React, Vite,
                            TypeScript, Tailwind and shadcn/ui.
                        </p>
                    </SettingsSection>

                    <SettingsSection id="snake" title="Snake">
                        <p className={PARAGRAPH_CLASS}>
                            The snake game was made 100% before AI, by hand. I preserved it exactly as it was in the
                            pre-AI era, incomplete UI included, as a souvenir from where this app began.
                        </p>
                        {FEATURE_FLAGS.SNAKE && (
                            <Link
                                to={{ pathname: "/snake" }}
                                className="flex w-fit flex-row items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
                            >
                                <LuGamepad2 className="size-4" aria-hidden="true" />
                                Play snake
                            </Link>
                        )}
                    </SettingsSection>

                    <SettingsSection id="contact" title="Contact">
                        <ul className="flex flex-col gap-2">
                            {contacts.map(({ label, detail, href, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                                        rel="noreferrer"
                                        className="flex flex-row items-center gap-3 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-accent"
                                    >
                                        <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                                        <span className="font-medium">{label}</span>
                                        <span className="text-muted-foreground">{detail}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {CV_DOWNLOAD.available ? (
                            <a
                                href={CV_DOWNLOAD.href}
                                download={CV_DOWNLOAD.fileName}
                                className="flex w-fit flex-row items-center gap-2 rounded-md bg-brand px-3 py-1.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
                            >
                                <LuDownload className="size-4" aria-hidden="true" />
                                {CV_DOWNLOAD.label} ({CV_DOWNLOAD.detail})
                            </a>
                        ) : (
                            // Placeholder until the CV exists (see CV_DOWNLOAD)
                            <span
                                aria-disabled="true"
                                className="flex w-fit flex-row items-center gap-2 rounded-md bg-brand px-3 py-1.5 text-sm font-medium text-brand-foreground opacity-50"
                            >
                                <LuDownload className="size-4" aria-hidden="true" />
                                {CV_DOWNLOAD.label} ({CV_DOWNLOAD.detail}) · coming soon
                            </span>
                        )}
                    </SettingsSection>
                </div>
            </ThreeColumnLayout>
        </>
    );
}
