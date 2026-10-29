import { getRankInfo } from "../utils/ranks";

export function UserProfileModal({ isOpen, onClose, user, totalXp }) {
    if (!isOpen || !user) return null;

    const rank = getRankInfo(totalXp);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center">
                {/* Iconiță mare de profil */}
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Profilul Meu</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 break-all">{user.email}</p>

                {/* Card de statistică (XP + Rank) */}
                <div className="w-full grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 flex flex-col items-center">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            XP Total
                        </span>
                        <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                            {totalXp} XP
                        </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 flex flex-col items-center">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            Rank Actual
                        </span>
                        <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md border mt-1 ${rank.color}`}>
                            {rank.name}
                        </span>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl text-xs transition-all cursor-pointer shadow-sm"
                >
                    Închide
                </button>
            </div>
        </div>
    );
}
