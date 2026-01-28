import express from 'express';
import * as usuario from '../controllers/usuarioController.js';
import autenticar from "../middlewares/autenticacao.js";



const router = express.Router();

router.post('/usuario/login',                usuario.login);
router.get('/usuario/logado',   autenticar,  usuario.consultarLogado);
router.get('/usuario',          autenticar,  usuario.consultar);
router.get('/usuario/:id',      autenticar,  usuario.consultarPorId);
router.delete('/usuario/:id',   autenticar,  usuario.deletar);
router.put('/usuario/:id',      autenticar,  usuario.alterar);
router.post('/usuario',         autenticar,  usuario.cadastrar);

export default router;
