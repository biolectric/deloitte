import { Head, router, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

type Message = {
    id: number;
    segment: string;
    media_type: string;
    media_url: string;
    name: string | null;
    department: string | null;
    created_at: string;
};

type Props = {
    messages: Message[];
};

export default function DashboardMessages({ messages }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string | null } };

    return (
        <>
            <Head title="Boodschappen" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {flash?.success ? (
                    <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </p>
                ) : null}

                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="border-b border-border px-4 py-3">
                        <h1 className="font-medium">Boodschappen ({messages.length})</h1>
                        <p className="text-sm text-muted-foreground">
                            Video- en spraakboodschappen voor de rubrieken.
                        </p>
                    </div>
                    <ul className="divide-y divide-border px-4">
                        {messages.map((message) => (
                            <li key={message.id} className="flex items-start justify-between gap-4 py-4">
                                <div className="min-w-0">
                                    <p className="font-medium capitalize">
                                        {message.segment.replaceAll('_', ' ')} · {message.media_type}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {[message.name, message.department].filter(Boolean).join(' · ') ||
                                            'Anoniem'}
                                    </p>
                                    <a
                                        href={message.media_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-1 inline-block text-sm text-primary hover:underline"
                                    >
                                        Bestand openen
                                    </a>
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
                                    Verwijderen
                                </button>
                            </li>
                        ))}
                        {messages.length === 0 ? (
                            <li className="py-8 text-sm text-muted-foreground">Geen boodschappen.</li>
                        ) : null}
                    </ul>
                </div>
            </div>
        </>
    );
}

DashboardMessages.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Boodschappen', href: '/dashboard/messages' },
    ],
};
