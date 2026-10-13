import type { OnAirStats } from '@/types/on-air';

type Props = {
    stats: OnAirStats;
};

export function StatsStrip({ stats }: Props) {
    const items = [
        {
            label: 'Populairste nummer',
            value: stats.popular_song
                ? `${stats.popular_song.title} — ${stats.popular_song.artist}`
                : 'Nog te bepalen',
            meta: stats.popular_song ? `${stats.popular_song.count}× aangevraagd` : null,
        },
        {
            label: 'Drukste afdeling',
            value: stats.busiest_department?.department ?? 'Nog te bepalen',
            meta: stats.busiest_department
                ? `${stats.busiest_department.count} verzoeken`
                : null,
        },
        {
            label: 'Boodschappen',
            value: String(stats.message_count),
            meta: 'video & spraak',
        },
    ];

    return (
        <div className="grid gap-8 md:grid-cols-3">
            {items.map((item) => (
                <div key={item.label}>
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--onair-green)]">
                        {item.label}
                    </p>
                    <p className="mt-3 font-display text-3xl leading-tight text-white">
                        {item.value}
                    </p>
                    {item.meta ? (
                        <p className="mt-2 text-sm text-white/45">{item.meta}</p>
                    ) : null}
                </div>
            ))}
        </div>
    );
}
