import {createContext, Dispatch, useContext} from "react";
import {TodoState, TodoStatus} from "./TodoReducer.ts";
import {TodoAction} from "./TodoActions.ts";
import {Thunk} from "./TodoThunks.ts";

export type TodoStore = {
    state: TodoState,
    dispatch: Dispatch<TodoAction | Thunk>
}
export const defaultState: TodoState = {
    todos: [
        {
            id: "0",
            title: "mow the lawn",
            status: TodoStatus.Complete
        },
        {
            id: "1",
            title: "feed the dog",
            status: TodoStatus.Incomplete
        }
    ]
};

export const StoreState = createContext<TodoState>(defaultState)

export const defaultDispatch: Dispatch<TodoAction | Thunk> = () => {/* do nothing */
};
export const StoreDispatch = createContext<Dispatch<TodoAction | Thunk>>(defaultDispatch)

export function useDispatch(): Dispatch<TodoAction | Thunk> {
    return useContext(StoreDispatch);
}

export function useStoreState(): TodoState {
    return useContext(StoreState);
}
