import Navbar from "../../components/navigation/navbar";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";
import Timeline from "../../components/timeline/timeline";
import HistoryEntry from "../../interfaces/historyEntry";
import historyData from "../../data/history.json";

// Newest year on top, oldest at the bottom
const entries: HistoryEntry[] = [...historyData].sort((a, b) => b.year - a.year);

export default function History() {
    return (
        <>
            <Navbar />
            <ThreeColumnLayout>
                <div className="mx-auto w-full max-w-2xl flex flex-col gap-8 text-default">
                    <h1 className="text-2xl font-semibold tracking-tight">History</h1>
                    <Timeline entries={entries} />
                </div>
            </ThreeColumnLayout>
        </>
    );
}
