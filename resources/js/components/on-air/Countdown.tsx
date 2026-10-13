import { useEffect, useState } from 'react';

type Props = {
    target: string;
};

type Parts = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function getParts(target: string): Parts {
    const diff = Math.max(0, new Date(target).getTime() - Date.now());
    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000) / 60_000);
    const seconds = Math.floor((diff % 60_000) / 1000);

    return { days, hours, minutes, seconds };
}

const emptyParts: Parts = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
};

export function Countdown({ target }: Props) {
    // Start empty so server HTML and first client render match; fill after mount.
    const [parts, setParts] = useState<Parts>(emptyParts);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const tick = () => setParts(getParts(target));
        tick();
        setReady(true);
        const id = window.setInterval(tick, 1000);
        return () => window.clearInterval(id);
    }, [target]);

    const cells: Array<{ label: string; value: number }> = [
        { label: 'dagen', value: parts.days },
        { label: 'uur', value: parts.hours },
        { label: 'min', value: parts.minutes },
        { label: 'sec', value: parts.seconds },
    ];

    return (
        <div
            className="flex flex-wrap items-end gap-4 sm:gap-6"
            aria-live="polite"
            suppressHydrationWarning
        >
            {cells.map((cell) => (
                <div key={cell.label} className="min-w-[4.5rem]">
                    <p
                        className={`font-display text-4xl leading-none text-white tabular-nums sm:text-5xl ${
                            ready ? '' : 'opacity-40'
                        }`}
                    >
                        {String(cell.value).padStart(2, '0')}
                    </p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-white/50">
                        {cell.label}
                    </p>
                </div>
            ))}
        </div>
    );
}
