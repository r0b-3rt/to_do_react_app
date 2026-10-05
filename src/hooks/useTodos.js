import { useState } from "react";
import { FILTERS } from "../constants/filters";
import { filterTodos } from "../utils/filterTodos";
import { useLocalStorage } from "./useLocalStorage";

export const useTodos = () => {
    const [todos, setTodos] = useLocalStorage("todos_app_data", []);
    const [filter, setFilter] = useState(FILTERS.ALL);

    const addTodo = (text, time) => {
        if (!text.trim()) return;

        // Generare ID compatibilă 100% cu mobil/browsere fără HTTPS
        const newTodo = {
            id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
            text: text.trim(),
            time: time || null,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        setTodos(prevTodos => [newTodo, ...prevTodos]);
    };

    const toggleTodo = id => {
        setTodos(prevTodos => prevTodos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const deleteTodo = id => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    };

    const clearCompleted = () => {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    };

    const filteredTodos = filterTodos(todos, filter);
    const activeCount = todos.filter(todo => !todo.completed).length;
    const completedCount = todos.length - activeCount;

    return {
        todos: filteredTodos,
        allTodosCount: todos.length,
        activeCount,
        completedCount,
        filter,
        setFilter,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
    };
};

export default useTodos;
