import { Head, router, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

type Song = {
    id: number;
    title: string;
    artist: string;
    name: string | null;
    department: string | null;
    reason: string | null;
    created_at: string;
};

type Props = {
    songs: Song[];
};

export default function DashboardSongs({ songs }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string | null } };

    return (
        <>
            <Head title="Verzoeknummers" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {flash?.success ? (
                    <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </p>
                ) : null}

                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="border-b border-border px-4 py-3">
                        <h1 className="font-medium">Verzoeknummers ({songs.length})</h1>
                        <p className="text-sm text-muted-foreground">
                            Verwijder inzendingen die niet in de uitzending mogen.
                        </p>
                    </div>
                    <ul className="divide-y divide-border px-4">
                        {songs.map((song) => (
                            <li key={song.id} className="flex items-start justify-between gap-4 py-4">
                                <div className="min-w-0">
                                    <p className="font-medium">
                                        {song.title} — {song.artist}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {[song.name, song.department].filter(Boolean).join(' · ') ||
                                            'Anoniem'}
                                        {song.reason ? ` · “${song.reason}”` : ''}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        router.delete(`/dashboard/songs/${song.id}`, {
                                            preserveScroll: true,
                                        })
                                    }
                                    className="shrink-0 text-sm text-red-600 hover:underline dark:text-red-300"
                                >
                                    Verwijderen
                                </button>
                            </li>
                        ))}
                        {songs.length === 0 ? (
                            <li className="py-8 text-sm text-muted-foreground">Geen verzoeken.</li>
                        ) : null}
                    </ul>
                </div>
            </div>
        </>
    );
}

DashboardSongs.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Verzoeknummers', href: '/dashboard/songs' },
    ],
};
