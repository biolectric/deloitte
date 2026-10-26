/** Soft holiday ambience: colored bokeh + layered snow (page-wide). */
export function FestiveAtmosphere() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
            <div className="absolute inset-0 xmas-glow" />
            <div className="absolute inset-0 xmas-bokeh" />
            <div className="absolute inset-0 xmas-snow xmas-snow-near opacity-50" />
            <div className="absolute inset-0 xmas-snow xmas-snow-far opacity-30" />
        </div>
    );
}
