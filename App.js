import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { colores, tipografia } from './src/theme';

export default function App() {
  const [fuentesCargadas] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fuentesCargadas) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora</Text>
      <StatusBar style="light" backgroundColor={colores.encabezado} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: colores.encabezado,
    fontFamily: tipografia.bold,
    fontSize: 28,
  },
});
