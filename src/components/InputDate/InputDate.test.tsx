import React from 'react';
import renderer, { act } from 'react-test-renderer';
import InputDate from './InputDate';

describe('<InputDate />', () => {
  it('renders correctly with default title', () => {
    const onChangeMock = jest.fn();
    const component = renderer.create(
      <InputDate
        title="Select Date"
        keyValue="dateKey"
        onChangeForm={onChangeMock}
        value=""
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});