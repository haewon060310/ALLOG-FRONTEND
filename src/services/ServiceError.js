import { ERROR_CODES } from '../constants/errorCodes.js';

export class ServiceError extends Error {
  constructor({
    code = ERROR_CODES.UNKNOWN_ERROR,
    message = '요청을 처리하지 못했습니다.',
    details = {},
    requestId = null,
    status = null,
    cause,
  } = {}) {
    super(message, cause ? { cause } : undefined);
    this.name = 'ServiceError';
    this.code = code;
    this.details = details;
    this.requestId = requestId;
    this.status = status;
  }
}
