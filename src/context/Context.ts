import React from 'react';
import { Accounts } from '../interfaces/index';
interface Props {
	accounts: Accounts['cuentas'];
	setAccounts: React.Dispatch<React.SetStateAction<Accounts['cuentas']>>;
	startIndex: number;
	setStartIndex: React.Dispatch<React.SetStateAction<number>>;
	accountPerPage: number;
}
export const AccountContext = React.createContext({} as Props);
