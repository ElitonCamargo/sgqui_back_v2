import express from 'express';
import autenticar from '../middlewares/autenticacao.js';
import autorizar from '../middlewares/autorizar.js';
import * as rbac from '../controllers/rbacController.js';

const router = express.Router();

router.get('/rbac/perfis', autenticar, autorizar('/rbac/perfis'), rbac.listarPerfis);
router.get('/rbac/usuario/:id/perfis', autenticar, autorizar('/rbac/usuario/:id/perfis'), rbac.listarPerfisDoUsuario);
router.post('/rbac/usuario/:id/perfis', autenticar, autorizar('/rbac/usuario/:id/perfis'), rbac.atribuirPerfilAoUsuario);
router.delete('/rbac/usuario/:id/perfis/:perfilId', autenticar, autorizar('/rbac/usuario/:id/perfis/:perfilId'), rbac.removerPerfilDoUsuario);

export default router;
