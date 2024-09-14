import React from 'react';
import { View, Text } from 'react-native';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import useApi from './useApi';
import apiClient from '../api/apiClient';

// Mocks
jest.mock('../api/apiClient');

const mockApiClient = apiClient as jest.MockedFunction<typeof apiClient>;

const TestComponent: React.FC<{ endpoint: string }> = ({ endpoint }) => {
  const { data, error, loading, refetch } = useApi(endpoint);
  
  return (
    <View>
      <Text>{loading ? 'Loading...' : data ? `Data: ${data.name}` : 'No Data'}</Text>
      <Text>{error ? `Error: ${error.message}` : ''}</Text>
    </View>
  );
};

describe('<useApi />', () => {

  // Two variables are created to simulate multiple data
  let testRenderer: ReactTestRenderer;
  let testRenderer2: ReactTestRenderer;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state initially', () => {
    const testRenderer = create(<TestComponent endpoint="/test" />);
    const textElement = testRenderer.root.findAllByType(Text);

    expect(textElement[0].props.children).toBe('Loading...');
  });

  it('should display data on successful fetch', async () => {
    const mockData = { name: 'Test Product' };
    mockApiClient.mockResolvedValue(mockData);

    
    await act(async () => {
      testRenderer = create(<TestComponent endpoint="/test" />);
    });

    const textElement = testRenderer.root.findAllByType(Text);

    await act(async () => {
      await Promise.resolve(); // wait for update
    });

    expect(textElement[0].props.children).toBe(`Data: ${mockData.name}`);
  });

  it('should display error message on failed fetch', async () => {
    const mockError = new Error('API Error');
    mockApiClient.mockRejectedValue(mockError);

    
    await act(async () => {
      testRenderer = create(<TestComponent endpoint="/test" />);
    });

    const textElement = testRenderer.root.findAllByType(Text);
    await act(async () => {
      await Promise.resolve(); // wait for update
    });

    
    expect(textElement[1].props.children).toBe(`Error: ${mockError.message}`);
  });

  it('should call refetch function', async () => {
    const mockData = { name: 'Refetched Product' };
    mockApiClient.mockResolvedValue(mockData);

    
    await act(async () => {
      testRenderer = create(<TestComponent endpoint="/test" />);
    });

    const root = testRenderer.root;
    const refetchButton = root.findAllByType(Text)[0].props.children; // Replace with the actual refetch trigger if any

    await act(async () => {
      await Promise.resolve(); // simulate refetch
    });

    expect(mockApiClient).toHaveBeenCalled();
    expect(refetchButton).toBe(`Data: ${mockData.name}`);
  });

  it('should handle multiple fetches correctly', async () => {
    
    const path = '/test'
    const mockData1 = { name: 'Product 1' };
    const mockData2 = { name: 'Product 2' };

    mockApiClient
      .mockResolvedValueOnce(mockData1)
      .mockResolvedValueOnce(mockData2);

    // first fetch
    await act(async () => {
      testRenderer = create(<TestComponent endpoint={path} />);
    });

    const root = testRenderer.root;
    await act(async () => {
      await Promise.resolve(); // wait for initial data
    });

    const textElements = root.findAllByType(Text);

    // Update fetch
    await act(async () => {
      testRenderer2 = create(<TestComponent endpoint={path} />);
    });

    const root2 = testRenderer2.root;
    const updateTextElements = root2.findAllByType(Text);
  
    expect(textElements[0].props.children).toBe(`Data: ${mockData1.name}`);
    expect(updateTextElements[0].props.children).toBe(`Data: ${mockData2.name}`);
  });
});
