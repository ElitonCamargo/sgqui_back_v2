// src/routes/rbac.js
// RBAC => Role-Based Access Control (Controle de Acesso Baseado em Funções)
import * as usuarioPerfis from '../../controllers/usuarioPerfis.controllers.js.';
import * as perfis from '../../controllers/perfis.controllers.js';
import * as perfisPermissoes from '../../controllers/perfisPermissoes.controllers.js';
import * as permissoes from '../../controllers/permissoes.controllers.js';

// post('/rbac/usuario_perfis', usuarioPerfis.vincular);
// delete('/rbac/usuario_perfis/:vinculoID', usuarioPerfis.desvincular);
// get('/rbac/usuario_perfis', usuarioPerfis.listar);
// get('/rbac/usuario_perfis/usuario/perfis', usuarioPerfis.listarDoUsuarioLogado);
// get('/rbac/usuario_perfis/usuario/:usuarioId/perfis', usuarioPerfis.listarPerfisPorUsuario);
// get('/rbac/usuario_perfis/perfil/:perfilId/usuarios', usuarioPerfis.listarUsuariosPorPerfil);

// // Manipulando Perfis
// get('/rbac/perfis', perfis.listar);
// get('/rbac/perfis/:id', perfis.listarPorId);
// get('/rbac/perfis/nome/:nome', perfis.listarPorNome);
// post('/rbac/perfis', perfis.cadastrar);
// put('/rbac/perfis/:id', perfis.alterar);
// delete('/rbac/perfis/:id', perfis.remover);

// // Manipulando vinculos entre Perfis e Permissões
// get('/rbac/perfil_permissoes', perfisPermissoes.listarVinculos);
// get('/rbac/perfil_permissoes/perfil/:perfilId', perfisPermissoes.listarVinculos);
// post('/rbac/perfil_permissoes', perfisPermissoes.vincular);
// delete('/rbac/perfil_permissoes/:vinculoID', perfisPermissoes.desvincular);

// // Manipulando Permissões
// get('/rbac/permissoes', permissoes.listarTodas);
// get('/rbac/permissoes/usuario', permissoes.listarDoUsuarioLogado);

