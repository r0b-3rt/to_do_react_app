import { motion } from "framer-motion";
import { FILTERS } from "../constants/filters";

export const FilterBar = ({ currentFilter, onFilterChange }) => {
    const filterButtons = [
        { key: FILTERS.ALL, label: "All" },
        { key: FILTERS.ACTIVE, label: "To Do" },
        { key: FILTERS.COMPLETED, label: "Done" },
    ];

    return (
        <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800/80 rounded-2xl relative transition-colors duration-300">
            {filterButtons.map(({ key, label }) => {
                const isActive = currentFilter === key;
                return (
                    <button
                        key={key}
                        type="button"
                        onClick={() => onFilterChange(key)}
                        className={`relative flex-1 py-2 px-4 text-xs font-semibold rounded-xl transition-colors cursor-pointer z-10 ${
                            isActive
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                className="absolute inset-0 bg-white dark:bg-gray-700 rounded-xl shadow-sm -z-10"
                            />
                        )}
                        {label}
                    </button>
                );
            })}
        </div>
    );
};
