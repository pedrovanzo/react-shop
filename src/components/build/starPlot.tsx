// Radar ("star") plot styled after old soccer game stat screens: a dark panel, polygon rings,
// short uppercase labels at each point, an orange shape and an optional blue one on top
// (blue is the app's "equipped" color).
export interface StarPlotAxis {
    // Short label drawn at the point, e.g. "REACT"
    label: string;
    // Full name, for the tooltip and screen readers
    name: string;
    // 0 to 1: how far the main shape reaches on this axis
    value: number;
    // 0 to 1: the blue shape on this axis (e.g. the visitor's picks); omit to hide the blue shape
    overlay?: number;
}

const RADIUS = 70;
const RINGS = [0.25, 0.5, 0.75, 1];

// Axis i points up for i = 0 and goes clockwise
function point(index: number, count: number, scale: number) {
    const angle = -Math.PI / 2 + (index * 2 * Math.PI) / count;
    return [Math.cos(angle) * RADIUS * scale, Math.sin(angle) * RADIUS * scale] as const;
}

function polygon(values: number[]) {
    return values.map((value, i) => point(i, values.length, value).join(",")).join(" ");
}

interface StarPlotProps {
    axes: StarPlotAxis[];
    // Accessible summary of what the plot shows
    title: string;
    // Marks the plot so it can be followed when it moves between layouts (see the build page's merge)
    flipId?: string;
    className?: string;
}

// The dark, framed panel plots sit in
export const PLOT_PANEL_CLASS = "rounded-md border-2 border-neutral-700 bg-neutral-900 p-2";

export default function StarPlot({ axes, title, flipId, className = "" }: StarPlotProps) {
    const count = axes.length;
    if (count < 3) return null;
    const hasOverlay = axes.some((axis) => axis.overlay !== undefined && axis.overlay > 0);
    return (
        <svg
            viewBox="-135 -100 270 200"
            className={`block w-full ${className}`}
            role="img"
            aria-label={title}
            data-flip-id={flipId}
        >
            <title>{title}</title>
            {/* Rings and spokes */}
            {RINGS.map((ring) => (
                <polygon
                    key={ring}
                    points={polygon(axes.map(() => ring))}
                    fill={ring === 1 ? "rgb(38 38 38)" : "none"}
                    stroke="rgb(82 82 82)"
                    strokeWidth={ring === 1 ? 1.5 : 0.75}
                />
            ))}
            {axes.map((axis, i) => {
                const [x, y] = point(i, count, 1);
                return <line key={axis.name} x1={0} y1={0} x2={x} y2={y} stroke="rgb(64 64 64)" strokeWidth={0.75} />;
            })}
            {/* Main shape */}
            <polygon
                points={polygon(axes.map((axis) => axis.value))}
                fill="rgb(251 146 60 / 0.25)"
                stroke="rgb(251 146 60)"
                strokeWidth={2}
                strokeLinejoin="round"
            />
            {/* Overlay shape */}
            {hasOverlay && (
                <polygon
                    points={polygon(axes.map((axis) => axis.overlay ?? 0))}
                    fill="none"
                    stroke="rgb(96 165 250)"
                    strokeWidth={2}
                    strokeLinejoin="round"
                />
            )}
            {/* Labels just outside the outer ring */}
            {axes.map((axis, i) => {
                const [x, y] = point(i, count, 1.2);
                const anchor = Math.abs(x) < 4 ? "middle" : x > 0 ? "start" : "end";
                return (
                    <text
                        key={axis.name}
                        x={x}
                        y={y}
                        textAnchor={anchor}
                        dominantBaseline="middle"
                        fill="white"
                        fontSize={11}
                        fontWeight={800}
                        letterSpacing={1}
                    >
                        <title>{axis.name}</title>
                        {axis.label}
                    </text>
                );
            })}
        </svg>
    );
}
