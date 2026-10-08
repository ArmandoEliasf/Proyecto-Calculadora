import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colores, radios, tipografia } from '../theme';

export default function VentanaResultado({ visible, expresion, resultado, onNuevaOperacion, onCerrar }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCerrar}>
      <View style={styles.fondo}>
        <View style={styles.tarjeta}>
          <Text style={styles.etiqueta}>Resultado</Text>
          <Text style={styles.expresion} numberOfLines={1}>
            {expresion}
          </Text>
          <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>
            {String(resultado)}
          </Text>

          <View style={styles.filaBotones}>
            <Pressable
              onPress={onNuevaOperacion}
              accessibilityRole="button"
              style={({ pressed }) => [styles.boton, styles.botonPrincipal, pressed && styles.pulsado]}
            >
              <Text style={styles.textoPrincipal}>Nueva operación</Text>
            </Pressable>

            <Pressable
              onPress={onCerrar}
              accessibilityRole="button"
              style={({ pressed }) => [styles.boton, styles.botonSecundario, pressed && styles.pulsadoSecundario]}
            >
              <Text style={styles.textoSecundario}>Cerrar</Text>
            </Pressable>
          </View>
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
  etiqueta: {
    color: colores.encabezado,
    fontFamily: tipografia.bold,
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  expresion: {
    color: colores.textoSecundario,
    fontFamily: tipografia.semibold,
    fontSize: 18,
    marginTop: 12,
  },
  resultado: {
    color: colores.texto,
    fontFamily: tipografia.bold,
    fontSize: 48,
    marginTop: 4,
  },
  filaBotones: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    width: '100%',
  },
  boton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radios.boton,
    alignItems: 'center',
  },
  botonPrincipal: {
    backgroundColor: colores.boton,
  },
  botonSecundario: {
    backgroundColor: colores.fondo,
    borderWidth: 1.5,
    borderColor: colores.boton,
  },
  pulsado: {
    backgroundColor: colores.botonPress,
  },
  pulsadoSecundario: {
    backgroundColor: colores.botonSuave,
  },
  textoPrincipal: {
    color: colores.textoClaro,
    fontFamily: tipografia.bold,
    fontSize: 15,
    textAlign: 'center',
  },
  textoSecundario: {
    color: colores.boton,
    fontFamily: tipografia.bold,
    fontSize: 15,
    textAlign: 'center',
  },
});
