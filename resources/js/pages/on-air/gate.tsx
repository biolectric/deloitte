import { Form, Head } from '@inertiajs/react';

import { FestiveAtmosphere } from '@/components/on-air/FestiveAtmosphere';
import { deloitteLogoUrl, legalLogoUrl } from '@/lib/brand';

export default function OnAirGate() {
    return (
        <div className="on-air-page xmas-theme relative min-h-screen overflow-x-hidden bg-[var(--onair-ink)] text-white">
            <Head title="Secret word — T&L Tune In" />

            <FestiveAtmosphere />

            <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[var(--onair-ink)]/92 backdrop-blur-sm">
                <div className="flex w-full items-center justify-between px-5 py-3 sm:px-6 sm:py-4 lg:px-10">
                    <img
                        src={deloitteLogoUrl}
                        alt="Deloitte"
                        className="h-7 w-auto sm:h-9 lg:h-10"
                    />
                    <img
                        src={legalLogoUrl}
                        alt="Deloitte Legal"
                        className="h-6 w-auto sm:h-7 lg:h-8"
                    />
                </div>
            </header>

            <div className="h-16 sm:h-20 lg:h-24" aria-hidden />

            <main className="relative z-10 mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-lg flex-col items-start justify-center px-5 py-10 text-left sm:px-6 lg:px-10">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--onair-green)]">
                    Private gathering
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Psst… what’s the secret word?
                </h1>
                <p className="font-accent mt-3 text-lg italic text-white/85 sm:text-xl">
                    Only those who know it may step inside.
                </p>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                    Like the password to the holiday camp when you were little — whisper it below
                    and come join T&L Tune In.
                </p>

                <Form
                    action="/enter"
                    method="post"
                    className="mt-8 w-full space-y-4 text-left"
                    resetOnSuccess={['secret_word']}
                >
                    {({ errors, processing }) => (
                        <>
                            <label className="block">
                                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                                    Secret word
                                </span>
                                <input
                                    type="text"
                                    name="secret_word"
                                    autoComplete="off"
                                    autoFocus
                                    spellCheck={false}
                                    placeholder="Say the word…"
                                    className="h-12 w-full border border-white/15 bg-black/30 px-4 text-white outline-none placeholder:text-white/30 focus:border-[var(--onair-green)]"
                                />
                                {errors.secret_word ? (
                                    <span className="mt-2 block text-sm text-red-300">
                                        {errors.secret_word}
                                    </span>
                                ) : null}
                            </label>

                            <div className="flex justify-start">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex h-12 items-center justify-center bg-[var(--onair-green)] px-8 text-base font-semibold text-[var(--onair-ink)] transition hover:brightness-110 disabled:opacity-60"
                                >
                                    {processing ? 'Checking…' : 'Come in'}
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </main>
        </div>
    );
}
