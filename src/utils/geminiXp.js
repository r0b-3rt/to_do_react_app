export async function calculateTaskXp(taskTitle) {
    const text = taskTitle.toLowerCase();
    const words = text.split(/\s+/).filter(Boolean);

    let score = 5; // Punctaj de pornire mic și strict
    let reasons = [];

    // 1. Criteriul lungimii textului (mult mai ponderat)
    const charLength = taskTitle.length;
    const lengthBonus = Math.floor(charLength * 0.35);
    score += lengthBonus;
    reasons.push(`${charLength} caractere`);

    // 2. Criteriul numărului de cuvinte (mai exigent)
    const wordCount = words.length;
    const wordBonus = wordCount * 1.5;
    score += wordBonus;
    reasons.push(`${wordCount} cuvinte`);

    // 3. Criteriul complexității tehnice / intelectuale (atribuit doar dacă există cuvinte cheie reale)
    const techKeywords = [
        "program",
        "java",
        "react",
        "full-stack",
        "bază",
        "date",
        "algoritm",
        "arhitectură",
        "cod",
        "optimizare",
        "refactorizare",
        "studiu",
        "proiect",
    ];
    const techMatches = techKeywords.filter(keyword => text.includes(keyword)).length;
    if (techMatches > 0) {
        const techBonus = techMatches * 6.5;
        score += techBonus;
        reasons.push(`complexitate tehnică (+${Math.round(techBonus)})`);
    }

    // 4. Criteriul tipului de acțiune
    const actionKeywords = [
        "implementează",
        "dezvoltă",
        "creează",
        "proiectează",
        "analizează",
        "organizează",
        "construiește",
    ];
    const hasAction = actionKeywords.some(keyword => text.includes(keyword));
    if (hasAction) {
        score += 5.2;
        reasons.push("acțiune activă");
    }

    // 5. Criteriul urgenței
    const urgentKeywords = ["urgent", "important", "rapid", "deadline", "critic", "imediat"];
    const hasUrgency = urgentKeywords.some(keyword => text.includes(keyword));
    if (hasUrgency) {
        score += 4.1;
        reasons.push("urgență ridicată");
    }

    // Factor de diversificare strict (fără multipli de 0 sau 5)
    const randomSeed = (text.charCodeAt(0) * 3 + charLength * 7) % 11;
    score += randomSeed;

    let finalXp = Math.round(score);

    // Evităm multiplii de 5 pentru diversificare unică
    if (finalXp % 5 === 0) {
        finalXp += charLength % 2 === 0 ? 1 : -1;
    }

    // Limite stricte: între 5 și 75 XP maxim (foarte rar se va apropia de 75)
    finalXp = Math.min(Math.max(finalXp, 5), 75);

    return {
        xp: finalXp,
        reason: `Evaluare strictă: ${reasons.join(" • ")}`,
    };
}
