import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import renderer, { act } from 'react-test-renderer';

import ItemFinancialProduct from './ItemFinancialProduct';

import config from '../../../app.config';
import styles from './ItemFinancialProduct.styles';
import IconAngleRight from '../../assets/icons/IconAngleRight';

// Mock useAppNavigation hook
const mockAppNavigation = jest.fn();

jest.mock('../../hooks/useAppNavigation', () => ({
  __esModule: true,
  default: () => ({
    appNavigation: mockAppNavigation,
  }),
}));

describe('<ItemFinancialProduct />', () => {

  it('renders correctly with given props', () => {
    const component = renderer.create(<ItemFinancialProduct id="123" name="Product Name" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('updates route state and triggers navigation on press', () => {
    const component = renderer.create(<ItemFinancialProduct id="1" name="Product Name 1" />);

    act(() => {
      component.root.findByType(TouchableOpacity).props.onPress();
    });
  
    expect(mockAppNavigation).toHaveBeenCalledWith(config.extra.rootInfo, { id: '1' });
  });

  it('displays the correct id and name', () => {
    const testRenderer = renderer.create(<ItemFinancialProduct id="1" name="Product Name 1" />);
    const testInstance = testRenderer.root;
  
    const textName = testInstance.findByProps({ style: styles.text }).props.children;
    const texts =  testInstance.findAllByType(Text);
    const textID = texts.map(text => text.props.children)[1].join('');
  
    expect(textName).toBe('Product Name 1');
    expect(textID).toBe('ID:1');
  });

  it('renders the right icon', () => {
    const testRenderer = renderer.create(<ItemFinancialProduct id="1" name="Product Name 1" />);
    const testInstance = testRenderer.root;
  
    const icon = testInstance.findByType(IconAngleRight);
    expect(icon).toBeTruthy();
  });
  
});