import * as responses from '../utils/responses.js';

export const errorMiddleware = (error, req, res, next) => {
  const status = error.code || 500;
  const message = error.message || 'Erro interno do servidor';

  switch (status) {
    case 400:
      return responses.badRequest(res, { message });
    case 401:
      return responses.unauthorized(res, { message });
    case 403:
      return responses.forbidden(res, { message });
    case 404:
      return responses.notFound(res, { message });
    case 409:
      return responses.conflict(res, { message });
    case 498:
      return responses.invalidToken(res, { message });
    default:
      return responses.error(res, { status, message });
  }
};
