import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Encabezado from '../components/Encabezado';
import Tecla from '../components/Tecla';
import VentanaError from '../components/VentanaError';
import VentanaResultado from '../components/VentanaResultado';
import { evaluarOperacion } from '../utils/calculadora';
import { colores, tipografia } from '../theme';

const OPERADORES = ['+', '-', '×', '÷'];

const FILAS = [
  ['C', '⌫', '÷', '×'],
  ['7', '8', '9', '-'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '0'],
];

function agregarCaracter(expresion, caracter) {
  const ultimo = expresion.slice(-1);

  if (OPERADORES.includes(caracter)) {
    if (expresion === '') {
      return caracter === '-' ? caracter : expresion;
    }
    if (OPERADORES.includes(ultimo)) {
      return expresion.slice(0, -1) + caracter;
    }
    return expresion + caracter;
  }

  if (caracter === '.') {
    const ultimoNumero = expresion.split(/[+\-×÷]/).pop();
    if (ultimoNumero.includes('.')) {
      return expresion;
    }
    if (ultimoNumero === '') {
      return `${expresion}0.`;
    }
    return expresion + caracter;
  }

  return expresion + caracter;
}

export default function CalculadoraScreen({ onVolver, onAyuda }) {
  const [expresion, setExpresion] = useState('');
  const [expresionEvaluada, setExpresionEvaluada] = useState('');
  const [resultado, setResultado] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [resultadoVisible, setResultadoVisible] = useState(false);

  const pulsar = (etiqueta) => {
    if (etiqueta === 'C') {
      setExpresion('');
      return;
    }
    if (etiqueta === '⌫') {
      setExpresion((actual) => actual.slice(0, -1));
      return;
    }
    if (etiqueta === '=') {
      const evaluacion = evaluarOperacion(expresion);
      if (evaluacion.ok) {
        setExpresionEvaluada(expresion);
        setResultado(evaluacion.resultado);
        setResultadoVisible(true);
      } else {
        setErrorVisible(true);
      }
      return;
    }
    setExpresion((actual) => agregarCaracter(actual, etiqueta));
  };

  const nuevaOperacion = () => {
    setResultadoVisible(false);
    setExpresion('');
    setExpresionEvaluada('');
    setResultado(null);
  };

  return (
    <View style={styles.contenedor}>
      <Encabezado titulo="Calculadora" onVolver={onVolver} onAyuda={onAyuda} />

      <View style={styles.pantalla}>
        <Text style={styles.textoPantalla} numberOfLines={1} adjustsFontSizeToFit>
          {expresion === '' ? '0' : expresion}
        </Text>
      </View>

      <View style={styles.teclado}>
        {FILAS.map((fila) => (
          <View key={fila.join('')} style={styles.fila}>
            {fila.map((etiqueta) => (
              <Tecla
                key={etiqueta}
                etiqueta={etiqueta}
                onPress={() => pulsar(etiqueta)}
                variante={etiqueta === 'C' || etiqueta === '⌫' ? 'acento' : 'principal'}
              />
            ))}
          </View>
        ))}

        <View style={styles.fila}>
          <Tecla etiqueta="." onPress={() => pulsar('.')} />
          <Tecla etiqueta="=" onPress={() => pulsar('=')} variante="acento" ancho={3} />
        </View>
      </View>

      <VentanaError visible={errorVisible} onCerrar={() => setErrorVisible(false)} />

      <VentanaResultado
        visible={resultadoVisible}
        expresion={expresionEvaluada}
        resultado={resultado}
        onNuevaOperacion={nuevaOperacion}
        onCerrar={() => setResultadoVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  pantalla: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 140,
  },
  textoPantalla: {
    color: colores.texto,
    fontFamily: tipografia.bold,
    fontSize: 44,
  },
  teclado: {
    flex: 1,
    paddingBottom: 24,
    justifyContent: 'flex-end',
  },
  fila: {
    flexDirection: 'row',
  },
});
