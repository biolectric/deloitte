const steps = [
    'Medewerker opent de link',
    'Vult een verzoek of boodschap in',
    'Komt meteen live op de pagina',
    'Voedt rubrieken zoals Deloitte Wrapped',
];

export function HowItWorks() {
    return (
        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            <ol className="space-y-0">
                {steps.map((step, index) => (
                    <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
                        {index < steps.length - 1 ? (
                            <span className="absolute top-8 left-[0.9rem] h-[calc(100%-1.5rem)] w-px bg-[var(--onair-green)]/40" />
                        ) : null}
                        <span className="relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--onair-green)] font-display text-sm text-[var(--onair-ink)]">
                            {index + 1}
                        </span>
                        <p className="pt-0.5 text-lg text-white">{step}</p>
                        {index === 2 ? (
                            <div className="absolute top-0 right-0 hidden max-w-[12rem] border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/70 lg:block">
                                Beheerder modereert indien nodig
                            </div>
                        ) : null}
                    </li>
                ))}
            </ol>
            <div className="border border-white/15 bg-white/5 p-5 lg:hidden">
                <p className="text-sm text-white/70">
                    Beheerder modereert indien nodig
                </p>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 lg:col-span-2">
                gebruikersflow · 4 stappen, 1 beheerstap
            </p>
        </div>
    );
}
