import {createActionOrThunkDispatch, ThunkDispatch} from "./thunk-dispatch.ts";
import {createStore as _createStore} from "zustand";
import {devtools} from "zustand/middleware";

type Store<State, Action> = {
    state: State,
    dispatch: ThunkDispatch<State, Action>
}

type Reducer<State, Action> = (state: State, action: Action) => State

type GenericAction = { type: unknown }

export function createStore<State, Action extends GenericAction>(reducer: Reducer<State, Action>, initialState: State) {
    return _createStore<Store<State, Action>>()(devtools(
            (set, get) => {
                const dispatch = (action: Action) => {
                    set((store) => ({
                        ...store,
                        state: reducer(store.state, action)
                    }), false, action)
                };

                return ({
                    state: initialState,
                    dispatch: createActionOrThunkDispatch(dispatch, () => get().state)
                });
            }
        )
    );
}
