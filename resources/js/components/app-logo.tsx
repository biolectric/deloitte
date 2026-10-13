import { usePage } from '@inertiajs/react';
import { logoUrl } from '@/lib/brand';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            <img
                src={logoUrl}
                alt=""
                className="size-12 shrink-0 rounded-md object-cover object-left"
            />
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {name}
                </span>
            </div>
        </>
    );
}
