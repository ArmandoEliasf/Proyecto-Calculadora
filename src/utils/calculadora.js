const OPERADOR_MULTIPLICACION = '×';
const OPERADOR_DIVISION = '÷';

class ErrorOperacionInvalida extends Error {
  constructor() {
    super('Operacion no valida');
    this.name = 'ErrorOperacionInvalida';
  }
}

function normalizarOperador(caracter) {
  if (caracter === '*') return OPERADOR_MULTIPLICACION;
  if (caracter === '/') return OPERADOR_DIVISION;
  if (caracter === '+' || caracter === '-' || caracter === OPERADOR_MULTIPLICACION || caracter === OPERADOR_DIVISION) {
    return caracter;
  }
  return null;
}

function tokenizar(texto) {
  const tokens = [];
  let numero = '';

  const cerrarNumero = () => {
    if (numero === '') return;
    const valor = Number(numero);
    if (Number.isNaN(valor)) throw new ErrorOperacionInvalida();
    tokens.push({ tipo: 'numero', valor });
    numero = '';
  };

  for (const caracter of texto) {
    if (caracter === ' ' || caracter === '\t') continue;
    if ((caracter >= '0' && caracter <= '9') || caracter === '.') {
      numero += caracter;
      continue;
    }
    const operador = normalizarOperador(caracter);
    if (!operador) throw new ErrorOperacionInvalida();
    cerrarNumero();
    tokens.push({ tipo: 'operador', valor: operador });
  }

  cerrarNumero();
  return tokens;
}

function parsear(tokens) {
  let posicion = 0;

  const hayOperador = (valores) =>
    posicion < tokens.length &&
    tokens[posicion].tipo === 'operador' &&
    valores.includes(tokens[posicion].valor);

  const factor = () => {
    const token = tokens[posicion];
    if (!token) throw new ErrorOperacionInvalida();
    if (token.tipo === 'operador' && (token.valor === '-' || token.valor === '+')) {
      posicion += 1;
      const valor = factor();
      return token.valor === '-' ? -valor : valor;
    }
    if (token.tipo !== 'numero') throw new ErrorOperacionInvalida();
    posicion += 1;
    return token.valor;
  };

  const termino = () => {
    let valor = factor();
    while (hayOperador([OPERADOR_MULTIPLICACION, OPERADOR_DIVISION])) {
      const operador = tokens[posicion].valor;
      posicion += 1;
      const derecha = factor();
      if (operador === OPERADOR_MULTIPLICACION) {
        valor *= derecha;
      } else {
        if (derecha === 0) throw new ErrorOperacionInvalida();
        valor /= derecha;
      }
    }
    return valor;
  };

  const expresion = () => {
    let valor = termino();
    while (hayOperador(['+', '-'])) {
      const operador = tokens[posicion].valor;
      posicion += 1;
      const derecha = termino();
      valor = operador === '+' ? valor + derecha : valor - derecha;
    }
    return valor;
  };

  const resultado = expresion();
  if (posicion !== tokens.length) throw new ErrorOperacionInvalida();
  if (!Number.isFinite(resultado)) throw new ErrorOperacionInvalida();
  return resultado;
}

function redondear(valor) {
  return Number(valor.toFixed(10));
}

export function evaluarOperacion(expresion) {
  try {
    if (typeof expresion !== 'string') {
      throw new ErrorOperacionInvalida();
    }
    const resultado = parsear(tokenizar(expresion));
    return { ok: true, resultado: redondear(resultado) };
  } catch (error) {
    return { ok: false, motivo: 'Operacion no valida' };
  }
}
