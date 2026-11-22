import { FILTERS } from "../constants/filters";

// createdAt is null until serverTimestamp() is confirmed, so treat it as "now"
const createdMillis = todo => todo.createdAt?.toMillis?.() ?? Number.MAX_SAFE_INTEGER;

export const filterTodos = (todos, filter) => {
    let filtered = todos;

    switch (filter) {
        case FILTERS.ACTIVE:
            filtered = todos.filter(todo => !todo.completed);
            break;
        case FILTERS.COMPLETED:
            filtered = todos.filter(todo => todo.completed);
            break;
        case FILTERS.ALL:
        default:
            break;
    }

    // Active tasks first, then newest first
    return [...filtered].sort((a, b) => Number(a.completed) - Number(b.completed) || createdMillis(b) - createdMillis(a));
};
