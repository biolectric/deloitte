import { FormEvent, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

type AdventDoor = {
    id: number;
    day: number;
    title: string;
    body: string;
    unlock_date: string;
};

type Props = {
    adventDoors: AdventDoor[];
};

export default function DashboardAdvent({ adventDoors }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string | null } };

    return (
        <>
            <Head title="Adventskalender" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {flash?.success ? (
                    <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </p>
                ) : null}

                <div>
                    <h1 className="font-medium">Adventskalender</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Pas titel en tekst van elk vakje aan.
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

    return date.toLocaleDateString('nl-BE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function AdventEditor({ door }: { door: AdventDoor }) {
    const [title, setTitle] = useState(door.title);
    const [body, setBody] = useState(door.body);

    function save(event: FormEvent) {
        event.preventDefault();
        router.put(
            `/dashboard/advent/${door.id}`,
            { title, body },
            { preserveScroll: true },
        );
    }

    return (
        <form
            onSubmit={save}
            className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border"
        >
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Dag {door.day} · opent {formatUnlockDate(door.unlock_date)}
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
            <button
                type="submit"
                className="mt-3 inline-flex h-10 items-center rounded-md border border-input px-4 text-sm hover:bg-muted"
            >
                Opslaan
            </button>
        </form>
    );
}

DashboardAdvent.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Adventskalender', href: '/dashboard/advent' },
    ],
};
