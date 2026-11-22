import { AnimatePresence, motion } from "framer-motion";

export const TodoCounter = ({ activeCount, completedCount, onClearCompleted }) => (
    <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <span>
            <strong className="font-bold text-gray-800 tabular-nums dark:text-gray-100">{activeCount}</strong>{" "}
            {activeCount === 1 ? "task left" : "tasks left"}
        </span>
        <AnimatePresence>
            {completedCount > 0 && (
                <motion.button
                    type="button"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    onClick={onClearCompleted}
                    className="rounded-lg px-2 py-1 font-medium transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                >
                    Clear completed ({completedCount})
                </motion.button>
            )}
        </AnimatePresence>
    </div>
);
