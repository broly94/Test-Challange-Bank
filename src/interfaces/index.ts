export interface Data {
	data: Accounts;
}

export interface Accounts {
	cuentas: AccountData[];
	cuestas: Cuestas[];
}

export interface AccountData {
	e: string;
	n: string;
	t: string;
	saldo: string;
	moneda: string;
	tipo_letras: string;
}

interface Cuestas {
	id: number;
	nombre: string;
}
