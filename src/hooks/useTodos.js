import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FILTERS } from "../constants/filters";
import { db } from "../firebase";
import { filterTodos } from "../utils/filterTodos";

export const useTodos = user => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState(FILTERS.ALL);

    // Sincronizare în timp real cu Firestore când userul este logat
    useEffect(() => {
        if (!user) {
            setTodos([]);
            return;
        }

        // Creăm un query care aduce doar taskurile utilizatorului curent
        const q = query(collection(db, "todos"), where("userId", "==", user.uid));

        // onSnapshot ascultă modificările în timp real din baza de date
        const unsubscribe = onSnapshot(
            q,
            snapshot => {
                const todosData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                // Sortăm opțional după dată (cele mai recente sus)
                setTodos(todosData);
            },
            error => {
                console.error("Eroare la preluarea taskurilor:", error);
            },
        );

        return () => unsubscribe();
    }, [user]);

    const addTodo = async (text, time) => {
        if (!text.trim() || !user) return;

        try {
            await addDoc(collection(db, "todos"), {
                userId: user.uid,
                text: text.trim(),
                time: time || null,
                completed: false,
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            console.error("Eroare la adăugarea taskului:", error);
        }
    };

    const toggleTodo = async (id, currentCompleted) => {
        try {
            const todoRef = doc(db, "todos", id);
            await updateDoc(todoRef, {
                completed: !currentCompleted,
            });
        } catch (error) {
            console.error("Eroare la actualizarea taskului:", error);
        }
    };

    const deleteTodo = async id => {
        try {
            await deleteDoc(doc(db, "todos", id));
        } catch (error) {
            console.error("Eroare la ștergerea taskului:", error);
        }
    };

    const clearCompleted = async () => {
        try {
            const completedTodos = todos.filter(todo => todo.completed);
            // Ștergem fiecare task completat din Firestore
            await Promise.all(completedTodos.map(todo => deleteDoc(doc(db, "todos", todo.id))));
        } catch (error) {
            console.error("Eroare la ștergerea taskurilor gata:", error);
        }
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
