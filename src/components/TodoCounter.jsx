export const TodoCounter = ({ activeCount, completedCount, onClearCompleted }) => {
    return (
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100 mt-4">
            <span>
                <strong className="text-gray-700 font-semibold">{activeCount}</strong>{" "}
                {activeCount === 1 ? "task left" : "tasks left"}
            </span>
            {completedCount > 0 && (
                <button
                    onClick={onClearCompleted}
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer font-medium"
                >
                    Clear completed ({completedCount})
                </button>
            )}
        </div>
    );
};
