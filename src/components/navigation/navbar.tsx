import { Link } from "react-router";
import { useCart } from "../../contexts/cartContext";
import { FeatureEnabled } from "../feature/featureEnabled";
import { FEATURE_FLAGS } from "../../lib/featureFlags";
export default function Navbar() {
    const { cart } = useCart();
    return (
        <>
            <nav className="mb-4">
                <ul className="flex flex-row gap-4 flex-wrap text-default">
                    <li>
                        <Link to={{ pathname: "/" }}>home</Link>
                    </li>
                    <li>
                        <Link to={{ pathname: "/products" }}>products</Link>
                    </li>

                    <li>
                        <Link to={{ pathname: "/cart" }}>
                            cart{" "}
                            {cart.length > 0
                                ? "(" + cart.length + ")"
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
                </ul>
            </nav>
        </>
    );
}
