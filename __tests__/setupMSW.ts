import {setupServer} from "msw/node";
import {MockedRequest, rest} from "msw";
import {afterAll, afterEach, beforeAll} from 'vitest'

const resolver = (req, res, ctx) => {
    return res(ctx.status(200))
};

const handlers = [
    rest.all(/.*/, resolver)
];

const mswServer = setupServer(...handlers)

const listener = (req) => {
    requests.push(req)
};

beforeAll(() => {
    mswServer.listen()
    mswServer.events.on('request:start', listener)
})

afterAll(() => {
    mswServer.events.removeListener('request:start', listener)
    mswServer.close()
})

afterEach(() => {
    mswServer.resetHandlers()
    requests.length = 0
})

export const requests: MockedRequest[] = []

export const server = mswServer
