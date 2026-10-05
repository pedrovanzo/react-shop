import { useState } from "react";
import { Link, useParams } from "react-router";
import Navbar from "../../components/navigation/navbar";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";
import Button from "../../components/button/button";
import NotFound from "../notFound/page";
import { LIBRARY_SECTIONS } from "./sections";

function SectionNav({ activeId, onNavigate }: { activeId: string; onNavigate?: () => void }) {
    return (
        <nav aria-label="Component sections">
            <ul className="flex flex-col gap-1">
                {LIBRARY_SECTIONS.map((item) => (
                    <li key={item.id}>
                        <Link
                            to={{ pathname: `/components/${item.id}` }}
                            onClick={onNavigate}
                            aria-current={item.id === activeId ? "page" : undefined}
                            className={
                                "block px-2 py-1 rounded-md " +
                                (item.id === activeId
                                    ? "text-contrast bg-default"
                                    : item.preview
                                      ? "hover:bg-default/10"
                                      : "text-default/50 hover:bg-default/10")
                            }
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default function ComponentsLibrary() {
    const { section: sectionId = LIBRARY_SECTIONS[0].id } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const section = LIBRARY_SECTIONS.find((item) => item.id === sectionId);
    if (!section) return <NotFound />;
    const Preview = section.preview;
    return (
        <>
            <Navbar />
            <ThreeColumnLayout left={<SectionNav activeId={section.id} />}>
                <div className="flex flex-col gap-4">
                    {/* Below lg the section menu collapses behind a toggle */}
                    <div className="lg:hidden">
                        <Button
                            variant="soft"
                            className="w-full text-left"
                            aria-expanded={isMenuOpen}
                            aria-controls="components-library-menu"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? "Hide" : "Show"} sections ({section.label})
                        </Button>
                        {isMenuOpen && (
                            <div id="components-library-menu" className="mt-2">
                                <SectionNav activeId={section.id} onNavigate={() => setIsMenuOpen(false)} />
                            </div>
                        )}
                    </div>
                    <main className="flex flex-col gap-4">
                        <h1 className="text-xl font-semibold">{section.label}</h1>
                        {Preview ? <Preview /> : <p className="text-default/70">Not built yet.</p>}
                    </main>
                </div>
            </ThreeColumnLayout>
        </>
    );
}
