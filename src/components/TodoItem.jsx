import { motion } from "framer-motion";

export const TodoItem = ({ todo, onToggle, onDelete }) => (
    <div className="group flex items-center justify-between gap-2 rounded-2xl border border-gray-100 bg-gray-50 p-3.5 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800/40 dark:hover:bg-gray-800">
        <label className="flex min-w-0 flex-1 items-center gap-3">
            <input
                type="checkbox"
                checked={!!todo.completed}
                onChange={() => onToggle(todo.id)}
                className="peer sr-only"
            />
            <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all duration-200 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-500 ${
                    todo.completed
                        ? "border-indigo-600 bg-indigo-600"
                        : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
                }`}
            >
                <svg className="size-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                    <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                        initial={false}
                        animate={{ pathLength: todo.completed ? 1 : 0, opacity: todo.completed ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                    />
                </svg>
            </span>
            <span className="flex min-w-0 flex-col">
                <span
                    className={`break-words text-sm font-semibold transition-colors duration-200 sm:text-base ${
                        todo.completed
                            ? "text-gray-400 line-through dark:text-gray-500"
                            : "text-gray-800 dark:text-gray-100"
                    }`}
                >
                    {todo.text}
                </span>
                {todo.time && <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{todo.time}</span>}
            </span>
        </label>

        <button
            type="button"
            onClick={() => onDelete(todo.id)}
            aria-label="Delete task"
            className="flex size-9 shrink-0 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-red-50 hover:text-red-500 active:scale-90 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100 dark:text-gray-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        >
            ✕
        </button>
    </div>
);
