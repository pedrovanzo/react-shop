import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../../contexts/cart";
import { FeatureEnabled } from "../feature/featureEnabled";
export default function Navbar() {
    const { cart, setCart } = useProductContext();
    useEffect(() => {}, [setCart]);
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
                        <Link to={{ pathname: "/options" }}>options</Link>
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
                    <FeatureEnabled featureFlag="SNAKE">
                        <li>
                            <Link to={{ pathname: "/snake" }}>snakeaa fom flag</Link>
                        </li>
                    </FeatureEnabled>
                    <li>
                        <Link to={{ pathname: "/snake" }}>
                            snake
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
