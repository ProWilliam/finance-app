import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

describe('<Header />', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Header />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the title correctly', () => {
    const component = renderer.create(<Header />);
    const textComponent = component.root.findByType('Text');
    expect(textComponent.props.children).toBe('Banco');
  });

});