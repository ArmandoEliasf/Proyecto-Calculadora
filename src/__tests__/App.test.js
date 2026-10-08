import { fireEvent, render, screen } from '@testing-library/react-native';
import App from '../../App';

function iniciarCalculadora() {
  render(<App />);
  fireEvent.press(screen.getByText('Comenzar'));
}

function textoEnPantalla() {
  return screen.getByTestId('pantalla').props.children;
}

test('la pantalla de inicio muestra el titulo, el subtitulo y el boton Comenzar', () => {
  render(<App />);

  expect(screen.getByText('Bienvenido a la Calculadora')).toBeTruthy();
  expect(
    screen.getByText('Realiza operaciones matematicas basicas de manera rapida y sencilla')
  ).toBeTruthy();
  expect(screen.getByText('Comenzar')).toBeTruthy();
});

test('Comenzar lleva a la calculadora y Atras regresa al inicio', () => {
  render(<App />);

  fireEvent.press(screen.getByText('Comenzar'));
  expect(screen.getByText('Calculadora')).toBeTruthy();

  fireEvent.press(screen.getByText('Atrás'));
  expect(screen.getByText('Bienvenido a la Calculadora')).toBeTruthy();
});

test('muestra el resultado en la ventana emergente y Nueva operacion limpia la pantalla', () => {
  iniciarCalculadora();

  fireEvent.press(screen.getByLabelText('5'));
  fireEvent.press(screen.getByLabelText('+'));
  fireEvent.press(screen.getByLabelText('3'));
  expect(textoEnPantalla()).toBe('5+3');

  fireEvent.press(screen.getByLabelText('='));

  expect(screen.getByTestId('ventana-resultado')).toBeTruthy();
  expect(screen.getByTestId('valor-resultado').props.children).toBe('8');

  fireEvent.press(screen.getByText('Nueva operación'));

  expect(screen.queryByTestId('ventana-resultado')).toBeNull();
  expect(textoEnPantalla()).toBe('0');
});

test('Cerrar cierra la ventana de resultado conservando la operacion', () => {
  iniciarCalculadora();

  fireEvent.press(screen.getByLabelText('7'));
  fireEvent.press(screen.getByLabelText('-'));
  fireEvent.press(screen.getByLabelText('2'));
  fireEvent.press(screen.getByLabelText('='));

  expect(screen.getByTestId('valor-resultado').props.children).toBe('5');

  fireEvent.press(screen.getByText('Cerrar'));

  expect(screen.queryByTestId('ventana-resultado')).toBeNull();
  expect(textoEnPantalla()).toBe('7-2');
});

test('aparece la ventana de error con el boton Entendido cuando la operacion no es valida', () => {
  iniciarCalculadora();

  fireEvent.press(screen.getByLabelText('9'));
  fireEvent.press(screen.getByLabelText('÷'));
  fireEvent.press(screen.getByLabelText('0'));
  fireEvent.press(screen.getByLabelText('='));

  expect(screen.getByTestId('ventana-error')).toBeTruthy();
  expect(screen.getByText('!')).toBeTruthy();
  expect(screen.getByText('Operacion no valida')).toBeTruthy();
  expect(
    screen.getByText('Por favor, verifica los valores introducidos e intentalo nuevamente')
  ).toBeTruthy();

  fireEvent.press(screen.getByText('Entendido'));

  expect(screen.queryByTestId('ventana-error')).toBeNull();
});

test('tambien muestra el error al pulsar Igual sin haber ingresado una operacion', () => {
  iniciarCalculadora();

  fireEvent.press(screen.getByLabelText('='));

  expect(screen.getByTestId('ventana-error')).toBeTruthy();

  fireEvent.press(screen.getByText('Entendido'));
  expect(screen.queryByTestId('ventana-error')).toBeNull();
  expect(textoEnPantalla()).toBe('0');
});

test('la tecla C borra la operacion en curso', () => {
  iniciarCalculadora();

  fireEvent.press(screen.getByLabelText('1'));
  fireEvent.press(screen.getByLabelText('2'));
  fireEvent.press(screen.getByLabelText('C'));

  expect(textoEnPantalla()).toBe('0');
});

test('la ayuda se abre desde el inicio y regresa con Atras', () => {
  render(<App />);

  fireEvent.press(screen.getByText('Ayuda'));

  expect(screen.getByText('Cómo usarla')).toBeTruthy();
  expect(screen.getByText('Si aparece un error')).toBeTruthy();

  fireEvent.press(screen.getByText('Atrás'));
  expect(screen.getByText('Bienvenido a la Calculadora')).toBeTruthy();
});

test('la ayuda se abre desde la calculadora y regresa a ella', () => {
  iniciarCalculadora();

  fireEvent.press(screen.getByLabelText('Ayuda'));
  expect(screen.getByText('Ejemplos')).toBeTruthy();

  fireEvent.press(screen.getByText('Atrás'));
  expect(screen.getByText('Calculadora')).toBeTruthy();
});
