import { FilterBar } from "./components/FilterBar";
import { ThemeToggle } from "./components/ThemeToggle";
import { TodoCounter } from "./components/TodoCounter";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { useDarkMode } from "./hooks/useDarkMode";
import { useTodos } from "./hooks/useTodos";

export function App() {
    const [isDark, toggleDarkMode] = useDarkMode();
    const { todos, activeCount, completedCount, filter, setFilter, addTodo, toggleTodo, deleteTodo, clearCompleted } =
        useTodos();

    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex items-center justify-center p-4 sm:p-8 font-sans antialiased transition-colors duration-300">
            <main className="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col transition-colors duration-300">
                <div>
                    {/* Header cu butonul de Dark Mode */}
                    <header className="mb-6 pt-2 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                My Tasks
                            </h1>
                            <p className="text-gray-400 dark:text-gray-500 text-xs font-medium mt-1">{currentDate}</p>
                        </div>
                        <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />
                    </header>

                    {/* Filter Bar */}
                    <div className="mb-5">
                        <FilterBar currentFilter={filter} onFilterChange={setFilter} />
                    </div>

                    {/* Todo List */}
                    <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} currentFilter={filter} />
                </div>

                {/* Subsol */}
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
