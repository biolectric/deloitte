import { FormEvent } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

type Props = {
    announcementVideoUrl: string | null;
};

export default function DashboardAnnouncement({ announcementVideoUrl }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string | null } };
    const form = useForm<{ video: File | null }>({ video: null });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post('/dashboard/announcement', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => form.reset('video'),
        });
    }

    function removeVideo() {
        if (!confirm('Delete announcement video?')) {
            return;
        }

        router.delete('/dashboard/announcement', {
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title="Announcement" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {flash?.success ? (
                    <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </p>
                ) : null}

                <div className="max-w-3xl rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <h1 className="font-medium">Announcement video</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Replace the pinned update at the top of the public page.
                    </p>

                    {announcementVideoUrl ? (
                        <div className="mt-6 space-y-3">
                            <video
                                className="aspect-video w-full rounded-lg bg-black"
                                controls
                                src={announcementVideoUrl}
                            />
                            <button
                                type="button"
                                onClick={removeVideo}
                                className="inline-flex h-10 items-center rounded-md border border-red-500/40 px-4 text-sm text-red-600 hover:bg-red-500/10 dark:text-red-300"
                            >
                                Delete video
                            </button>
                        </div>
                    ) : (
                        <p className="mt-6 text-sm text-muted-foreground">No video uploaded yet.</p>
                    )}

                    <form onSubmit={submit} className="mt-6 flex flex-wrap items-end gap-4">
                        <label className="block">
                            <span className="mb-2 block text-sm text-muted-foreground">
                                New file
                            </span>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={(event) =>
                                    form.setData('video', event.target.files?.[0] ?? null)
                                }
                                className="text-sm"
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-60"
                        >
                            Upload
                        </button>
                    </form>
                    {form.errors.video ? (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-300">{form.errors.video}</p>
                    ) : null}
                </div>
            </div>
        </>
    );
}


DashboardAnnouncement.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Announcement', href: '/dashboard/announcement' },
    ],
};
