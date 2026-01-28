import express from 'express';
import * as usuario from '../controllers/usuarioController.js';
import autenticar from "../middlewares/autenticacao.js";
import autorizar from '../middlewares/autorizar.js';



const router = express.Router();

router.post('/usuario/login',                usuario.login);
router.get('/usuario/logado',   autenticar, autorizar('/usuario/logado'),  usuario.consultarLogado);
router.get('/usuario',          autenticar, autorizar('/usuario'),      usuario.consultar);
router.get('/usuario/:id',      autenticar, autorizar('/usuario/:id'),  usuario.consultarPorId);
router.delete('/usuario/:id',   autenticar, autorizar('/usuario/:id'),  usuario.deletar);
router.put('/usuario/:id',      autenticar, autorizar('/usuario/:id'),  usuario.alterar);
router.post('/usuario',         autenticar, autorizar('/usuario'),      usuario.cadastrar);

export default router;
