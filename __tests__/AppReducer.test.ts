import {rest} from "msw";
import {waitFor} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";

import {requests, server} from "./setupMSW";
import {Action, Actions, appReducer, AppState, defaultState} from "../src/AppReducer";

describe(`App Reducer`, () => {
    describe('when it receives the "increment" action', () => {
        const initialState: AppState = defaultState;
        const action: Action = Actions.increment(vi.fn());

        it('should call the count client when it receives the "increment" action',  async () => {
            appReducer(initialState, action)

            await waitFor(() => expect(requests.length).toBeGreaterThan(0))

            expect(requests[0].url.toString()).toEqual(`https://example.com/api/increment/${initialState.count}`)
        });

        it('should dispatch "increment success" when the count client returns 200',  async () => {
            appReducer(initialState, action)

            await waitFor(() => expect(action.dispatch).toHaveBeenCalledTimes(1))
            expect(action.dispatch).toHaveBeenLastCalledWith(Actions.incrementSuccess(initialState.count))
        });

        it('should not increment the count if the count client does not return 200',  async () => {
            const non200Response = (req, res, ctx) => res(ctx.status(500));
            server.use(
                rest.all(/.*/, non200Response)
            )

            appReducer(initialState, action)

            await waitFor(() => expect(action.dispatch).toHaveBeenCalledTimes(1))
            expect(action.dispatch).toHaveBeenLastCalledWith(Actions.incrementFailure())
        });
    });

    describe('when it receives the "increment success" action', () => {
        const initialState: AppState = defaultState;
        it('increments the count',  () => {
            const action: Action = Actions.incrementSuccess(initialState.count);

            const newState = appReducer(initialState, action);

            expect(newState.count).toEqual(initialState.count + 1)
        });

        it('increments the count from the "action.count"',  () => {
            const action: Action = Actions.incrementSuccess(5);

            const newState = appReducer(initialState, action);

            expect(newState.count).toEqual(action.count + 1)
        });

        it('ignores the action if the "state.count" has already incremented past "action.count"',  () => {
            const action: Action = Actions.incrementSuccess(5);
            const initialState: AppState = {count: action.count + 2};

            const newState = appReducer(initialState, action);

            expect(newState.count).toEqual(initialState.count)
        });
    });
})
