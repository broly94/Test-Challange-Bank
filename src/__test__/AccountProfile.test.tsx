import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccountContext } from '../context/Context';
import { Accounts } from '../interfaces';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AccountProfile from '../page/AccountProfile/AccountProfie';
import NotFound from '../page/NotFound/NotFound';

describe('Debe renderizar informacion de la cuenta seleccionada', () => {
	const mockAccounts: Accounts['cuentas'] = [
		{
			e: '1',
			n: '872378326701',
			t: '02',
			saldo: '1500',
			moneda: 'u$s',
			tipo_letras: 'CC',
		},
	];

	const accountNumber = mockAccounts[0].n;

	const contextValue = {
		accounts: mockAccounts,
		setAccounts: jest.fn(),
		startIndex: 0,
		setStartIndex: jest.fn(),
		accountPerPage: 2,
	};

	beforeAll(() => {
		render(
			<MemoryRouter initialEntries={[`/account/${accountNumber}`]}>
				<AccountContext.Provider value={contextValue}>
					<Routes>
						<Route path='/account/:numberAccount' element={<AccountProfile />} />
					</Routes>
				</AccountContext.Provider>
			</MemoryRouter>
		);
	});

	test('Debe rendereizar el contenedor del perfil, ademas debe mostrar el numero, saldo y tipo de cuenta correspondiente', async () => {
		await waitFor(() => {
			const accountProfile = screen.getByTestId('account-profile');
			expect(accountProfile).toBeInTheDocument();

			const balanceText = screen.getByText((content) => {
				return content.includes('Saldo de la cuenta: u$s 1500');
			});
			expect(balanceText).toBeInTheDocument();

			const accountNumberText = screen.getByText((content) => {
				return content.includes('Número de cuenta: 872378326701');
			});
			expect(accountNumberText).toBeInTheDocument();

			const accountTypeText = screen.getByText((content) => {
				return content.includes('Cuenta Corriente');
			});
			expect(accountTypeText).toBeInTheDocument();
		});
	});

	test('Debe redirigir a la página 404 si no hay datos de cuenta', async () => {
		const accountNumber = 'accountNumberThatDoesNotExist';

		render(
			<MemoryRouter initialEntries={[`/account/${accountNumber}`]}>
				<AccountContext.Provider value={contextValue}>
					<Routes>
						<Route path='/account/:numberAccount' element={<AccountProfile />} />
						<Route path='/404' element={<NotFound />} />
					</Routes>
				</AccountContext.Provider>
			</MemoryRouter>
		);

		// Expect to be redirected to the 404 page
		const notFoundPage = await screen.findByText('Not Found');
		expect(notFoundPage).toBeInTheDocument();
	});
});
