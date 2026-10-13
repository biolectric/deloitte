import { Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { login } from '@/routes';

export default function Register() {
    return (
        <>
            <Head title="Registratie uitgeschakeld" />
            <div className="flex flex-col gap-4 text-center">
                <p className="text-muted-foreground">
                    Publieke registratie is uitgeschakeld. Redactieaccounts worden
                    intern aangemaakt.
                </p>
                <TextLink href={login()} className="mx-auto">
                    Naar login
                </TextLink>
            </div>
        </>
    );
}

Register.layout = {
    title: 'Registratie',
    description: 'Alleen voor redactie',
};
