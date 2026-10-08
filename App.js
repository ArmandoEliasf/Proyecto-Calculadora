import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import CalculadoraScreen from './src/screens/CalculadoraScreen';
import { colores } from './src/theme';

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
    <SafeAreaProvider>
      <CalculadoraScreen />
      <StatusBar style="light" backgroundColor={colores.encabezado} />
    </SafeAreaProvider>
  );
}
