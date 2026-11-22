import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getRankInfo } from "../utils/ranks";
import { CloseButton, Modal } from "./Modal";

const positionColor = index =>
    ["text-amber-500", "text-slate-400", "text-amber-700"][index] ?? "text-gray-400 dark:text-gray-500";

export function LeaderboardModal({ isOpen, onClose, currentUserUid }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isOpen) return;
        let cancelled = false;

        (async () => {
            setLoading(true);
            try {
                const snapshot = await getDocs(collection(db, "users"));
                const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                list.sort((a, b) => (b.xp || 0) - (a.xp || 0));
                if (!cancelled) setUsers(list);
            } catch (error) {
                console.error("Failed to load leaderboard:", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} label="Leaderboard">
            <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <svg className="size-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 01-10 0V4zM7 6H4v1a3 3 0 003 3M17 6h3v1a3 3 0 01-3 3" /></svg>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Leaderboard</h3>
                </div>
                <CloseButton onClick={onClose} />
            </div>

            <div className="thin-scroll min-h-24 flex-1 space-y-2 overflow-y-auto pr-1">
                {loading ? (
                    <div className="flex items-center justify-center gap-3 py-8 text-sm text-gray-500 dark:text-gray-400">
                        <span className="size-4 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                        Loading leaderboard...
                    </div>
                ) : users.length === 0 ? (
                    <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        No players on the leaderboard yet.
                    </p>
                ) : (
                    users.map((u, index) => {
                        const rank = getRankInfo(u.xp || 0);
                        const isMe = u.id === currentUserUid;

                        return (
                            <motion.div
                                key={u.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(index, 8) * 0.04 }}
                                className={`flex items-center justify-between gap-3 rounded-2xl border p-3 ${
                                    isMe
                                        ? "border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/30"
                                        : "border-gray-200/60 bg-gray-50 dark:border-gray-700/50 dark:bg-gray-800/50"
                                }`}
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className={`w-8 shrink-0 text-center text-sm font-bold ${positionColor(index)}`}>
                                        #{index + 1}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="flex items-center gap-1.5 text-sm font-bold text-gray-900 dark:text-white">
                                            <span className="truncate">{u.name || "Anonymous"}</span>
                                            {isMe && (
                                                <span className="shrink-0 text-xs font-normal text-indigo-600 dark:text-indigo-400">
                                                    (You)
                                                </span>
                                            )}
                                        </p>
                                        <span
                                            className={`mt-0.5 inline-block rounded-md border px-1.5 py-0.5 text-[11px] font-extrabold ${rank.color}`}
                                        >
                                            {rank.name}
                                        </span>
                                    </div>
                                </div>
                                <span className="shrink-0 text-sm font-extrabold text-indigo-600 tabular-nums dark:text-indigo-400">
                                    {u.xp || 0} XP
                                </span>
                            </motion.div>
                        );
                    })
                )}
            </div>

            <button
                type="button"
                onClick={onClose}
                className="mt-4 w-full rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200 active:scale-[0.98] dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
                Close
            </button>
        </Modal>
    );
}
