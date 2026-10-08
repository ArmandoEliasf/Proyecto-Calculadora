import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import InicioScreen from './src/screens/InicioScreen';
import CalculadoraScreen from './src/screens/CalculadoraScreen';
import { colores } from './src/theme';

export default function App() {
  const [fuentesCargadas] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [pantalla, setPantalla] = useState('inicio');

  if (!fuentesCargadas) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {pantalla === 'inicio' ? (
        <InicioScreen onComenzar={() => setPantalla('calculadora')} />
      ) : (
        <CalculadoraScreen onVolver={() => setPantalla('inicio')} />
      )}
      <StatusBar style="light" backgroundColor={colores.encabezado} />
    </SafeAreaProvider>
  );
}
