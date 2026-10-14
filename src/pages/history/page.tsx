import Navbar from "../../components/navigation/navbar";
import ThreeColumnLayout from "../../components/layout/threeColumnLayout";
import Timeline from "../../components/timeline/timeline";
import PageHeader from "../../components/header/pageHeader";
import HistoryEntry from "../../interfaces/historyEntry";
import historyData from "../../data/history.json";

const entries: HistoryEntry[] = historyData;

export default function History() {
    return (
        <>
            <Navbar />
            <ThreeColumnLayout>
                <div className="w-full flex flex-col gap-8 text-default">
                    {/* Same compact pattern header as the build page */}
                    <PageHeader compact title="History" description="The years that shaped how I build, one at a time" />
                    <Timeline entries={entries} />
                </div>
            </ThreeColumnLayout>
        </>
    );
}
