import { AnimatePresence, motion } from "framer-motion";
import { FILTERS } from "../constants/filters";
import { TodoItem } from "./TodoItem";

const emptyMessages = {
    [FILTERS.ALL]: "No tasks yet. Add your first one!",
    [FILTERS.ACTIVE]: "Nothing left to do. Nice work!",
    [FILTERS.COMPLETED]: "No completed tasks yet.",
};

export const TodoList = ({ todos, onToggle, onDelete, currentFilter }) => (
    <div className="thin-scroll -mr-1 max-h-[min(50dvh,26rem)] min-h-40 overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout" initial={false}>
            {todos.length === 0 ? (
                <motion.div
                    key={`empty-${currentFilter}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-2xl border-2 border-dashed border-gray-200 py-12 text-center dark:border-gray-800"
                >
                    <p className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        {emptyMessages[currentFilter]}
                    </p>
                </motion.div>
            ) : (
                todos.map(todo => (
                    <motion.div
                        key={todo.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: -24 }}
                        transition={{ type: "spring", stiffness: 500, damping: 32 }}
                        className="pb-2.5 last:pb-0"
                    >
                        <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
                    </motion.div>
                ))
            )}
        </AnimatePresence>
    </div>
);
