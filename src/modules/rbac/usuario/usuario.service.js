import * as usuarioModel from './usuario.model.js';
import * as sessoesService from '../sessoes/sessoes.service.js';
import { AppError } from '../../../core/utils/AppError.js';
import * as helpers from '../../../core/utils/helpers.js'
import bcrypt from 'bcryptjs';

export const cadastrar = async ({nome="",email="",senha="",avatar=""})=>{
    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = await usuarioModel.cadastrar({nome,email,senha:senhaHash,avatar});
    if(!usuario){
        throw new AppError({
            title: 'Erro ao cadastrar usuário',
            message: 'Falha ao tentar cadastrar um novo usuário.',
            details: 'O cadastro do usuário não retornou um resultado válido; verifique os dados fornecidos e a conectividade com o banco de dados.',
            code: 500
        });
    }
    usuario.senha = undefined; // Remover a senha do resultado
    return usuario;

};

export const alterar = async (id=0, usuario={}) => {
    if(Object.keys(usuario).length === 0){
        throw new AppError({
            title: "Nenhum dado para alterar",
            message: "O corpo da requisição está vazio; é necessário enviar ao menos um campo para que a alteração seja realizada",
            details: "O payload da requisição está vazio; é necessário enviar ao menos um campo para que a alteração seja realizada",
            code: 400
        });
    }
    if (usuario.senha) {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
    }
    const result = await usuarioModel.alterar(id, usuario);
    if (!result) {
        throw new AppError({
            title: "Usuário não encontrado",
            message: "O usuário não foi encontrado",
            details: "Não foi localizado nenhum usuário com o ID informado para realizar a alteração",
            code: 404
        });
    }
    
    result.senha = undefined; // Remover a senha do resultado
    return result;
};


export const login = async ({ email="", senha="" }) => {

    if (!email || !senha) {
        throw new AppError({
            title: "Campos obrigatórios",
            message: "Email e senha são obrigatórios",
            details: "O corpo da requisição de login deve conter os campos 'email' e 'senha' preenchidos",
            code: 400
        });
    }
    
    const usuario = await usuarioModel.consultarPorEmail(email);
    if (!usuario) {
        throw new AppError({
            title: "Credenciais inválidas",
            message: "O e-mail ou senha informados são inválidos",
            details: "Nenhum usuário foi encontrado com o e-mail informado",
            code: 401
        });
    }
    
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        throw new AppError({
            title: "Credenciais inválidas",
            message: "O e-mail ou senha informados são inválidos",
            details: "A senha informada não corresponde à senha registrada para este usuário",
            code: 401
        });
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
        throw new AppError({
            title: "Usuário não encontrado",
            message: "Nenhum usuário foi encontrado com o e-mail informado na base de dados",
            details: "Nenhum usuário foi encontrado com o e-mail informado na base de dados",
            code: 404
        });
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
        throw new AppError({
            title: "Nenhum usuário encontrado",
            message: "Nenhum usuário encontrado com os critérios informados",
            details: "A consulta não retornou resultados; verifique se os filtros de nome ou e-mail informados estão corretos",
            code: 404
        });
    }

    return data;

};

export const consultarPorId = async (id) => {
    const data = await usuarioModel.consultarPorId(id);
    if (!data) {
        throw new AppError({
            title: "Usuário não encontrado",
            message: "O usuário não foi encontrado",
            details: "Nenhum usuário foi encontrado com o ID informado na base de dados",
            code: 404
        });
    }
    data.senha = undefined; // Remover a senha do resultado
    return data;
};

export const deletar = async (id) => {
    const result = await usuarioModel.deletar(id);
    if (!result) {
        throw new AppError({
            title: "Usuário não encontrado",
            message: "O usuário que você está tentando deletar não existe ou já foi deletado ou alguma dependência impediu a deleção",
            details: "O usuário que você está tentando deletar não existe ou já foi deletado ou alguma dependência impediu a deleção",
            code: 404
        });
    }    
    return result;

};
