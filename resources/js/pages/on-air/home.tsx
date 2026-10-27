import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState, type ReactNode } from 'react';

import { AdventCalendar } from '@/components/on-air/AdventCalendar';
import { AnnouncementPlayer } from '@/components/on-air/AnnouncementPlayer';
import { Countdown } from '@/components/on-air/Countdown';
import { FestiveAtmosphere } from '@/components/on-air/FestiveAtmosphere';
import { MessageForm } from '@/components/on-air/MessageForm';
import { NextSectionButton } from '@/components/on-air/NextSectionButton';
import { NominationForm } from '@/components/on-air/NominationForm';
import { SongForm } from '@/components/on-air/SongForm';
import { deloitteLogoUrl, logoUrl } from '@/lib/brand';
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
    { href: '#update', label: 'Marcel Vantilt' },
    { href: '#verzoek', label: 'Request a song' },
    { href: '#boodschap', label: 'Send a message' },
    { href: '#nominatie', label: 'Person of the Year' },
    { href: '#calendar', label: 'Countdown calendar' },
] as const;

const partOfShow = [
    {
        href: '#verzoek',
        number: '01',
        title: 'Your song, on air',
        body: 'Tell us what song you would like to hear.',
        cta: 'Request a song',
    },
    {
        href: '#boodschap',
        number: '02',
        title: 'Send a message',
        body: 'Give a shout-out to your team or let us know what your resolutions are!',
        cta: 'Send a message',
    },
    {
        href: '#calendar',
        number: '03',
        title: 'Countdown calendar',
        body: 'Come back every day to find a new surprise.',
        cta: 'Explore the calendar',
    },
    {
        href: '#nominatie',
        number: '04',
        title: 'Person of the Year',
        body: 'Nominate your T&L Person of the Year!',
        cta: 'Nominate someone',
    },
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
            <Head title="T&L Tune In" />

            <FestiveAtmosphere />
            <NextSectionButton />

            <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[var(--onair-ink)]/92 backdrop-blur-sm">
                <div className="mx-auto flex max-w-7xl flex-row-reverse items-center justify-between gap-4 px-5 py-3 sm:px-6 sm:py-4 lg:px-10">
                    <a href="#hero" className="inline-flex shrink-0 items-center">
                        <img
                            src={deloitteLogoUrl}
                            alt="Deloitte"
                            className="h-7 w-auto sm:h-9 lg:h-10"
                        />
                    </a>
                    <nav className="hidden items-center gap-6 text-sm text-white/85 lg:flex">
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

            <div className="h-16 sm:h-20 lg:h-24" aria-hidden />

            <div className="relative z-10 flex min-h-[calc(100svh-4rem)] flex-col sm:min-h-[calc(100svh-5rem)] lg:min-h-[calc(100svh-6rem)]">
                <section
                    id="hero"
                    className="relative flex flex-1 flex-col overflow-hidden scroll-mt-24"
                >
                    <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-4 px-5 py-3 sm:gap-6 sm:px-6 sm:py-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8 lg:px-10 lg:py-2">
                        <div className="relative order-1 flex items-center justify-center lg:justify-start">
                            <img
                                src={logoUrl}
                                alt="T&L Tune In"
                                className="w-full max-w-[15rem] object-contain sm:max-w-sm lg:max-w-[26rem] xl:max-w-lg"
                            />
                        </div>

                        <div className="order-2 min-w-0 text-right">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--onair-green)]">
                                Live on 1 December
                            </p>
                            <h1 className="mt-2 text-3xl font-bold leading-[1.05] tracking-tight text-white sm:mt-3 sm:text-5xl lg:text-[3.25rem]">
                                T&L Tune In
                            </h1>
                            <p className="font-accent mt-2 text-lg italic text-white/90 sm:mt-3 sm:text-2xl">
                                Let the countdown begin.
                            </p>

                            <div className="mt-5 flex flex-col items-end gap-3 sm:mt-6">
                                <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                                    Countdown to 1 December
                                </p>
                                <Countdown target={broadcastAt} />
                            </div>

                            <p className="mt-5 text-xs text-white/45 sm:mt-6">
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
                </section>

                <section className="relative border-t border-white/10 px-5 py-4 sm:px-6 sm:py-5 lg:px-10 lg:py-6">
                    <div className="mx-auto max-w-7xl text-right">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--onair-green)]">
                            Be part of the show
                        </p>
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:mt-5 lg:grid-cols-4 lg:gap-0">
                            {partOfShow.map((item, index) => (
                                <div
                                    key={item.href}
                                    className={`text-right ${
                                        index > 0
                                            ? 'lg:border-l lg:border-white/15 lg:pl-6 xl:pl-8'
                                            : 'lg:pr-6 xl:pr-8'
                                    }`}
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
                                        className="mt-3 inline-flex items-center justify-center border border-[var(--onair-green)] px-3 py-2 text-sm font-semibold text-[var(--onair-green)] transition hover:bg-[var(--onair-green)] hover:text-[var(--onair-ink)]"
                                    >
                                        {item.cta}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Section
                id="update"
                eyebrow="Marcel Vantilt"
                title="A message from our host: Marcel Vantilt"
            >
                <AnnouncementPlayer url={announcementVideoUrl} />
            </Section>

            <Section
                id="verzoek"
                eyebrow="Request a song"
                title="Tell us what song you would like to hear."
            >
                <SongForm />
            </Section>

            <Section
                id="boodschap"
                eyebrow="Send a message"
                title="Compliment a colleague or share your story!"
                intro="We want to hear from you! Give a shout-out to your team or let us know what your resolutions are!"
            >
                <MessageForm />
            </Section>

            <Section
                id="nominatie"
                eyebrow="Person of the Year"
                title="Nominate your T&L Person of the Year!"
            >
                <NominationForm />
            </Section>

            <Section
                id="calendar"
                eyebrow="Countdown calendar"
                title="Come back every day to find a new surprise."
            >
                <AdventCalendar doors={adventDoors} previewMode={canAdmin} />
            </Section>

            <footer className="relative z-10 border-t border-[var(--onair-green)]/15 px-6 py-10 text-sm text-white/40 lg:px-10">
                <div className="mx-auto flex max-w-7xl flex-col items-end gap-2 text-right sm:flex-row sm:items-center sm:justify-end sm:gap-8">
                    <p>
                        Deloitte<span className="text-[var(--onair-green)]">.</span> T&L Tune In
                    </p>
                    <p>1 December 2026</p>
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
            className="xmas-section relative z-10 scroll-mt-24 px-5 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-24"
        >
            <div className="mx-auto max-w-6xl text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--onair-green)]">
                    {eyebrow}
                </p>
                <h2 className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight break-words text-white sm:text-4xl sm:leading-tight">
                    {title}
                </h2>
                {intro ? (
                    <p className="ml-auto mt-3 max-w-2xl text-base leading-relaxed text-white/60">
                        {intro}
                    </p>
                ) : null}
                <div className="mt-8 text-left sm:mt-10">{children}</div>
            </div>
        </section>
    );
}
