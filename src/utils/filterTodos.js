import { FILTERS } from "../constants/filters";

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
            filtered = todos;
            break;
    }

    // Sortăm astfel încât cele necompletate (false) să fie primele,
    // iar cele completate (true) să ajungă la final
    return [...filtered].sort((a, b) => Number(a.completed) - Number(b.completed));
};
