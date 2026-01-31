import * as projeto from '../../controllers/projeto.controllers.js';

export default [
  {
    metodo: 'GET',
    rota: '/projeto',
    functionExec: projeto.consultar,
    recurso: 'Projetos',
    descricao: 'Visualizar todos os projetos',
    ehPublica: true
  }
    // .... Continue with other routes as needed
    //get('/projeto/:id', autenticar, autorizar, projeto.consultarPorId);
    //get('/projeto/codigo/:codigo', autenticar, autorizar, projeto.consultarPorCodigo);
    //get('/projeto/detalhado/:id', autenticar, autorizar, projeto.consultaDetalhada);
    //get('/projeto/data/:inicio/:termino', autenticar, autorizar, projeto.consultarPorData);
    //post('/projeto', autenticar, autorizar, projeto.cadastrar);
    //post('/projeto/:id', autenticar, autorizar, projeto.duplicar);
    //put('/projeto/:id', autenticar, autorizar, projeto.alterar);
    //delete('/projeto/:id', autenticar, autorizar, projeto.deletar);
]