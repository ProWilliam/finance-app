import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { TextInput } from 'react-native';

// Components
import InputDate from '../InputDate/InputDate';
import InputForm from './InputForm';
import styles from './InputForm.styles';


describe('<InputForm />', () => {

  let onChangeMock: jest.Mock;

  beforeEach(() => {
    onChangeMock = jest.fn();
  });

  it('renders correctly with TextInput', () => {
    const tree = renderer.create(
      <InputForm
        placeHolder="Numero de ID"
        keySelect="id"
        errorMessage="Campo obligatorio"
        onChange={onChangeMock}
        type="numeric"
        value="1"
      />
    ).toJSON();
    
    expect(tree).toMatchSnapshot();
  });

  it('should render TextInput and handle text changes', () => {

    const tree = renderer.create(
      <InputForm
        placeHolder="Tarjeta Crédito"
        keySelect="name"
        errorMessage=""
        onChange={onChangeMock}
        type="default"
        value=""
      />
    );

    const input = tree.root.findByType(TextInput);
    expect(input.props.placeholder).toBe('Tarjeta Crédito');
    
    // Simulate text change
    act(() => {
      input.props.onChangeText('New text');
    });

    // Check if onChange is called with the correct parameters
    expect(onChangeMock).toHaveBeenCalledWith('name', 'New text');
    
    // Verify that error is cleared
    const errorText = tree.root.findByProps({ testID: 'error-message' });
    expect(errorText.props.children).toBeUndefined();
  });
  
  it('should show error message when input is blurred with empty value', () => {
    const tree  = renderer.create(
      <InputForm
        placeHolder="Descripción"
        keySelect="description"
        errorMessage=""
        onChange={onChangeMock}
        type="default"
        value=""
      />
    );

    const input = tree.root.findByType(TextInput);
    
    // Simulate blur event
    act(() => {
      input.props.onBlur();
    });

    // Verify error message is shown
    const errorText = tree.root.findByProps({ style: styles.textError });
    expect(errorText.props.children).toBe('Este campo es obligatorio!');
  });

  it('calls onChange handler with correct value on text change and date ID is numeric', () => {
    const tree = renderer.create(
      <InputForm
        placeHolder="ID"
        keySelect="id"
        errorMessage="Campo obligatorio"
        onChange={onChangeMock}
        type="numeric"
        value=""
      />
    );

    // Find the TextInput component
    const textInput = tree.root.findByType(TextInput);

    act(() => {
      textInput.props.onChangeText('1');
    });

    // Verify the Key and Value.
    expect(onChangeMock).toHaveBeenCalledWith('id', '1');

    // Verify the numeric conversion
    const args = onChangeMock.mock.calls[0][1]; // Get the argument passed to onChangeMock
    const numericValue = Number(args);

    expect(typeof numericValue).toBe('number');
    expect(isNaN(numericValue)).toBe(false); // Ensure it is not NaN

  });

  it('should render InputDate component for type="date"', () => {
    const tree = renderer.create(
      <InputForm
        placeHolder="22/02/2023"
        keySelect="date_release"
        errorMessage=""
        onChange={onChangeMock}
        type="date"
        value="2024-08-10"
      />
    );

    // Verify InputDate component is rendered
    const inputDate = tree.root.findByType(InputDate);
    expect(inputDate.props.title).toBe('22/02/2023');
    expect(inputDate.props.keyValue).toBe('date_release');
    expect(inputDate.props.value).toBe('2024-08-10');
  });


});