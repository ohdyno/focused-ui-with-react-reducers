import {render, screen, waitFor} from '@testing-library/react';
import {vi} from "vitest";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from 'vitest'
import {Actions, defaultState} from "../src/AppReducer";
import App from '../src/App';

describe('App', () => {
    describe('renders from initialState', () => {
        it('count 0', () => {
            render(<App initialState={defaultState}/>);
            expect(screen.getByText('count is 0')).toBeInTheDocument()
        });

        it('count 1', () => {
            render(<App initialState={{count: 1}}/>);
            expect(screen.getByText('count is 1')).toBeInTheDocument()
        });

        it('default value for initial state', () => {
            render(<App/>);
            expect(screen.getByText('count is 0')).toBeInTheDocument()
        });
    });

    describe('translates user interactions to events', () => {
        it('dispatches "increment counter" on click', async () => {
            const user = userEvent.setup()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const reducer = vi.fn((state, _) => state);
            render(<App reducer={reducer}/>);

            await user.click(screen.getByRole('button'))

            expect(reducer).toHaveBeenCalledWith(expect.anything(), Actions.increment(expect.anything()))
            expect(reducer).toHaveBeenCalledTimes(1)
        });

        it('uses default reducer to actually increment the count', async () => {
            const user = userEvent.setup()
            render(<App />);

            await user.click(screen.getByRole('button'))

            await waitFor(() => expect(screen.getByText('count is 1')).toBeInTheDocument())
        });
    });
});
