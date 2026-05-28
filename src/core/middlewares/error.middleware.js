import * as responses from '../utils/responses.js';
import { logError } from '../utils/logger.js';

export const errorMiddleware = (error, req, res, next) => {

  
    const title = error.title || 'Erro Interno';
    const message = error.message || 'Erro interno do servidor';
    const details = error.details || 'Erro interno de servidor desconhecido';
    const status = error.code || 500;


  logError({ error, req, status, message: `${title}: ${message}` });

  switch (status) {
    case 400:
      return responses.badRequest(res, { message: title, error:{title, message, details} });
    case 401:
      return responses.unauthorized(res, { message: title, error:{title, message, details} });
    case 403:
      return responses.forbidden(res, { message: title, error:{title, message, details} });
    case 404:
      return responses.notFound(res, { message: title, error:{title, message, details} });
    case 409:
      return responses.conflict(res, { message: title, error:{title, message, details} });
    case 498:
      return responses.invalidToken(res, { message: title, error:{title, message, details} });
    default:
      return responses.error(res, { status, message: title, error:{title, message, details} });
  }
};
