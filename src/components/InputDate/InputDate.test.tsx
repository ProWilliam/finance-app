import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { View, Platform, Text, TouchableOpacity } from 'react-native';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import InputDate from './InputDate';

// The third party library has different events for the same value, which is why any is placed as the type.
jest.mock('react-native-modal-datetime-picker', () => {
  return ({ isVisible, onConfirm, onCancel }: any) => {
    return null;
  };
});

describe('<InputDate />', () => {

  const onChangeMock = jest.fn();

  it('renders correctly with default title', () => {
    const component = renderer.create(
      <InputDate
        title="Select Date"
        keyValue="date_release"
        onChangeForm={onChangeMock}
        value=""
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render a TouchableOpacity and DateTimePickerModal on non-web platforms', () => {
    Platform.OS = 'ios';
    const tree = renderer.create(<InputDate title="Fecha" keyValue="date_release" onChangeForm={onChangeMock} value="" />);

    const touchableOpacity = tree.root.findByType(TouchableOpacity);
    const dateTimePickerModal = tree.root.findByType(DateTimePickerModal);

    expect(touchableOpacity).toBeTruthy();
    expect(dateTimePickerModal.props.isVisible).toBe(false);
  });

  it('should render an input field on web platform', () => {
    Platform.OS = 'web'; // Mock the platform to web

    const component = renderer.create(
      <InputDate title="fecha" keyValue="date_release" onChangeForm={onChangeMock} value="2024-08-10" />
    );

    const input = component.root.findByType('input');
    expect(input.props.value).toBe('2024-08-10');
  });
  
  it('should update button title and form value when date is confirmed', () => {
    Platform.OS = 'ios';
    
    const tree = renderer.create(<InputDate title="Fecha" keyValue="date_release" onChangeForm={onChangeMock} value="" />);
    const instance = tree.root;

    // Simulates tapping on the button to show the DatePicker.
    const button = instance.findByType(TouchableOpacity);
    act(() => {
      button.props.onPress();
    });

    // Simulates the confirmation of a date.
    const datePicker = instance.findByType(DateTimePickerModal);
    act(() => {
      datePicker.props.onConfirm(new Date('8/10/2024'));
    });
  
    expect(onChangeMock).toHaveBeenCalledWith('date_release', '2024-08-10');
    expect(tree.root.findByType(Text).props.children).toBe('2024-08-10');
  });

  it('should render TouchableOpacity and Text on native platform', () => {
    Platform.OS = 'ios'; // Mock the platform to iOS

    const component = renderer.create(
      <InputDate title="fecha" keyValue="date_revision" onChangeForm={onChangeMock} value="2024-08-10" />
    );

    const touchableOpacity = component.root.findByType(TouchableOpacity);
    const text = component.root.findByType(Text);

    expect(touchableOpacity).toBeDefined();
    expect(text.props.children).toBe('2024-08-10');
  });

  it('should call onChangeForm with the correct date format when a date is confirmed', () => {
    const mockOnChangeForm = jest.fn();
    const component = renderer.create(
      <InputDate title="Date" keyValue="date_revision" onChangeForm={mockOnChangeForm} value="" />
    );

    const instance = component.root;
    const button = instance.findByType(TouchableOpacity);
    const datepiker = instance.findByType(DateTimePickerModal);

    // Mock the onConfirm callback
    act(() => {
      button.props.onPress();
    });

    act(() => {
      datepiker.props.onConfirm(new Date('8/10/2024'));
    });

    expect(mockOnChangeForm).toHaveBeenCalledWith('date_revision', '2024-08-10');
    expect(instance.findByType(Text).props.children).toBe('2024-08-10');
  });

  

});