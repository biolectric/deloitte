import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState, type ReactNode } from 'react';

import { AdventCalendar } from '@/components/on-air/AdventCalendar';
import { AnnouncementPlayer } from '@/components/on-air/AnnouncementPlayer';
import { Countdown } from '@/components/on-air/Countdown';
import { HowItWorks } from '@/components/on-air/HowItWorks';
import { LiveQueue } from '@/components/on-air/LiveQueue';
import { MessageForm } from '@/components/on-air/MessageForm';
import { SongForm } from '@/components/on-air/SongForm';

import { StatsStrip } from '@/components/on-air/StatsStrip';
import { logoUrl } from '@/lib/brand';
import type {
    AdventDoorItem,
    LiveFeedResponse,
    OnAirStats,
    SegmentOption,
    SongRequestItem,
} from '@/types/on-air';


type Props = {
    songs: SongRequestItem[];
    stats: OnAirStats;
    announcementVideoUrl: string | null;
    broadcastAt: string;
    adventDoors: AdventDoorItem[];
    segments: SegmentOption[];
    canAdmin: boolean;
};

export default function OnAirHome({
    songs: initialSongs,
    stats: initialStats,
    announcementVideoUrl,
    broadcastAt,
    adventDoors,
    segments,
    canAdmin,
}: Props) {
    const { auth } = usePage().props as {
        auth?: { user?: { is_admin?: boolean } | null };
    };

    const [songs, setSongs] = useState(initialSongs);
    const [stats, setStats] = useState(initialStats);

    useEffect(() => {
        setSongs(initialSongs);
        setStats(initialStats);
    }, [initialSongs, initialStats]);

    useEffect(() => {
        let active = true;

        const poll = async () => {
            try {
                const response = await fetch('/live', {
                    headers: { Accept: 'application/json' },
                });
                if (!response.ok || !active) {
                    return;
                }
                const data = (await response.json()) as LiveFeedResponse;
                setSongs(data.songs);
                setStats(data.stats);
            } catch {
                // Keep last known state if polling fails.
            }
        };

        const id = window.setInterval(poll, 3000);
        return () => {
            active = false;
            window.clearInterval(id);
        };
    }, []);

    return (
        <div className="on-air-page min-h-screen bg-[var(--onair-ink)] text-white">
            <Head title="Deloitte On Air — Request Line" />

            <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 lg:px-10">
                <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                    Year-End Review
                </p>
                <div className="flex items-center gap-4 text-sm">
                    {canAdmin || auth?.user?.is_admin ? (
                        <Link href="/dashboard" className="text-[var(--onair-green)] hover:underline">
                            Admin
                        </Link>
                    ) : (
                        <Link href="/login" className="text-white/50 hover:text-white">
                            Editorial login
                        </Link>
                    )}

                </div>
            </header>

            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(134,188,37,0.22),transparent_45%),radial-gradient(ellipse_at_90%_20%,rgba(255,255,255,0.06),transparent_40%),linear-gradient(180deg,#0b0b0b_0%,#121212_55%,#0b0b0b_100%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(90deg,transparent,transparent_48px,rgba(255,255,255,0.03)_49px)]" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)] lg:gap-10 lg:px-10 lg:pt-24">
                    <div className="min-w-0">
                        <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-nowrap sm:items-center sm:gap-6">
                            <img
                                src={logoUrl}
                                alt=""
                                className="h-14 w-auto shrink-0 object-contain sm:h-20 lg:h-24"
                            />
                            <p className="font-display text-4xl leading-none tracking-wide text-[var(--onair-green)] sm:whitespace-nowrap sm:text-7xl lg:text-8xl">
                                Deloitte On Air
                            </p>
                        </div>
                        <h1 className="mt-5 max-w-3xl text-xl font-medium leading-snug text-white sm:mt-6 sm:text-3xl">
                            Send in your song — the request line builds the broadcast live.
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 sm:mt-4 sm:text-base">
                            One link, four steps to The Year-End Review. Songs feed Deloitte
                            Wrapped; messages land in the segments.
                        </p>
                        <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
                            <a
                                href="#verzoek"
                                className="inline-flex h-12 items-center justify-center bg-[var(--onair-green)] px-6 font-medium text-[var(--onair-ink)] transition hover:brightness-110"
                            >
                                Request a song
                            </a>
                            <a
                                href="#boodschap"
                                className="inline-flex h-12 items-center justify-center border border-white/25 px-6 font-medium text-white transition hover:border-[var(--onair-green)] hover:text-[var(--onair-green)]"
                            >
                                Send a message
                            </a>
                        </div>
                        <div className="mt-10 sm:mt-12">
                            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-white/45">
                                Countdown to 24 December
                            </p>
                            <Countdown target={broadcastAt} />
                        </div>
                    </div>

                    <div className="justify-self-center text-center lg:justify-self-end lg:text-right">
                        <p className="font-display text-6xl leading-none text-white tabular-nums sm:text-7xl lg:text-8xl">
                            {stats.song_count}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/55">
                            songs live
                        </p>
                    </div>

                </div>
            </section>

            <Section id="update" eyebrow="Pinned update" title="Announcement video">
                <AnnouncementPlayer url={announcementVideoUrl} />
            </Section>

            <Section
                id="verzoek"
                eyebrow="Song request"
                title="Which song should make it in?"
                intro="Title and artist are required. Name, department and reason are optional."
            >
                <SongForm />
            </Section>

            <Section
                id="wachtrij"
                eyebrow="Live queue"
                title="Just in"
                intro="Every request appears instantly for everyone — no reload needed."
            >
                <LiveQueue songs={songs} />
            </Section>

            <Section
                id="boodschap"
                eyebrow="Video & voice"
                title="Message for the segments"
                intro="Lost in Translation, The Green Line or Out of Office 2027."
            >
                <MessageForm segments={segments} />
            </Section>


            <Section
                id="cijfers"
                eyebrow="Fun stats"
                title="From real submissions"
                intro="No made-up numbers — calculated live."
            >
                <StatsStrip stats={stats} />
            </Section>

            <Section
                id="advent"
                eyebrow="Advent calendar"
                title="24 doors until the broadcast"
                intro="Each day in December unlocks an activity. Day 24 is Deloitte On Air itself."
            >
                <AdventCalendar doors={adventDoors} />
            </Section>

            <Section
                id="hoe"
                eyebrow="How it works"
                title="One link, four steps to the broadcast"
            >
                <HowItWorks />
            </Section>

            <footer className="border-t border-white/10 px-6 py-10 text-sm text-white/40 lg:px-10">
                <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p>Deloitte On Air — Request Line</p>
                    <p>The Year-End Review · 24 December 2026</p>
                </div>
            </footer>
        </div>
    );
}

function Section({
    id,
    eyebrow,
    title,
    intro,
    children,
}: {
    id: string;
    eyebrow: string;
    title: string;
    intro?: string;
    children: ReactNode;
}) {

    return (
        <section id={id} className="scroll-mt-20 border-t border-white/10 px-5 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-6xl">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--onair-green)]">
                    {eyebrow}
                </p>
                <h2 className="mt-3 font-display text-[1.75rem] leading-tight tracking-wide break-words text-white sm:text-5xl sm:leading-none">
                    {title}
                </h2>
                {intro ? (
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                        {intro}
                    </p>
                ) : null}
                <div className="mt-8 sm:mt-10">{children}</div>
            </div>
        </section>
    );
}
