// Config and Types
import config from '../../app.config';
import { FetchOptions } from '../types/api/Api.types';

const API_URL = config.extra.apiUrl;

const apiClient = async (endpoint: string, options?: FetchOptions) => {
  const { method = 'GET', headers = {}, body } = options || {};

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  };

  return globalThis.fetch(`${API_URL}${endpoint}`, config)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    });

};

export default apiClient;