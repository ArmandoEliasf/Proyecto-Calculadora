import { Pressable, StyleSheet, Text } from 'react-native';
import { colores, radios, tipografia } from '../theme';

export default function Tecla({ etiqueta, onPress, variante = 'principal', ancho = 1 }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variante === 'acento' ? styles.acento : styles.principal,
        { flex: ancho },
        pressed && styles.pulsada,
      ]}
    >
      <Text style={styles.texto}>{etiqueta}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 68,
    margin: 6,
    borderRadius: radios.boton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  principal: {
    backgroundColor: colores.boton,
  },
  acento: {
    backgroundColor: colores.encabezado,
  },
  pulsada: {
    backgroundColor: colores.botonPress,
    opacity: 0.85,
  },
  texto: {
    color: colores.textoClaro,
    fontFamily: tipografia.bold,
    fontSize: 24,
  },
});
