import { Head } from '@inertiajs/react';

import { FestiveAtmosphere } from '@/components/on-air/FestiveAtmosphere';
import { deloitteLogoUrl } from '@/lib/brand';

type Props = {
    goesLiveAt: string;
};

export default function ComingSoon({ goesLiveAt }: Props) {
    const liveLabel = new Date(goesLiveAt).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Brussels',
    });

    return (
        <div className="on-air-page xmas-theme relative min-h-screen overflow-x-hidden bg-[var(--onair-ink)] text-white">
            <Head title="Coming soon — T&L Tune In" />
            <FestiveAtmosphere />

            <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[var(--onair-ink)]/92 backdrop-blur-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-start px-5 py-4 sm:px-6 lg:px-10">
                    <img
                        src={deloitteLogoUrl}
                        alt="Deloitte"
                        className="h-7 w-auto sm:h-9 lg:h-10"
                    />
                </div>
            </header>

            <main className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col items-end justify-center px-5 py-24 text-right sm:px-6 lg:px-10">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--onair-green)]">
                    T&L Tune In
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                    Opening soon
                </h1>
                <p className="font-accent mt-4 text-xl italic text-white/85">
                    The winter camp opens on {liveLabel}.
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
                    Come back then with the secret word — and let the countdown begin.
                </p>
            </main>
        </div>
    );
}
