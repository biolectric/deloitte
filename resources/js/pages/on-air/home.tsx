import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState, type ReactNode } from 'react';

import { AdventCalendar } from '@/components/on-air/AdventCalendar';
import { AnnouncementPlayer } from '@/components/on-air/AnnouncementPlayer';
import { ChristmasLights } from '@/components/on-air/ChristmasLights';
import { Countdown } from '@/components/on-air/Countdown';
import { FestiveAtmosphere } from '@/components/on-air/FestiveAtmosphere';
import { MessageForm } from '@/components/on-air/MessageForm';
import { NextSectionButton } from '@/components/on-air/NextSectionButton';
import { SongForm } from '@/components/on-air/SongForm';
import { WishForm } from '@/components/on-air/WishForm';
import { logoUrl } from '@/lib/brand';
import type { AdventDoorItem, LiveFeedResponse, OnAirStats } from '@/types/on-air';

type Props = {
    stats: OnAirStats;
    viewerCount: number;
    announcementVideoUrl: string | null;
    broadcastAt: string;
    adventDoors: AdventDoorItem[];
    canAdmin: boolean;
};

const sectionLinks = [
    { href: '#update', label: 'Announcement' },
    { href: '#verzoek', label: 'Request a song', primary: true },
    { href: '#boodschap', label: 'Send a message' },
    { href: '#wensen', label: 'Christmas wishes' },
    { href: '#advent', label: 'Advent' },
] as const;

export default function OnAirHome({
    stats: initialStats,
    viewerCount: initialViewerCount,
    announcementVideoUrl,
    broadcastAt,
    adventDoors,
    canAdmin,
}: Props) {
    const { auth } = usePage().props as {
        auth?: { user?: { is_admin?: boolean } | null };
    };

    const [stats, setStats] = useState(initialStats);
    const [viewerCount, setViewerCount] = useState(initialViewerCount);

    useEffect(() => {
        setStats(initialStats);
        setViewerCount(initialViewerCount);
    }, [initialStats, initialViewerCount]);

    useEffect(() => {
        let active = true;

        const poll = async () => {
            try {
                const response = await fetch('/live', {
                    headers: { Accept: 'application/json' },
                    credentials: 'same-origin',
                });
                if (!response.ok || !active) {
                    return;
                }
                const data = (await response.json()) as LiveFeedResponse;
                setStats(data.stats);
                setViewerCount(data.viewer_count);
            } catch {
                // Keep last known state if polling fails.
            }
        };

        void poll();
        const id = window.setInterval(poll, 3000);
        return () => {
            active = false;
            window.clearInterval(id);
        };
    }, []);

    return (
        <div className="on-air-page xmas-theme relative min-h-screen overflow-x-hidden bg-[var(--onair-ink)] text-white">
            <Head title="Tune-in: Christmas special" />

            <FestiveAtmosphere />
            <ChristmasLights />
            <NextSectionButton />

            <header className="absolute inset-x-0 top-10 z-20 flex items-center justify-end px-6 py-5 sm:top-12 lg:px-10">
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

            <section id="hero" className="relative z-10 overflow-hidden scroll-mt-20">
                <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-5 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:min-h-[100svh] lg:px-10 lg:pt-28">
                    <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.85fr)] lg:gap-10">
                        <div className="min-w-0">
                            <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-nowrap sm:items-center sm:gap-6">
                                <img
                                    src={logoUrl}
                                    alt="Tune-in: Christmas special"
                                    className="h-24 w-auto shrink-0 rounded-[2rem] object-contain sm:h-32 lg:h-40"
                                />
                                <p className="font-display text-4xl leading-none tracking-wide text-[var(--onair-green)] sm:whitespace-nowrap sm:text-6xl lg:text-7xl">
                                    Tune-in: Christmas special
                                </p>
                            </div>

                            <h1 className="mt-5 max-w-3xl text-xl font-medium leading-snug text-white sm:mt-6 sm:text-3xl">
                                Send in your song — the request line builds the broadcast live.
                            </h1>

                            <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8 sm:gap-3">
                                {sectionLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className={
                                            'primary' in link && link.primary
                                                ? 'inline-flex h-11 items-center justify-center rounded-full bg-[var(--onair-green)] px-5 text-sm font-medium text-[var(--onair-ink)] shadow-[0_0_24px_rgba(134,188,37,0.35)] transition hover:brightness-110 sm:h-12 sm:px-6 sm:text-base'
                                                : 'inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white/80 transition hover:border-[var(--onair-green)]/50 hover:bg-[var(--onair-green)]/10 hover:text-white sm:h-12 sm:px-5'
                                        }
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="justify-self-center pb-1 text-center lg:justify-self-end lg:text-right">
                            <p className="font-display text-6xl leading-none text-[var(--onair-green)] tabular-nums drop-shadow-[0_0_28px_rgba(134,188,37,0.45)] sm:text-7xl lg:text-8xl">
                                {stats.submission_count}
                            </p>
                            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-white/55">
                                submissions
                            </p>
                            <p className="mt-4 font-display text-3xl leading-none text-white/90 tabular-nums sm:text-4xl">
                                {viewerCount}
                            </p>
                            <p className="mt-1.5 text-xs uppercase tracking-[0.22em] text-white/45">
                                watching now
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 lg:mt-16">
                        <p className="mb-4 text-xs uppercase tracking-[0.22em] text-white/45">
                            Countdown to 1 December
                        </p>
                        <Countdown target={broadcastAt} />
                    </div>
                </div>
            </section>

            <Section
                id="update"
                eyebrow="Pinned update"
                title="A message from our host: Marcel Vantilt"
            >
                <AnnouncementPlayer url={announcementVideoUrl} />
            </Section>

            <Section
                id="verzoek"
                eyebrow="Song request"
                title="What song do you want to hear in the T&L Tune in?"
                intro="Title and artist are required. Full name, department and reason are optional."
            >
                <SongForm />
            </Section>

            <Section
                id="boodschap"
                eyebrow="Compliments"
                title="Compliment your team your way"
                intro="Send a video/voice file or a verse — you don’t need both."
            >
                <MessageForm />
            </Section>

            <Section
                id="wensen"
                eyebrow="Christmas wishes"
                title="Share your Christmas wish"
                intro="Send a video/voice file or a wish — you don’t need both. Full name is required."
            >
                <WishForm />
            </Section>

            <Section
                id="advent"
                eyebrow="Advent calendar"
                title="24 doors until the broadcast"
                intro="Each day in December unlocks an activity. Day 1 is the radioshow itself."
            >
                <AdventCalendar doors={adventDoors} previewMode={canAdmin} />
            </Section>

            <footer className="relative z-10 border-t border-[var(--onair-green)]/15 px-6 py-10 text-sm text-white/40 lg:px-10">
                <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p>Tune-in: Christmas special</p>
                    <p>Radioshow · 1 December 2026</p>
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
        <section
            id={id}
            className="xmas-section relative z-10 scroll-mt-20 px-5 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24"
        >
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
