type Props = {
    url: string | null;
};

export function AnnouncementPlayer({ url }: Props) {
    if (!url) {
        return (
            <div className="flex aspect-video w-full items-center justify-center border border-white/10 bg-black/40">
                <p className="max-w-sm px-6 text-center text-white/50">
                    De aankondigingsvideo verschijnt hier zodra de redactie die plaatst.
                </p>
            </div>
        );
    }

    return (
        <video
            key={url}
            controls
            playsInline
            className="aspect-video w-full bg-black object-cover"
            src={url}
        >
            Je browser ondersteunt geen video.
        </video>
    );
}
