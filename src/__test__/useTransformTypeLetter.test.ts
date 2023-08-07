import { useTransformTypeLetter } from '../hooks/useTransformTypeLetter';

test('La función useTransformTypeLetter devuelve el nombre correcto para "CC"', () => {
	const result = useTransformTypeLetter('CC');
	expect(result).toBe('Cuenta Corriente');
});

test('La función useTransformTypeLetter devuelve el nombre correcto para "CA"', () => {
	const result = useTransformTypeLetter('CA');
	expect(result).toBe('Caja de Ahorro');
});

test('La función useTransformTypeLetter devuelve el nombre correcto para "CCP"', () => {
	const result = useTransformTypeLetter('CCP');
	expect(result).toBe('Cuenta Corriente Personal');
});

test('La función useTransformTypeLetter maneja entradas no especificadas', () => {
	const resultXYZ = useTransformTypeLetter('XYZ');
	expect(resultXYZ).toBe('XYZ');
});

test('La función useTransformTypeLetter maneja entradas undefined', () => {
	const result = useTransformTypeLetter(undefined);
	expect(result).toBe('Tipo de letra no especificado');
});
