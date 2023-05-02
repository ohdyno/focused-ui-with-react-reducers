import {Dispatch, Reducer} from "react";

// Actions
export const Actions = {
    increment(dispatch: Dispatch<Action>): IncrementAction {
        fetch(`https://example.com/api/increment/`)
            .then((response) => {
                if (response.ok) {
                    dispatch(Actions.incrementSuccess());
                } else {
                    dispatch(Actions.incrementFailure());
                }
            })
        return {
            type: "increment"
        }
    },

    incrementSuccess(): IncrementSuccess {
        return {
            type: "increment success",
        }
    },

    incrementFailure(): IncrementFailure {
        return {
            type: "increment failure"
        }
    }
}

type IncrementAction = { type: 'increment' }
type IncrementFailure = { type: "increment failure" };
type IncrementSuccess = { type: "increment success" };

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
        case "increment success":
            return {...state, count: state.count + 1};
        default:
            return state
    }
}
