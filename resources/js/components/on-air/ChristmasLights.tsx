type Props = {
    className?: string;
};

const WIDTH = 1200;
const BULB_COUNT = 12;

const bulbs = [
    '#ff4d4d',
    '#86bc25',
    '#4da6ff',
    '#ffb347',
    '#c084fc',
    '#86bc25',
    '#ff6b9d',
    '#4da6ff',
    '#ff4d4d',
    '#ffb347',
    '#86bc25',
    '#c084fc',
];

/** Shared curve so wire and bulbs stay aligned. */
function wireY(x: number): number {
    return 18 + Math.sin((x / WIDTH) * Math.PI * 4.2) * 12;
}

function wirePath(): string {
    const step = 20;
    let d = `M0 ${wireY(0).toFixed(2)}`;

    for (let x = step; x <= WIDTH; x += step) {
        d += ` L${x} ${wireY(x).toFixed(2)}`;
    }

    return d;
}

export function ChristmasLights({ className = '' }: Props) {
    const gap = WIDTH / (BULB_COUNT + 1);

    return (
        <div
            className={`pointer-events-none inset-x-0 top-0 overflow-hidden ${className}`}
            aria-hidden
        >
            <svg
                viewBox={`0 0 ${WIDTH} 56`}
                className="h-10 w-full sm:h-12"
                preserveAspectRatio="none"
            >
                <path
                    d={wirePath()}
                    fill="none"
                    stroke="#2a2a2a"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                {bulbs.map((color, index) => {
                    const x = gap * (index + 1);
                    const y = wireY(x);

                    return (
                        <g key={index}>
                            <ellipse
                                cx={x}
                                cy={y + 10}
                                rx="6"
                                ry="9"
                                fill={color}
                                className="xmas-bulb"
                                style={{ animationDelay: `${index * 0.18}s` }}
                            />
                            <circle cx={x} cy={y} r="2.5" fill="#1a1a1a" />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
