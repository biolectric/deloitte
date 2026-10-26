import { FormEvent, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

import { DEPARTMENTS } from '@/lib/departments';
import { MESSAGE_TYPES, type MessageTypeValue } from '@/lib/message-types';

export function MessageForm() {
    const { flash } = usePage().props as {
        flash?: { message_success?: string | null };
    };
    const [fileInputKey, setFileInputKey] = useState(0);
    const form = useForm<{
        type: MessageTypeValue | '';
        media: File | null;
        body: string;
        name: string;
        nominee: string;
        department: string;
    }>({
        type: '',
        media: null,
        body: '',
        name: '',
        nominee: '',
        department: '',
    });

    const selectedType = MESSAGE_TYPES.find((item) => item.value === form.data.type);
    const isPersonOfTheYear = form.data.type === 'person_of_the_year';

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post('/messages', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.reset('type', 'media', 'body', 'name', 'nominee', 'department');
                setFileInputKey((key) => key + 1);
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

            <p className="text-sm text-white/55">
                Choose the kind of message you want to send, then add a video/voice file{' '}
                <span className="text-white/80">or</span> write your own text — you don’t need
                both.
            </p>

            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                        Message type *
                    </span>
                    <select
                        value={form.data.type}
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

                {selectedType ? (
                    <div className="sm:col-span-2 border border-white/10 bg-black/20 px-4 py-3">
                        <p className="text-sm text-white/70">{selectedType.hint}</p>
                        {'prompts' in selectedType && selectedType.prompts ? (
                            <ul className="mt-3 space-y-1.5 text-sm text-white/50">
                                {selectedType.prompts.map((prompt) => (
                                    <li key={prompt}>— {prompt}</li>
                                ))}
                            </ul>
                        ) : null}
                    </div>
                ) : null}

                {isPersonOfTheYear ? (
                    <label className="block sm:col-span-2">
                        <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                            Nominee *
                        </span>
                        <input
                            value={form.data.nominee}
                            onChange={(event) => form.setData('nominee', event.target.value)}
                            placeholder="Who are you nominating?"
                            className="h-12 w-full border border-white/15 bg-black/30 px-4 text-white outline-none focus:border-[var(--onair-green)]"
                        />
                        {form.errors.nominee ? (
                            <span className="mt-1 block text-sm text-red-300">
                                {form.errors.nominee}
                            </span>
                        ) : null}
                    </label>
                ) : null}

                {!isPersonOfTheYear ? (
                    <label className="block sm:col-span-2">
                        <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                            Video or voice file
                        </span>
                        <input
                            key={fileInputKey}
                            type="file"
                            accept="video/*,audio/*"
                            onChange={(event) =>
                                form.setData('media', event.target.files?.[0] ?? null)
                            }
                            className="w-full border border-white/15 bg-black/30 px-4 py-3 text-sm text-white file:mr-4 file:border-0 file:bg-[var(--onair-green)] file:px-3 file:py-1.5 file:text-[var(--onair-ink)]"
                        />
                        {form.errors.media ? (
                            <span className="mt-1 block text-sm text-red-300">
                                {form.errors.media}
                            </span>
                        ) : null}
                    </label>
                ) : null}

                <label className="block sm:col-span-2">
                    <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/55">
                        {isPersonOfTheYear ? 'Why are you nominating them? *' : 'Your message'}
                    </span>
                    <textarea
                        value={form.data.body}
                        onChange={(event) => form.setData('body', event.target.value)}
                        rows={isPersonOfTheYear ? 4 : 5}
                        placeholder={
                            isPersonOfTheYear
                                ? 'Write a short message about why they deserve it'
                                : 'Write freely — inspiration above is optional'
                        }
                        className="w-full border border-white/15 bg-black/30 px-4 py-3 text-white outline-none focus:border-[var(--onair-green)]"
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
                        className="inline-flex h-12 items-center justify-center border border-[var(--onair-green)] px-8 font-medium text-[var(--onair-green)] transition hover:bg-[var(--onair-green)] hover:text-[var(--onair-ink)] disabled:opacity-60"
                    >
                        {form.processing ? 'Uploading…' : 'Send message'}
                    </button>
                </div>
            </form>
        </div>
    );
}
