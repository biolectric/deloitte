import { Form, Head } from '@inertiajs/react';

import { ChristmasLights } from '@/components/on-air/ChristmasLights';
import { FestiveAtmosphere } from '@/components/on-air/FestiveAtmosphere';

export default function OnAirGate() {
    return (
        <div className="on-air-page xmas-theme relative min-h-screen overflow-x-hidden bg-[var(--onair-ink)] text-white">
            <Head title="Secret word — T&L Tune In" />

            <FestiveAtmosphere />

            <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[var(--onair-ink)]/92 backdrop-blur-sm">
                <ChristmasLights />
                <div className="mx-auto flex max-w-7xl items-center px-5 pb-3 sm:px-6 sm:pb-4 lg:px-10">
                    <p className="text-4xl font-semibold leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Deloitte<span className="text-[var(--onair-green)]">.</span>
                    </p>
                </div>
            </header>

            <div className="h-24 sm:h-32 lg:h-36" aria-hidden />

            <main className="relative z-10 mx-auto flex min-h-[calc(100svh-9rem)] w-full max-w-lg flex-col justify-center px-5 py-10 sm:px-6 lg:px-10">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--onair-green)] sm:text-xs">
                    Private gathering
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Psst… what’s the secret word?
                </h1>
                <p className="font-accent mt-3 text-lg italic text-white/85 sm:text-xl">
                    Only those who know it may step inside.
                </p>

                <Form
                    action="/enter"
                    method="post"
                    className="mt-8 space-y-4"
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

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex h-12 items-center justify-center bg-[var(--onair-green)] px-8 font-semibold text-[var(--onair-ink)] transition hover:brightness-110 disabled:opacity-60"
                            >
                                {processing ? 'Checking…' : 'Come in'}
                            </button>
                        </>
                    )}
                </Form>
            </main>
        </div>
    );
}
