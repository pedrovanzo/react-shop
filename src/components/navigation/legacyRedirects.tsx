import { Navigate, useLocation, useParams } from "react-router";
import { skillPath } from "../../lib/skillPath";
import { LIBRARY_GROUPS, librarySectionId } from "../library/sections";

// Redirects from older URLs: before products became skills and the cart became the build, and pages since merged

// /products?sort=... to /skill-shop?sort=..., keeping the filters
export function SkillShopRedirect() {
    const { search } = useLocation();
    return <Navigate to={{ pathname: "/skill-shop", search }} replace />;
}

// /product/:name to /skill/:name
export function SkillRedirect() {
    const { name = "" } = useParams();
    return <Navigate to={skillPath(name)} replace />;
}

// /cart to /build
export function BuildRedirect() {
    return <Navigate to="/build" replace />;
}

// /feature-flag to the demo, now in the options page's feature flags section
export function FeatureFlagRedirect() {
    return <Navigate to={{ pathname: "/options", hash: "#feature-flags" }} replace />;
}

// /components and /components/:section to the components library, now part of the options page
export function ComponentsLibraryRedirect() {
    const { section } = useParams();
    const known = LIBRARY_GROUPS.some((group) => group.sections.some((item) => item.id === section));
    const hash = section && known ? `#${librarySectionId(section)}` : "#components-library";
    return <Navigate to={{ pathname: "/options", hash }} replace />;
}
