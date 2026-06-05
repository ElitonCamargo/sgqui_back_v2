import { AppError } from '../utils/AppError.js';

export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        console.error('Validation error:', result.error);
        return next(new AppError({
            title: 'Dados de entrada inválidos',
            message: 'Os dados enviados são inválidos. Revise os campos e tente novamente.',
            details: result.error.issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
            code: 400
        }));
    }

    req.body = result.data;
    next();
};


export const validateQuery = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
        return next(new AppError({
            title: 'Parâmetros de consulta inválidos',
            message: 'Os parâmetros informados são inválidos. Revise os filtros e tente novamente.',
            details: result.error.issues
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
    console.log('Validation result for params:', result);
    if (!result.success) {
        return next(new AppError({
            title: 'Parâmetros da rota inválidos',
            message: 'Os parâmetros da rota são inválidos. Revise os valores informados e tente novamente.',
            details: result.error.issues                
                .map((e) => `${e.path.join('.')}: ${e.message}`)
                .join(', '),
            code: 400
        }));
    }
    req.params = result.data;
    return next();
};
