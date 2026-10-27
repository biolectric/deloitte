import { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { AdventDoorItem } from '@/types/on-air';

type Props = {
    doors: AdventDoorItem[];
    previewMode?: boolean;
};

export function AdventCalendar({ doors, previewMode = false }: Props) {
    const [openDay, setOpenDay] = useState<number | null>(null);
    const active = doors.find((door) => door.day === openDay) ?? null;

    return (
        <div>
            {previewMode ? (
                <p className="mb-4 border border-[var(--onair-green)]/30 bg-[var(--onair-green)]/10 px-4 py-3 text-sm text-[var(--onair-green)]">
                    Admin preview: all doors are unlocked so you can test content before the
                    unlock date.
                </p>
            ) : null}

            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3">
                {doors.map((door) => {
                    const isPreviewOnly = door.unlocked && !door.date_unlocked;
                    const showMedia = door.unlocked && Boolean(door.media_url);

                    return (
                        <button
                            key={door.id}
                            type="button"
                            disabled={!door.unlocked}
                            onClick={() => setOpenDay(door.day)}
                            className={`relative aspect-square overflow-hidden border text-left transition ${
                                door.unlocked
                                    ? 'border-[var(--onair-green)]/50 bg-[var(--onair-green)]/10 text-white hover:border-[var(--onair-green)]'
                                    : 'cursor-not-allowed border-white/10 bg-black/30 text-white/25'
                            }`}
                        >
                            {showMedia ? (
                                <>
                                    {door.media_type === 'video' ? (
                                        <video
                                            src={door.media_url!}
                                            muted
                                            playsInline
                                            loop
                                            autoPlay
                                            preload="metadata"
                                            className="absolute inset-0 size-full object-cover"
                                            aria-hidden
                                        />
                                    ) : (
                                        <img
                                            src={door.media_url!}
                                            alt=""
                                            className="absolute inset-0 size-full object-cover"
                                        />
                                    )}
                                    <span className="absolute inset-0 bg-black/45" aria-hidden />
                                </>
                            ) : null}

                            <span className="relative z-10 flex h-full flex-col p-2">
                                <span className="font-display text-2xl leading-none drop-shadow-sm">
                                    {door.day}
                                </span>
                                {door.unlocked ? (
                                    <span className="mt-auto block truncate text-[0.65rem] uppercase tracking-wider text-white/80 drop-shadow-sm">
                                        {isPreviewOnly ? 'preview' : 'open'}
                                    </span>
                                ) : null}
                            </span>
                        </button>
                    );
                })}
            </div>

            <p className="mt-6 text-white/45">
                Click an unlocked door to see that day&apos;s activity.
            </p>

            <Dialog
                open={active !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setOpenDay(null);
                    }
                }}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto border-white/15 bg-[var(--onair-ink)] text-white sm:max-w-lg">
                    {active ? (
                        <>
                            <DialogHeader>
                                <p className="text-xs uppercase tracking-[0.2em] text-[var(--onair-green)]">
                                    Day {active.day}
                                    {!active.date_unlocked ? ' · admin preview' : ''}
                                </p>
                                <DialogTitle className="font-display text-3xl tracking-wide text-white">
                                    {active.title}
                                </DialogTitle>
                                <DialogDescription className="text-base text-white/70">
                                    {active.body}
                                </DialogDescription>
                            </DialogHeader>

                            {active.media_url ? (
                                <div className="overflow-hidden rounded-lg border border-white/10 bg-black/40">
                                    {active.media_type === 'video' ? (
                                        <video
                                            className="aspect-video w-full object-contain"
                                            controls
                                            src={active.media_url}
                                        />
                                    ) : (
                                        <img
                                            src={active.media_url}
                                            alt={active.title}
                                            className="max-h-[24rem] w-full object-contain"
                                        />
                                    )}
                                </div>
                            ) : null}
                        </>
                    ) : null}
                </DialogContent>
            </Dialog>
        </div>
    );
}
