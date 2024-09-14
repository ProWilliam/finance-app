import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import renderer, { act, ReactTestRenderer } from 'react-test-renderer';
import useForm from './useForm';
import config from '../../app.config';

// Test component that uses the hook
const TestComponent: React.FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const { formData, handleInputChange, handleSubmit, error, setForm } = useForm();

  return (
    <View>
      <Text testID="name-text">{formData.name}</Text>
      <Text testID="error-text">{error}</Text>
      <TouchableOpacity
        testID="submit-button"
        onPress={async () => {
          await handleSubmit();
          onSubmit();
        }}
      >
        Submit
      </TouchableOpacity>
      <TouchableOpacity
        testID="update-form-button"
        onPress={() => {
          setForm({
            id: '1',
            name: 'Test Product',
            description: 'Test Description',
            logo: 'logo.png',
            date_release: '2024-01-01',
            date_revision: '2024-02-01',
          });
        }}
      >
        Update Form
      </TouchableOpacity>
    </View>
  );
};

describe('<useForm />', () => {
  let mockFetch: jest.Mock;
  let testRenderer: ReactTestRenderer;

  beforeEach(() => {
    
    mockFetch = jest.fn();
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should initialize formData correctly', async () => {
    
    await act( async () => {
      testRenderer = renderer.create(<TestComponent onSubmit={() => {}}/>)
    });
    
    const component = testRenderer.root;
    
    const containName = component.findByProps({ testID: 'name-text' })
    const containError =  component.findByProps({ testID: 'error-text' })

    expect(containName.props.children).toEqual('');
    expect(containError.props.children).toEqual(null);
  });

  it('should update formData when "Update Form" button is clicked', async () => {

    await act( async () => {
      testRenderer = renderer.create(<TestComponent onSubmit={() => {}}/>)
    });
    
    const component = testRenderer.root;

    act(() => {
      component.findByProps({ testID: 'update-form-button' }).props.onPress();
    });

    const containName = component.findByProps({ testID: 'name-text' })

    expect(containName.props.children).toEqual('Test Product');
  });

  it('should show error when form fields are empty on submit', async () => {
    await act( async () => {
      testRenderer = renderer.create(<TestComponent onSubmit={() => {}}/>)
    });
    
    const component = testRenderer.root;

    await act(async () => {
      component.findByProps({ testID: 'submit-button' }).props.onPress();
    });

    const containError = component.findByProps({ testID: 'error-text' })

    expect(containError.props.children).toEqual('Todos los campos son necesarios');
  });

  it('should submit form and handle API response', async () => {
    globalThis
    const mockApiResponse = { success: true };
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockApiResponse),
    });

    const onSubmit = jest.fn();
    await act( async () => {
      testRenderer = renderer.create(<TestComponent onSubmit={onSubmit}/>)
    });
    
    const component = testRenderer.root;

    await act(() => {
      component.findByProps({ testID: 'update-form-button' }).props.onPress();
    });

    await act(async () => {
      await component.findByProps({ testID: 'submit-button' }).props.onPress();
    });

    expect(mockFetch).toHaveBeenCalledWith(
      `${config.extra.apiUrl}${config.extra.productUrl}`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          id: '1',
          name: 'Test Product',
          description: 'Test Description',
          logo: 'logo.png',
          date_release: '2024-01-01',
          date_revision: '2024-02-01',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
    expect(onSubmit).toHaveBeenCalled();
  });
});
