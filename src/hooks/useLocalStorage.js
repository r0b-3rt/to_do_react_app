import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved !== null ? JSON.parse(saved) : initialValue;
        } catch (error) {
            console.error(`Eroare la citirea din localStorage (${key}):`, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Eroare la salvarea în localStorage (${key}):`, error);
        }
    }, [key, value]);

    return [value, setValue];
};
