import { AppError } from '../utils/AppError.js';

export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        console.error('Validation error:', result.error);
        throw new AppError({
            message: 'Dados inválidos',
            reason: result.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
            code: 400
        });
    }

    req.body = result.data;
    next();
};


export const validateQuery = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
        return next(new AppError({
            message: 'Dados inválidos',
            reason: result.error.issues
                .map((e) => `${e.path.join('.')}: ${e.message}`)
                .join(', '),
            code: 400
        }));
    }

    req.query = result.data;
    return next();
};

export const validateParams = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
        return next(new AppError({
            message: 'Dados inválidos',
            reason: result.error.issues                
                .map((e) => `${e.path.join('.')}: ${e.message}`)
                .join(', '),
            code: 400
        }));
    }
    req.params = result.data;
    return next();
};
