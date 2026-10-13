import { FormEvent } from 'react';
import { useForm } from '@inertiajs/react';

export function SongForm() {
    const form = useForm({
        title: '',
        artist: '',
        name: '',
        department: '',
        reason: '',
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post('/songs', {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    }

    return (
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <Field
                label="Titel *"
                value={form.data.title}
                error={form.errors.title}
                onChange={(value) => form.setData('title', value)}
                required
            />
            <Field
                label="Artiest *"
                value={form.data.artist}
                error={form.errors.artist}
                onChange={(value) => form.setData('artist', value)}
                required
            />
            <Field
                label="Jouw naam"
                value={form.data.name}
                error={form.errors.name}
                onChange={(value) => form.setData('name', value)}
            />
            <Field
                label="Afdeling"
                value={form.data.department}
                error={form.errors.department}
                onChange={(value) => form.setData('department', value)}
            />
            <div className="sm:col-span-2">
                <Field
                    label="Korte reden"
                    value={form.data.reason}
                    error={form.errors.reason}
                    onChange={(value) => form.setData('reason', value)}
                />
            </div>
            <div className="sm:col-span-2">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="inline-flex h-12 items-center justify-center bg-[var(--onair-green)] px-8 font-medium text-[var(--onair-ink)] transition hover:brightness-110 disabled:opacity-60"
                >
                    {form.processing ? 'Versturen…' : 'Verzoek insturen'}
                </button>
            </div>
        </form>
    );
}

function Field({
    label,
    value,
    onChange,
    error,
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                {label}
            </span>
            <input
                value={value}
                required={required}
                onChange={(event) => onChange(event.target.value)}
                className="h-12 w-full border border-white/15 bg-black/30 px-4 text-white outline-none transition focus:border-[var(--onair-green)]"
            />
            {error ? <span className="mt-1 block text-sm text-red-300">{error}</span> : null}
        </label>
    );
}
