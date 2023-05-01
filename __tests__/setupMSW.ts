import {SetupServer, setupServer} from "msw/node";
import {rest} from "msw";
import { beforeAll, afterAll, afterEach } from 'vitest'

const resolver = (req, res, ctx) => {
    return res(ctx.status(200))
};

const handlers = [
    rest.all(/.*/, resolver)
];

const mswServer = setupServer(...handlers)

beforeAll(() => {
    mswServer.listen()
})

afterAll(() => {
    mswServer.close()
})

afterEach(() => {
    mswServer.resetHandlers()
})

export const server = mswServer
