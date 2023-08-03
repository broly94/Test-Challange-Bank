import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountHome from '../page/Home/AccountHome';

describe('Deben estar los botones o no segun la paginación', () => {
	test('boton para ver mas opciónes', () => {
		render(<AccountHome />);
	});
});
