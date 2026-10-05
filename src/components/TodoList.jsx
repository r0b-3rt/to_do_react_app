import { AnimatePresence, motion } from "framer-motion";
import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, onToggle, onDelete, currentFilter }) => {
    if (todos.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-12 border-2 border-dashed border-gray-100 rounded-2xl"
            >
                <p className="text-gray-400 text-xs font-medium">No tasks found.</p>
            </motion.div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentFilter}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1"
            >
                <AnimatePresence>
                    {todos.map(todo => (
                        <motion.div
                            key={todo.id}
                            layout
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                            <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
};
