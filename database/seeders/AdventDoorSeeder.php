<?php

namespace Database\Seeders;

use App\Models\AdventDoor;
use Illuminate\Database\Seeder;

class AdventDoorSeeder extends Seeder
{
    public function run(): void
    {
        $activities = [
            1 => ['Warm-up playlist', 'Share your favourite December song and set the tone for the month.'],
            2 => ['Coffee chat', 'Schedule a short coffee with someone from another department.'],
            3 => ['Throwback Thursday', 'Send an old team photo to editorial.'],
            4 => ['Karaoke warm-up', 'Practise one verse — it might end up in Wrapped.'],
            5 => ['Green Line tip', 'Share a sustainability tip for The Green Line.'],
            6 => ['Out of Office preview', 'What do you wish for yourself in 2027?'],
            7 => ['Desk DJ', 'Curate three songs for the open space today.'],
            8 => ['Lost in Translation', 'Send a short video explaining a typical piece of jargon.'],
            9 => ['Team shout-out', 'Tag a colleague who made a difference this year.'],
            10 => ['Silent disco lunch', 'Eat together with earbuds and the same playlist.'],
            11 => ['Wrapped teaser', 'Vote for the song that absolutely must be in Wrapped.'],
            12 => ['Hallway concert', 'Sing along (quietly) with the request line in the corridor.'],
            13 => ['Editorial pitch', 'Send one segment idea to the On Air crew.'],
            14 => ['Appreciation day', 'Write a short message for someone on your team.'],
            15 => ['Studio visit', 'Watch the announcement video at the top of the page.'],
            16 => ['Playlist swap', 'Swap playlists with a colleague from another service line.'],
            17 => ['Voice note', 'Upload a voice message for the broadcast.'],
            18 => ['Trivia warm-up', 'Answer the Deloitte trivia of the day on Teams.'],
            19 => ['Dress rehearsal', 'Pick your On Air look for 24 December.'],
            20 => ['Final song push', 'One more request — the queue is almost full.'],
            21 => ['Message marathon', 'Fill the segments Lost in Translation, Green Line or OOO.'],
            22 => ['Countdown check', 'Share the site link in your team chat.'],
            23 => ['Eve of Air', 'Final moderation check: review the live queue.'],
            24 => ['Deloitte On Air live', 'The Year-End Review — tune in and enjoy.'],
        ];

        foreach ($activities as $day => [$title, $body]) {
            AdventDoor::query()->updateOrCreate(
                ['day' => $day],
                [
                    'title' => $title,
                    'body' => $body,
                    'unlock_date' => sprintf('2026-12-%02d', $day),
                ],
            );
        }
    }
}
