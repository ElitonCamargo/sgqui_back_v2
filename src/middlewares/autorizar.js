import * as responses from '../utils/responses.js';

export const normalizeRouteTemplate = (template = '') => {
  let t = String(template || '').trim();
  if (!t) return '/';

  if (!t.startsWith('/')) t = `/${t}`;

  // Remove querystring se alguém passar por engano
  const qIndex = t.indexOf('?');
  if (qIndex !== -1) t = t.slice(0, qIndex);

  // Normaliza múltiplas barras
  t = t.replace(/\/+/, '/');

  // Remove barra final (exceto raiz)
  if (t.length > 1) t = t.replace(/\/+$/, '');

  // Normaliza nomes de params (/:id, /:codigo, etc.) para /:param
  t = t.replace(/\/:([^/]+)/g, '/:param');

  return t;
};

const hasPermission = (permissoes, key) => {
  if (!permissoes) return false;
  if (permissoes instanceof Set) return permissoes.has(key);
  if (Array.isArray(permissoes)) return permissoes.includes(key);
  return false;
};

export default function autorizar(rotaTemplate = '') {
  const rotaNormalizada = normalizeRouteTemplate(rotaTemplate);

  return async function autorizarMiddleware(req, res, next) {
    const metodo = String(req.method || '').toUpperCase();
    const key = `${metodo} ${rotaNormalizada}`;

    if (hasPermission(req.permissoes, key)) {
      return next();
    }

    return responses.forbidden(res, { message: 'Acesso negado' });
  };
}
