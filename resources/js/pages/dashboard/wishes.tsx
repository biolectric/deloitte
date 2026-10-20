import { Head, router, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

type Wish = {
    id: number;
    media_type: string | null;
    media_url: string | null;
    body: string | null;
    name: string;
    created_at: string;
};

type Props = {
    wishes: Wish[];
};

export default function DashboardWishes({ wishes }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string | null } };

    return (
        <>
            <Head title="Christmas wishes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {flash?.success ? (
                    <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </p>
                ) : null}

                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="border-b border-border px-4 py-3">
                        <h1 className="font-medium">Christmas wishes ({wishes.length})</h1>
                        <p className="text-sm text-muted-foreground">
                            Christmas wishes — video, voice or written wish.
                        </p>
                    </div>
                    <ul className="divide-y divide-border px-4">
                        {wishes.map((wish) => (
                            <li key={wish.id} className="flex items-start justify-between gap-4 py-4">
                                <div className="min-w-0">
                                    <p className="font-medium capitalize">
                                        {wish.media_type ? `${wish.media_type} wish` : 'Wish'}
                                    </p>
                                    <p className="text-sm text-muted-foreground">{wish.name}</p>
                                    {wish.body ? (
                                        <p className="mt-2 whitespace-pre-wrap text-sm">{wish.body}</p>
                                    ) : null}
                                    {wish.media_url ? (
                                        <a
                                            href={wish.media_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-1 inline-block text-sm text-primary hover:underline"
                                        >
                                            Open file
                                        </a>
                                    ) : null}
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        router.delete(`/dashboard/wishes/${wish.id}`, {
                                            preserveScroll: true,
                                        })
                                    }
                                    className="shrink-0 text-sm text-red-600 hover:underline dark:text-red-300"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                        {wishes.length === 0 ? (
                            <li className="py-8 text-sm text-muted-foreground">No wishes.</li>
                        ) : null}
                    </ul>
                </div>
            </div>
        </>
    );
}

DashboardWishes.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Christmas wishes', href: '/dashboard/wishes' },
    ],
};
