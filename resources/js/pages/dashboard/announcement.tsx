import { FormEvent } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
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

    return (
        <>
            <Head title="Aankondiging" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {flash?.success ? (
                    <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </p>
                ) : null}

                <div className="max-w-3xl rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <h1 className="font-medium">Aankondigingsvideo</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Vervang de vaste update bovenaan de publieke pagina.
                    </p>

                    {announcementVideoUrl ? (
                        <video
                            className="mt-6 aspect-video w-full rounded-lg bg-black"
                            controls
                            src={announcementVideoUrl}
                        />
                    ) : (
                        <p className="mt-6 text-sm text-muted-foreground">Nog geen video geplaatst.</p>
                    )}

                    <form onSubmit={submit} className="mt-6 flex flex-wrap items-end gap-4">
                        <label className="block">
                            <span className="mb-2 block text-sm text-muted-foreground">
                                Nieuw bestand
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
                            Uploaden
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
        { title: 'Aankondiging', href: '/dashboard/announcement' },
    ],
};
