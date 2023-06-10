import reducer, {TodoState, TodoStatus} from "./reducer.ts";
import {createActionOrThunkDispatch, ThunkDispatch} from "../../thunk-dispatch/thunk-dispatch.ts";
import {TodoAction} from "./actions.ts";
import {create} from "zustand";
import {devtools} from "zustand/middleware";

type Store = {
    state: TodoState,
    dispatch: ThunkDispatch<TodoState, TodoAction>
}

const defaultState: TodoState = {
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

export const useStore = create<Store>()(devtools(
        (set, get) => ({
            state: defaultState,
            dispatch: createActionOrThunkDispatch((action) => {
                set((store) => ({
                    ...store,
                    state: reducer(store.state, action)
                }), false, action)
            }, () => get().state)
        })
    )
)
