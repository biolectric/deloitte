type Props = {
    count: number;
};

export function RadioDial({ count }: Props) {
    const angle = Math.min(count, 100) * 2.4 - 120;

    return (
        <div className="relative mx-auto aspect-square w-full max-w-[280px]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,#2a2a2a,var(--onair-ink)_70%)] shadow-[inset_0_0_40px_rgba(0,0,0,0.65)] ring-1 ring-white/10" />
            <div className="absolute inset-[12%] rounded-full border border-dashed border-[var(--onair-green)]/35" />
            <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 h-full w-full"
                aria-hidden
            >
                <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="28"
                    stroke="var(--onair-green)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                        transformOrigin: '100px 100px',
                        transform: `rotate(${angle}deg)`,
                        transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                />
                <circle cx="100" cy="100" r="8" fill="var(--onair-green)" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-10 text-center">
                <p className="font-display text-5xl tracking-wide text-white tabular-nums transition-all duration-500">
                    {count}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/55">
                    nummers live
                </p>
            </div>
        </div>
    );
}
