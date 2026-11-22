import { motion } from "framer-motion";
import { FILTERS } from "../constants/filters";

const filterButtons = [
    { key: FILTERS.ALL, label: "All" },
    { key: FILTERS.ACTIVE, label: "To Do" },
    { key: FILTERS.COMPLETED, label: "Done" },
];

export const FilterBar = ({ currentFilter, onFilterChange }) => (
    <div
        role="tablist"
        className="relative flex gap-1 rounded-2xl bg-gray-100 p-1 transition-colors duration-300 dark:bg-gray-800/80"
    >
        {filterButtons.map(({ key, label }) => {
            const isActive = currentFilter === key;
            return (
                <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onFilterChange(key)}
                    className={`relative z-10 flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        isActive
                            ? "text-indigo-600 dark:text-white"
                            : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                >
                    {isActive && (
                        <motion.div
                            layoutId="activeTab"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                            className="absolute inset-0 -z-10 rounded-xl bg-white shadow-sm dark:bg-gray-700"
                        />
                    )}
                    {label}
                </button>
            );
        })}
    </div>
);
