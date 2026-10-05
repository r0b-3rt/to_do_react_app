export const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-2">
                {/* Cercul de bifare / Checkbox stilizat */}
                <button
                    type="button"
                    onClick={() => onToggle(todo.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                        todo.completed
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-gray-300 hover:border-gray-400 bg-transparent"
                    }`}
                >
                    {todo.completed && (
                        <svg className="w-3.5 h-3.5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    )}
                </button>

                <div className="flex flex-col min-w-0 cursor-pointer" onClick={() => onToggle(todo.id)}>
                    <span
                        className={`text-sm font-semibold truncate select-none ${
                            todo.completed ? "line-through text-gray-800 font-normal" : "text-gray-900"
                        }`}
                    >
                        {todo.text}
                    </span>
                    {todo.time && (
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
                                <polyline points="12 6 12 12 16 14" strokeWidth="2"></polyline>
                            </svg>
                            {todo.time}
                        </span>
                    )}
                </div>
            </div>

            <button
                onClick={() => onDelete(todo.id)}
                aria-label="Delete task"
                className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                </svg>
            </button>
        </div>
    );
};
