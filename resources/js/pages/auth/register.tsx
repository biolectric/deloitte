import { Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { login } from '@/routes';

export default function Register() {
    return (
        <>
            <Head title="Registration disabled" />
            <div className="flex flex-col gap-4 text-center">
                <p className="text-muted-foreground">
                    Public registration is disabled. Editorial accounts are
                    created internally.
                </p>
                <TextLink href={login()} className="mx-auto">
                    Go to login
                </TextLink>
            </div>
        </>
    );
}

Register.layout = {
    title: 'Registration',
    description: 'Editorial only',
};
