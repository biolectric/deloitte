import { useEffect, useState } from 'react';

export function NextSectionButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const update = () => {
            setVisible(window.scrollY > window.innerHeight * 0.4);
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <button
            type="button"
            aria-label="Back to top"
            onClick={() =>
                document.getElementById('hero')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
            className="fixed right-3 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--onair-green)]/50 bg-[var(--onair-ink)]/80 text-[var(--onair-green)] backdrop-blur-sm hover:border-[var(--onair-green)] hover:bg-[var(--onair-green)] hover:text-[var(--onair-ink)] sm:right-5 sm:size-12"
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
                aria-hidden
            >
                <path
                    d="M3 10.5 12 3l9 7.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 9.5V21h14V9.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}
