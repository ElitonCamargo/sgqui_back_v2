import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';


export const listarLiberados = async (filtro = {}) => {
    try {
        const querysValidos = ['codigo', 'nome', 'cliente', 'descricao', 'tipo', 'aplicacao', 'natureza_fisica'];
        
        const keys = Object.keys(filtro);

        keys.forEach(key => {
            if (!querysValidos.includes(key)) {
                throw new AppError({
                    title: 'Erro ao listar formulações liberadas',
                    message: 'Um ou mais filtros informados não são permitidos.',
                    details: `Filtro inválido recebido: ${key}. Filtros válidos: ${querysValidos.join(', ')}.`,
                    code: 400
                });
            }
            });

        const values = Object.values(filtro).map(value => `%${value}%`);
        const conditions = keys.map(key => `${key} LIKE ?`).join(' OR ');  

        const cmdSql = `
        SELECT DISTINCT
            projeto.*,
            IF(produtos.projeto_id IS NULL, 'true', 'false') AS pendente
        FROM
            produtos
            RIGHT JOIN
            projeto ON produtos.projeto_id = projeto.id
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
            title: 'Erro ao listar formulações liberadas',
            message: 'Não foi possível listar as formulações liberadas. Verifique a conectividade com o banco de dados.',
            details: error.message,
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
            title: 'Erro ao consultar detalhes do projeto',
            message: 'Não foi possível consultar os detalhes do projeto. Verifique se o projeto existe e se a view está criada no banco de dados.',
            details: error.message,
            code: 500
        });
    }
};
