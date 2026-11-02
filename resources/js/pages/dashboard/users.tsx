import { FormEvent } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

type UserRow = {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    created_at: string | null;
};

type Props = {
    users: UserRow[];
};

export default function DashboardUsers({ users }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string | null } };
    const form = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });

    function submit(event: FormEvent) {
        event.preventDefault();
        form.post('/dashboard/users', {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    }

    return (
        <>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {flash?.success ? (
                    <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-300">
                        {flash.success}
                    </p>
                ) : null}

                <div className="max-w-3xl rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <h1 className="font-medium">Create user</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Add a backoffice login with email and password.
                    </p>

                    <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
                        <label className="block sm:col-span-2">
                            <span className="mb-2 block text-sm text-muted-foreground">Email</span>
                            <input
                                type="email"
                                autoComplete="off"
                                value={form.data.email}
                                onChange={(event) => form.setData('email', event.target.value)}
                                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring"
                            />
                            {form.errors.email ? (
                                <span className="mt-2 block text-sm text-red-600 dark:text-red-300">
                                    {form.errors.email}
                                </span>
                            ) : null}
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm text-muted-foreground">Password</span>
                            <input
                                type="password"
                                autoComplete="new-password"
                                value={form.data.password}
                                onChange={(event) => form.setData('password', event.target.value)}
                                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring"
                            />
                            {form.errors.password ? (
                                <span className="mt-2 block text-sm text-red-600 dark:text-red-300">
                                    {form.errors.password}
                                </span>
                            ) : null}
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm text-muted-foreground">
                                Confirm password
                            </span>
                            <input
                                type="password"
                                autoComplete="new-password"
                                value={form.data.password_confirmation}
                                onChange={(event) =>
                                    form.setData('password_confirmation', event.target.value)
                                }
                                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-ring"
                            />
                        </label>

                        <div className="sm:col-span-2">
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-60"
                            >
                                {form.processing ? 'Creating…' : 'Create user'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="border-b border-border px-4 py-3">
                        <h2 className="font-medium">Users ({users.length})</h2>
                    </div>
                    <ul className="divide-y divide-border px-4">
                        {users.map((user) => (
                            <li key={user.id} className="flex items-start justify-between gap-4 py-4">
                                <div className="min-w-0">
                                    <p className="truncate font-medium">{user.email}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {user.is_admin ? 'Admin' : 'User'}
                                        {user.created_at
                                            ? ` · ${new Date(user.created_at).toLocaleString('en-GB')}`
                                            : ''}
                                    </p>
                                </div>
                            </li>
                        ))}
                        {users.length === 0 ? (
                            <li className="py-8 text-sm text-muted-foreground">No users yet.</li>
                        ) : null}
                    </ul>
                </div>
            </div>
        </>
    );
}

DashboardUsers.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Users', href: '/dashboard/users' },
    ],
};
