import { Head, Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { dashboard } from '@/routes';

type Song = {
    id: number;
    title: string;
    artist: string;
    name: string | null;
    department: string | null;
    created_at: string;
};

type Message = {
    id: number;
    segment: string;
    media_type: string;
    name: string | null;
    department: string | null;
    created_at: string;
};

type Stats = {
    song_count: number;
    message_count: number;
    popular_song: { title: string; artist: string; count: number } | null;
    busiest_department: { department: string; count: number } | null;
};

type Props = {
    stats: Stats;
    latestSongs: Song[];
    latestMessages: Message[];
    announcementVideoUrl: string | null;
    adventDoorsCount: number;
    broadcastAt: string;
};

export default function Dashboard({
    stats,
    latestSongs,
    latestMessages,
    announcementVideoUrl,
    adventDoorsCount,
    broadcastAt,
}: Props) {
    const { flash } = usePage().props as { flash?: { success?: string | null } };

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {flash?.success ? (
                    <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </p>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard label="Verzoeknummers" value={String(stats.song_count)} href="/dashboard/songs" />
                    <StatCard label="Boodschappen" value={String(stats.message_count)} href="/dashboard/messages" />
                    <StatCard
                        label="Adventvakjes"
                        value={String(adventDoorsCount)}
                        href="/dashboard/advent"
                    />
                    <StatCard
                        label="Uitzending"
                        value={new Date(broadcastAt).toLocaleDateString('nl-BE', {
                            day: 'numeric',
                            month: 'short',
                        })}
                        href="/dashboard/announcement"
                    />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Panel
                        title="Laatste verzoeknummers"
                        href="/dashboard/songs"
                        empty={latestSongs.length === 0}
                    >
                        <ul className="divide-y divide-border">
                            {latestSongs.map((song) => (
                                <li key={song.id} className="flex items-start justify-between gap-3 py-3">
                                    <div className="min-w-0">
                                        <p className="truncate font-medium">
                                            {song.title} — {song.artist}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {[song.name, song.department].filter(Boolean).join(' · ') ||
                                                'Anoniem'}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Panel>

                    <Panel
                        title="Laatste boodschappen"
                        href="/dashboard/messages"
                        empty={latestMessages.length === 0}
                    >
                        <ul className="divide-y divide-border">
                            {latestMessages.map((message) => (
                                <li key={message.id} className="flex items-start justify-between gap-3 py-3">
                                    <div className="min-w-0">
                                        <p className="truncate font-medium capitalize">
                                            {message.segment.replaceAll('_', ' ')} · {message.media_type}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {[message.name, message.department]
                                                .filter(Boolean)
                                                .join(' · ') || 'Anoniem'}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Panel>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="font-medium">Aankondigingsvideo</h2>
                            <Link
                                href="/dashboard/announcement"
                                className="text-sm text-muted-foreground hover:text-foreground"
                            >
                                Beheren
                            </Link>
                        </div>
                        {announcementVideoUrl ? (
                            <video
                                className="aspect-video w-full rounded-lg bg-black object-cover"
                                controls
                                src={announcementVideoUrl}
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground">Nog geen video geplaatst.</p>
                        )}
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h2 className="font-medium">Leuke cijfers</h2>
                        <dl className="mt-4 space-y-3 text-sm">
                            <div>
                                <dt className="text-muted-foreground">Populairste nummer</dt>
                                <dd className="mt-1 font-medium">
                                    {stats.popular_song
                                        ? `${stats.popular_song.title} — ${stats.popular_song.artist} (${stats.popular_song.count}×)`
                                        : 'Nog te bepalen'}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">Drukste afdeling</dt>
                                <dd className="mt-1 font-medium">
                                    {stats.busiest_department
                                        ? `${stats.busiest_department.department} (${stats.busiest_department.count})`
                                        : 'Nog te bepalen'}
                                </dd>
                            </div>
                        </dl>
                        <Link
                            href="/"
                            className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground"
                        >
                            Bekijk publieke site →
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

function StatCard({
    label,
    value,
    href,
}: {
    label: string;
    value: string;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="rounded-xl border border-sidebar-border/70 p-4 transition hover:bg-muted/40 dark:border-sidebar-border"
        >
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
        </Link>
    );
}

function Panel({
    title,
    href,
    empty,
    children,
}: {
    title: string;
    href: string;
    empty: boolean;
    children: ReactNode;
}) {
    return (
        <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
            <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="font-medium">{title}</h2>
                <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
                    Alles bekijken
                </Link>
            </div>
            {empty ? <p className="py-6 text-sm text-muted-foreground">Nog niets ontvangen.</p> : children}
        </div>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
