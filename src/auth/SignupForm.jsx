import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { auth, db } from "../firebase";
import { NAME_MAX, validateName } from "../utils/profile";

export default function SignupForm({ onSwitchToLogin, isDark, onToggleTheme }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const getFriendlyErrorMessage = errorCode => {
        switch (errorCode) {
            case "auth/email-already-in-use":
                return "This email address is already registered.";
            case "auth/invalid-email":
                return "Please enter a valid email address.";
            case "auth/weak-password":
                return "Password should be at least 6 characters long.";
            default:
                return "Failed to create account. Please try again.";
        }
    };

    const handleSignup = async e => {
        e.preventDefault();
        const nameProblem = validateName(name);
        if (nameProblem) return setError(nameProblem);
        setError("");
        setLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            const displayName = name.trim();
            try {
                await setDoc(doc(db, "users", user.uid), { name: displayName }, { merge: true });
                await updateProfile(user, { displayName });
            } catch (profileErr) {
                // The account exists; the name can be set later from the profile
                console.error("Failed to save display name:", profileErr);
            }
        } catch (err) {
            setError(getFriendlyErrorMessage(err.code));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {/* Header with title and theme toggle */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Sign up to start tracking tasks</p>
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

            <form onSubmit={handleSignup} className="space-y-4">
                <div>
                    <label htmlFor="signup-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Display Name
                    </label>
                    <input
                        id="signup-name"
                        type="text"
                        autoComplete="nickname"
                        maxLength={NAME_MAX}
                        placeholder="Shown on the leaderboard"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-base focus:outline-none focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Email Address
                    </label>
                    <input
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-base focus:outline-none focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Password
                    </label>
                    <input
                        type="password"
                        autoComplete="new-password"
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 text-base focus:outline-none focus:ring-4 focus:ring-indigo-500/15 focus:border-indigo-500 transition-all"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 active:scale-[0.98] text-white font-semibold rounded-xl shadow-sm transition-all duration-200 mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                    {loading ? <><span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Processing...</> : "Sign Up"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none cursor-pointer"
                >
                    Log In
                </button>
            </p>
        </div>
    );
}
