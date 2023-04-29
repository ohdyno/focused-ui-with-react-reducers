import {render, screen} from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
    describe('renders from initialState', () => {
        it('count 0', async () => {
            render(<App initialState={{count: 0}}/>);
            expect(screen.getByText('count is 0')).toBeInTheDocument()
        });

        it('count 1', async () => {
            render(<App initialState={{count: 1}}/>);
            expect(screen.getByText('count is 1')).toBeInTheDocument()
        });

        it('default value for initial state', async () => {
            render(<App />);
            expect(screen.getByText('count is 0')).toBeInTheDocument()
        });
    });
});
