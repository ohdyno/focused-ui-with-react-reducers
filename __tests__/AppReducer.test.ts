import {describe, expect, it} from "vitest";
import {Action, Actions, appReducer, AppState, defaultState} from "../src/AppReducer";

describe(`App Reducer`, () => {
    describe('when it receives the "increment success" action', () => {
        const initialState: AppState = defaultState;

        it('increments the count', () => {
            const action: Action = Actions.incrementSuccess();

            const newState = appReducer(initialState, action);

            expect(newState.count).toEqual(initialState.count + 1)
        });
    });
})
