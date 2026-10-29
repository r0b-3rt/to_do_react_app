export const UserProfileBadge = ({ onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            title="Profil Utilizator"
            className="p-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer border border-gray-200/50 dark:border-gray-700/50 active:scale-95 flex items-center justify-center"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
            </svg>
        </button>
    );
};
