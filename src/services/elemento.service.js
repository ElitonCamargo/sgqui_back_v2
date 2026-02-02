import * as Elemento from '../models/Elemento.model.js';
import { AppError } from '../utils/AppError.js';

// export const cadastrar = async ({ nome, descricao = null }) => {
//     if(nome == null || nome.trim() === ''){
//         throw new AppError('Nome do perfil é obrigatório', 400);
//     }
//     return await perfisModel.cadastrar({ nome: nome.trim(), descricao });
// };


export const consultar = async (query)=>{
    const dados = await Elemento.consultar(query);
    if(dados.length === 0){
        throw new AppError('Nenhum elemento encontrado', 404);
    }
    return dados;
}

export const consultarPorId = async (id)=>{
    const idNumero = parseInt(id);
    if(isNaN(idNumero)){
        throw new AppError('ID inválido', 400);
    }
    const dados = await Elemento.consultarPorId(idNumero);
    if(dados.length === 0){
        throw new AppError('Elemento não encontrado', 404);
    }
    return dados;
}

export const consultarPorSimbolo = async (simbolo)=>{
    const dados = await Elemento.consultarPorSimbolo(simbolo);
    if(dados.length === 0){
        throw new AppError('Elemento não encontrado', 404);
    }
    return dados;
}
