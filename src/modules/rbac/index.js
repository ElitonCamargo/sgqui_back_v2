import perfisRoutes from './perfis/perfis.routes.js';
import perfisPermissoesRoutes from './perfisPermissoes/perfisPermissoes.routes.js';
import permissoesRoutes from './permissoes/permissoes.routes.js';
import usuarioRoutes from './usuario/usuario.routes.js';
import usuarioPerfisRoutes from './usuarioPerfis/usuarioPerfis.routes.js';

export default [
  ...perfisRoutes,
  ...perfisPermissoesRoutes,
  ...permissoesRoutes,
  ...usuarioRoutes,
  ...usuarioPerfisRoutes
];
