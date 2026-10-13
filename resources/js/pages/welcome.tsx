import { Head } from '@inertiajs/react';

/** Legacy starter page — the public site lives at on-air/home. */
export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex min-h-screen items-center justify-center">
                <p>Redirect naar Deloitte On Air.</p>
            </div>
        </>
    );
}
