import * as produtosModel from './produtos.model.js';
import { AppError } from '../../../core/utils/AppError.js';
import { visualizarFormulacao } from '../projeto/projeto.service.js';


export const listar = async (query) => {
    const validKeys = ['projeto_id', 'n_desenvolvimento', 'descricao'];
    const filteredQuery = Object.fromEntries(
        Object.entries(query).filter(([key]) => validKeys.includes(key))
    );
    const data = await produtosModel.listar(filteredQuery);
    if (!data || data.length === 0) {
        throw new AppError({
            title: 'Nenhum produto encontrado',
            message: 'Nenhum produto liberado para produção foi encontrado para os critérios de busca fornecidos.',
            code: 404
        });
    }
    return data;
};


export const consultarPorId = async (id=0, quant_producao=1) => {
    const produto = await produtosModel.consultarPorId(id);
    if (!produto) {
        throw new AppError({
            title: 'Produto não encontrado',
            message: `Não existe um produto com o ID ${id}. Verifique o ID e tente novamente.`,
            code: 404
        });
    }
    const projeto = await visualizarFormulacao(produto.projeto_id);
    delete produto.projeto_id;
    if(quant_producao !== 1){
        projeto.etapas = proporcaoMp(projeto.densidade, projeto.etapas, quant_producao);
    }
    produto.projeto = projeto;
    return produto;
};

const proporcaoMp = (densidade_projeto, etapas=[], quant_producao=1) => {
    return etapas.map(etapa => {
        return {
        ...etapa,
        etapa_mp: etapa.etapa_mp.map(mp => {        
            const qtd_materia_prima = densidade_projeto * (mp.percentual / 100) * quant_producao;
            return {
                ...mp,
                qtd_materia_prima
            };
        })
        }
    });
};