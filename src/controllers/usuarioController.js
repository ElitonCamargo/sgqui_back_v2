import * as Usuario from '../models/UsuarioModel.js';
import * as Sessoes from '../models/SessoesModel.js';
import * as responses from '../utils/responses.js';
import * as helpers from '../utils/helpers.js';


export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return responses.badRequest(res,{message:"Email e senha são obrigatórios"});
    }

    const usuario = await Usuario.login(email, senha);
    if (!usuario) {
      return responses.unauthorized(res, { message: "Credenciais inválidas" });
    }
    //Efetuou login com sucesso
    const horas_validade = 36;
    const sessao = await Sessoes.criar(usuario.id, horas_validade);

    const token = helpers.buildToken(sessao) ;
    const expiracao = sessao.validade;
    const data = {token,expiracao,usuario}

    return responses.success(res, {  message: "Login realizado com sucesso", data });

  } catch (error) {
    return responses.error(res, { message: error.message });
  }
};


export const consultarPorId = async (req, res)=>{
    try {
        const id = req.params.id;
        const data = await Usuario.consultarPorId(id);
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const deletar = async (req, res)=>{
    try {
        const id = req.params.id;
        const data = await Usuario.deletar(id);
        return responses.noContent(res, {message: "Usuário deletado com sucesso", data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const consultarLogado = async (req, res)=>{
    try {
        const id = req.loginId;
        const data = await Usuario.consultarPorId(id);
        return responses.success(res, {message: "Usuário logado consultado com sucesso", data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const consultar = async (req, res)=>{
    try {
        const email = req.query.email;
        const nome = req.query.nome;
        let data = [];
        if(email){
            data = await Usuario.consultarPorEmail(email);
        }
        else if(nome){
            data = await Usuario.consultar(nome);
        }
        else{
            data = await Usuario.consultar();
        }
        return responses.success(res, {message: "Usuários consultados com sucesso", data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const cadastrar = async (req, res)=>{
    try {
        const {nome,email,senha} = req.body;


        if(!nome || !email || !senha){
            return responses.badRequest(res,{message:"Nome, email e senha são obrigatórios"});
        }

        const novoUsuario = await Usuario.cadastrar(req.body);
        return responses.created(res, {message: "Usuário cadastrado com sucesso", data: novoUsuario });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

export const alterar = async (req, res)=>{
    try {
        let usuario = req.body;
        if(Object.keys(usuario).length === 0){
            return responses.badRequest(res,{message:"Nenhum dado para alterar"});
        }
        let id = req.params.id;
        const usuarioAlterado = await Usuario.alterar(id, usuario);
        return responses.success(res, {message: "Usuário alterado com sucesso", data: usuarioAlterado });
    } catch (error) {
        return responses.error(res,{ message: error.message });
    }
}

