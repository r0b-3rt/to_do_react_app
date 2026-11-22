import { AnimatePresence, motion } from "framer-motion";
import { IconButton } from "./IconButton";

export const ThemeToggle = ({ isDark, onToggle }) => (
    <IconButton onClick={onToggle} aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}>
        <AnimatePresence mode="wait" initial={false}>
            <motion.span
                key={isDark ? "dark" : "light"}
                initial={{ scale: 0.4, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.4, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex"
            >
                {isDark ? (
                    <svg className="size-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                ) : (
                    <svg className="size-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                )}
            </motion.span>
        </AnimatePresence>
    </IconButton>
);
