import { useState } from 'react';
import type { AdventDoorItem } from '@/types/on-air';

type Props = {
    doors: AdventDoorItem[];
};

export function AdventCalendar({ doors }: Props) {
    const [openDay, setOpenDay] = useState<number | null>(null);
    const active = doors.find((door) => door.day === openDay);

    return (
        <div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 sm:gap-3">
                {doors.map((door) => {
                    const isOpen = openDay === door.day;

                    return (
                        <button
                            key={door.id}
                            type="button"
                            disabled={!door.unlocked}
                            onClick={() => setOpenDay(isOpen ? null : door.day)}
                            className={`aspect-square border p-2 text-left transition ${
                                door.unlocked
                                    ? 'border-[var(--onair-green)]/50 bg-[var(--onair-green)]/10 text-white hover:bg-[var(--onair-green)]/20'
                                    : 'cursor-not-allowed border-white/10 bg-black/30 text-white/25'
                            } ${isOpen ? 'ring-2 ring-[var(--onair-green)]' : ''}`}
                        >
                            <span className="font-display text-2xl leading-none">{door.day}</span>
                            {door.unlocked ? (
                                <span className="mt-2 block truncate text-[0.65rem] uppercase tracking-wider text-white/55">
                                    open
                                </span>
                            ) : null}
                        </button>
                    );
                })}
            </div>

            {active ? (
                <div className="mt-6 border border-white/15 bg-black/30 p-6 animate-in fade-in duration-300">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--onair-green)]">
                        Day {active.day}
                    </p>
                    <h3 className="mt-2 font-display text-3xl text-white">{active.title}</h3>
                    <p className="mt-3 max-w-2xl text-white/70">{active.body}</p>
                </div>
            ) : (
                <p className="mt-6 text-white/45">
                    Click an unlocked door to see that day&apos;s activity.
                </p>
            )}
        </div>
    );
}
