import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';


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
