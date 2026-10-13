import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState, type ReactNode } from 'react';

import { AdventCalendar } from '@/components/on-air/AdventCalendar';
import { AnnouncementPlayer } from '@/components/on-air/AnnouncementPlayer';
import { Countdown } from '@/components/on-air/Countdown';
import { HowItWorks } from '@/components/on-air/HowItWorks';
import { LiveQueue } from '@/components/on-air/LiveQueue';
import { MessageForm } from '@/components/on-air/MessageForm';
import { RadioDial } from '@/components/on-air/RadioDial';
import { SongForm } from '@/components/on-air/SongForm';
import { StatsStrip } from '@/components/on-air/StatsStrip';
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
    const { flash, auth } = usePage().props as {
        flash?: { success?: string | null };
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
            <Head title="Deloitte On Air — Verzoeklijn" />

            <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 lg:px-10">
                <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                    Year-End Review
                </p>
                <div className="flex items-center gap-4 text-sm">
                    {canAdmin || auth?.user?.is_admin ? (
                        <Link href="/dashboard" className="text-[var(--onair-green)] hover:underline">
                            Beheer
                        </Link>
                    ) : (
                        <Link href="/login" className="text-white/50 hover:text-white">
                            Redactie login
                        </Link>
                    )}

                </div>
            </header>

            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(134,188,37,0.22),transparent_45%),radial-gradient(ellipse_at_90%_20%,rgba(255,255,255,0.06),transparent_40%),linear-gradient(180deg,#0b0b0b_0%,#121212_55%,#0b0b0b_100%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:repeating-linear-gradient(90deg,transparent,transparent_48px,rgba(255,255,255,0.03)_49px)]" />

                <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pt-24">
                    <div>
                        <p className="font-display text-5xl leading-none tracking-wide text-[var(--onair-green)] sm:text-7xl lg:text-8xl">
                            Deloitte On Air
                        </p>
                        <h1 className="mt-6 max-w-xl text-2xl font-medium leading-snug text-white sm:text-3xl">
                            Stuur je nummer in — de verzoeklijn bouwt live mee aan de uitzending.
                        </h1>
                        <p className="mt-4 max-w-lg text-base text-white/65">
                            Eén link, vier stappen naar The Year-End Review. Songs voeden Deloitte
                            Wrapped; boodschappen landen in de rubrieken.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#verzoek"
                                className="inline-flex h-12 items-center bg-[var(--onair-green)] px-6 font-medium text-[var(--onair-ink)] transition hover:brightness-110"
                            >
                                Nummer aanvragen
                            </a>
                            <a
                                href="#boodschap"
                                className="inline-flex h-12 items-center border border-white/25 px-6 font-medium text-white transition hover:border-[var(--onair-green)] hover:text-[var(--onair-green)]"
                            >
                                Boodschap sturen
                            </a>
                        </div>
                        <div className="mt-12">
                            <p className="mb-4 text-xs uppercase tracking-[0.22em] text-white/45">
                                Aftellen tot 24 december
                            </p>
                            <Countdown target={broadcastAt} />
                        </div>
                    </div>

                    <div className="justify-self-center lg:justify-self-end">
                        <RadioDial count={stats.song_count} />
                    </div>
                </div>
            </section>

            {flash?.success ? (
                <div className="mx-auto max-w-6xl px-6 lg:px-10">
                    <p className="border border-[var(--onair-green)]/40 bg-[var(--onair-green)]/10 px-4 py-3 text-[var(--onair-green)]">
                        {flash.success}
                    </p>
                </div>
            ) : null}

            <Section id="update" eyebrow="Vaste update" title="Aankondigingsvideo">
                <AnnouncementPlayer url={announcementVideoUrl} />
            </Section>

            <Section
                id="verzoek"
                eyebrow="Verzoekformulier"
                title="Welk nummer moet erin?"
                intro="Titel en artiest zijn verplicht. Naam, afdeling en reden mag je leeg laten."
            >
                <SongForm />
            </Section>

            <Section
                id="wachtrij"
                eyebrow="Live wachtrij"
                title="Zojuist binnengekomen"
                intro="Elk verzoek verschijnt meteen voor iedereen — zonder herladen."
            >
                <LiveQueue songs={songs} />
            </Section>

            <Section
                id="boodschap"
                eyebrow="Video & spraak"
                title="Boodschap voor de rubrieken"
                intro="Lost in Translation, The Green Line of Out of Office 2027."
            >
                <MessageForm segments={segments} />
            </Section>

            <Section
                id="cijfers"
                eyebrow="Leuke cijfers"
                title="Uit de echte inzendingen"
                intro="Geen verzonnen getallen — live berekend."
            >
                <StatsStrip stats={stats} />
            </Section>

            <Section
                id="advent"
                eyebrow="Adventskalender"
                title="24 vakjes tot de uitzending"
                intro="Elke dag in december opent een activiteit. Dag 24 is Deloitte On Air zelf."
            >
                <AdventCalendar doors={adventDoors} />
            </Section>

            <Section
                id="hoe"
                eyebrow="Hoe het werkt"
                title="Eén link, vier stappen naar de uitzending"
            >
                <HowItWorks />
            </Section>

            <footer className="border-t border-white/10 px-6 py-10 text-sm text-white/40 lg:px-10">
                <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p>Deloitte On Air — Verzoeklijn</p>
                    <p>The Year-End Review · 24 december 2026</p>
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
        <section id={id} className="scroll-mt-20 border-t border-white/10 px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-6xl">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--onair-green)]">
                    {eyebrow}
                </p>
                <h2 className="mt-3 font-display text-4xl tracking-wide text-white sm:text-5xl">
                    {title}
                </h2>
                {intro ? <p className="mt-3 max-w-2xl text-white/60">{intro}</p> : null}
                <div className="mt-10">{children}</div>
            </div>
        </section>
    );
}
