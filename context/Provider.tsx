import React from 'react';
import { Accounts } from '../src/interfaces';
import { AccountContext } from './Context';

interface Props {
	children: JSX.Element | JSX.Element[];
}
export const AccountProvider = ({ children }: Props) => {
	const [accounts, setAccounts] = React.useState([] as Accounts['cuentas']);
	const [startIndex, setStartIndex] = React.useState(0);
	const accountPerPage = 5;

	return (
		<AccountContext.Provider value={{ accounts, setAccounts, startIndex, setStartIndex, accountPerPage }}>
			{children}
		</AccountContext.Provider>
	);
};
