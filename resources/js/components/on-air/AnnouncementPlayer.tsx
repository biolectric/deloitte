type Props = {
    url: string | null;
};

export function AnnouncementPlayer({ url }: Props) {
    if (!url) {
        return (
            <div className="flex aspect-video w-full items-center justify-center border border-white/10 bg-black/40">
                <p className="max-w-sm px-6 text-center text-white/50">
                    The announcement video will appear here once editorial uploads it.
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
            Your browser does not support video.
        </video>
    );
}
