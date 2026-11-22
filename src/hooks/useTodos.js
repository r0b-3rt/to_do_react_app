import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    increment,
    onSnapshot,
    query,
    serverTimestamp,
    where,
    writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FILTERS } from "../constants/filters";
import { db } from "../firebase";
import { filterTodos } from "../utils/filterTodos";
import { calculateTaskXp } from "../utils/taskXp";

export const useTodos = user => {
    const [data, setData] = useState({ uid: null, todos: [], xp: 0, name: "" });
    const [filter, setFilter] = useState(FILTERS.ALL);
    const [xpNotice, setXpNotice] = useState(null);

    const uid = user?.uid ?? null;

    useEffect(() => {
        if (!uid) return;

        const q = query(collection(db, "todos"), where("userId", "==", uid));
        const unsubscribeTodos = onSnapshot(
            q,
            snapshot => {
                const todosData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                setData(prev => ({ ...prev, uid, todos: todosData }));
            },
            error => console.error("Failed to load tasks:", error),
        );

        const unsubscribeUser = onSnapshot(
            doc(db, "users", uid),
            docSnap => {
                const d = docSnap.exists() ? docSnap.data() : {};
                setData(prev => ({ ...prev, uid, xp: d.xp || 0, name: d.name || "" }));
            },
            error => console.error("Failed to load XP:", error),
        );

        return () => {
            unsubscribeTodos();
            unsubscribeUser();
        };
    }, [uid]);

    // Data only belongs to the current user if the uid matches (avoids showing stale data after logout)
    const isCurrent = data.uid === uid && uid !== null;
    const todos = isCurrent ? data.todos : [];
    const userXp = isCurrent ? data.xp : 0;
    const userName = (isCurrent && data.name) || user?.displayName || "";

    const addTodo = async (text, time) => {
        if (!text.trim() || !user) return;
        try {
            await addDoc(collection(db, "todos"), {
                userId: user.uid,
                text: text.trim(),
                time: time?.trim() || null,
                completed: false,
                xpAwarded: false,
                createdAt: serverTimestamp(),
            });
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const toggleTodo = async id => {
        const target = todos.find(t => t.id === id);
        if (!target || !user) return;

        try {
            const batch = writeBatch(db);
            const todoRef = doc(db, "todos", id);

            // XP is awarded only once per task, on the first completion
            const shouldAward = !target.completed && !target.xpAwarded;

            if (shouldAward) {
                const startOfDay = new Date().setHours(0, 0, 0, 0);
                const completedToday = todos.filter(t => t.xpGiven > 0 && (t.xpAt?.toMillis?.() ?? Date.now()) >= startOfDay).length;
                const evaluation = calculateTaskXp(target.text, {
                    createdAtMs: target.createdAt?.toMillis?.() ?? null,
                    completedToday,
                    previousTexts: todos.filter(t => t.id !== id && t.xpGiven > 0).map(t => t.text),
                });
                batch.update(todoRef, { completed: true, xpAwarded: true, xpGiven: evaluation.xp, xpAt: serverTimestamp() });
                batch.set(
                    doc(db, "users", user.uid),
                    { xp: increment(evaluation.xp), ...(userName && { name: userName }) },
                    { merge: true },
                );
                await batch.commit();
                setXpNotice({ id: Date.now(), xp: evaluation.xp, reason: evaluation.reason });
            } else {
                batch.update(todoRef, { completed: !target.completed });
                await batch.commit();
            }
        } catch (error) {
            console.error("Failed to update task or award XP:", error);
        }
    };

    const deleteTodo = async id => {
        try {
            await deleteDoc(doc(db, "todos", id));
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const clearCompleted = async () => {
        try {
            const batch = writeBatch(db);
            todos.filter(todo => todo.completed).forEach(todo => batch.delete(doc(db, "todos", todo.id)));
            await batch.commit();
        } catch (error) {
            console.error("Failed to clear completed tasks:", error);
        }
    };

    const activeCount = todos.filter(todo => !todo.completed).length;

    return {
        todos: filterTodos(todos, filter),
        activeCount,
        completedCount: todos.length - activeCount,
        filter,
        setFilter,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        userXp,
        userName,
        xpNotice,
        dismissXpNotice: () => setXpNotice(null),
    };
};

export default useTodos;
