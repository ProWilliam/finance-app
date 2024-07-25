import { useState, useEffect, useCallback } from 'react';

// Component
import apiClient from '../api/apiClient';

// Types
import { FetchOptions } from '../types/api/Api.types';

const useApi = (endpoint: string, options?: FetchOptions) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(
    async () => {
      setLoading(true);
      try {
        const result = await apiClient(endpoint, options);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
  }, [endpoint, options]);

  useEffect(() => {
    if (!options?.manual) {
      fetchData();
    }
  }, [fetchData, options]);

  return { data, error, loading, refetch: fetchData };
};

export default useApi;