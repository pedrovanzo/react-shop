import Navbar from "../../components/navigation/navbar";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";
import Timeline from "../../components/timeline/timeline";
import HistoryEntry from "../../interfaces/historyEntry";
import historyData from "../../data/history.json";

const entries: HistoryEntry[] = historyData;

export default function History() {
    return (
        <>
            <Navbar />
            <ThreeColumnLayout>
                <div className="w-full flex flex-col gap-8 text-default">
                    <h1 className="text-2xl font-semibold tracking-tight">History</h1>
                    <Timeline entries={entries} />
                </div>
            </ThreeColumnLayout>
        </>
    );
}
