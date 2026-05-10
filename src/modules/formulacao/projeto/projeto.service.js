import * as projetoModel from './projeto.model.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (projetoData={}, loginId=0) => {
    const data = await projetoModel.cadastrar(projetoData, loginId);
    if (!data) {
        throw new AppError({
            message: 'Erro ao cadastrar projeto',
            reason: 'Ocorreu um erro ao tentar cadastrar o projeto no banco de dados. Verifique os dados fornecidos e tente novamente.',
            code: 500
        });
    }
    return data;
};

export const alterar = async (id=0, projetoData={}, loginId=0) => {
    const data = await projetoModel.alterar(id, projetoData, loginId);
    if (!data) {
        throw new AppError({
            message: 'Erro ao alterar projeto',
            reason: 'Ocorreu um erro ao tentar alterar o projeto. Verifique se o projeto existe e se algum dado foi realmente modificado.',
            code: 404
        });
    }
    return data;
};


export const duplicar = async (id, loginId) => {
    const data = await projetoModel.duplicar(id, loginId);
    if (!data) {
        throw new AppError({
            message: 'Erro ao duplicar projeto',
            reason: 'Ocorreu um erro ao tentar duplicar o projeto no banco de dados. Verifique se o ID do projeto origem existe e se a procedure está criada.',
            code: 500
        });
    }
    return data;
};


export const addResultado = async (projetoId, responsavelId, resultado={}) => {
    if(projetoId == null || projetoId.trim() === ''){
        throw new AppError({
            message: 'ID do projeto é obrigatório',
            reason: "O parâmetro 'projetoId' não foi fornecido ou está vazio; é necessário identificar o projeto ao qual o resultado será vinculado",
            code: 400
        });
    }

    if(resultado == null || Object.keys(resultado).length === 0){
        throw new AppError({
            message: 'Dados do resultado são obrigatórios',
            reason: "O parâmetro 'resultado' não foi fornecido ou está vazio; é necessário fornecer os dados do resultado a ser adicionado",
            code: 400
        });
    }

    resultado.id_responsavel = responsavelId;        
    return await projetoModel.addResultado(projetoId, resultado);        
};

export const consultar = async (filtro = '') => {
    const data = await projetoModel.consultar(filtro);
    if (data.length === 0) {
        throw new AppError({
            message: 'Nenhum projeto encontrado',
            reason: 'Nenhum projeto corresponde aos critérios de filtro fornecidos.',
            code: 404
        });
    }
    return data;
};

export const consultarDeletados = async () => {
    return await projetoModel.consultarDeletados();
};


const filtroAvancado = (projetos=[], filtroConsulta)=>{
    let dados_essenciais = projetos.map((projeto)=>{
        let result = {
            projeto_id: projeto.id,
            materias_primas:[],
            nutrientes:[]
        }
        projeto.etapas.forEach(etapa =>{
            etapa.etapa_mp.forEach(mp=>{
                result.materias_primas.push({
                    id: mp.mp_id,
                    percentual: mp.percentual
                })
            })
        })
        projeto.nutrientes.forEach(nutr => {
            result.nutrientes.push({
                id: nutr.id,
                percentual: nutr.percentual
            })
        });
        return result;
    });
    
    const filtrar = (dados_essenciais=[] , filtroConsulta = {}) => {
        return dados_essenciais.filter(projeto => {
            const todasMateriasPrimas = filtroConsulta.materia_prima.every(filtroMateriaPrima => {
                return projeto.materias_primas.some(materiaPrima => {
                    return materiaPrima.id == filtroMateriaPrima.id && (materiaPrima.percentual >= filtroMateriaPrima.percentual[0] && materiaPrima.percentual <= filtroMateriaPrima.percentual[1]);
                });
            });    

            const todosNutrientes = filtroConsulta.nutriente.every(filtroNutriente => {
                return projeto.nutrientes.some(nutriente => {
                    return nutriente.id == filtroNutriente.id && (nutriente.percentual >= filtroNutriente.percentual[0] && nutriente.percentual <= filtroNutriente.percentual[1]);
                });
            });
            return todasMateriasPrimas && todosNutrientes;
        });
    };   
    return (filtrar(dados_essenciais, filtroConsulta)).map(projeto=>projeto.projeto_id); //Retorna apenas os IDs
    // return filtrar(dados_essenciais, filtroConsulta);
}

export const consultarFiltroAvancado = async (filtro = []) => {

    let filtroConsulta = {
        materia_prima:[], 
        nutriente:[] 
    }
    filtro = JSON.parse(filtro);
    
    // Separar os filtros em materia_prima e nutriente
    filtro.forEach(elemento => {
        if (elemento.tipo === "nutriente") {
            filtroConsulta.nutriente.push({id: elemento.id, percentual: [elemento.percentual[0],elemento.percentual[1]]});
        } else{
            filtroConsulta.materia_prima.push({id: elemento.id, percentual: [elemento.percentual[0],elemento.percentual[1]]});
        }
    });


    const result = await projetoModel.consultarFiltroAvancado(filtroConsulta);   
    
    
    if (result.length === 0) {
        throw new AppError({
            message: 'Nenhum projeto encontrado',
            reason: 'Nenhum projeto corresponde aos critérios de filtro fornecidos.',
            code: 404
        });
    }
    let projetos = estruturarProjeto(result);   
    let IDs_projeto_compativeis = filtroAvancado(projetos, filtroConsulta);
    console.log('IDs de projetos compatíveis com o filtro avançado:', IDs_projeto_compativeis);
    return projetos.filter(projeto=>{
        return IDs_projeto_compativeis.some(id => id == projeto.id);
    })
};


export const consultarPorId = async (id) => {
    return await projetoModel.consultarPorId(id);
};

export const consultarPorCodigo = async (codigo) => {
    const data = await projetoModel.consultarPorCodigo(codigo);
    if(data.length === 0){
        throw new AppError({
            message: 'Projeto não encontrado',
            reason: 'Não existe um projeto com o código fornecido. Verifique o código e tente novamente.',
            code: 404
        });
    }
    return data;
};

export const consultarPorData = async (data_inicio="", data_termino="") => {
    const data = await projetoModel.consultarPorData(data_inicio, data_termino);
    if(data.length === 0){
        throw new AppError({
            message: 'Nenhum projeto encontrado',
            reason: 'Nenhum projeto foi encontrado dentro do período especificado. Verifique as datas fornecidas e tente novamente.',
            code: 404
        });
    }
    return data;
};

export const consultarPorStatus = async (status='') => {
    const data = await projetoModel.consultarPorStatus(status);
    if(data.length === 0){
        throw new AppError({
            message: 'Nenhum projeto encontrado',
            reason: 'Nenhum projeto foi encontrado com o status especificado. Aparentemente, não há projetos que correspondam ao status fornecido.',
            code: 404
        });
    }
    return data;
};

export const deletar = async (id, loginId) => {
    const cacheProjetoDeletado = await consultaDetalhada(id);
    const result = await projetoModel.deletar(id, loginId);
    if(result === false){
        throw new AppError({
            message: 'Erro ao deletar projeto',
            reason: 'Ocorreu um erro ao tentar deletar o projeto no banco de dados. Verifique se o projeto possui etapas ou resultados vinculados e tente novamente.',
            code: 500
        });
    }
    if(result){
        await projetoModel.auditarProjetoDelete(cacheProjetoDeletado, loginId);
    }
    return result;
};

export const consultaDetalhada = async (id) => {
    const data = await projetoModel.consultaDetalhada(id);
    if (data.length === 0) {
        throw new AppError({
            message: 'Projeto não encontrado',
            reason: 'Não existe um projeto com o ID fornecido. Verifique o ID e tente novamente.',
            code: 404
        });
    }
    return estruturarProjeto(data);
};

const estruturarProjeto = (dados) => {
    let projetos = [];
    const addProjeto = (projeto = {}) => {
        let projetoExistente = projetos.find(p => p.id === projeto.projeto_id);
        if (!projetoExistente) {
            projetoExistente = {
                "id": projeto.projeto_id,
                "codigo": projeto.projeto_codigo,
                "nome": projeto.projeto_nome,
                "cliente": projeto.projeto_cliente,
                "descricao": projeto.projeto_descricao,
                "data_inicio": projeto.projeto_data_inicio,
                "data_termino": projeto.projeto_data_termino,
                "densidade": projeto.projeto_densidade,
                "ph": projeto.projeto_ph,
                "tipo": projeto.projeto_tipo,
                "aplicacao": projeto.projeto_aplicacao,
                "natureza_fisica": projeto.projeto_natureza_fisica,
                "status": projeto.projeto_status,
                "resultado": projeto.projeto_resultado,
                "etapas": [],
                "nutrientes": [],
                "percentual_concluido": 0,
                "dencidade_estimada": 0,
                "createdAt": projeto.projeto_createdAt,
                "updatedAt": projeto.projeto_updatedAt

            };
            projetos.push(projetoExistente);
        }
        return projetoExistente;
    }

    const addEtapasProjeto = (etapa, projeto) => {       
        let etapaExistente = projeto.etapas.find(e => e.id === etapa.etapa_id);
        if (!etapaExistente) {
            etapaExistente = {
                "id": etapa.etapa_id,
                "nome": etapa.etapa_nome,
                "descricao": etapa.etapa_descricao,
                "ordem": etapa.etapa_ordem,
                "etapa_mp": []
            };
            if(etapaExistente.id){
                projeto.etapas.push(etapaExistente);    
            }
        }
        return etapaExistente;        
    }

    const addEtapa_MpEtapas = (etapa_mp, etapa, projeto) => {
        if (etapa_mp.etapa_mp_id) {
            let etapa_MpExistente = etapa.etapa_mp.find(e_mp => e_mp.id === etapa_mp.etapa_mp_id);
            if (!etapa_MpExistente) {
                etapa.etapa_mp.push({
                    "id": etapa_mp.etapa_mp_id,
                    "mp_id": etapa_mp.materia_prima_id,
                    "mp_codigo": etapa_mp.materia_prima_codigo,
                    "materia_prima": etapa_mp.materia_prima_nome,
                    "percentual": etapa_mp.etapa_mp_percentual,
                    "tempo_agitacao": etapa_mp.etapa_mp_tempo_agitacao,
                    "observacao": etapa_mp.etapa_mp_observacao,
                    "lote": etapa_mp.etapa_mp_lote,
                    "ordem": etapa_mp.etapa_mp_ordem
                });
                projeto.dencidade_estimada += etapa_mp.parcial_densidade || 0;
            }
        }
    }

    const addNutrientes = (nutriente, projeto) => {
        if (nutriente.nutriente_id) {
            let index_nutriente = projeto.nutrientes.findIndex(n => n.id === nutriente.nutriente_id);
            if (index_nutriente === -1) {
                projeto.nutrientes.push({
                    "id": nutriente.nutriente_id,
                    "nome": nutriente.nutriente_nome,
                    "formula": nutriente.nutriente_formula,
                    "visivel": nutriente.nutriente_visivel,
                    "percentual": nutriente.percentual_origem,
                    "origem": [{
                        "mp": nutriente.materia_prima_nome,
                        "percentual": nutriente.percentual_origem
                    }]
                });
            } else {
                projeto.nutrientes[index_nutriente].percentual += nutriente.percentual_origem;
                projeto.nutrientes[index_nutriente].origem.push({
                    "mp": nutriente.materia_prima_nome,
                    "percentual": nutriente.percentual_origem
                });
            }
        }
    };

    if (dados) {
        for (const elemento of dados) {
            let projeto_referenciado = addProjeto(elemento);
            let etapa_referenciada = addEtapasProjeto(elemento, projeto_referenciado);
            addEtapa_MpEtapas(elemento, etapa_referenciada, projeto_referenciado);
            addNutrientes(elemento, projeto_referenciado);
            // Atualizar percentual_concluido e densidade_estimada
            projeto_referenciado.percentual_concluido = projeto_referenciado.etapas.reduce((total, etapa) => 
                total + etapa.etapa_mp.reduce((subtotal, mp) => subtotal + mp.percentual, 0), 0);
        }
    }
    
    if(projetos.length === 0){
        return {};
    }
    if(projetos.length === 1){
        return projetos[0];
    }
    return projetos;
};
