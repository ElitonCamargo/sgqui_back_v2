import * as sessoesModel from '../models/SessoesModel.js';
import * as sessoesCache from '../utils/sessoesCache.js';
import * as responses from '../utils/responses.js'
import * as helpers from '../utils/helpers.js';

export default async function autenticar(req, res, next) {
    try {        
        const authorizationHeader = req.headers['authorization'];
        
        if (!authorizationHeader) {
            // return responses.error(res,{statusCode: 498, message:"Token de autenticação não fornecido"});    
            return responses.invalidToken(res,{message:"Token de autenticação não fornecido"});
        }
        
        const [bearer, token] = authorizationHeader.split(' ');
        
        if (bearer !== 'Bearer' || !token) {
            // return responses.error(res,{statusCode: 498, message:"Formato de token inválido"});   
            return responses.invalidToken(res,{message:"Formato de token inválido"});         
        }

        const tokenAtributos = helpers.deconstructToken(token);
        const sessaoId = parseInt(tokenAtributos.id, 10);
        const sessaoUsuario = parseInt(tokenAtributos.usuario, 10);
        const sessaoToken = tokenAtributos.token;
        
        let sessao_usuario = sessoesCache.buscarSessao(sessaoId, sessaoUsuario, sessaoToken);

        if(sessao_usuario){
            req.loginId = sessaoUsuario;
            next();
            return;
        }
        
        // Buscar a sessão no banco de dados ************************************************************

        sessao_usuario = await sessoesModel.buscarSessao(sessaoId, sessaoUsuario, sessaoToken);
        
        if(!sessao_usuario){
            return responses.invalidToken(res,{message:'Token de autenticação inválido'});
        }

        if(sessao_usuario.validade < new Date()){
            return responses.invalidToken(res,{message:'Token de autenticação expirou'});
        }

        const horaAtual = new Date();
        const tempoParaExpirar = (sessao_usuario.validade.getTime() - horaAtual.getTime())/60000;
        if(tempoParaExpirar < 60){
            const t_ex = await sessoesModel.extender(sessaoId,24);
            if(t_ex) console.log("Token Extendico por mais 24 para o ID"+sessaoUsuario);
        }

        sessoesCache.addSessao(sessao_usuario.id,sessao_usuario.usuario,sessao_usuario.token);
        req.loginId = sessaoUsuario;
        next();
        return;
               
    } catch (error) {
        return responses.error(res,{statusCode:500,message:`Erro interno do servidor: ${error}`})        
    }
};