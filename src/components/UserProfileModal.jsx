import { useState } from "react";
import { NAME_MAX, saveDisplayName, validateName } from "../utils/profile";
import { getRankInfo } from "../utils/ranks";
import { CloseButton, Modal } from "./Modal";

function NameEditor({ user, name }) {
    const [value, setValue] = useState(name);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        const problem = validateName(value);
        if (problem) return setError(problem);
        setError("");
        setSaving(true);
        try {
            await saveDisplayName(user, value);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            console.error("Failed to save name:", err);
            setError("Could not save your name. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 w-full text-left">
            <label
                htmlFor="display-name"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
            >
                Display name (shown on the leaderboard)
            </label>
            <div className="flex gap-2">
                <input
                    id="display-name"
                    type="text"
                    value={value}
                    maxLength={NAME_MAX}
                    onChange={e => {
                        setValue(e.target.value);
                        setSaved(false);
                    }}
                    placeholder="Your name"
                    className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-base text-gray-900 placeholder-gray-400 transition-all focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                />
                <button
                    type="submit"
                    disabled={saving || value.trim() === name}
                    className="shrink-0 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                >
                    {saved ? "Saved" : "Save"}
                </button>
            </div>
            {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </form>
    );
}

export function UserProfileModal({ isOpen, onClose, user, name, totalXp }) {
    const rank = getRankInfo(totalXp);

    return (
        <Modal isOpen={isOpen && !!user} onClose={onClose} label="Profile" maxWidth="max-w-sm">
            <div className="-m-2 flex flex-col items-center overflow-y-auto p-2 text-center">
                <div className="mb-4 flex w-full items-start justify-between">
                    <span className="size-9" />
                    <div className="flex size-16 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-600/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
                        <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>
                    <CloseButton onClick={onClose} />
                </div>

                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">{name || "My Profile"}</h3>
                <p className="mb-6 break-all text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>

                {/* key remounts the editor so it picks up the saved name */}
                <NameEditor key={name} user={user} name={name} />

                <div className="mb-6 grid w-full grid-cols-2 gap-3">
                    <div className="flex flex-col items-center rounded-2xl border border-gray-200/60 bg-gray-50 p-4 dark:border-gray-700/50 dark:bg-gray-800/50">
                        <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Total XP
                        </span>
                        <span className="text-xl font-extrabold text-indigo-600 tabular-nums dark:text-indigo-400">
                            {totalXp} XP
                        </span>
                    </div>

                    <div className="flex flex-col items-center rounded-2xl border border-gray-200/60 bg-gray-50 p-4 dark:border-gray-700/50 dark:bg-gray-800/50">
                        <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Current Rank
                        </span>
                        <span className={`mt-1 rounded-md border px-2.5 py-1 text-sm font-extrabold ${rank.color}`}>
                            {rank.name}
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-[0.98] active:bg-indigo-800"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}
