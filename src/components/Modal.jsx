import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export function Modal({ isOpen, onClose, label, maxWidth = "max-w-md", children }) {
    useEffect(() => {
        if (!isOpen) return;
        const onKey = e => e.key === "Escape" && onClose();
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/60"
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={label}
                        initial={{ opacity: 0, scale: 0.94, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 24 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className={`relative z-10 flex max-h-[85dvh] w-full ${maxWidth} flex-col rounded-3xl border border-gray-100 bg-white p-5 shadow-2xl sm:p-6 dark:border-gray-800 dark:bg-gray-900`}
                    >
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export const CloseButton = ({ onClick, label = "Close" }) => (
    <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="flex size-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 active:scale-90 dark:hover:bg-gray-800 dark:hover:text-gray-200"
    >
        ✕
    </button>
);
