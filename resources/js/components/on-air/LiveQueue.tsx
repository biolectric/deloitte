import type { SongRequestItem } from '@/types/on-air';

type Props = {
    songs: SongRequestItem[];
};

export function LiveQueue({ songs }: Props) {
    if (songs.length === 0) {
        return (
            <p className="text-white/55">
                No requests yet — be the first on the line.
            </p>
        );
    }

    return (
        <ul className="divide-y divide-white/10">
            {songs.map((song, index) => (
                <li
                    key={song.id}
                    className="flex items-start gap-4 py-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                >
                    <span className="mt-1 w-8 shrink-0 font-display text-lg text-[var(--onair-green)]">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-lg text-white">
                            {song.title}
                            <span className="text-white/45"> — {song.artist}</span>
                        </p>
                        <p className="mt-1 text-sm text-white/45">
                            {[song.name, song.department].filter(Boolean).join(' · ') || 'Anonymous'}
                            {song.reason ? ` · “${song.reason}”` : ''}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}
