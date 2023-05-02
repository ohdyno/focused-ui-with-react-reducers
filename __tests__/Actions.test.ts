import {describe, expect, it, vi} from "vitest";
import {Actions} from "../src/AppReducer";
import {waitFor} from "@testing-library/react";
import {requests, server} from "./setupMSW";
import {rest} from "msw";

describe('Actions', () => {
    describe('creating the increment action', () => {
        const dispatchSpy = vi.fn();

        it('should call the API', async () => {
            Actions.increment(dispatchSpy);

            await waitFor(() => expect(requests.length).toBeGreaterThan(0))

            expect(requests[0].url.toString()).toEqual(`https://example.com/api/increment/`)
        });

        it('should dispatch "increment success" when the count client returns 200', async () => {
            Actions.increment(dispatchSpy);
            await waitFor(() => expect(dispatchSpy).toHaveBeenCalledTimes(1))
            expect(dispatchSpy).toHaveBeenLastCalledWith(Actions.incrementSuccess())
        });

        it('should not increment the count if the count client does not return 200', async () => {
            const non200Response = (req, res, ctx) => res(ctx.status(500));
            server.use(
                rest.all(/.*/, non200Response)
            )

            Actions.increment(dispatchSpy);

            await waitFor(() => expect(dispatchSpy).toHaveBeenCalledTimes(1))
            expect(dispatchSpy).toHaveBeenLastCalledWith(Actions.incrementFailure())
        });

    })
});
