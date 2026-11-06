// Illustration of the classroom indicator: a small enclosure with a status screen and three LEDs.
// It shows a state ("Air is fresh"), never a measured value, to match how DIY readings are presented.
export function DeviceIllustration() {
  return (
    <svg
      viewBox="0 0 420 320"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Illustration of the ventilation indicator: a small box with a screen reading Air is fresh and a lit green light."
    >
      <defs>
        <linearGradient id="case" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7faf8" />
          <stop offset="1" stopColor="#d6e2db" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7dd89b" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7dd89b" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* table line */}
      <ellipse cx="210" cy="292" rx="170" ry="14" fill="#000" opacity="0.18" />
      {/* plant */}
      <g transform="translate(330 150)">
        <rect x="-22" y="96" width="44" height="46" rx="6" fill="#e8efe9" />
        <path d="M0 96 C -6 60 -40 52 -46 20 C -14 26 -2 56 0 96Z" fill="#2f9e5b" />
        <path d="M0 96 C 4 50 36 40 44 6 C 16 18 2 50 0 96Z" fill="#3fb36c" />
        <path d="M0 96 C 0 70 -12 40 -4 0 C 10 30 8 66 0 96Z" fill="#7dd89b" />
      </g>
      {/* device */}
      <rect x="70" y="70" width="210" height="210" rx="34" fill="url(#case)" />
      <rect x="70" y="70" width="210" height="210" rx="34" fill="none" stroke="#ffffff" strokeOpacity="0.7" />
      <rect x="96" y="96" width="158" height="118" rx="18" fill="#0b2a20" />
      <text x="116" y="134" fill="#ffffff" fontSize="15" fontFamily="inherit" opacity="0.8">
        Classroom air
      </text>
      <text x="116" y="162" fill="#ffffff" fontSize="22" fontWeight="700" fontFamily="inherit">
        Air is fresh
      </text>
      <rect x="116" y="178" width="96" height="22" rx="11" fill="#2f9e5b" />
      <text x="164" y="193" fill="#ffffff" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="inherit">
        No action
      </text>
      {/* LEDs */}
      <circle cx="140" cy="246" r="26" fill="url(#glow)" className="led-pulse" />
      <circle cx="140" cy="246" r="8" fill="#5fd38a" />
      <circle cx="175" cy="246" r="8" fill="#e9a23b" opacity="0.35" />
      <circle cx="210" cy="246" r="8" fill="#e05a4f" opacity="0.35" />
    </svg>
  );
}
