import { FormEvent } from 'react';
import { useForm, usePage } from '@inertiajs/react';

export function NominationForm() {
    const { flash } = usePage().props as {
        flash?: { message_success?: string | null };
    };
    const form = useForm({
        type: 'person_of_the_year' as const,
        nominee: '',
        body: '',
        name: '',
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post('/messages', {
            preserveScroll: true,
            onSuccess: () => form.reset('nominee', 'body', 'name'),
        });
    }

    return (
        <div className="space-y-4">
            {flash?.message_success ? (
                <p className="border border-[var(--onair-green)]/40 bg-[var(--onair-green)]/10 px-4 py-3 text-[var(--onair-green)]">
                    {flash.message_success}
                </p>
            ) : null}

            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                        Nominee *
                    </span>
                    <input
                        value={form.data.nominee}
                        required
                        onChange={(event) => form.setData('nominee', event.target.value)}
                        placeholder="Who are you nominating?"
                        className="h-12 w-full border border-white/15 bg-black/30 px-4 text-white outline-none placeholder:text-white/35 focus:border-[var(--onair-green)]"
                    />
                    {form.errors.nominee ? (
                        <span className="mt-1 block text-sm text-red-300">{form.errors.nominee}</span>
                    ) : null}
                </label>

                <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                        Why are you nominating them? *
                    </span>
                    <textarea
                        value={form.data.body}
                        required
                        onChange={(event) => form.setData('body', event.target.value)}
                        rows={4}
                        placeholder="Tell us briefly why they deserve it"
                        className="w-full border border-white/15 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[var(--onair-green)]"
                    />
                    {form.errors.body ? (
                        <span className="mt-1 block text-sm text-red-300">{form.errors.body}</span>
                    ) : null}
                </label>

                <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                        Full name *
                    </span>
                    <input
                        value={form.data.name}
                        required
                        onChange={(event) => form.setData('name', event.target.value)}
                        className="h-12 w-full border border-white/15 bg-black/30 px-4 text-white outline-none focus:border-[var(--onair-green)]"
                    />
                    {form.errors.name ? (
                        <span className="mt-1 block text-sm text-red-300">{form.errors.name}</span>
                    ) : null}
                </label>

                <div className="sm:col-span-2">
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="inline-flex h-12 items-center justify-center border border-[var(--onair-green)] px-8 text-base font-medium text-[var(--onair-green)] transition hover:bg-[var(--onair-green)] hover:text-[var(--onair-ink)] disabled:opacity-60"
                    >
                        {form.processing ? 'Sending…' : 'Submit nomination'}
                    </button>
                </div>
            </form>
        </div>
    );
}
