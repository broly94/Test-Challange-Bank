import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('Test app', () => {
	render(<App />);
	test('should first', () => {
		const title = screen.getByText(/NCR/i);
		expect(title).toBeInTheDocument();
	});
});
