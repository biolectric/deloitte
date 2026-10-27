/** Soft winter ambience: snowy sky + denser snowfall (page-wide). */
export function FestiveAtmosphere() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
            <div className="absolute inset-0 xmas-glow" />
            <div className="absolute inset-0 xmas-bokeh" />
            <div className="absolute inset-x-0 bottom-0 h-40 xmas-ground" />
            <div className="absolute inset-0 xmas-snow xmas-snow-far opacity-70" />
            <div className="absolute inset-0 xmas-snow xmas-snow-mid opacity-85" />
            <div className="absolute inset-0 xmas-snow xmas-snow-near opacity-95" />
        </div>
    );
}
