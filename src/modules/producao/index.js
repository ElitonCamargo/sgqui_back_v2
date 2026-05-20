import produtosRoutes from './produtos/produtos.routes.js';
import registrosProducaoRoutes from './registros_producao/registros_producao.routes.js';

  
export default [
  ...produtosRoutes,
  ...registrosProducaoRoutes
];