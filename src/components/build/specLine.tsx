// One spec-sheet line: label, dotted leader, value. Used by blueprint topics and the merged contact card
export default function SpecLine({ label, value }: { label: string; value: string | number }) {
    return (
        <>
            <span className="truncate">{label}</span>
            <span className="flex-1 min-w-4 border-b-2 border-dotted border-current opacity-30" aria-hidden="true"></span>
            <span className="shrink-0 tabular-nums">{value}</span>
        </>
    );
}
