export function getRankInfo(xp = 0) {
    if (xp >= 1250) return { name: "Legend", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
    if (xp >= 1000) return { name: "Master", color: "text-purple-500 bg-purple-500/10 border-purple-500/20" };
    if (xp >= 750) return { name: "Diamond", color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" };
    if (xp >= 500) return { name: "Gold", color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20" };
    if (xp >= 250) return { name: "Silver", color: "text-slate-400 bg-slate-400/10 border-slate-400/20" };
    if (xp > 0) return { name: "Bronze", color: "text-amber-700 bg-amber-700/10 border-amber-700/20" };

    return { name: "Unranked", color: "text-gray-400 bg-gray-500/10 border-gray-500/20" };
}
