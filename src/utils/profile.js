import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const NAME_MIN = 2;
export const NAME_MAX = 20;

export const validateName = name => {
    const trimmed = name.trim();
    if (trimmed.length < NAME_MIN) return `Name must be at least ${NAME_MIN} characters.`;
    if (trimmed.length > NAME_MAX) return `Name must be at most ${NAME_MAX} characters.`;
    if (trimmed.includes("@")) return "Name cannot contain an email address.";
    return null;
};

// Saves the public display name used by the leaderboard
export async function saveDisplayName(user, name) {
    const trimmed = name.trim();
    await setDoc(doc(db, "users", user.uid), { name: trimmed }, { merge: true });
    await updateProfile(auth.currentUser ?? user, { displayName: trimmed });
    return trimmed;
}
