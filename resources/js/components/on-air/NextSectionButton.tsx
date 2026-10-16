import { useEffect, useState } from 'react';

const SECTION_IDS = ['hero', 'update', 'verzoek', 'boodschap', 'advent'] as const;

export function NextSectionButton() {
    const [prevId, setPrevId] = useState<string | null>(null);
    const [nextId, setNextId] = useState<string | null>(SECTION_IDS[1]);

    useEffect(() => {
        const update = () => {
            const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
                (el): el is HTMLElement => el !== null,
            );

            if (sections.length === 0) {
                return;
            }

            const marker = window.innerHeight * 0.4;
            let currentIndex = 0;

            for (let i = 0; i < sections.length; i++) {
                if (sections[i].getBoundingClientRect().top <= marker) {
                    currentIndex = i;
                }
            }

            setPrevId(sections[currentIndex - 1]?.id ?? null);
            setNextId(sections[currentIndex + 1]?.id ?? null);
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    function goTo(id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (!prevId && !nextId) {
        return null;
    }

    return (
        <div className="fixed right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-2 sm:right-5">
            <NavArrow
                disabled={!prevId}
                direction="up"
                label="Previous section"
                onClick={() => prevId && goTo(prevId)}
            />
            <NavArrow
                disabled={!nextId}
                direction="down"
                label="Next section"
                onClick={() => nextId && goTo(nextId)}
            />
        </div>
    );
}

function NavArrow({
    disabled,
    direction,
    label,
    onClick,
}: {
    disabled: boolean;
    direction: 'up' | 'down';
    label: string;
    onClick: () => void;
}) {
    const className =
        'flex size-11 items-center justify-center rounded-full border border-[var(--onair-green)]/50 bg-[var(--onair-ink)]/80 text-[var(--onair-green)] backdrop-blur-sm sm:size-12 ' +
        (disabled
            ? 'pointer-events-none opacity-25'
            : 'hover:border-[var(--onair-green)] hover:bg-[var(--onair-green)] hover:text-[var(--onair-ink)]');

    return (
        <button
            type="button"
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
            className={className}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
                aria-hidden
            >
                {direction === 'up' ? (
                    <path d="M6 15l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                )}
            </svg>
        </button>
    );
}
