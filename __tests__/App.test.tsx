import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {describe, expect, it} from "vitest";

import App from '../src/App';
import {requests, server} from "./setupMSW";
import {rest} from "msw";

describe('App', () => {
    it('renders headline', async () => {
        const user = userEvent.setup()
        render(<App/>);

        const countButton = screen.getByText('count is 0');
        expect(countButton).toBeInTheDocument()

        await user.click(countButton)
        expect(screen.getByText(/count is 1/)).toBeInTheDocument()
    });

    it('call an API', async () => {
        const user = userEvent.setup()
        server.use(
            rest.all("https://example.com/", (req, res, ctx) => {
                return res(ctx.status(404))
            })
        )
        render(<App/>);

        await user.click(screen.getByText(/call api/i))

        expect(requests[0].url.toString()).toEqual("https://example.com/")
        expect(screen.getByText(/404/i)).toBeInTheDocument()
    });
});
