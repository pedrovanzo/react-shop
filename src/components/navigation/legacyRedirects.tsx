import { Navigate, useLocation, useParams } from "react-router";
import { skillPath } from "../../lib/skillPath";

// Redirects from the URLs used before products became skills and the cart became the build

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
