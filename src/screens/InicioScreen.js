import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colores, radios, tipografia } from '../theme';

export default function InicioScreen({ onComenzar, onAyuda }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.contenedor, { paddingTop: insets.top }]}>
      <View style={styles.centro}>
        <Text style={styles.simbolos}>+ − × ÷</Text>
        <Text style={styles.titulo}>Bienvenido a la Calculadora</Text>
        <Text style={styles.subtitulo}>
          Realiza operaciones matematicas basicas de manera rapida y sencilla
        </Text>
      </View>

      <View style={styles.acciones}>
        <Pressable
          onPress={onComenzar}
          accessibilityRole="button"
          style={({ pressed }) => [styles.boton, pressed && styles.botonPulsado]}
        >
          <Text style={styles.textoBoton}>Comenzar</Text>
        </Pressable>

        <Pressable
          onPress={onAyuda}
          accessibilityRole="button"
          style={({ pressed }) => [styles.botonAyuda, pressed && styles.ayudaPulsada]}
        >
          <Text style={styles.textoAyuda}>Ayuda</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  simbolos: {
    color: colores.boton,
    fontFamily: tipografia.bold,
    fontSize: 40,
    letterSpacing: 6,
    marginBottom: 24,
  },
  titulo: {
    color: colores.encabezado,
    fontFamily: tipografia.bold,
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 38,
  },
  subtitulo: {
    color: colores.textoSecundario,
    fontFamily: tipografia.semibold,
    fontSize: 17,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 26,
  },
  acciones: {
    width: '100%',
  },
  boton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: radios.boton,
    backgroundColor: colores.boton,
    alignItems: 'center',
  },
  botonPulsado: {
    backgroundColor: colores.botonPress,
  },
  textoBoton: {
    color: colores.textoClaro,
    fontFamily: tipografia.bold,
    fontSize: 18,
  },
  botonAyuda: {
    width: '100%',
    paddingVertical: 12,
    marginTop: 12,
    borderRadius: radios.boton,
    borderWidth: 1.5,
    borderColor: colores.boton,
    alignItems: 'center',
  },
  ayudaPulsada: {
    backgroundColor: colores.botonSuave,
  },
  textoAyuda: {
    color: colores.boton,
    fontFamily: tipografia.semibold,
    fontSize: 16,
  },
});
