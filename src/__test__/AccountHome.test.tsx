import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountHome from '../page/Home/AccountHome';
import { AccountContext } from '../context/Context';
import { Accounts } from '../interfaces';
import { MemoryRouter } from 'react-router-dom';

describe('Debe renderizar "No hay cuentas para mostrar" al cargar el componente sin esperar la consulta a la api', () => {
	test('Testear que el componente donde esta el h1 con el texto "No hay cuentas para mostrar" exista', () => {
		const mockAccounts: Accounts['cuentas'] = [];

		const contextValue = {
			accounts: mockAccounts,
			setAccounts: jest.fn(),
			startIndex: 0,
			setStartIndex: jest.fn(),
			accountPerPage: 2,
		};

		render(
			<MemoryRouter>
				<AccountContext.Provider value={contextValue}>
					<AccountHome />
				</AccountContext.Provider>
			</MemoryRouter>
		);
		const accountsContainer = screen.queryByTestId('not-accounts-container');
		expect(accountsContainer).toBeInTheDocument();
	});
});

describe('Debe renderizar el componente cuando ya cargó los datos de la api en el state', () => {
	const mockAccounts: Accounts['cuentas'] = [
		{
			e: '1',
			n: '872378326701',
			t: '02',
			saldo: '1500',
			moneda: 'u$s',
			tipo_letras: 'CC',
		},
		{
			e: '1',
			n: '872378326702',
			t: '02',
			saldo: '1500',
			moneda: 'u$s',
			tipo_letras: 'CC',
		},
		{
			e: '1',
			n: '872378326703',
			t: '02',
			saldo: '1500',
			moneda: 'u$s',
			tipo_letras: 'CC',
		},
		{
			e: '1',
			n: '872378326704',
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

	beforeEach(() => {
		render(
			<MemoryRouter>
				<AccountContext.Provider value={contextValue}>
					<AccountHome />
				</AccountContext.Provider>
			</MemoryRouter>
		);
	});

	test('Renderizar las cuentas cuando estén listas', async () => {
		await waitFor(() => {
			const accountsContainer = screen.getByTestId('accounts-container');
			expect(accountsContainer).toBeInTheDocument();
		});
	});

	test('Debe aparecer el botón "Más Opciones", pero no debe aparecer el botón "Opciones anteriores" al renderizar por primera vez', async () => {
		await waitFor(() => {
			const moreOptionsButton = screen.getByTestId('button-more-options');
			const previousOptionsButton = screen.queryByTestId('button-previous-options');
			expect(moreOptionsButton).toBeInTheDocument();
			if (contextValue.startIndex === 0) {
				// Si startIndex es 0, el botón de opciones anteriores debe estar oculto (con clase hidden)
				expect(previousOptionsButton).not.toHaveStyle('display: hidden;');
			} else {
				// Si startIndex no es 0, el botón de opciones anteriores debe estar visible (sin clase hidden)
				expect(previousOptionsButton).toHaveStyle('display: inline-block;');
			}
		});
	});

	test('No debe aparecer el botón "Más Opciones" al llegar al final del paginador', async () => {
		const booleanPageFinished = contextValue.startIndex + contextValue.accountPerPage >= contextValue.accounts.length;
		await waitFor(() => {
			if (booleanPageFinished) {
				const moreOptionsButtons = screen.getByTestId('button-more-options');
				expect(moreOptionsButtons).toHaveStyle('display: hidden');
			}
		});
	});
});
