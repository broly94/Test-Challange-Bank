import React, { useContext } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountHome from '../page/Home/AccountHome';
import { AccountContext } from '../context/Context';
import { Accounts } from '../interfaces';

beforeEach(() => {});

describe('Debe renderizar el componente según si hay o no datos para mostrar', () => {
	test('Renderizar las cuentas cuando esten listas', async () => {
		const mockAccounts: Accounts['cuentas'] = [];

		const contextValue = {
			accounts: mockAccounts,
			setAccounts: jest.fn(),
			startIndex: 0,
			setStartIndex: jest.fn(),
			accountPerPage: 5,
		};

		render(
			<AccountContext.Provider value={contextValue}>
				<AccountHome />
			</AccountContext.Provider>
		);

		// Esperar hasta que los datos se carguen en el componente
		await waitFor(() => {
			const accountsContainer = screen.getByTestId('accounts-container');
			expect(accountsContainer).toBeInTheDocument();
		});
	});
});
