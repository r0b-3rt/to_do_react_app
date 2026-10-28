// src/auth/SignupForm.jsx
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";

export default function SignupForm({ onSwitchToLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async e => {
        e.preventDefault();
        setError("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Creează Cont</h2>

            {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="nume@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        Parolă
                    </label>
                    <input
                        type="password"
                        placeholder="Minim 6 caractere"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-indigo-500/25 transition-all duration-200 mt-2"
                >
                    Sign Up
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Ai deja cont?{" "}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none"
                >
                    Conectare
                </button>
            </p>
        </div>
    );
}
