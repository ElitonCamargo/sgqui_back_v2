import formulacaoMaps from '../modules/formulacao/routes/index.js';
import rbacMaps from '../modules/rbac/routes/index.js';

export default [
  ...formulacaoMaps,
  ...rbacMaps,
];