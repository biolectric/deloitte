export type SongRequestItem = {
    id: number;
    title: string;
    artist: string;
    name: string | null;
    department: string | null;
    reason: string | null;
    created_at: string;
};

export type OnAirStats = {
    song_count: number;
    message_count: number;
    submission_count: number;
    popular_song: { title: string; artist: string; count: number } | null;
    busiest_department: { department: string; count: number } | null;
};

export type AdventDoorItem = {
    id: number;
    day: number;
    title: string;
    body: string;
    media_type: 'image' | 'video' | null;
    media_url: string | null;
    unlock_date: string;
    unlocked: boolean;
    date_unlocked: boolean;
};

export type LiveFeedResponse = {
    songs: SongRequestItem[];
    stats: OnAirStats;
    viewer_count: number;
};
