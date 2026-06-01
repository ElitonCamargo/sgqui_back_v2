import * as projetoModel from './projeto.model.js';
import { AppError } from '../../../core/utils/AppError.js';


export const visualizarFormulacao = async (id) => {
    const data = await projetoModel.visualizarFormulacao(id);
    if (data.length === 0) {
        throw new AppError({
            title: 'Erro ao visualizar formulação',
            message: 'O projeto informado não foi encontrado para visualização da formulação.',
            details: `Nenhum projeto encontrado para visualização da formulação com o ID ${id}.`,
            code: 404
        });
    }
    return estruturarProjeto(data);
};

const estruturarProjeto = (dados) => {
    let projeto = {
        "id": dados[0].projeto_id,
        "codigo": dados[0].projeto_codigo,
        "nome": dados[0].projeto_nome,
        "descricao": dados[0].projeto_descricao,
        "densidade": dados[0].projeto_densidade,
        "ph": dados[0].projeto_ph,
        "tipo": dados[0].projeto_tipo,
        "aplicacao": dados[0].projeto_aplicacao,
        "natureza_fisica": dados[0].projeto_natureza_fisica,
        "etapas": [],
        "nutrientes": []
    };
  

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

    const addEtapa_MpEtapas = (etapa_mp, etapa) => {
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

    for (const elemento of dados) {
        let etapa_referenciada = addEtapasProjeto(elemento, projeto);
        addEtapa_MpEtapas(elemento, etapa_referenciada);
        addNutrientes(elemento, projeto);
    }
    return projeto;
};
