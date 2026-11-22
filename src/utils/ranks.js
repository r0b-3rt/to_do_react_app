// Thresholds match the stricter XP economy (a typical task is worth 3-8 XP)
export function getRankInfo(xp = 0) {
    if (xp >= 3000) return { name: "Legend", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
    if (xp >= 1500) return { name: "Master", color: "text-purple-500 bg-purple-500/10 border-purple-500/20" };
    if (xp >= 700) return { name: "Diamond", color: "text-cyan-600 bg-cyan-500/10 border-cyan-500/20" };
    if (xp >= 300) return { name: "Gold", color: "text-yellow-600 bg-yellow-500/10 border-yellow-500/20" };
    if (xp >= 100) return { name: "Silver", color: "text-slate-500 bg-slate-400/10 border-slate-400/20" };
    if (xp > 0) return { name: "Bronze", color: "text-amber-700 bg-amber-700/10 border-amber-700/20" };

    return { name: "Unranked", color: "text-gray-500 bg-gray-500/10 border-gray-500/20" };
}
