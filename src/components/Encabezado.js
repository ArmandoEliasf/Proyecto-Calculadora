import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colores, tipografia } from '../theme';

export default function Encabezado({ titulo, onVolver, onAyuda }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.contenedor, { paddingTop: insets.top + 12 }]}>
      <View style={styles.lateral}>
        {onVolver ? (
          <Pressable onPress={onVolver} accessibilityRole="button" accessibilityLabel="Volver">
            <Text style={styles.textoAccion}>Atrás</Text>
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.titulo}>{titulo}</Text>

      <View style={[styles.lateral, styles.derecha]}>
        {onAyuda ? (
          <Pressable onPress={onAyuda} accessibilityRole="button" accessibilityLabel="Ayuda">
            <Text style={styles.textoAccion}>?</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: colores.encabezado,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lateral: {
    width: 48,
    alignItems: 'flex-start',
  },
  derecha: {
    alignItems: 'flex-end',
  },
  titulo: {
    flex: 1,
    textAlign: 'center',
    color: colores.textoClaro,
    fontFamily: tipografia.bold,
    fontSize: 20,
  },
  textoAccion: {
    color: colores.textoClaro,
    fontFamily: tipografia.semibold,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
