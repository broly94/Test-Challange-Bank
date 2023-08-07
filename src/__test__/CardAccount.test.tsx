import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccountContext } from '../context/Context';
import { Accounts } from '../interfaces';
import { MemoryRouter } from 'react-router-dom';
import CardAccount from '../page/Home/components/CardAccount';

describe('Debe estar el componente card activo con su respectiva información', () => {
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

	const contextValue = {
		accounts: mockAccounts,
		setAccounts: jest.fn(),
		startIndex: 0,
		setStartIndex: jest.fn(),
		accountPerPage: 2,
	};

	beforeAll(() => {
		render(
			<MemoryRouter>
				<AccountContext.Provider value={contextValue}>
					<CardAccount />
				</AccountContext.Provider>
			</MemoryRouter>
		);
	});

	test('Debe tener el numero y tipo de cuenta correspondiente', async () => {
		await waitFor(() => {
			const accountNumber = screen.queryByText(/Nro: 872378326701/i);
			expect(accountNumber).toBeInTheDocument();
			const accountType = screen.queryByText('Cuenta Corriente');
			expect(accountType).toBeInTheDocument();
		});
	});
});
