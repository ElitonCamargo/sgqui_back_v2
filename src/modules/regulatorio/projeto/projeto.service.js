import * as projetoModel from './projeto.model.js';
import { AppError } from '../../../core/utils/AppError.js';


export const listarLiberados = async (filtro = {}) => {
    const data = await projetoModel.listarLiberados(filtro);
    if (data.length === 0) {
        throw new AppError({
            message: 'Nenhum projeto encontrado',
            reason: 'Nenhum projeto corresponde aos critérios de filtro fornecidos.',
            code: 404
        });
    }
    return data;
};


export const visualizarFormulacao = async (id) => {
    const data = await projetoModel.visualizarFormulacao(id);
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
    
    return projetos[0];
};
