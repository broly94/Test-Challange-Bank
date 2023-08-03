import React, { useContext, useEffect } from 'react';
import { getAccount } from '../../api/getAccount';
import { Data } from '../../interfaces';
import { AccountContext } from '../../context/Context';
import CardAccount from './components/CardAccount';

export default function AccountHome() {
	let { accounts, setAccounts, setStartIndex, startIndex, accountPerPage } = useContext(AccountContext);

	const getAccounts = async () => {
		const { data } = (await getAccount()) as Data;
		if (!data) {
			accounts = [];
		} else {
			const DataNoRepeatAndValidate = data.cuentas.filter(
				(account, index, self) => index === self.findIndex((a) => a.n == account.n && account.n != ' ')
			);
			setAccounts(DataNoRepeatAndValidate);
			return data;
		}
		// Hago un filtro para sacar cuentas con id duplicado y cuentas con id vacio.
	};

	const showNext = () => {
		setStartIndex((prevStartIndex) => Math.min(prevStartIndex + accountPerPage, accounts.length - accountPerPage));
	};

	const showPrev = () => {
		setStartIndex((prevStartIndex) => Math.max(prevStartIndex - accountPerPage, 0));
	};

	useEffect(() => {
		getAccounts();
	}, []);

	return (
		<>
			{accounts.length == 0 ? (
				<div className='grow h-auto flex flex-row flex-wrap gap-5 justify-center items-center account-component'>
					<h1 className='text-2xl font-medium'>No hay cuentas para mostrar</h1>
				</div>
			) : (
				<div className='grow h-auto flex flex-row flex-wrap gap-5 justify-center items-center account-component'>
					<button
						onClick={showPrev}
						disabled={startIndex === 0}
						className={`mr-2 ${
							startIndex === 0 ? 'hidden' : 'inline-block'
						} w-60 h-36 bg-green-600 text-center justify-center rounded-md cursor-pointer text-white `}
					>
						{'<< Opciones anteriores'}
					</button>

					<CardAccount />

					<button
						onClick={showNext}
						disabled={startIndex + accountPerPage >= accounts.length}
						className={`${
							startIndex + accountPerPage >= accounts.length ? 'hidden' : 'inline-block'
						} w-60 h-36 bg-green-600 text-center justify-center rounded-md cursor-pointer text-white`}
					>
						{'Más opciones >>'}
					</button>
				</div>
			)}
		</>
	);
}
