import * as produtosModel from './produtos.model.js';
import { visualizarFormulacao } from '../projeto/projeto.service.js';
import { AppError } from '../../../core/utils/AppError.js';
import { getCurrentDateMySQL, hasOwnKey } from '../../../core/utils/helpers.js';

export const cadastrar = async (projeto_id) => {
    const projeto = await visualizarFormulacao(projeto_id);
    if (!projeto) {
        throw new AppError({
            title: 'Formulário não encontrado',
            message: 'A formulário do projeto informado não foi encontrado para gerar o produto.',
            details: `Nenhum projeto encontrado para geração de produto com o ID ${projeto_id}.`,
            code: 404
        });
    }

    const formulacao = (projeto.etapas || [])
        .flatMap((etapa) =>
            Array.isArray(etapa?.etapa_mp) ? etapa.etapa_mp : []
        )
        .map((etapa_mp) => ({
            qtd_formula: projeto.densidade * (etapa_mp.percentual / 100),
            percentual: etapa_mp.percentual,
            cod_item: etapa_mp.mp_codigo,
            desc_item: etapa_mp.materia_prima
        }));

    const garantias = (projeto.nutrientes || [])
        .filter((nutriente) => Number(nutriente.visivel) === 1)
        .map((nutriente) => ({
            nome: nutriente.nome,
            formula: nutriente.formula,
            visivel: nutriente.visivel,
            percentual: nutriente.percentual
        }));

    const produto = {
        projeto_id: projeto.id,
        n_desenvolvimento: projeto.codigo,
        descricao: projeto.nome,
        data_emissao: getCurrentDateMySQL(),
        unid_medida: 'L',        
        densidade: projeto.densidade,
        garantias: JSON.stringify(garantias),
        tipo: projeto.tipo,
        natureza_fisica: projeto.natureza_fisica,
        aplicacao: JSON.stringify(projeto.aplicacao),
        formulacao: JSON.stringify(formulacao),
    };
    return await produtosModel.cadastrar(produto);
};

export const listar = async (query) => {
    const validKeys = ['projeto_id', 'n_desenvolvimento', 'descricao'];
    const filteredQuery = Object.fromEntries(
        Object.entries(query).filter(([key]) => validKeys.includes(key))
    );
    const data = await produtosModel.listar(filteredQuery);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Erro ao buscar produtos',
            message: 'Nenhum produto foi encontrado para os filtros informados.',
            details: `Consulta de produtos sem resultado para filtros: ${JSON.stringify(filteredQuery)}.`,
            code: 404
        });
    }
    return data;
};

export const listarStatus = async () => {
    return {
        status: ['Rascunho', 'Aguardando', 'Liberado']
    };
};


export const deletar = async (id, loginId) => {
    const result = await produtosModel.deletar(id, loginId);
    if (!result) {
        throw new AppError({
            title: 'Erro ao excluir produto',
            message: 'Não foi possível excluir o produto informado.',
            details: `Nenhum produto encontrado para exclusão com o ID ${id} pelo usuário ${loginId}.`,
            code: 404
        });
    }
    return result;
};

export const listarDeletados = async () => {
    const data = await produtosModel.listarDeletados();
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Erro ao listar produtos excluídos',
            message: 'Nenhum produto excluído foi encontrado.',
            details: 'A listagem de produtos excluídos não retornou registros.',
            code: 404
        });
    }
    return data;
};

export const consultarPorId = async (id) => {
    const produto = await produtosModel.consultarPorId(id);
    if (!produto) {
        throw new AppError({
            title: 'Erro ao buscar produto',
            message: 'O produto informado não foi encontrado.',
            details: `Nenhum produto encontrado para o ID ${id}.`,
            code: 404
        });
    }
    return produto;
};

export const atualizar = async (id, produto) => {
    if (hasOwnKey(produto, 'projeto_id')) {
       delete produto.projeto_id; // Impede a atualização do projeto_id
    }
    if (hasOwnKey(produto, 'garantias')) {
        produto.garantias = JSON.stringify(produto.garantias);
    }
    if (hasOwnKey(produto, 'aplicacao')) {
        produto.aplicacao = JSON.stringify(produto.aplicacao);
    }
    if (hasOwnKey(produto, 'formulacao')) {
        produto.formulacao = JSON.stringify(produto.formulacao);
    }
    if(hasOwnKey(produto, 'embalagens')) {
        produto.embalagens = JSON.stringify(produto.embalagens);
    }

    const data = await produtosModel.atualizar(id, produto);
    if (!data) {
        throw new AppError({
            title: 'Erro ao atualizar produto',
            message: 'Não foi possível atualizar o produto informado.',
            details: `Nenhum produto encontrado para atualização com o ID ${id}.`,
            code: 404
        });
    }
    return data;
};
