import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';


export const listarLiberados = async (filtro = {}) => {
    try {
        const querysValidos = ['codigo', 'nome', 'cliente', 'descricao', 'tipo', 'aplicacao', 'natureza_fisica'];
        
        const keys = Object.keys(filtro);

        keys.forEach(key => {
            if (!querysValidos.includes(key)) {
                throw new AppError({
                    message: 'Filtro inválido',
                    reason: `O filtro '${key}' não é permitido. Os filtros válidos são: ${querysValidos.join(', ')}.`,
                    code: 400
                });
            }
            });

        const values = Object.values(filtro).map(value => `%${value}%`);
        const conditions = keys.map(key => `${key} LIKE ?`).join(' OR ');  

        const cmdSql = `
        SELECT DISTINCT
            projeto.*,
            IF(produtos.projeto IS NULL, 'true', 'false') AS pendente
        FROM
            produtos
            RIGHT JOIN
            projeto ON produtos.projeto = projeto.id
        WHERE 
        	JSON_EXTRACT(JSON_EXTRACT(projeto.status, '$[0]'),'$.status') = 'Liberado' 
            ${conditions ? `AND (${conditions})` : ''}
        ORDER BY 
            pendente DESC, projeto.updatedAt DESC;
        `;
        const [dados] = await pool.execute(cmdSql, [values]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao listar formulações liberadas',
            reason: `Falha na execução do SELECT com JOIN entre 'produtos' e 'projeto' para listar formulações com status 'Liberado'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};



export const visualizarFormulacao = async (id) => {
    try { 
        const cmdSql = 'SELECT * FROM projeto_detalhado WHERE projeto_id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar detalhes do projeto',
            reason: `Falha na execução do SELECT na view 'projeto_detalhado' filtrando por ID; verifique se o projeto existe e se a view está criada no banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};
