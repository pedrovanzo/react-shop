import { ReactNode, useLayoutEffect, useRef } from "react";
import { Link } from "react-router";
import { useBuild } from "../../contexts/buildContext";
import { FeatureEnabled } from "../feature/featureEnabled";
import { FEATURE_FLAGS } from "../../lib/featureFlags";
import { scrollToSkillShop } from "../../lib/scroll";
// actions: optional page-specific controls shown at the right end of the navbar
// Sticks to the top of every page so other pages are always one click away. Its height is published as
// --navbar-height, so other sticky elements (sidebars, the Skill Shop header) stick right below it.
export default function Navbar({ actions }: { actions?: ReactNode }) {
    const { build } = useBuild();
    const navRef = useRef<HTMLElement>(null);
    useLayoutEffect(() => {
        const nav = navRef.current;
        if (!nav) return;
        const publish = () =>
            document.documentElement.style.setProperty("--navbar-height", `${nav.getBoundingClientRect().height}px`);
        publish();
        const observer = new ResizeObserver(publish);
        observer.observe(nav);
        return () => observer.disconnect();
    }, []);
    return (
        <>
            {/* Negative margins reach over the body's padding so the background covers what scrolls under it */}
            <nav ref={navRef} className="sticky top-0 z-30 -mx-4 -mt-4 mb-1 px-4 pt-4 pb-3 bg-contrast">
                <ul className="flex flex-row gap-4 flex-wrap text-default">
                    <li>
                        <Link to={{ pathname: "/" }}>home</Link>
                    </li>
                    <li>
                        <Link
                            to={{ pathname: "/skill-shop" }}
                            // On home the list is right below the hero, so scroll there instead
                            onClick={(event) => {
                                if (scrollToSkillShop()) event.preventDefault();
                            }}
                        >
                            skill shop
                        </Link>
                    </li>

                    <li>
                        <Link to={{ pathname: "/build" }}>
                            build{" "}
                            {build.length > 0
                                ? "(" + build.length + ")"
                                : null}
                        </Link>
                    </li>
                    <li>
                        <Link to={{ pathname: "/history" }}>history</Link>
                    </li>
                    <li>
                        <Link to={{ pathname: "/options" }}>options</Link>
                    </li>
                    <li>
                        <Link to={{ pathname: "/components" }}>
                            components library
                        </Link>
                    </li>
                    <FeatureEnabled featureFlag="SANDBOX">
                        <li>
                            <Link to={{ pathname: "/sandbox" }}>
                                sandbox (from env)
                            </Link>
                        </li>
                    </FeatureEnabled>
                    <FeatureEnabled featureFlag="FEATURE_FLAG_MENU">
                        <li>
                            <Link to={{ pathname: "/feature-flag" }}>
                                feature flag
                            </Link>
                        </li>
                    </FeatureEnabled>
                    <li>
                        {FEATURE_FLAGS.SNAKE ? (
                            <Link to={{ pathname: "/snake" }}>snake</Link>
                        ) : (
                            <span>snake (feature flag disabled)</span>
                        )}
                    </li>
                    {actions && <li className="ml-auto">{actions}</li>}
                </ul>
            </nav>
        </>
    );
}
