import { FormEvent } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import type { SegmentOption } from '@/types/on-air';

type Props = {
    segments: SegmentOption[];
};

export function MessageForm({ segments }: Props) {
    const { flash } = usePage().props as {
        flash?: { message_success?: string | null };
    };
    const form = useForm<{
        segment: string;
        media: File | null;
        name: string;
        department: string;
    }>({
        segment: segments[0]?.value ?? 'lost_in_translation',
        media: null,
        name: '',
        department: '',
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post('/messages', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.reset('media', 'name', 'department');
            },
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
                        Segment *
                    </span>
                    <select
                        value={form.data.segment}
                        onChange={(event) => form.setData('segment', event.target.value)}
                        className="h-12 w-full border border-white/15 bg-black/30 px-4 text-white outline-none focus:border-[var(--onair-green)]"
                    >
                        {segments.map((segment) => (
                            <option key={segment.value} value={segment.value} className="bg-[var(--onair-ink)]">
                                {segment.label}
                            </option>
                        ))}
                    </select>
                    {form.errors.segment ? (
                        <span className="mt-1 block text-sm text-red-300">{form.errors.segment}</span>
                    ) : null}
                </label>

                <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                        Video or voice file *
                    </span>
                    <input
                        type="file"
                        accept="video/*,audio/*"
                        onChange={(event) =>
                            form.setData('media', event.target.files?.[0] ?? null)
                        }
                        className="w-full border border-white/15 bg-black/30 px-4 py-3 text-sm text-white file:mr-4 file:border-0 file:bg-[var(--onair-green)] file:px-3 file:py-1.5 file:text-[var(--onair-ink)]"
                    />
                    {form.errors.media ? (
                        <span className="mt-1 block text-sm text-red-300">{form.errors.media}</span>
                    ) : null}
                </label>

                <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                        Your name
                    </span>
                    <input
                        value={form.data.name}
                        onChange={(event) => form.setData('name', event.target.value)}
                        className="h-12 w-full border border-white/15 bg-black/30 px-4 text-white outline-none focus:border-[var(--onair-green)]"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                        Department
                    </span>
                    <input
                        value={form.data.department}
                        onChange={(event) => form.setData('department', event.target.value)}
                        className="h-12 w-full border border-white/15 bg-black/30 px-4 text-white outline-none focus:border-[var(--onair-green)]"
                    />
                </label>

                <div className="sm:col-span-2">
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="inline-flex h-12 items-center justify-center border border-[var(--onair-green)] px-8 font-medium text-[var(--onair-green)] transition hover:bg-[var(--onair-green)] hover:text-[var(--onair-ink)] disabled:opacity-60"
                    >
                        {form.processing ? 'Uploading…' : 'Send message'}
                    </button>
                </div>
            </form>
        </div>
    );
}
