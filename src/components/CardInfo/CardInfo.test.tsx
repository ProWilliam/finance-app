import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Text, TouchableOpacity, Image } from 'react-native';

import CardInfo from './CardInfo'; 
import RowText from '../RowText/RowText';
import styles from './CardInfo.styles';

// Mock de los datos
const mockProps = {
  id: '1', 
  info_text: 'Informacion extra', 
  name: 'Cart black', 
  description: 'Descripcion registrada del producto', 
  logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg', 
  date_release: '2025-03-02', 
  date_revision: '2026-08-15'
};

// Mock useAppNavigation hook
const mockAppNavigation = jest.fn();

jest.mock('../../hooks/useAppNavigation', () => ({
  __esModule: true,
  default: () => ({
    appNavigation: mockAppNavigation,
  }),
}));

describe('<CardInfo />', () => {

  it('renders correctly with given props', () => {
    const component = renderer.create(<CardInfo {...mockProps} />);
    const tree = component.toJSON();
    
    expect(tree).toMatchSnapshot();
  });

  it('renders text correctly', () => {
    const component = renderer.create(<CardInfo {...mockProps} />);
    const testInstance = component.root;
    
    // Verify that the ID text, info_text, name, description and dates are rendered.
    const texts =  testInstance.findAllByType(Text);

    // Element ID is Array for this Changed to string.
    const textID = texts.map(text => text.props.children)[0].join('');
    
    expect(textID).toBe('ID:1');
    expect(testInstance.findAllByType(Text)[1].props.children).toBe('Informacion extra');
    expect(testInstance.findAllByType(RowText)[0].props.children).toBe('Cart black');
    expect(testInstance.findAllByType(RowText)[1].props.children).toBe('Descripcion registrada del producto');
    expect(testInstance.findAllByType(RowText)[2].props.children).toBe('2025-03-02');
    expect(testInstance.findAllByType(RowText)[3].props.children).toBe('2026-08-15');
  });

  it('renders the logo image with correct URI', () => {
    const component = renderer.create(<CardInfo {...mockProps} />);
    const testInstance = component.root;
    
    // Verify image URI
    const image = testInstance.findByType(Image);
    expect(image.props.source.uri).toBe(mockProps.logo);
  });

  it('applies correct styles', () => {
    const component = renderer.create(<CardInfo {...mockProps} />);
    const testInstance = component.root;
    
    // Verificar el estilo del contenedor
    const container = testInstance.findByProps({ style: styles.containerCard });
    expect(container).toBeTruthy();
    
    // Verificar el estilo del icono
    const icon = testInstance.findByProps({ style: styles.iconCard });
    expect(icon).toBeTruthy();
  });

  it('calls goBack function on pressing IconClose', () => {
    const component = renderer.create(<CardInfo {...mockProps} />);
  
    act(() => {
      component.root.findByType(TouchableOpacity).props.onPress();
    });

    // Verify that the navigation function was called with "home"
    expect(mockAppNavigation).toHaveBeenCalledWith('home');
  });
});