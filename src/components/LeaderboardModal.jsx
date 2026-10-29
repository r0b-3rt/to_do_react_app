import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getRankInfo } from "../utils/ranks";

export function LeaderboardModal({ isOpen, onClose, currentUserUid }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isOpen) return;

        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Sortăm descrescător după XP (cel mai mare XP primul)
                usersList.sort((a, b) => (b.xp || 0) - (a.xp || 0));
                setUsers(usersList);
            } catch (error) {
                console.error("Eroare la preluarea leaderboard-ului:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col max-h-[80vh]">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🏆</span>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Clasament Global</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="overflow-y-auto space-y-2 pr-1 flex-1">
                    {loading ? (
                        <p className="text-center text-sm text-gray-400 py-8">Se încarcă clasamentul...</p>
                    ) : users.length === 0 ? (
                        <p className="text-center text-sm text-gray-400 py-8">Niciun utilizator în clasament încă.</p>
                    ) : (
                        users.map((u, index) => {
                            const rank = getRankInfo(u.xp || 0);
                            const isMe = u.id === currentUserUid;

                            return (
                                <div
                                    key={u.id}
                                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                                        isMe
                                            ? "bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500/30"
                                            : "bg-gray-50/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`w-6 text-center font-bold text-sm ${index === 0 ? "text-amber-500" : index === 1 ? "text-slate-400" : index === 2 ? "text-amber-700" : "text-gray-400"}`}
                                        >
                                            #{index + 1}
                                        </span>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                                {u.email || "Utilizator"}
                                                {isMe && (
                                                    <span className="text-[10px] text-indigo-500 font-normal">
                                                        (Tu)
                                                    </span>
                                                )}
                                            </p>
                                            <span
                                                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border mt-0.5 inline-block ${rank.color}`}
                                            >
                                                {rank.name}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                                        {u.xp || 0} XP
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl text-xs transition-all cursor-pointer"
                >
                    Închide
                </button>
            </div>
        </div>
    );
}
