import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';

// Components
import AddProduct from './AddProduct';
import InputForm from '../InputForm/InputForm';

// Types
import { AddProductProps } from '../../types/components/AddProduct.types';

describe('<AddProduct />', () => {

  let props: AddProductProps;

  it('Render the title correctly with props ID', () => {
    props = {
      value: '1',
      title: 'ID', 
      placeHolder: 'Numero de ID',
      type: 'numeric',  
      keySelect: 'id',
      onChange: () => {},
    }
    const tree = renderer.create(<AddProduct {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('Renders the title correctly', () => {
    props = {
      value: 'New Product',
      title: 'Nombre', 
      placeHolder: 'Tarjeta Crédito',
      type: 'default',  
      keySelect: 'name',
      onChange: () => {},
    } 

    const component = renderer.create(<AddProduct {...props} />);
    const instance = component.root;
    
    const text = instance.findByType(Text);
    expect(text.props.children).toBe('Nombre');

  });

  it('Renders the InputForm component', ()=> {
    const component = renderer.create(<AddProduct {...props} />);
    const instance = component.root;
    const inputForm = instance.findByType(InputForm);

    // Verify that the `InputForm` component exists.
    expect(inputForm).toBeTruthy();
  });
  
});