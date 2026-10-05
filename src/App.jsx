import { FilterBar } from "./components/FilterBar";
import { TodoCounter } from "./components/TodoCounter";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

export function App() {
    const {
        todos,
        allTodosCount,
        activeCount,
        completedCount,
        filter,
        setFilter,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
    } = useTodos();

    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="min-h-screen bg-gray-50/50 text-gray-900 flex items-center justify-center p-4 sm:p-8 font-sans antialiased">
            {/* Am scos justify-between și max-h fix ca cardul să fie compact */}
            <main className="w-full max-w-md bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                <div>
                    {/* Header */}
                    <header className="mb-6 pt-2">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">My Tasks</h1>
                        <p className="text-gray-400 text-xs font-medium mt-1">{currentDate}</p>
                    </header>

                    {/* Filter Bar */}
                    <div className="mb-5">
                        <FilterBar currentFilter={filter} onFilterChange={setFilter} />
                    </div>

                    {/* Todo List */}
                    <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} currentFilter={filter} />
                </div>

                {/* Zona de jos se lipește natural de listă */}
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
