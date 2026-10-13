<?php

namespace Database\Seeders;

use App\Models\AdventDoor;
use Illuminate\Database\Seeder;

class AdventDoorSeeder extends Seeder
{
    public function run(): void
    {
        $activities = [
            1 => ['Warm-up playlist', 'Deel je favoriete decembernummer en zet de toon voor de maand.'],
            2 => ['Coffee chat', 'Plan een korte koffie met iemand van een andere afdeling.'],
            3 => ['Throwback Thursday', 'Stuur een oude teamfoto door naar de redactie.'],
            4 => ['Karaoke warm-up', 'Oefen één couplet — misschien belandt het in Wrapped.'],
            5 => ['Green Line tip', 'Deel een duurzaamheidstip voor The Green Line.'],
            6 => ['Out of Office preview', 'Wat wens je jezelf toe in 2027?'],
            7 => ['Desk DJ', 'Curate drie nummers voor de open space vandaag.'],
            8 => ['Lost in Translation', 'Stuur een korte video met een typische jargon-uitleg.'],
            9 => ['Team shout-out', 'Tag een collega die dit jaar het verschil maakte.'],
            10 => ['Silent disco lunch', 'Eet samen met oortjes en dezelfde playlist.'],
            11 => ['Wrapped teaser', 'Stem op het nummer dat absoluut in Wrapped moet.'],
            12 => ['Hallway concert', 'Zing (stil) mee met de verzoeklijn in de gang.'],
            13 => ['Redactie pitch', 'Stuur één idee voor een rubriek naar de On Air-crew.'],
            14 => ['Appreciation day', 'Schrijf een korte boodschap voor iemand in je team.'],
            15 => ['Studio visit', 'Bekijk de aankondigingsvideo bovenaan de pagina.'],
            16 => ['Playlist swap', 'Wissel playlists met een collega van een andere service line.'],
            17 => ['Voice note', 'Laad een spraakboodschap op voor de uitzending.'],
            18 => ['Trivia warm-up', 'Beantwoord de Deloitte-trivia van de dag op Teams.'],
            19 => ['Dress rehearsal', 'Kies je On Air-look voor 24 december.'],
            20 => ['Final song push', 'Nog één verzoek — de wachtrij is bijna vol.'],
            21 => ['Message marathon', 'Vul de rubrieken Lost in Translation, Green Line of OOO.'],
            22 => ['Countdown check', 'Deel de site-link met je team chat.'],
            23 => ['Eve of Air', 'Laatste moderatie-check: bekijk de live wachtrij.'],
            24 => ['Deloitte On Air live', 'The Year-End Review — afstemmen en meegenieten.'],
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
