import axios from 'axios';
import { Accounts, Data } from '../interfaces';
export const getAccount = async (): Promise<Data> => {
	return await axios.get('https://api.npoint.io/97d89162575a9d816661');
};
