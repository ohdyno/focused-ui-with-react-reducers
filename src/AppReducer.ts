import {Dispatch, Reducer} from "react";

// Actions
export const Actions = {
    increment(dispatch: Dispatch<Action>): IncrementAction {
        return {
            type: "increment",
            dispatch
        }
    },

    incrementSuccess(count: number): IncrementSuccess {
        return {
            type: "increment success",
            count
        }
    },

    incrementFailure(): IncrementFailure {
        return {
            type: "increment failure"
        }
    }
}

type Dispatchable = { dispatch: Dispatch<Action> }
type IncrementAction = { type: 'increment' } & Dispatchable
type IncrementFailure = { type: "increment failure" };
type IncrementSuccess = { type: "increment success", count: number };

export type Action =
    | IncrementAction
    | IncrementFailure
    | IncrementSuccess

// State
export type AppState = {
    count: number
}

export const defaultState: AppState = {count: 0};

// Reducer
export type AppReducer = Reducer<AppState, Action>

export function appReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'increment':
            fetch(`https://example.com/api/increment/${state.count}`)
                .then((response) => {
                    if (response.ok) {
                        action.dispatch(Actions.incrementSuccess(state.count));
                    } else {
                        action.dispatch(Actions.incrementFailure());
                    }
                })
            return state
        case "increment success":
            if (state.count <= action.count) {
                return {...state, count: action.count + 1};
            }
            return state
        default:
            return state
    }
}
