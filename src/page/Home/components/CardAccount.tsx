import { useContext } from 'react';
import { AccountContext } from '../../../context/Context';
import { Link } from 'react-router-dom';
import { useTransformTypeLetter } from '../../../hooks/useTransformTypeLetter';

export default function CardAccount() {
	const { accounts, startIndex, accountPerPage } = useContext(AccountContext);
	const currentAccounts = accounts.slice(startIndex, startIndex + accountPerPage);

	return (
		<>
			{currentAccounts.map((account) => (
				<Link
					to={'/account/' + account.n}
					key={account.n}
					className='w-60 h-36 bg-green-600 flex flex-col text-center justify-center rounded-md cursor-pointer'
				>
					<p className='text-white'>{useTransformTypeLetter(account.tipo_letras)}</p>
					<p className='text-white'>Nro: {account.n}</p>
				</Link>
			))}
		</>
	);
}
