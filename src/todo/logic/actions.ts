import {TodoItem} from "./reducer.ts";

export type TodoAction =
    | { type: "new todo", content: string }
    | { type: "toggle todo status", id: string }
    | { type: "load todos", todos: TodoItem[] }

export function ToggleTodoStatusAction(todo: TodoItem): TodoAction {
    return {type: "toggle todo status", id: todo.id}
}

export function NewTodoAction(content: string): TodoAction {
    return {type: "new todo", content}
}

export function LoadTodosAction(todos: TodoItem[]): TodoAction {
    return {type: "load todos", todos}
}
