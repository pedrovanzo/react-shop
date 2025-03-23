import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../../contexts/cart";
import { useFirebaseAuth, authSignout } from "../../contexts/auth";
import LoadingDash from "../loading/dash";
import { FeatureEnabled } from "../feature/featureEnabled";
import { useFeatureFlagsContext } from "../../contexts/featureFlag";
export default function Navbar() {
    const { user, userIsLoading } = useFirebaseAuth();
    const { cart, setCart } = useProductContext();
    const { flags } = useFeatureFlagsContext();
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

                    {userIsLoading ? (
                        <>
                            <LoadingDash classes="my-auto w-30" />
                        </>
                    ) : (
                        <>
                            {user ? (
                                <>
                                    <li>dashboard</li>

                                    <li>
                                        <Link to={{ pathname: "/cart" }}>
                                            cart{" "}
                                            {cart.length > 0
                                                ? "(" + cart.length + ")"
                                                : null}
                                        </Link>
                                    </li>
                                    <li>checkout</li>

                                    <li>
                                        <button
                                            className="text-default"
                                            onClick={authSignout}
                                        >
                                            sign out
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to={{ pathname: "/signin" }}>
                                            sign in
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={{ pathname: "/signup" }}>
                                            sign up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </>
                    )}
                    <li>
                        <Link to={{ pathname: "/options" }}>options</Link>
                    </li>
                    <FeatureEnabled featureFlag="SANDBOX">
                        <li>
                            <Link to={{ pathname: "/sandbox" }}>sandbox (from env)</Link>
                        </li>
                    </FeatureEnabled>
                    <FeatureEnabled featureFlag="SNAKE">
                        <li>
                            <Link to={{ pathname: "/snake" }}>snake</Link>
                        </li>
                    </FeatureEnabled>
                    {flags.FEATURE_FLAG_SANDBOX ? (
                        <>
                            <li>
                                <Link to={{ pathname: "/sandbox" }}>
                                    sandbox (from feature flag)
                                </Link>
                            </li>
                        </>
                    ) : null}
                    {flags.FEATURE_FLAG_SNAKE ? (
                        <>
                            <li>
                                <Link to={{ pathname: "/snake" }}>
                                    snake (from feature flag)
                                </Link>
                            </li>
                        </>
                    ) : null}
                </ul>
            </nav>
        </>
    );
}
