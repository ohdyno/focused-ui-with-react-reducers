import {TodoAction} from "./TodoActions.ts";

export enum TodoStatus {
    Complete = "Complete",
    Incomplete = "Incomplete",
}

export type TodoItem = {
    id: string;
    title: string,
    status: TodoStatus
}

function NewTodoItem(title: string, id: string): TodoItem {
    return {id, title, status: TodoStatus.Incomplete}
}

export type TodoState = {
    todos: TodoItem[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function nonExhaustiveCaseDetected(_case: never): never {
    throw Error("Non-exhaustive case reached. Typescript compilation step should have failed.")
}

export default function reducer(state: TodoState, action: TodoAction) {
    const actionType = action.type;
    switch (actionType) {
        case "load todos":
            return {...state, todos: action.todos}
        case "new todo":
            if (action.content.trim().length > 0) {
                return {...state, todos: [NewTodoItem(action.content, state.todos.length.toString()), ...state.todos]};
            }
            return state
        case "toggle todo status":
            return {
                ...state, todos: state.todos.map((todo) => {
                    if (todo.id === action.id) {
                        return {
                            ...todo,
                            status: TodoStatus.Complete === todo.status ? TodoStatus.Incomplete : TodoStatus.Complete
                        }
                    }
                    return todo
                })
            }
        default:
            return nonExhaustiveCaseDetected(actionType)
    }
}
