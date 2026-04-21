import * as usuarioModel from '../models/Usuario.model.js';
import * as sessoesService from './sessoes.service.js';
import { AppError } from '../../../core/utils/AppError.js';
import * as helpers from '../../../core/utils/helpers.js'
import bcrypt from 'bcryptjs';

export const cadastrar = async ({nome="",email="",senha="",avatar=""})=>{
    if(!nome || !email || !senha){
        throw new AppError("Nome, email e senha são obrigatórios para cadastrar um usuário", 400);
    }
    const senhaHash = await bcrypt.hash(senha, 10);
    return await usuarioModel.cadastrar({nome,email,senha:senhaHash,avatar});

};

export const alterar = async (id=0, usuario={}) => {
    if(Object.keys(usuario).length === 0){
        throw new AppError("Nenhum dado para alterar", 400);
    }
    if (usuario.senha) {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
    }
    const result = await usuarioModel.alterar(id, usuario);
    if (!result) {
        throw new AppError("Usuário não encontrado", 404);
    }
    
    result.senha = undefined; // Remover a senha do resultado
    return result;
};


export const login = async ({ email="", senha="" }) => {

    if (!email || !senha) {
        throw new AppError("Email e senha são obrigatórios", 400);
    }
    
    const usuario = await usuarioModel.consultarPorEmail(email);
    if (!usuario) {
        throw new AppError("Credenciais inválidas", 401);
    }
    
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        throw new AppError("Credenciais inválidas", 401);
    }
    // //Efetuou login com sucesso, criar sessão
     const horas_validade = 36;
     const sessao = await sessoesService.criar({usuario: usuario.id, validade: horas_validade});
     const token = helpers.buildToken(sessao) ;
     const expiracao = sessao.validade;
     return {token,expiracao,usuario};

};

export const consultarPorEmail = async (email) => {
    const data = await usuarioModel.consultarPorEmail(email);
    if (!data) {
        throw new AppError("Usuário não encontrado", 404);
    }
    data.senha = undefined; // Remover a senha do resultado
    return data;
};

export const consultar = async (query={}) => {
    let data = [];
    if(Object.keys(query).length === 0){
        data = await usuarioModel.consultar();
    }

    if(query.nome){
        data = await usuarioModel.consultar(query.nome);
    }

    if(query.email){
        const usuario = await usuarioModel.consultarPorEmail(query.email);
        if(usuario){
            usuario.senha = undefined; // Remover a senha do resultado
            data.push(usuario);
        }
    }

    if(data.length === 0){
        throw new AppError("Nenhum usuário encontrado com os critérios informados", 404);
    }

    return data;

};

export const consultarPorId = async (id) => {
    const data = await usuarioModel.consultarPorId(id);
    if (!data) {
        throw new AppError("Usuário não encontrado", 404);
    }
    data.senha = undefined; // Remover a senha do resultado
    return data;
};

export const deletar = async (id) => {
    const result = await usuarioModel.deletar(id);
    if (!result) {
        throw new AppError("Usuário não encontrado", 404);
    }    
    return result;

};
