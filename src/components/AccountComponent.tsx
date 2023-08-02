import React, { useEffect, useState } from 'react';
import { getAccount } from '../api/getAccount';
import { Accounts, Data } from '../interfaces';

export default function AccountComponent() {
	const [accounts, setAccounts] = useState([] as Accounts['cuentas']);
	const getAccounts = async () => {
		const { data } = (await getAccount()) as Data;
		setAccounts(data.cuentas);
		return data;
	};

	const transformTypeLetter = (letter: string) => {
		const letterUppercase = letter && letter.toUpperCase();
		switch (letterUppercase) {
			case 'CC':
				return 'Cuenta Corriente';
			case 'CA':
				return 'Caja de Ahorro';
			case 'CCP':
				return 'Cuenta Corriente Personal';
			default:
				return letterUppercase || 'Tipo de letra no especificado';
		}
	};

	const [startIndex, setStartIndex] = useState(0);
	const cuentasPorPagina = 5;
	const totalPaginas = Math.ceil(accounts.length / cuentasPorPagina);

	const showNext = () => {
		setStartIndex((prevStartIndex) => Math.min(prevStartIndex + cuentasPorPagina, accounts.length - cuentasPorPagina));
	};

	const showPrev = () => {
		setStartIndex((prevStartIndex) => Math.max(prevStartIndex - cuentasPorPagina, 0));
	};

	useEffect(() => {
		getAccounts();
	}, []);

	const currentAccounts = accounts.slice(startIndex, startIndex + cuentasPorPagina);

	return (
		<>
			<button
				onClick={showPrev}
				disabled={startIndex === 0}
				className={`mr-2 ${
					startIndex === 0 ? 'hidden' : 'inline-block'
				} w-60 h-36 bg-green-600 text-center justify-center rounded-md cursor-pointer text-white `}
			>
				{'<< Opciones anteriores'}
			</button>
			{currentAccounts.map((account, index) => (
				<div key={index} className='w-60 h-36 bg-green-600 flex flex-col text-center justify-center rounded-md cursor-pointer'>
					<p className='text-white'>{transformTypeLetter(account.tipo_letras)}</p>
					<p className='text-white'>Nro: {account.n}</p>
				</div>
			))}

			<button
				onClick={showNext}
				disabled={startIndex + cuentasPorPagina >= accounts.length}
				className={`${
					startIndex + cuentasPorPagina >= accounts.length ? 'hidden' : 'inline-block'
				} w-60 h-36 bg-green-600 text-center justify-center rounded-md cursor-pointer text-white`}
			>
				{'Más opciones >>'}
			</button>
		</>
	);
}
