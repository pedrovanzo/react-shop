import Navbar from "../../components/navigation/navbar";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";

export default function NotFound() {
    return (
        <>
            <Navbar />
            <ThreeColumnLayout>
                    <div className="mx-auto w-full max-w-2xl">
                    <div>NOT FOUND</div>
                    </div>
            </ThreeColumnLayout>
        </>
    );
}
