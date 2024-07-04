import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';
import ButtonSubmit from './ButtonSubmit';

// Mock useAppNavigation hook
jest.mock('../../hooks/useAppNavigation', () => ({
  __esModule: true,
  default: () => ({
    appNavigation: jest.fn(),
  }),
}));

describe('<ButtonSubmit />', () => {
  it('renders correctly with title', () => {
    const component = renderer.create(<ButtonSubmit title="Submit" />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls press function when provided', () => {
    const onPressMock = jest.fn();
    const component = renderer.create(<ButtonSubmit title="Submit" press={onPressMock} />);
    act(() => {
      component.root.findByType(TouchableOpacity).props.onPress();
    });
    expect(onPressMock).toHaveBeenCalled();
  });

  it('navigates to specified route when navigationRoot prop is provided', () => {
    const component = renderer.create(<ButtonSubmit title="Submit" navigationRoot="Home" />);
    const touchable = component.root.findByType(TouchableOpacity);
    act(() => {
      touchable.props.onPress();
    });
    expect(component.root.findByType('Text').props.children).toBe('Submit');
  });

});