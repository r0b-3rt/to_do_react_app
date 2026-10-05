import { motion } from "framer-motion";
import { FILTERS } from "../constants/filters";

export const FilterBar = ({ currentFilter, onFilterChange }) => {
    const filterButtons = [
        { key: FILTERS.ALL, label: "All" },
        { key: FILTERS.ACTIVE, label: "To Do" },
        { key: FILTERS.COMPLETED, label: "Done" },
    ];

    return (
        <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl relative">
            {filterButtons.map(({ key, label }) => {
                const isActive = currentFilter === key;
                return (
                    <button
                        key={key}
                        onClick={() => onFilterChange(key)}
                        className={`relative flex-1 py-2 px-4 text-xs font-semibold rounded-xl transition-colors cursor-pointer z-10 ${
                            isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-800"
                        }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                            />
                        )}
                        {label}
                    </button>
                );
            })}
        </div>
    );
};
