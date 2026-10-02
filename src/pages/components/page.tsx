import { useState } from "react";
import { Link, useParams } from "react-router";
import Navbar from "../../components/navigation/navbar";
import Button from "../../components/button/button";
import NotFound from "../notFound/page";
import { LIBRARY_SECTIONS } from "./sections";
export default function ComponentsLibrary() {
    const { section: sectionId = LIBRARY_SECTIONS[0].id } = useParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const section = LIBRARY_SECTIONS.find((item) => item.id === sectionId);
    if (!section) return <NotFound />;
    const Preview = section.preview;
    return (
        <>
            <Navbar />
            <div className="flex flex-col md:flex-row gap-6 text-default">
                <aside className="md:w-48 md:shrink-0">
                    {/* On mobile the menu collapses behind a toggle */}
                    <Button
                        variant="soft"
                        className="md:hidden w-full text-left"
                        aria-expanded={isMenuOpen}
                        aria-controls="components-library-menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? "Hide" : "Show"} sections ({section.label})
                    </Button>
                    <nav
                        id="components-library-menu"
                        className={(isMenuOpen ? "block" : "hidden") + " md:block md:sticky md:top-4 mt-2 md:mt-0"}
                    >
                        <ul className="flex flex-col gap-1">
                            {LIBRARY_SECTIONS.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        to={{ pathname: `/components/${item.id}` }}
                                        onClick={() => setIsMenuOpen(false)}
                                        aria-current={item.id === section.id ? "page" : undefined}
                                        className={
                                            "block px-2 py-1 rounded-md " +
                                            (item.id === section.id
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
                </aside>
                <main className="flex-1 min-w-0 flex flex-col gap-4">
                    <h1 className="text-xl font-semibold">{section.label}</h1>
                    {Preview ? <Preview /> : <p className="text-default/70">Not built yet.</p>}
                </main>
            </div>
        </>
    );
}
