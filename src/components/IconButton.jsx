export const IconButton = ({ className = "", children, ...props }) => (
    <button
        type="button"
        className={`flex size-10 shrink-0 items-center justify-center rounded-2xl border border-gray-200/70 bg-gray-100 text-gray-600 transition-all duration-200 hover:bg-gray-200 active:scale-90 dark:border-gray-700/60 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 ${className}`}
        {...props}
    >
        {children}
    </button>
);
