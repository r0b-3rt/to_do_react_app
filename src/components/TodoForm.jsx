// src/components/TodoForm.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const TodoForm = ({ onAddTodo }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    const [time, setTime] = useState("");

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsOpen(false);
        setText("");
        setTime("");
    };

    const handleSubmit = e => {
        e.preventDefault(); // Previne reîncărcarea paginii pe mobil
        if (!text.trim()) return;
        onAddTodo(text, time);
        handleClose();
    };

    return (
        <>
            <button
                type="button"
                onClick={handleOpen}
                className="w-full flex items-center gap-3 px-5 py-3.5 bg-gray-100/80 active:bg-gray-200 text-gray-400 font-medium rounded-2xl transition-all cursor-pointer text-left active:scale-[0.98] touch-manipulation"
            >
                <span className="text-xl font-light text-gray-400">+</span>
                <span className="text-xs text-gray-500 font-medium">Add a new task...</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="absolute inset-0 bg-black/30 backdrop-blur-xs cursor-pointer"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                            className="relative z-10 bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-gray-100 space-y-5"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">New Task</h2>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="text-gray-400 hover:text-gray-600 text-sm font-bold p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                                        Task Title
                                    </label>
                                    <input
                                        type="text"
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                        placeholder="e.g. Prepare presentation"
                                        className="w-full px-4 py-3 bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all text-base sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                                        Time
                                    </label>
                                    <input
                                        type="text"
                                        value={time}
                                        onChange={e => setTime(e.target.value)}
                                        placeholder="e.g. 11:30 AM"
                                        className="w-full px-4 py-3 bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all text-base sm:text-sm"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="px-4 py-2.5 text-gray-500 hover:text-gray-800 font-medium text-sm rounded-xl transition-colors cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-medium text-sm rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
