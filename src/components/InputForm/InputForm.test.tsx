import React from 'react';
import renderer, { act } from 'react-test-renderer';
import InputForm from './InputForm';

describe('<InputForm />', () => {
  it('renders correctly with TextInput', () => {
    const onChangeMock = jest.fn();
    const component = renderer.create(
      <InputForm
        placeHolder="Enter text"
        keySelect="inputKey"
        errorMessage="Campo obligatorio"
        onChange={onChangeMock}
        type="text"
        value=""
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onChange handler with correct value on text change', () => {
    const onChangeMock = jest.fn();
    const component = renderer.create(
      <InputForm
        placeHolder="Enter text"
        keySelect="inputKey"
        errorMessage="Campo obligatorio"
        onChange={onChangeMock}
        type="text"
        value=""
      />
    );

    act(() => {
      component.root.findByType('TextInput').props.onChangeText('Test input');
    });

    expect(onChangeMock).toHaveBeenCalledWith('inputKey', 'Test input');
  });

});