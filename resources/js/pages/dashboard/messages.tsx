import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { downloadMedia, withExtension } from '@/lib/save-media';
import { dashboard } from '@/routes';

type Message = {
    id: number;
    type: string | null;
    type_label: string;
    media_type: string | null;
    media_url: string | null;
    media_filename: string | null;
    has_media: boolean;
    body: string | null;
    name: string | null;
    nominee: string | null;
    department: string | null;
    created_at: string;
};

type Props = {
    messages: Message[];
};

export default function DashboardMessages({ messages }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string | null } };
    const [saveTarget, setSaveTarget] = useState<Message | null>(null);
    const [filename, setFilename] = useState('');
    const [downloading, setDownloading] = useState(false);

    function openSaveDialog(message: Message) {
        setSaveTarget(message);
        setFilename(message.media_filename ?? 'download');
    }

    function closeSaveDialog() {
        if (downloading) {
            return;
        }
        setSaveTarget(null);
        setFilename('');
    }

    async function confirmDownload() {
        if (!saveTarget?.media_filename) {
            return;
        }

        const name = withExtension(filename, saveTarget.media_filename);
        setDownloading(true);

        try {
            await downloadMedia(`/dashboard/messages/${saveTarget.id}/download`, name);
            setSaveTarget(null);
            setFilename('');
        } catch {
            window.alert('Could not download the file. Please try again.');
        } finally {
            setDownloading(false);
        }
    }

    return (
        <>
            <Head title="Messages" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {flash?.success ? (
                    <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </p>
                ) : null}

                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="border-b border-border px-4 py-3">
                        <h1 className="font-medium">Messages ({messages.length})</h1>
                        <p className="text-sm text-muted-foreground">
                            Compliments, end-of-year messages and Person of the Year nominations.
                        </p>
                    </div>
                    <ul className="divide-y divide-border px-4">
                        {messages.map((message) => (
                            <li key={message.id} className="flex items-start justify-between gap-4 py-4">
                                <div className="min-w-0">
                                    <p className="font-medium">{message.type_label}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {[
                                            message.nominee
                                                ? `Nominee: ${message.nominee}`
                                                : null,
                                            message.media_type,
                                            message.name ? `From: ${message.name}` : null,
                                            message.department,
                                        ]
                                            .filter(Boolean)
                                            .join(' · ') || 'Anonymous'}
                                    </p>
                                    {message.body ? (
                                        <p className="mt-2 whitespace-pre-wrap text-sm">{message.body}</p>
                                    ) : null}
                                    {message.has_media ? (
                                        <div className="mt-2 flex flex-wrap gap-4 text-sm">
                                            <a
                                                href={`/dashboard/messages/${message.id}/preview`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                Open file
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => openSaveDialog(message)}
                                                className="text-primary hover:underline"
                                            >
                                                Save as
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        router.delete(`/dashboard/messages/${message.id}`, {
                                            preserveScroll: true,
                                        })
                                    }
                                    className="shrink-0 text-sm text-red-600 hover:underline dark:text-red-300"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                        {messages.length === 0 ? (
                            <li className="py-8 text-sm text-muted-foreground">No messages.</li>
                        ) : null}
                    </ul>
                </div>
            </div>

            <Dialog
                open={saveTarget !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        closeSaveDialog();
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Save as</DialogTitle>
                        <DialogDescription>
                            Choose a file name, then download it to your device.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                        <label htmlFor="save-filename" className="text-sm font-medium">
                            File name
                        </label>
                        <Input
                            id="save-filename"
                            value={filename}
                            onChange={(event) => setFilename(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    void confirmDownload();
                                }
                            }}
                            autoFocus
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeSaveDialog}
                            disabled={downloading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={() => void confirmDownload()}
                            disabled={downloading || filename.trim() === ''}
                        >
                            {downloading ? 'Downloading…' : 'Download'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

DashboardMessages.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Messages', href: '/dashboard/messages' },
    ],
};
