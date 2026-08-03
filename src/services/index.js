import { apiClient } from './api/index.js';
import { mockClient } from './mock/mockClient.js';

const useMockApi = import.meta.env?.VITE_USE_MOCK_API === 'true';

export const serviceClient = useMockApi ? mockClient : apiClient;
export const isMockApiEnabled = useMockApi;
