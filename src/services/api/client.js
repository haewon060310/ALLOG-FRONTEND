import { ERROR_CODES } from '../../constants/errorCodes.js';
import { STORAGE_KEYS } from '../../constants/storageKeys.js';
import { ServiceError } from '../ServiceError.js';

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? '';

function getAccessToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

function appendQuery(url, query = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value == null) {
      return;
    }

    const values = Array.isArray(value) ? value : [value];
    values.forEach((item) => searchParams.append(key, String(item)));
  });

  const queryString = searchParams.toString();

  if (!queryString) {
    return url;
  }

  return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
}

function buildUrl(endpoint, query) {
  const baseUrl = API_BASE_URL.replace(/\/$/, '');
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  return appendQuery(`${baseUrl}${normalizedEndpoint}`, query);
}

async function parseResponseBody(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

function createServiceError(response, responseBody) {
  const errorData = responseBody?.error ?? {};

  return new ServiceError({
    code: errorData.code ?? ERROR_CODES.UNKNOWN_ERROR,
    message:
      errorData.message ?? `API 요청에 실패했습니다. (${response.status})`,
    details: errorData.details ?? {},
    requestId: responseBody?.meta?.requestId ?? null,
    status: response.status,
  });
}

function createSuccessResponse(response, responseBody) {
  if (responseBody?.success === true) {
    return responseBody;
  }

  return {
    success: true,
    data: responseBody,
    meta: {
      requestId: response.headers.get('x-request-id'),
      timestamp: new Date().toISOString(),
    },
  };
}

export async function request(
  endpoint,
  { method = 'GET', query, body, headers: customHeaders, ...fetchOptions } = {},
) {
  const accessToken = getAccessToken();
  const headers = new Headers(customHeaders);
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  headers.set('Accept', 'application/json');

  if (body != null && !isFormData) {
    headers.set('Content-Type', 'application/json');
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let response;

  try {
    response = await fetch(buildUrl(endpoint, query), {
      ...fetchOptions,
      method,
      headers,
      body: body == null || isFormData ? body : JSON.stringify(body),
    });
  } catch (cause) {
    throw new ServiceError({
      code: ERROR_CODES.UNKNOWN_ERROR,
      message: '서버에 연결할 수 없습니다.',
      details: { type: 'NETWORK_ERROR' },
      cause,
    });
  }

  let responseBody;

  try {
    responseBody = await parseResponseBody(response);
  } catch (cause) {
    throw new ServiceError({
      code: ERROR_CODES.UNKNOWN_ERROR,
      message: '서버 응답을 해석할 수 없습니다.',
      details: { type: 'INVALID_RESPONSE' },
      status: response.status,
      cause,
    });
  }

  if (!response.ok || responseBody?.success === false) {
    throw createServiceError(response, responseBody);
  }

  return createSuccessResponse(response, responseBody);
}

export function get(endpoint, options = {}) {
  return request(endpoint, { ...options, method: 'GET' });
}

export function post(endpoint, options = {}) {
  return request(endpoint, { ...options, method: 'POST' });
}

export function put(endpoint, options = {}) {
  return request(endpoint, { ...options, method: 'PUT' });
}

export function patch(endpoint, options = {}) {
  return request(endpoint, { ...options, method: 'PATCH' });
}

export function remove(endpoint, options = {}) {
  return request(endpoint, { ...options, method: 'DELETE' });
}

export const apiClient = Object.freeze({
  get,
  post,
  put,
  patch,
  delete: remove,
});

export { remove as del, remove as deleteRequest };
