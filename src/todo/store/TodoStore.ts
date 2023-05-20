import {createContext, useContext} from "react";
import {TodoState, TodoStatus} from "./TodoReducer.ts";
import {TodoAction} from "./TodoActions.ts";
import {Store, ThunkDispatch} from "../../simple-redux/simple-redux.ts";

export type TodoStore = Store<TodoState, TodoAction>

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

export const StoreState = createContext(defaultState)

export const defaultDispatch: ThunkDispatch<TodoAction> = () => {/* do nothing */};
export const StoreDispatch = createContext(defaultDispatch)

export function useDispatch(): ThunkDispatch<TodoAction> {
    return useContext(StoreDispatch);
}

export function useStoreState(): TodoState {
    return useContext(StoreState);
}
