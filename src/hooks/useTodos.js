import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    increment,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FILTERS } from "../constants/filters";
import { db } from "../firebase";
import { filterTodos } from "../utils/filterTodos";
import { calculateTaskXp } from "../utils/geminiXp";

export const useTodos = user => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState(FILTERS.ALL);
    const [userXp, setUserXp] = useState(0); // Starea pentru XP-ul total din colecția 'users'

    // Sincronizare în timp real cu Firestore pentru task-uri și XP-ul utilizatorului
    useEffect(() => {
        if (!user) {
            setTodos([]);
            setUserXp(0);
            return;
        }

        // 1. Ascultăm task-urile utilizatorului
        const q = query(collection(db, "todos"), where("userId", "==", user.uid));
        const unsubscribeTodos = onSnapshot(
            q,
            snapshot => {
                const todosData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTodos(todosData);
            },
            error => {
                console.error("Eroare la preluarea taskurilor:", error);
            },
        );

        // 2. Ascultăm documentul utilizatorului din colecția 'users' pentru XP total în timp real
        const userRef = doc(db, "users", user.uid);
        const unsubscribeUser = onSnapshot(
            userRef,
            docSnap => {
                if (docSnap.exists()) {
                    setUserXp(docSnap.data().xp || 0);
                } else {
                    setUserXp(0);
                }
            },
            error => {
                console.error("Eroare la preluarea XP-ului:", error);
            },
        );

        return () => {
            unsubscribeTodos();
            unsubscribeUser();
        };
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
            const targetTodo = todos.find(t => t.id === id);

            if (!currentCompleted && targetTodo && user) {
                const evaluation = await calculateTaskXp(targetTodo.text);

                alert(`🎉 +${evaluation.xp} XP obținut!\n🤖 Motiv: ${evaluation.reason}`);

                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    await setDoc(userRef, { xp: evaluation.xp, email: user.email });
                } else {
                    await updateDoc(userRef, {
                        xp: increment(evaluation.xp),
                    });
                }
            }

            await updateDoc(todoRef, {
                completed: !currentCompleted,
            });
        } catch (error) {
            console.error("Eroare la actualizarea taskului sau acordarea XP-ului:", error);
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
        userXp, // <--- Returnăm XP-ul total aici
    };
};

export default useTodos;
