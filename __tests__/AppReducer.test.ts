import {Action, appReducer, AppState} from "../src/AppReducer";
import {rest} from "msw";
import {waitFor} from "@testing-library/react";
import {describe, expect, it, vi} from "vitest";
import {requests, server} from "./setupMSW";

describe(`App Reducer`, () => {
    describe('when it receives the "increment" action', () => {
        const initialState: AppState = {count: 0};
        const action: Action = {type: 'increment', dispatch: vi.fn()};

        it('should call the count client when it receives the "increment" action', async () => {
            appReducer(initialState, action)

            await waitFor(() => expect(requests.length).toBeGreaterThan(0))

            expect(requests[0].url.toString()).toEqual(`https://example.com/api/increment/${initialState.count}`)
        });

        it('should dispatch "increment success" when the count client returns 200', async () => {
            appReducer(initialState, action)

            await waitFor(async () => expect(action.dispatch).toHaveBeenCalledTimes(1))
            expect(action.dispatch).toHaveBeenLastCalledWith({type: 'increment success', count: initialState.count})
        });

        it('should not increment the count if the count client does not return 200', async () => {
            const non200Response = (req, res, ctx) => res(ctx.status(500));
            server.use(
                rest.all(/.*/, non200Response)
            )

            appReducer(initialState, action)

            await waitFor(async () => expect(action.dispatch).toHaveBeenCalledTimes(1))
            expect(action.dispatch).toHaveBeenLastCalledWith({type: 'increment failure'})
        });
    });

    describe('when it receives the "increment success" action', () => {
        it('increments the count', async () => {
            const initialState: AppState = {count: 0};
            const action: Action = {type: 'increment success', count: initialState.count};

            const newState = appReducer(initialState, action);

            expect(newState.count).toEqual(initialState.count + 1)
        });

        it('increments the count from the "action.count"', async () => {
            const initialState: AppState = {count: 0};
            const action: Action = {type: 'increment success', count: 5};

            const newState = appReducer(initialState, action);

            expect(newState.count).toEqual(action.count + 1)
        });

        it('ignores the action if the "state.count" has already incremented past "action.count"', async () => {
            const action: Action = {type: 'increment success', count: 5};
            const initialState: AppState = {count: action.count + 2};

            const newState = appReducer(initialState, action);

            expect(newState.count).toEqual(initialState.count)
        });
    });
})
