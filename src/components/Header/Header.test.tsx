import React from 'react';
import { Text, View } from 'react-native';
import renderer from 'react-test-renderer';

// Component adn Styles
import IconBank from '../../assets/icons/IconBank';
import Header from './Header';
import styles from './Header.styles';

describe('<Header />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Header />).toJSON();
    
    expect(tree).toMatchSnapshot();
  });

  it('renders the title correctly', () => {
    const tree = renderer.create(<Header />);
    const textComponent = tree.root.findByType(Text);
    expect(textComponent.props.children).toBe('Banco');
  });

  it('should render the IconBank component', () => {
    const tree = renderer.create(<Header />);
    const iconBank = tree.root.findByType(IconBank);
    expect(iconBank).toBeTruthy();
  });

  it('should apply the correct styles to the container', () => {
    const tree = renderer.create(<Header />);
    const containerStyle = tree.root.findByType(View).props.style;
    expect(containerStyle).toEqual(styles.container);
  });

});