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
import { calculateTaskXp } from "../utils/geminiXp"; // Importăm funcția Gemini

export const useTodos = user => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState(FILTERS.ALL);

    // Sincronizare în timp real cu Firestore când userul este logat
    useEffect(() => {
        if (!user) {
            setTodos([]);
            return;
        }

        const q = query(collection(db, "todos"), where("userId", "==", user.uid));

        const unsubscribe = onSnapshot(
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

    // Funcția toggleTodo modificată să adauge XP prin Gemini când un task devine completat
    const toggleTodo = async (id, currentCompleted) => {
        try {
            const todoRef = doc(db, "todos", id);
            const targetTodo = todos.find(t => t.id === id);

            // Dacă task-ul NU era completat și acum va fi marcat ca gata (!currentCompleted)
            if (!currentCompleted && targetTodo && user) {
                // 1. Cerem XP de la Gemini bazat pe textul task-ului
                const evaluation = await calculateTaskXp(targetTodo.text);

                // Afișăm un mesaj frumos cu XP-ul câștigat și motivul AI
                alert(`🎉 +${evaluation.xp} XP obținut!\n🤖 Motiv: ${evaluation.reason}`);

                // 2. Salvăm XP-ul în documentul utilizatorului din Firestore (colecția 'users')
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    // Dacă documentul userului nu există încă, îl creăm cu 0 XP inițial
                    await setDoc(userRef, { xp: evaluation.xp, email: user.email });
                } else {
                    // Dacă există, doar incrementăm valoarea de XP
                    await updateDoc(userRef, {
                        xp: increment(evaluation.xp),
                    });
                }
            }

            // 3. Actualizăm starea task-ului în baza de date
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
    };
};

export default useTodos;
