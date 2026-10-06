export const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <div className="group flex items-center justify-between p-3.5 bg-gray-50/80 dark:bg-gray-800/40 hover:bg-gray-100/80 dark:hover:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800/80 transition-all duration-200">
            <div className="flex items-center gap-3 min-w-0 pr-2">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="w-4 h-4 rounded-md border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-0 cursor-pointer accent-gray-900 dark:accent-white"
                />
                <div className="flex flex-col min-w-0">
                    <span
                        className={`text-xs font-semibold truncate transition-all ${
                            todo.completed
                                ? "line-through text-gray-400 dark:text-gray-500"
                                : "text-gray-800 dark:text-gray-200"
                        }`}
                    >
                        {todo.text}
                    </span>
                    {todo.time && (
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{todo.time}</span>
                    )}
                </div>
            </div>

            <button
                type="button"
                onClick={() => onDelete(todo.id)}
                className="text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer p-1"
                aria-label="Delete task"
            >
                ✕
            </button>
        </div>
    );
};
