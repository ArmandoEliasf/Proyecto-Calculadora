import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Encabezado from '../components/Encabezado';
import { colores, radios, tipografia } from '../theme';

const PASOS = [
  'Pulsa "Comenzar" en la pantalla de inicio.',
  'Introduce el primer número con las teclas numéricas.',
  'Elige la operación: + suma, − resta, × multiplicación o ÷ división.',
  'Introduce el segundo número. Puedes encadenar más operaciones si lo necesitas.',
  'Pulsa "=" y el resultado aparecerá en una ventana emergente.',
];

const TECLAS = [
  ['C', 'Borra toda la operación y empieza de cero.'],
  ['⌫', 'Borra solo el último carácter introducido.'],
  ['.', 'Separador decimal, por ejemplo 3.5.'],
  ['=', 'Evalúa la operación y muestra el resultado.'],
];

const EJEMPLOS = [
  ['12 + 7', '19'],
  ['8 − 3', '5'],
  ['6 × 4', '24'],
  ['20 ÷ 4', '5'],
  ['2 + 3 × 4', '14 (la multiplicación se resuelve primero)'],
];

function Seccion({ titulo, children }) {
  return (
    <View style={styles.seccion}>
      <Text style={styles.tituloSeccion}>{titulo}</Text>
      {children}
    </View>
  );
}

export default function AyudaScreen({ onVolver }) {
  return (
    <View style={styles.contenedor}>
      <Encabezado titulo="Ayuda" onVolver={onVolver} />

      <ScrollView contentContainerStyle={styles.contenido}>
        <Text style={styles.introduccion}>
          Esta calculadora resuelve operaciones matemáticas básicas: sumas, restas,
          multiplicaciones y divisiones. Sigue estos pasos para usarla.
        </Text>

        <Seccion titulo="Cómo usarla">
          {PASOS.map((paso, indice) => (
            <View key={paso} style={styles.paso}>
              <View style={styles.numero}>
                <Text style={styles.textoNumero}>{indice + 1}</Text>
              </View>
              <Text style={styles.textoPaso}>{paso}</Text>
            </View>
          ))}
        </Seccion>

        <Seccion titulo="Teclas especiales">
          {TECLAS.map(([tecla, descripcion]) => (
            <View key={tecla} style={styles.filaTecla}>
              <View style={styles.etiquetaTecla}>
                <Text style={styles.textoEtiquetaTecla}>{tecla}</Text>
              </View>
              <Text style={styles.textoDescripcion}>{descripcion}</Text>
            </View>
          ))}
        </Seccion>

        <Seccion titulo="Si aparece un error">
          <Text style={styles.textoParrafo}>
            La ventana "Operacion no valida" significa que los valores no forman una
            operación completa o correcta: por ejemplo, pulsar "=" sin números, dejar
            una operación sin cerrar o dividir entre cero. Pulsa "Entendido",
            corrige los valores e inténtalo nuevamente.
          </Text>
        </Seccion>

        <Seccion titulo="Ejemplos">
          {EJEMPLOS.map(([operacion, resolucion]) => (
            <View key={operacion} style={styles.ejemplo}>
              <Text style={styles.operacionEjemplo}>{operacion}</Text>
              <Text style={styles.flechaEjemplo}>=</Text>
              <Text style={styles.resultadoEjemplo}>{resolucion}</Text>
            </View>
          ))}
        </Seccion>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    padding: 20,
    paddingBottom: 40,
  },
  introduccion: {
    color: colores.texto,
    fontFamily: tipografia.semibold,
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 8,
  },
  seccion: {
    backgroundColor: colores.fondo,
    borderRadius: radios.tarjeta,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: 18,
    marginTop: 16,
  },
  tituloSeccion: {
    color: colores.encabezado,
    fontFamily: tipografia.bold,
    fontSize: 17,
    marginBottom: 12,
  },
  paso: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  numero: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colores.boton,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  textoNumero: {
    color: colores.textoClaro,
    fontFamily: tipografia.bold,
    fontSize: 13,
  },
  textoPaso: {
    flex: 1,
    color: colores.texto,
    fontFamily: tipografia.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  filaTecla: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  etiquetaTecla: {
    minWidth: 44,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colores.botonSuave,
    borderWidth: 1,
    borderColor: colores.borde,
    alignItems: 'center',
    marginRight: 10,
  },
  textoEtiquetaTecla: {
    color: colores.texto,
    fontFamily: tipografia.bold,
    fontSize: 14,
  },
  textoDescripcion: {
    flex: 1,
    color: colores.texto,
    fontFamily: tipografia.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  textoParrafo: {
    color: colores.texto,
    fontFamily: tipografia.regular,
    fontSize: 15,
    lineHeight: 23,
  },
  ejemplo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  operacionEjemplo: {
    color: colores.texto,
    fontFamily: tipografia.semibold,
    fontSize: 15,
  },
  flechaEjemplo: {
    color: colores.boton,
    fontFamily: tipografia.bold,
    fontSize: 15,
    marginHorizontal: 8,
  },
  resultadoEjemplo: {
    color: colores.encabezado,
    fontFamily: tipografia.bold,
    fontSize: 15,
    flexShrink: 1,
  },
});
