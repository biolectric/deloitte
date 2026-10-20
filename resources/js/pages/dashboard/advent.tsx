import { FormEvent, useEffect, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

type AdventDoor = {
    id: number;
    day: number;
    title: string;
    body: string;
    media_type: 'image' | 'video' | null;
    media_url: string | null;
    unlock_date: string;
};

type Props = {
    adventDoors: AdventDoor[];
};

export default function DashboardAdvent({ adventDoors }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string | null } };

    return (
        <>
            <Head title="Advent calendar" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {flash?.success ? (
                    <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </p>
                ) : null}

                <div>
                    <h1 className="font-medium">Advent calendar</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Edit the title, text and optional image or video for each door.
                    </p>
                </div>

                <div className="space-y-4">
                    {adventDoors.map((door) => (
                        <AdventEditor key={door.id} door={door} />
                    ))}
                </div>
            </div>
        </>
    );
}

function formatUnlockDate(value: string): string {
    const date = new Date(value.includes('T') ? value : `${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function AdventEditor({ door }: { door: AdventDoor }) {
    const [title, setTitle] = useState(door.title);
    const [body, setBody] = useState(door.body);
    const [media, setMedia] = useState<File | null>(null);
    const [removeMedia, setRemoveMedia] = useState(false);
    const [fileKey, setFileKey] = useState(0);

    useEffect(() => {
        setTitle(door.title);
        setBody(door.body);
        setMedia(null);
        setRemoveMedia(false);
        setFileKey((key) => key + 1);
    }, [door.title, door.body, door.media_url, door.media_type]);

    function save(event: FormEvent) {
        event.preventDefault();
        router.post(
            `/dashboard/advent/${door.id}`,
            {
                title,
                body,
                media,
                remove_media: removeMedia,
                _method: 'put',
            },
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setMedia(null);
                    setRemoveMedia(false);
                    setFileKey((key) => key + 1);
                },
            },
        );
    }

    const showCurrentMedia = door.media_url && !removeMedia;

    return (
        <form
            onSubmit={save}
            className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border"
        >
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Day {door.day} · opens {formatUnlockDate(door.unlock_date)}
            </p>
            <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-3 h-11 w-full rounded-md border border-input bg-transparent px-3"
            />
            <textarea
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={3}
                className="mt-3 w-full rounded-md border border-input bg-transparent px-3 py-2"
            />

            <div className="mt-3 space-y-3">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Image or video (optional)
                </p>

                {showCurrentMedia ? (
                    <div className="overflow-hidden rounded-md border border-input bg-muted/30">
                        {door.media_type === 'video' ? (
                            <video
                                className="aspect-video max-h-48 w-full object-contain"
                                controls
                                src={door.media_url!}
                            />
                        ) : (
                            <img
                                src={door.media_url!}
                                alt={`Day ${door.day}`}
                                className="max-h-48 w-full object-contain"
                            />
                        )}
                        <button
                            type="button"
                            onClick={() => setRemoveMedia(true)}
                            className="w-full border-t border-input px-3 py-2 text-left text-sm text-red-600 hover:bg-muted dark:text-red-300"
                        >
                            Remove media
                        </button>
                    </div>
                ) : null}

                {removeMedia && door.media_url ? (
                    <p className="text-sm text-muted-foreground">
                        Media will be removed on save.
                    </p>
                ) : null}

                <input
                    key={fileKey}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime"
                    onChange={(event) => {
                        setMedia(event.target.files?.[0] ?? null);
                        setRemoveMedia(false);
                    }}
                    className="w-full text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-primary-foreground"
                />
            </div>

            <button
                type="submit"
                className="mt-3 inline-flex h-10 items-center rounded-md border border-input px-4 text-sm hover:bg-muted"
            >
                Save
            </button>
        </form>
    );
}

DashboardAdvent.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Advent calendar', href: '/dashboard/advent' },
    ],
};
