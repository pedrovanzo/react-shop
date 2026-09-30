import "./../../App.css";
import Navbar from "../../components/navigation/navbar";
export default function FeatureFlag() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-2 text-default">
                <h1 className="text-xl">Feature flag</h1>
                <p>
                    This page and its menu item are behind a feature flag. A
                    feature flag lets us turn a feature on or off without
                    changing code.
                </p>
                <p>
                    It is controlled by <code>FEATURE_FLAG_MENU</code> in the{" "}
                    <code>.env</code> file. Set it to <code>false</code> and
                    restart the dev server to hide this page and its menu item.
                </p>
            </div>
        </>
    );
}
