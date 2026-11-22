// Strict XP evaluation. Most tasks are worth 1-8 XP; 20 is the hard cap.
// Anti-farming rules zero out or shrink the reward instead of just rewarding length.

const MAX_XP = 20;
const MIN_TASK_AGE_MS = 2 * 60 * 1000; // completing a task within 2 min of creating it earns nothing
const SLOW_TASK_AGE_MS = 10 * 60 * 1000; // under 10 min earns half

// Word lists cover English and Romanian. Romanian entries are written without diacritics
// because normalize() strips them (a -> a, s -> s, t -> t, i -> i).
const ACTION_VERBS = new Set([
    // English
    "build", "implement", "design", "write", "research", "analyze", "analyse", "develop", "create",
    "prepare", "plan", "review", "refactor", "debug", "deploy", "study", "learn", "practice",
    "organize", "organise", "finish", "complete", "submit", "present", "train", "revise", "solve",
    // Romanian (imperative, infinitive, 1st person)
    "construieste", "construiesc", "implementeaza", "implementez", "proiecteaza", "proiectez",
    "scrie", "scriu", "redacteaza", "redactez", "cerceteaza", "cercetez", "analizeaza", "analizez",
    "dezvolta", "dezvolt", "creeaza", "creez", "pregateste", "pregatesc", "planifica", "planific",
    "revizuieste", "revizuiesc", "recapituleaza", "recapitulez", "depaneaza", "optimizeaza",
    "optimizez", "publica", "livreaza", "livrez", "studiaza", "studiez", "invata", "invat",
    "exerseaza", "exersez", "organizeaza", "organizez", "termina", "termin", "finalizeaza",
    "finalizez", "completeaza", "completez", "preda", "predau", "prezinta", "prezint",
    "antreneaza", "antrenez", "rezolva", "rezolv", "citeste", "citesc", "parcurge", "parcurg",
]);

const EFFORT_WORDS = new Set([
    // English (plural "s" is stripped before matching)
    "project", "report", "essay", "assignment", "presentation", "exam", "homework", "thesis",
    "algorithm", "database", "backend", "frontend", "api", "code", "workout", "exercise", "chapter",
    "course", "lecture", "research", "documentation", "budget", "proposal", "interview", "meeting",
    // Romanian (common definite/plural forms listed explicitly)
    "proiect", "proiectul", "proiecte", "raport", "raportul", "rapoarte", "eseu", "eseul", "tema",
    "teme", "referat", "referatul", "lucrare", "lucrarea", "prezentare", "prezentarea", "examen",
    "examenul", "licenta", "disertatie", "algoritm", "algoritmul", "algoritmi", "cod", "codul",
    "antrenament", "antrenamentul", "exercitii", "exercitiu", "capitol", "capitolul", "curs",
    "cursul", "laborator", "laboratorul", "seminar", "documentatie", "documentatia", "buget",
    "bugetul", "propunere", "propunerea", "interviu", "interviul", "sedinta", "cercetare",
    "cercetarea", "aplicatie", "aplicatia",
]);

const TRIVIAL_WORDS = new Set([
    "test", "testing", "asdf", "stuff", "thing", "things", "nothing", "something", "task", "todo",
    "abc", "xxx",
    "ceva", "chestii", "chestie", "lucruri", "lucru", "nimic", "treaba", "teste",
]);

const inSet = (set, word) => set.has(word) || set.has(word.replace(/s$/, ""));

// 1st-3rd task of the day full value, then it drops quickly
const dailyFactor = completedToday => {
    if (completedToday < 3) return 1;
    if (completedToday < 6) return 0.5;
    if (completedToday < 10) return 0.25;
    return 0;
};

// Lowercase, strip diacritics (Romanian a/a/i/s/t with marks, comma-below and cedilla forms), drop punctuation
const normalize = text =>
    text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

const zero = reason => ({ xp: 0, reason });

/**
 * @param {string} taskTitle
 * @param {{ createdAtMs?: number|null, completedToday?: number, previousTexts?: string[] }} ctx
 */
export function calculateTaskXp(taskTitle, ctx = {}) {
    const { createdAtMs = null, completedToday = 0, previousTexts = [] } = ctx;
    const clean = normalize(taskTitle);
    const words = clean.split(" ").filter(Boolean);

    // --- Disqualifiers ---
    if (words.length < 2) return zero("Task title is too short to be worth any XP.");
    if (words.filter(w => /[aeiouy]/.test(w)).length / words.length < 0.6 || /(.)\1{3,}/.test(clean)) {
        return zero("Task title does not look like a real task.");
    }
    if (new Set(words).size / words.length < 0.6) return zero("Task title is too repetitive.");
    if (previousTexts.some(t => normalize(t) === clean)) return zero("You already earned XP for this exact task.");

    const age = createdAtMs === null ? 0 : Date.now() - createdAtMs;
    if (age < MIN_TASK_AGE_MS) return zero("Completed too quickly after creating it. Real tasks take time.");

    const factor = dailyFactor(completedToday);
    if (factor === 0) return zero("Daily XP limit reached (10 rewarded tasks).");

    // --- Scoring ---
    let score = 2;
    const reasons = ["base +2"];

    const detail = Math.min(words.length, 12) - 2;
    if (detail > 0) {
        score += detail * 0.5;
        reasons.push(`detail +${detail * 0.5}`);
    }

    if (words.some(w => ACTION_VERBS.has(w))) {
        score += 2;
        reasons.push("clear action +2");
    }

    const effort = Math.min(new Set(words.filter(w => inSet(EFFORT_WORDS, w))).size * 1.5, 6);
    if (effort > 0) {
        score += effort;
        reasons.push(`substantial work +${effort}`);
    }

    const hours = clean.match(/(\d+(?:\.\d+)?)\s*(?:h|hr|hrs|hour|hours|ora|ore)\b/);
    const minutes = clean.match(/(\d+)\s*(?:m|min|mins|minute|minutes|minut)\b/);
    const duration = Math.min(hours ? Number(hours[1]) * 2 : minutes ? Number(minutes[1]) / 30 : 0, 6);
    if (duration > 0) {
        score += duration;
        reasons.push(`duration +${Math.round(duration * 10) / 10}`);
    }

    if (words.some(w => inSet(TRIVIAL_WORDS, w))) {
        score *= 0.5;
        reasons.push("vague wording x0.5");
    }

    let xp = Math.min(score, MAX_XP);

    // --- Anti-farming modifiers ---
    if (age < SLOW_TASK_AGE_MS) {
        xp *= 0.5;
        reasons.push("done within 10 min x0.5");
    }
    if (factor < 1) {
        xp *= factor;
        reasons.push(`daily diminishing returns x${factor}`);
    }

    xp = Math.max(1, Math.round(xp));
    return { xp, reason: reasons.join(", ") };
}
