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
import AyudaScreen from './src/screens/AyudaScreen';
import { colores } from './src/theme';

export default function App() {
  const [fuentesCargadas] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [pantalla, setPantalla] = useState('inicio');
  const [origenAyuda, setOrigenAyuda] = useState('inicio');

  const abrirAyuda = () => {
    setOrigenAyuda(pantalla);
    setPantalla('ayuda');
  };

  const cerrarAyuda = () => setPantalla(origenAyuda);

  if (!fuentesCargadas) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {pantalla === 'inicio' ? (
        <InicioScreen onComenzar={() => setPantalla('calculadora')} onAyuda={abrirAyuda} />
      ) : pantalla === 'calculadora' ? (
        <CalculadoraScreen onVolver={() => setPantalla('inicio')} onAyuda={abrirAyuda} />
      ) : (
        <AyudaScreen onVolver={cerrarAyuda} />
      )}
      <StatusBar style="light" backgroundColor={colores.encabezado} />
    </SafeAreaProvider>
  );
}
