import React from 'react';
import renderer from 'react-test-renderer';
import RowText from './RowText';

describe('<RowText />', () => {
  it('renders with title and children', () => {
    const props = {
      title: 'Title Text',
      children: 'Content Text',
    };

    const tree = renderer.create(<RowText {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing with empty title and children', () => {
    const props = {
      title: '',
      children: '',
    };

    const tree = renderer.create(<RowText {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with dynamic content', () => {
    const props1 = {
      title: 'First Title',
      children: 'First Content',
    };

    const props2 = {
      title: 'Second Title',
      children: 'Second Content',
    };

    let tree = renderer.create(<RowText {...props1} />).toJSON();
    expect(tree).toMatchSnapshot();

    tree = renderer.create(<RowText {...props2} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});