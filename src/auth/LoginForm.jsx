import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle"; // Ajustează calea dacă e nevoie
import { auth } from "../firebase";

export default function LoginForm({ onSwitchToSignup, isDark, onToggleTheme }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const getFriendlyErrorMessage = errorCode => {
        switch (errorCode) {
            case "auth/invalid-credential":
            case "auth/user-not-found":
            case "auth/wrong-password":
                return "Invalid email or password. Please check your inputs.";
            case "auth/too-many-requests":
                return "Too many failed attempts. Try again later.";
            default:
                return "Failed to sign in. Please try again.";
        }
    };

    const handleLogin = async e => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(getFriendlyErrorMessage(err.code));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {/* Header cu titlu și Theme Toggle */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Sign in to access your tasks</p>
                </div>
                <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            </div>

            {error && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl shadow-sm transition-all duration-200 mt-2 cursor-pointer disabled:opacity-50 flex items-center justify-center"
                >
                    {loading ? "Signing in..." : "Log In"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none cursor-pointer"
                >
                    Create Account
                </button>
            </p>
        </div>
    );
}
