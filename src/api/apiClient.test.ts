import apiClient from './apiClient';
import config from '../../app.config';
import data from '../data/allDataGet';

// Mock by function global fetch
globalThis.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;

describe('apiclient', () => {

  
  let mockData: {data: typeof data[]};
  let routeApi: string;
  let allRouteApi: string;
  let id: string;
  let postData: {data: typeof data}

  // clean data before each test.
  beforeEach(() => {
    (globalThis.fetch as jest.Mock).mockClear();
    jest.useFakeTimers();

    mockData = { data: [data]}; // Import format per server
    postData = { data: data}; 

    routeApi = config.extra.productUrl;
    allRouteApi = config.extra.apiUrl + config.extra.productUrl;
    id = '1'
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  })

  it('Should handle errors gracefully', async () => {
    (globalThis.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    await expect(apiClient('/test-endpoint')).rejects.toThrow('Failed to fetch');
  });

  it('Should perform a Get request and return data', async () => {
    

    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({

      ok: true,
      json: async () => mockData,

    } as Response );

    const response = await apiClient(routeApi);

    expect(response).toEqual(mockData);
    expect(globalThis.fetch).toHaveBeenCalledWith(allRouteApi, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    expect(response).toMatchSnapshot();

  });

  it('Should perform a POST request with body', async () => {

    const mockData = { success: true };
    
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    
    const response = await apiClient(routeApi, {
      method: 'POST',
      body: postData,
    });

    expect(response).toEqual(mockData);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      allRouteApi,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(postData),
      })
    );

    expect(response).toMatchSnapshot();

  });

  it('Should perform a PUT request with body', async () => {

    const mockData = {
      id: "1",
      name: "Updated Product",
      description: "Updated Description",
      logo: "updated-logo.png",
      date_release: "2025-01-01",
      date_revision: "2025-01-01"
    };

    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    
    const response = await apiClient(routeApi + id, {
      method: 'PUT',
      body: mockData 
    });

    expect(response).toEqual(mockData);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      allRouteApi + id,
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(mockData),
      })
    );

    expect(response).toMatchSnapshot();

  });

  it('Should send a DELETE method with id', async () => {

    const mockData = { success: true };

    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    
    const response = await apiClient(routeApi + id, {
      method: 'DELETE',
    });

    expect(response).toEqual(mockData);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      allRouteApi + id,
      expect.objectContaining({
        method: 'DELETE',
      })
    );

    expect(response).toMatchSnapshot();
  });

  it('Should handle invalid data in response', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ unexpectedKey: 'unexpectedValue' }),
    });
  
    const response = await apiClient(routeApi);
    expect(response).not.toEqual(expect.objectContaining({ data: expect.anything() }));
  });

  it('Should send custom headers correctly', async () => {
    const customHeaders = { Authorization: 'TokenHASH256' };
  
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
  
    await apiClient(routeApi, {
      method: 'GET',
      headers: customHeaders,
    });
  
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        headers: expect.objectContaining(customHeaders),
      })
    );
  });

  it('Should handle multiple requests concurrently', async () => {
    (globalThis.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 1 }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 2 }) });
  
    const request1 = apiClient(routeApi);
    const request2 = apiClient(routeApi);
  
    const responses = await Promise.all([request1, request2]);
  
    expect(responses).toEqual([{ id: 1 }, { id: 2 }]);
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });

  it('Should handle timeouts correctly', async () => {
    
    (globalThis.fetch as jest.Mock).mockImplementationOnce(() =>
      new Promise((resolve) => globalThis.setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 5000))
    );
    

    const fetchPromise = apiClient(routeApi);

    jest.advanceTimersByTime(2500);

    let isPending = true;
    fetchPromise.then(() => {
      isPending = false;
    });
  
    expect(isPending).toBe(true);
  
    jest.advanceTimersByTime(2500);
  
    await expect(fetchPromise).resolves.toBeDefined();
    expect(isPending).toBe(false);
  });

});