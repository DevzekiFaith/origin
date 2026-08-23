export default function Logo({
  className = "",
  showTagline = true,
  size = 36,
}: {
  className?: string;
  showTagline?: boolean;
  size?: number;
}) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group cursor-pointer ${className}`}>
      <div
        className="relative shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shadow-sm"
        >
          <rect width="128" height="128" rx="30" fill="#22C55E" />
          <circle
            cx="64"
            cy="64"
            r="34"
            stroke="#FFFFFF"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-xl sm:text-2xl font-extrabold text-white leading-none tracking-tight">
          ORIGIN
        </span>
        {showTagline && (
          <span className="text-[9px] text-white/80 font-mono tracking-widest uppercase mt-0.5 font-bold">
            Thinking Platform
          </span>
        )}
      </div>
    </div>
  );
}
