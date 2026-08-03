import { ERROR_CODES } from '../../constants/errorCodes.js';
import { ServiceError } from '../ServiceError.js';
import {
  mockCurrentUser,
  mockGroups,
  mockHeartAccount,
  mockRewardPoints,
} from './mockData.js';

const DEFAULT_MOCK_DELAY_MS = 300;
const configuredDelay = Number(import.meta.env?.VITE_AI_MOCK_DELAY_MS);
const mockDelayMs =
  Number.isFinite(configuredDelay) && configuredDelay >= 0
    ? configuredDelay
    : DEFAULT_MOCK_DELAY_MS;

function createRequestId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `mock-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function wait() {
  return new Promise((resolve) => setTimeout(resolve, mockDelayMs));
}

function createMeta(requestId) {
  return {
    requestId,
    timestamp: new Date().toISOString(),
  };
}

function createSuccess(data, requestId) {
  return {
    success: true,
    data,
    meta: createMeta(requestId),
  };
}

function createNotFoundError(pathname, requestId) {
  return new ServiceError({
    code: ERROR_CODES.NOT_FOUND,
    message: '요청한 Mock API 경로를 찾을 수 없습니다.',
    details: { pathname },
    requestId,
    status: 404,
  });
}

async function request(endpoint, { method = 'GET' } = {}) {
  await wait();

  const requestId = createRequestId();
  const url = new URL(endpoint, 'http://mock.local');
  const { pathname } = url;

  if (method !== 'GET') {
    throw createNotFoundError(pathname, requestId);
  }

  if (pathname === '/health') {
    return createSuccess({ status: 'ok', mode: 'mock' }, requestId);
  }

  if (pathname === '/users/me') {
    return createSuccess(mockCurrentUser, requestId);
  }

  if (pathname === '/groups') {
    return createSuccess(mockGroups, requestId);
  }

  const groupMatch = pathname.match(/^\/groups\/([^/]+)$/);

  if (groupMatch) {
    const groupId = decodeURIComponent(groupMatch[1]);
    const group = mockGroups.find((item) => item.id === groupId);

    if (group) {
      return createSuccess(group, requestId);
    }
  }

  if (pathname === '/hearts/balance') {
    return createSuccess(mockHeartAccount, requestId);
  }

  if (pathname === '/rewards/points') {
    return createSuccess(mockRewardPoints, requestId);
  }

  throw createNotFoundError(pathname, requestId);
}

function get(endpoint, options = {}) {
  return request(endpoint, { ...options, method: 'GET' });
}

function post(endpoint, options = {}) {
  return request(endpoint, { ...options, method: 'POST' });
}

function put(endpoint, options = {}) {
  return request(endpoint, { ...options, method: 'PUT' });
}

function patch(endpoint, options = {}) {
  return request(endpoint, { ...options, method: 'PATCH' });
}

function remove(endpoint, options = {}) {
  return request(endpoint, { ...options, method: 'DELETE' });
}

export const mockClient = Object.freeze({
  get,
  post,
  put,
  patch,
  delete: remove,
});
