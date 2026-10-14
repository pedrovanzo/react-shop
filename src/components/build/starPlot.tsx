// Radar ("star") plot styled after old soccer game stat screens: a dark panel, polygon rings,
// short uppercase labels at each point, the blueprint shape and an optional "picks" shape on top.
// Colors are --color-plot-* theme variables (orange and blue by default; color modes remap them).
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
export const PLOT_PANEL_CLASS = "rounded-md border-2 border-plot-panel-border bg-plot-panel p-2";

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
                    // Colors come from theme variables (style, since SVG attributes can't read CSS variables)
                    style={{
                        fill: ring === 1 ? "var(--color-plot-ring-fill)" : "none",
                        stroke: "var(--color-plot-grid)",
                    }}
                    strokeWidth={ring === 1 ? 1.5 : 0.75}
                />
            ))}
            {axes.map((axis, i) => {
                const [x, y] = point(i, count, 1);
                return <line key={axis.name} x1={0} y1={0} x2={x} y2={y} style={{ stroke: "var(--color-plot-spoke)" }} strokeWidth={0.75} />;
            })}
            {/* Main shape */}
            <polygon
                points={polygon(axes.map((axis) => axis.value))}
                style={{
                    fill: "color-mix(in oklch, var(--color-plot-shape) 25%, transparent)",
                    stroke: "var(--color-plot-shape)",
                }}
                strokeWidth={2}
                strokeLinejoin="round"
            />
            {/* Overlay shape */}
            {hasOverlay && (
                <polygon
                    points={polygon(axes.map((axis) => axis.overlay ?? 0))}
                    style={{ fill: "none", stroke: "var(--color-plot-picks)" }}
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
                        style={{ fill: "var(--color-plot-label)" }}
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
