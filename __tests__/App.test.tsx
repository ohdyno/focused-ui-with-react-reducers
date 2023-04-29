import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import App from '../src/App';

describe('App', () => {
    it('renders headline', async () => {
        const user = userEvent.setup()
        render(<App/>);

        const countButton = screen.getByText('count is 0');
        expect(countButton).toBeInTheDocument()

        await user.click(countButton)
        expect(screen.getByText(/count is 1/)).toBeInTheDocument()
    });
});
