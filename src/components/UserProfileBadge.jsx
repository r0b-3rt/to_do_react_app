export const UserProfileBadge = ({ user, totalXp = 0 }) => {
    return (
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200 transition-all">
            <div className="w-7 h-7 rounded-xl bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            </div>

            <div className="flex flex-col text-left">
                <span className="text-xs font-bold tracking-tight text-gray-900 dark:text-white max-w-[120px] truncate">
                    {user?.email || "User"}
                </span>
                <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    {totalXp} XP Total
                </span>
            </div>
        </div>
    );
};
