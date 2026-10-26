import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarDays } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

import { AdventCalendar } from '@/components/on-air/AdventCalendar';
import { AnnouncementPlayer } from '@/components/on-air/AnnouncementPlayer';
import { ChristmasLights } from '@/components/on-air/ChristmasLights';
import { FestiveAtmosphere } from '@/components/on-air/FestiveAtmosphere';
import { MessageForm } from '@/components/on-air/MessageForm';
import { NextSectionButton } from '@/components/on-air/NextSectionButton';
import { SongForm } from '@/components/on-air/SongForm';
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

const navLinks = [
    { href: '#update', label: 'The show' },
    { href: '#verzoek', label: 'Request a song' },
    { href: '#boodschap', label: 'Send a message' },
    { href: '#calendar', label: 'Countdown calendar' },
] as const;

const partOfShow = [
    {
        href: '#verzoek',
        number: '01',
        title: 'Your song, on air',
        body: 'Tell us what you want to hear and who it is for.',
        cta: 'Request a song',
    },
    {
        href: '#boodschap',
        number: '02',
        title: 'Send a message',
        body: 'Compliment a colleague or share what’s on your mind for the end of the year.',
        cta: 'Send a message',
    },
    {
        href: '#calendar',
        number: '03',
        title: 'Countdown calendar',
        body: 'The show is just the beginning. Discover what comes next.',
        cta: 'Explore the calendar',
    },
] as const;

export default function OnAirHome({
    stats: initialStats,
    viewerCount: initialViewerCount,
    announcementVideoUrl,
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
            <Head title="T&L Tune In" />

            <FestiveAtmosphere />
            <NextSectionButton />

            <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[var(--onair-ink)]/92 backdrop-blur-sm">
                <ChristmasLights />
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 pb-3 sm:px-6 sm:pb-4 lg:px-10">
                    <a
                        href="#hero"
                        className="text-4xl font-semibold leading-none tracking-tight text-white sm:text-5xl lg:text-6xl"
                    >
                        Deloitte<span className="text-[var(--onair-green)]">.</span>
                    </a>
                    <nav className="hidden items-center gap-7 text-sm text-white/85 lg:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="transition hover:text-[var(--onair-green)]"
                            >
                                {link.label}
                            </a>
                        ))}
                        {canAdmin || auth?.user?.is_admin ? (
                            <Link
                                href="/dashboard"
                                className="text-[var(--onair-green)] hover:underline"
                            >
                                Admin
                            </Link>
                        ) : null}
                    </nav>
                    <div className="flex items-center gap-3 lg:hidden">
                        {canAdmin || auth?.user?.is_admin ? (
                            <Link
                                href="/dashboard"
                                className="text-sm text-[var(--onair-green)]"
                            >
                                Admin
                            </Link>
                        ) : null}
                    </div>
                </div>
            </header>

            <div className="h-24 sm:h-32 lg:h-36" aria-hidden />

            {/* First viewport: hero + be part of the show */}
            <div className="relative z-10 flex min-h-[calc(100svh-6rem)] flex-col sm:min-h-[calc(100svh-8rem)] lg:min-h-[calc(100svh-9rem)]">
                <section id="hero" className="relative flex flex-1 flex-col overflow-hidden scroll-mt-36">
                    <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-4 px-5 py-3 sm:gap-6 sm:px-6 sm:py-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:px-10 lg:py-2">
                        <div className="min-w-0">
                            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--onair-green)] sm:text-xs">
                                Live on 1 December
                            </p>
                            <h1 className="mt-2 max-w-xl text-3xl font-bold leading-[1.05] tracking-tight text-white sm:mt-3 sm:text-5xl lg:text-[3.25rem]">
                                T&L Tune In
                                <span className="block">Your soundtrack.</span>
                            </h1>
                            <p className="font-accent mt-2 text-lg italic text-white/90 sm:mt-3 sm:text-2xl">
                                Let the countdown begin.
                            </p>
                            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70 sm:mt-3 sm:text-base">
                                Join T&L Tune In as we kick off our Countdown calendar. Request a
                                song, dedicate it to a colleague or send your team a message.
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-5">
                                <a
                                    href="#verzoek"
                                    className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--onair-green)] px-5 text-sm font-semibold text-[var(--onair-ink)] transition hover:brightness-110 sm:h-12 sm:px-6"
                                >
                                    Request a song
                                </a>
                                <a
                                    href="#boodschap"
                                    className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--onair-green)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--onair-green)]/10 sm:h-12 sm:px-6"
                                >
                                    Send a message
                                </a>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70 sm:mt-5">
                                <div className="flex items-center gap-2">
                                    <CalendarDays
                                        className="size-4 shrink-0 text-[var(--onair-green)]"
                                        aria-hidden
                                    />
                                    <p>
                                        <span className="font-medium text-[var(--onair-green)]">
                                            1 December 2026
                                        </span>
                                        <span className="mx-2 text-white/30">/</span>
                                        Countdown calendar kick-off
                                    </p>
                                </div>
                                <p className="text-xs text-white/45">
                                    <span className="font-semibold tabular-nums text-[var(--onair-green)]">
                                        {stats.submission_count}
                                    </span>{' '}
                                    submissions
                                    <span className="mx-2 text-white/25">·</span>
                                    <span className="font-semibold tabular-nums text-white">
                                        {viewerCount}
                                    </span>{' '}
                                    watching
                                </p>
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center lg:justify-end">
                            <img
                                src={logoUrl}
                                alt="T&L Tune In"
                                className="w-full max-w-[15rem] rounded-2xl object-contain sm:max-w-sm lg:max-w-[26rem] xl:max-w-lg"
                            />
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10">
                        <div className="flex items-center gap-4 border-t border-white/15 py-2.5">
                            <div className="h-px flex-1 bg-white/15" />
                            <p className="shrink-0 text-center text-[0.65rem] uppercase tracking-[0.18em] text-white/55 sm:text-xs">
                                <span className="text-[var(--onair-green)]">— 1 December</span>
                                <span className="mx-2">•</span>
                                Countdown calendar kick-off —
                            </p>
                            <div className="h-px flex-1 bg-white/15" />
                        </div>
                    </div>
                </section>

                <section className="relative border-t border-white/10 px-5 py-4 sm:px-6 sm:py-5 lg:px-10 lg:py-6">
                    <div className="mx-auto max-w-7xl">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--onair-green)] sm:text-xs">
                            Be part of the show
                        </p>
                        <div className="mt-4 grid gap-6 md:mt-5 md:grid-cols-3 md:gap-0">
                            {partOfShow.map((item, index) => (
                                <div
                                    key={item.href}
                                    className={
                                        index > 0
                                            ? 'md:border-l md:border-white/15 md:pl-8 lg:pl-10'
                                            : 'md:pr-8 lg:pr-10'
                                    }
                                >
                                    <p className="text-3xl font-bold leading-none text-[var(--onair-green)] sm:text-4xl">
                                        {item.number}
                                    </p>
                                    <h2 className="mt-2 text-base font-semibold text-white sm:text-lg">
                                        {item.title}
                                    </h2>
                                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                                        {item.body}
                                    </p>
                                    <a
                                        href={item.href}
                                        className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--onair-green)] transition hover:brightness-110"
                                    >
                                        {item.cta}
                                        <span aria-hidden>→</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Section
                id="update"
                eyebrow="The show"
                title="A message from our host: Marcel Vantilt"
            >
                <AnnouncementPlayer url={announcementVideoUrl} />
            </Section>

            <Section
                id="verzoek"
                eyebrow="Request a song"
                title="What song do you want to hear in the T&L Tune In?"
                intro="Title and artist are required. Full name, offering portfolio and reason are optional."
            >
                <SongForm />
            </Section>

            <Section
                id="boodschap"
                eyebrow="Send a message"
                title="Compliment a colleague or share what’s on your mind for the end of the year"
                intro="Choose a message type, then send a video/voice file or write your own text — you don’t need both."
            >
                <MessageForm />
            </Section>

            <Section
                id="calendar"
                eyebrow="Countdown calendar"
                title="Countdown Calendar starting 1 December – be here for surprises."
            >
                <AdventCalendar doors={adventDoors} previewMode={canAdmin} />
            </Section>

            <footer className="relative z-10 border-t border-[var(--onair-green)]/15 px-6 py-10 text-sm text-white/40 lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        Deloitte<span className="text-[var(--onair-green)]">.</span> T&L Tune In
                    </p>
                    <p>1 December 2026 · Countdown calendar kick-off</p>
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
            className="xmas-section relative z-10 scroll-mt-32 px-5 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24"
        >
            <div className="mx-auto max-w-6xl">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--onair-green)]">
                    {eyebrow}
                </p>
                <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight break-words text-white sm:text-5xl sm:leading-none">
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
