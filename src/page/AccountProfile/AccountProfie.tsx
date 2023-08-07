import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AccountContext } from '../../context/Context';
import { AccountData } from '../../interfaces';
import { useTransformTypeLetter } from '../../hooks/useTransformTypeLetter';

export default function AccountProfile() {
	const { numberAccount } = useParams();

	const { accounts } = useContext(AccountContext);

	// Validación para mostrar el saldo que no sea de tipo numero, en 0
	const balanceValidateNumber = accounts.filter((account) => {
		const balance = Number(account.saldo);
		if (isNaN(balance)) {
			account.saldo = '0';
		}
		return account;
	});

	// Validación para devolver una cuenta en especifico segun el parametro pasado por URL
	const dataAccount: AccountData | undefined = balanceValidateNumber.find((account) => account.n === numberAccount);

	if (!dataAccount) {
		return <Navigate to='/404' />;
	}

	return (
		<div className='grow h-auto flex flex-col flex-wrap gap-2 justify-center items-center account-profile'>
			<div className='w-2/4 flex flex-col gap-10 justify-center items-center font-sans text-gray-600 text-lg' data-testid='account-profile'>
				<p className='w-full text-center'>
					Saldo de la cuenta: {dataAccount?.moneda}&nbsp;{dataAccount?.saldo}
				</p>
				<p className='w-full text-center'>Tipo de cuenta: {useTransformTypeLetter(dataAccount?.tipo_letras)}</p>
				<p className='w-full text-center'>Número de cuenta: {dataAccount?.n}</p>
			</div>
		</div>
	);
}
