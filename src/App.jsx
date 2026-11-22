import { onAuthStateChanged, signOut } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import { auth } from "./firebase";

import { FilterBar } from "./components/FilterBar";
import { IconButton } from "./components/IconButton";
import { LeaderboardModal } from "./components/LeaderboardModal";
import { ThemeToggle } from "./components/ThemeToggle";
import { TodoCounter } from "./components/TodoCounter";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { UserProfileBadge } from "./components/UserProfileBadge";
import { UserProfileModal } from "./components/UserProfileModal";
import { XpToast } from "./components/XpToast";
import { useDarkMode } from "./hooks/useDarkMode";
import { useTodos } from "./hooks/useTodos";

const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
});

const pageClass =
    "flex min-h-dvh items-center justify-center bg-gray-50 p-3 font-sans text-gray-900 antialiased transition-colors duration-300 sm:p-6 dark:bg-gray-950 dark:text-gray-100";
const cardClass =
    "w-full rounded-3xl border border-gray-100 bg-white shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900";

export function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSignup, setIsSignup] = useState(false);
    const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [isDark, toggleDarkMode] = useDarkMode();
    const {
        todos,
        activeCount,
        completedCount,
        filter,
        setFilter,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        userXp,
        userName,
        xpNotice,
        dismissXpNotice,
    } = useTodos(user);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    if (loading) {
        return (
            <div className={pageClass}>
                <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <span className="size-5 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
                    <p className="text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={pageClass}>
                <main className={`${cardClass} max-w-md p-6 sm:p-8`}>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={isSignup ? "signup" : "login"}
                            initial={{ opacity: 0, x: isSignup ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: isSignup ? -20 : 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isSignup ? (
                                <SignupForm
                                    onSwitchToLogin={() => setIsSignup(false)}
                                    isDark={isDark}
                                    onToggleTheme={toggleDarkMode}
                                />
                            ) : (
                                <LoginForm
                                    onSwitchToSignup={() => setIsSignup(true)}
                                    isDark={isDark}
                                    onToggleTheme={toggleDarkMode}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        );
    }

    return (
        <div className={pageClass}>
            <XpToast notice={xpNotice} onDismiss={dismissXpNotice} />

            <motion.main
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`${cardClass} flex max-w-lg flex-col gap-5 p-4 sm:p-6`}
            >
                <header className="flex items-center justify-between gap-3 pt-1">
                    <div className="min-w-0">
                        <h1 className="truncate text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                            My Tasks
                        </h1>
                        <p className="mt-0.5 truncate text-xs font-medium text-gray-500 sm:text-sm dark:text-gray-400">
                            {currentDate}
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                        <UserProfileBadge onClick={() => setIsProfileOpen(true)} />
                        <IconButton
                            onClick={() => setIsLeaderboardOpen(true)}
                            title="Leaderboard"
                            aria-label="Leaderboard"
                        >
                            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 01-10 0V4zM7 6H4v1a3 3 0 003 3M17 6h3v1a3 3 0 01-3 3" />
                            </svg>
                        </IconButton>
                        <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />
                        <IconButton
                            onClick={() => signOut(auth)}
                            title="Log Out"
                            aria-label="Log out"
                            className="hover:!bg-red-50 hover:!text-red-500 dark:hover:!bg-red-500/10 dark:hover:!text-red-400"
                        >
                            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </IconButton>
                    </div>
                </header>

                <FilterBar currentFilter={filter} onFilterChange={setFilter} />

                <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} currentFilter={filter} />

                <div className="space-y-4">
                    <TodoCounter
                        activeCount={activeCount}
                        completedCount={completedCount}
                        onClearCompleted={clearCompleted}
                    />
                    <TodoForm onAddTodo={addTodo} />
                </div>
            </motion.main>

            <UserProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                user={user}
                name={userName}
                totalXp={userXp}
            />
            <LeaderboardModal
                isOpen={isLeaderboardOpen}
                onClose={() => setIsLeaderboardOpen(false)}
                currentUserUid={user.uid}
            />
        </div>
    );
}

export default App;
