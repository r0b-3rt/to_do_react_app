import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export function XpToast({ notice, onDismiss }) {
    useEffect(() => {
        if (!notice) return;
        const t = setTimeout(onDismiss, 4000);
        return () => clearTimeout(t);
    }, [notice, onDismiss]);

    return (
        <div className="pointer-events-none fixed inset-x-0 top-3 z-[60] flex justify-center px-3 sm:top-5">
            <AnimatePresence>
                {notice && (
                    <motion.div
                        key={notice.id}
                        role="status"
                        initial={{ opacity: 0, y: -24, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -24, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        onClick={onDismiss}
                        className="pointer-events-auto w-full max-w-sm cursor-pointer rounded-2xl border border-indigo-500/30 bg-white p-4 shadow-xl dark:bg-gray-900"
                    >
                        <p
                            className={`text-base font-extrabold ${
                                notice.xp > 0 ? "text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-300"
                            }`}
                        >
                            {notice.xp > 0 ? `+${notice.xp} XP earned` : "No XP earned"}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{notice.reason}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
