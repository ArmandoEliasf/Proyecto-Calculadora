import { evaluarOperacion } from '../calculadora';

describe('evaluarOperacion', () => {
  test('resuelve sumas', () => {
    expect(evaluarOperacion('12+7')).toEqual({ ok: true, resultado: 19 });
  });

  test('resuelve restas', () => {
    expect(evaluarOperacion('8-3')).toEqual({ ok: true, resultado: 5 });
  });

  test('resuelve multiplicaciones', () => {
    expect(evaluarOperacion('6×4')).toEqual({ ok: true, resultado: 24 });
  });

  test('resuelve divisiones', () => {
    expect(evaluarOperacion('20÷4')).toEqual({ ok: true, resultado: 5 });
  });

  test('respeta la precedencia de multiplicacion y division', () => {
    expect(evaluarOperacion('2+3×4')).toEqual({ ok: true, resultado: 14 });
    expect(evaluarOperacion('10-6÷2')).toEqual({ ok: true, resultado: 7 });
  });

  test('admite numeros decimales y negativos iniciales', () => {
    expect(evaluarOperacion('3.5+1.5')).toEqual({ ok: true, resultado: 5 });
    expect(evaluarOperacion('-5+3')).toEqual({ ok: true, resultado: -2 });
  });

  test('redondea los resultados con decimales largos', () => {
    expect(evaluarOperacion('10÷3')).toEqual({ ok: true, resultado: 3.3333333333 });
  });

  test('rechaza la division entre cero', () => {
    expect(evaluarOperacion('9÷0')).toEqual({ ok: false, motivo: 'Operacion no valida' });
  });

  test('rechaza expresiones incompletas', () => {
    expect(evaluarOperacion('').ok).toBe(false);
    expect(evaluarOperacion('12+').ok).toBe(false);
    expect(evaluarOperacion('+').ok).toBe(false);
  });

  test('rechaza caracteres que no forman una operacion', () => {
    expect(evaluarOperacion('abc').ok).toBe(false);
    expect(evaluarOperacion('1.2.3+4').ok).toBe(false);
    expect(evaluarOperacion('÷5').ok).toBe(false);
  });
});
