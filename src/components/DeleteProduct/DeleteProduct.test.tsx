import React from 'react';
import renderer, { act } from 'react-test-renderer';

import DeleteProduct from './DeleteProduct';
import styles from './DeleteProduct.styles';

// Mock useAppNavigation hook
const mockAppNavigation = jest.fn();

jest.mock('../../hooks/useAppNavigation', () => ({
  __esModule: true,
  default: () => ({
    appNavigation: mockAppNavigation,
  }),
}));

describe('<DeleteProduct />', () => {

  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();
  const testInfo = 'Producto de prueba 1';
  const testId = '1';

  it('should render correctly when visible', () => {
    const tree = renderer.create(
      <DeleteProduct 
        visible={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        info={testInfo}
        id={testId}
      />
    ).toJSON();
    
    expect(tree).toMatchSnapshot();
  });

  it('should call onConfirm when "Eliminar" is pressed', () => {
    const component = renderer.create(
      <DeleteProduct 
        visible={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        info={testInfo}
        id={testId}
      />
    );
    
    const eliminarButton = component.root.findByProps({ title: 'Eliminar' }).props;
    
    act(() => {
      eliminarButton.press();
    });

    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('should call onCancel when "Cancelar" is pressed', () => {
    const component = renderer.create(
      <DeleteProduct 
        visible={true}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        info={testInfo}
        id={testId}
      />
    );
    
    const cancelarButton = component.root.findByProps({ title: 'Cancelar' }).props;
    
    act(() => {
      cancelarButton.press();
    });

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('should display the correct product name and ID', () => {
    
    const tree = renderer.create(
      <DeleteProduct 
        visible={true} 
        onConfirm={mockOnConfirm} 
        onCancel={mockOnCancel} 
        info={testInfo} 
        id={testId} 
      />
    );

    const instance = tree.root;
    const textElement = instance.findByProps({ style: styles.alertTitle }).props.children;

    expect(textElement).toContain(`Nombre: ${testInfo}`);
    expect(textElement).toContain(`Id: ${testId}`);
  });

  it('should call onConfirm when the "Eliminar" button is pressed', () => {
    
    const tree = renderer.create(
      <DeleteProduct 
        visible={true} 
        onConfirm={mockOnConfirm} 
        onCancel={jest.fn()} 
        info='Producto de prueba' 
        id='123' 
      />
    );
    const eliminarButton = tree.root.findByProps({ title: 'Eliminar' }).props;

    act(() => {
      eliminarButton.press();
    });
    
    expect(mockOnConfirm).toHaveBeenCalled();
  });
  
  it('should call onCancel when the "Cancelar" button is pressed', () => {
    
    const tree = renderer.create(
      <DeleteProduct 
        visible={true} 
        onConfirm={jest.fn()} 
        onCancel={mockOnCancel} 
        info='Producto de prueba' 
        id='123' 
      />
    );
    const cancelarButton = tree.root.findByProps({ title: 'Cancelar' }).props;

    act(() => {
      cancelarButton.press();
    });
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

});