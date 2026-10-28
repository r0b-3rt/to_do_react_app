import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import { auth } from "./firebase";

import { FilterBar } from "./components/FilterBar";
import { ThemeToggle } from "./components/ThemeToggle";
import { TodoCounter } from "./components/TodoCounter";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { useDarkMode } from "./hooks/useDarkMode";
import { useTodos } from "./hooks/useTodos";

export function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSignup, setIsSignup] = useState(false);

    const [isDark, toggleDarkMode] = useDarkMode();
    const { todos, activeCount, completedCount, filter, setFilter, addTodo, toggleTodo, deleteTodo, clearCompleted } =
        useTodos(user);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 flex items-center justify-center">
                <p className="text-gray-500">Se încarcă...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex items-center justify-center p-4 font-sans antialiased">
                <main className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                    {isSignup ? (
                        <SignupForm onSwitchToLogin={() => setIsSignup(false)} />
                    ) : (
                        <LoginForm onSwitchToSignup={() => setIsSignup(true)} />
                    )}
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex items-center justify-center p-4 sm:p-8 font-sans antialiased transition-colors duration-300">
            <main className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col transition-colors duration-300">
                <div>
                    <header className="mb-6 pt-2 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                My Tasks
                            </h1>
                            <p className="text-gray-400 dark:text-gray-500 text-xs font-medium mt-1">
                                {currentDate} • <span className="text-indigo-500">{user.email}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />
                            <button
                                onClick={() => signOut(auth)}
                                title="Log Out"
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="strokeWidth"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </button>
                        </div>
                    </header>

                    <div className="mb-5">
                        <FilterBar currentFilter={filter} onFilterChange={setFilter} />
                    </div>

                    <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} currentFilter={filter} />
                </div>

                <div className="mt-4 space-y-4">
                    <TodoCounter
                        activeCount={activeCount}
                        completedCount={completedCount}
                        onClearCompleted={clearCompleted}
                    />
                    <TodoForm onAddTodo={addTodo} />
                </div>
            </main>
        </div>
    );
}

export default App;
