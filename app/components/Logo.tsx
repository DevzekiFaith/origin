export default function Logo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
      <div className="relative">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:scale-110 sm:w-10 sm:h-10 drop-shadow-md"
        >
          <rect width="36" height="36" rx="10" fill="#60a5fa" />
          {/* O lettermark */}
          <circle
            cx="18"
            cy="18"
            r="10"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
        Origin
      </span>
    </div>
  );
}
