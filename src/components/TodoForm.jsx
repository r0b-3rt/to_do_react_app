import { useState } from "react";
import { CloseButton, Modal } from "./Modal";

const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-base text-gray-900 placeholder-gray-400 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/15 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:bg-gray-800";
const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400";

export const TodoForm = ({ onAddTodo }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState("");
    const [time, setTime] = useState("");

    const handleClose = () => {
        setIsOpen(false);
        setText("");
        setTime("");
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!text.trim()) return;
        onAddTodo(text, time);
        handleClose();
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex w-full touch-manipulation items-center gap-3 rounded-2xl bg-indigo-600 px-5 py-3.5 text-left font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-[0.98] active:bg-indigo-800"
            >
                <span className="text-2xl font-light leading-none">+</span>
                <span className="text-sm">Add a new task...</span>
            </button>

            <Modal isOpen={isOpen} onClose={handleClose} label="Task nou">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">New Task</h2>
                    <CloseButton onClick={handleClose} />
                </div>

                <form onSubmit={handleSubmit} className="-m-2 space-y-6 overflow-y-auto p-2">
                    <div>
                        <label htmlFor="task-title" className={labelClass}>
                            Task Title
                        </label>
                        <input
                            id="task-title"
                            type="text"
                            autoFocus
                            value={text}
                            onChange={e => setText(e.target.value)}
                            placeholder="e.g. Prepare presentation"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="task-time" className={labelClass}>
                            Time
                        </label>
                        <input
                            id="task-time"
                            type="text"
                            value={time}
                            onChange={e => setTime(e.target.value)}
                            placeholder="e.g. 11:30 AM"
                            className={inputClass}
                        />
                    </div>

                    <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!text.trim()}
                            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};
