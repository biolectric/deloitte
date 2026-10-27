import { FormEvent } from 'react';
import { useForm, usePage } from '@inertiajs/react';

import { DEPARTMENTS } from '@/lib/departments';
import { MESSAGE_TYPES, type MessageTypeValue } from '@/lib/message-types';

export function MessageForm() {
    const { flash } = usePage().props as {
        flash?: { message_success?: string | null };
    };
    const form = useForm<{
        type: MessageTypeValue | '';
        body: string;
        name: string;
        department: string;
    }>({
        type: '',
        body: '',
        name: '',
        department: '',
    });

    const selectedType = MESSAGE_TYPES.find((item) => item.value === form.data.type);

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post('/messages', {
            preserveScroll: true,
            onSuccess: () => form.reset('type', 'body', 'name', 'department'),
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
                        Message type *
                    </span>
                    <select
                        value={form.data.type}
                        required
                        onChange={(event) =>
                            form.setData('type', event.target.value as MessageTypeValue | '')
                        }
                        className="h-12 w-full border border-white/15 bg-black/30 px-4 text-white outline-none focus:border-[var(--onair-green)]"
                    >
                        <option value="" className="bg-[var(--onair-ink)]">
                            What would you like to share?
                        </option>
                        {MESSAGE_TYPES.map((item) => (
                            <option
                                key={item.value}
                                value={item.value}
                                className="bg-[var(--onair-ink)]"
                            >
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {form.errors.type ? (
                        <span className="mt-1 block text-sm text-red-300">{form.errors.type}</span>
                    ) : null}
                </label>

                <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                        Your message *
                    </span>
                    <textarea
                        value={form.data.body}
                        required
                        onChange={(event) => form.setData('body', event.target.value)}
                        rows={5}
                        placeholder={selectedType?.hint ?? 'Write your message…'}
                        className="w-full border border-white/15 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[var(--onair-green)]"
                    />
                    {form.errors.body ? (
                        <span className="mt-1 block text-sm text-red-300">{form.errors.body}</span>
                    ) : null}
                </label>

                <label className="block">
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

                <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                        Offering portfolio
                    </span>
                    <select
                        value={form.data.department}
                        onChange={(event) => form.setData('department', event.target.value)}
                        className="h-12 w-full border border-white/15 bg-black/30 px-4 text-white outline-none focus:border-[var(--onair-green)]"
                    >
                        <option value="" className="bg-[var(--onair-ink)]">
                            Select offering portfolio
                        </option>
                        {DEPARTMENTS.map((department) => (
                            <option
                                key={department}
                                value={department}
                                className="bg-[var(--onair-ink)]"
                            >
                                {department}
                            </option>
                        ))}
                    </select>
                    {form.errors.department ? (
                        <span className="mt-1 block text-sm text-red-300">
                            {form.errors.department}
                        </span>
                    ) : null}
                </label>

                <div className="sm:col-span-2">
                    <button
                        type="submit"
                        disabled={form.processing}
                        className="inline-flex h-12 items-center justify-center border border-[var(--onair-green)] px-8 text-base font-medium text-[var(--onair-green)] transition hover:bg-[var(--onair-green)] hover:text-[var(--onair-ink)] disabled:opacity-60"
                    >
                        {form.processing ? 'Sending…' : 'Send message'}
                    </button>
                </div>
            </form>
        </div>
    );
}
