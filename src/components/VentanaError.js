import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colores, radios, tipografia } from '../theme';

export default function VentanaError({ visible, onCerrar }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCerrar}>
      <View style={styles.fondo}>
        <View style={styles.tarjeta}>
          <View style={styles.simbolo}>
            <Text style={styles.simboloTexto}>!</Text>
          </View>

          <Text style={styles.titulo}>Operacion no valida</Text>

          <Text style={styles.subtitulo}>
            Por favor, verifica los valores introducidos e intentalo nuevamente
          </Text>

          <Pressable
            onPress={onCerrar}
            accessibilityRole="button"
            style={({ pressed }) => [styles.boton, pressed && styles.botonPulsado]}
          >
            <Text style={styles.textoBoton}>Entendido</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  tarjeta: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colores.fondo,
    borderRadius: radios.tarjeta,
    padding: 24,
    alignItems: 'center',
  },
  simbolo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colores.error,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  simboloTexto: {
    color: colores.texto,
    fontFamily: tipografia.bold,
    fontSize: 40,
  },
  titulo: {
    color: colores.texto,
    fontFamily: tipografia.bold,
    fontSize: 22,
    textAlign: 'center',
  },
  subtitulo: {
    color: colores.textoSecundario,
    fontFamily: tipografia.semibold,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  boton: {
    width: '100%',
    marginTop: 24,
    paddingVertical: 14,
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
    fontSize: 16,
  },
});
