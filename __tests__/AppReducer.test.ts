import {setupServer} from 'msw/node'
import {Action, appReducer, AppState} from "../src/AppReducer";
import {MockedRequest, rest} from "msw";
import {waitFor} from "@testing-library/react";

const resolver = (req, res, ctx) => {
    return res(ctx.status(200))
};

const handlers = [
    rest.all(/.*/, resolver)
];
const server = setupServer(...handlers)

function waitForRequests(requests: MockedRequest[], numberOfRequests = 1) {
    return waitFor(() => expect(requests.length).toBeGreaterThan(numberOfRequests - 1));
}

describe(`App Reducer`, () => {
    const requests: MockedRequest[] = []
    beforeAll(() => {
        server.listen()
        server.events.on('request:start', (req) => {
            requests.push(req)
        })
    })

    afterAll(() => {
        server.close()
    })

    afterEach(() => {
        server.resetHandlers()
        requests.length = 0
    })

    it('should call the count client when it receives the "increment count" action', async () => {
        const incrementAction: Action = {type: 'increment counter'};
        const initialState: AppState = {count: 0};
        appReducer(initialState, incrementAction)

        await waitForRequests(requests)

        const request = requests[0];
        expect(request.url.toString()).toEqual(`https://example.com/api/increment/${initialState.count}`)
    });
})
