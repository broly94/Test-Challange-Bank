export const useTransformTypeLetter = (letter: string) => {
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
