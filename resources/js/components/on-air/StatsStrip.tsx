import type { OnAirStats } from '@/types/on-air';

type Props = {
    stats: OnAirStats;
};

export function StatsStrip({ stats }: Props) {
    const items = [
        {
            label: 'Most requested song',
            value: stats.popular_song
                ? `${stats.popular_song.title} — ${stats.popular_song.artist}`
                : 'Still to be decided',
            meta: stats.popular_song ? `${stats.popular_song.count}× requested` : null,
        },
        {
            label: 'Busiest department',
            value: stats.busiest_department?.department ?? 'Still to be decided',
            meta: stats.busiest_department
                ? `${stats.busiest_department.count} requests`
                : null,
        },
        {
            label: 'Messages',
            value: String(stats.message_count),
            meta: 'video & voice',
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
