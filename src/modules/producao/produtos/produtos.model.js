import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const listar = async (query={projeto_id: 0, n_desenvolvimento: '', descricao: ''}) => {
    try {
        const keys = Object.keys(query).map(key => `produtos.${key}`);
        const values = Object.values(query).map(value => `%${value}%`);

        const whereClause = keys.map(key => `${key} LIKE ?`).join(' AND ');
        const sql = `
            SELECT 
                produtos.*,
                JSON_EXTRACT(JSON_EXTRACT(projeto.status, '$[0]'),'$.status') as projeto_status
            from 
                produtos
                    JOIN
                projeto ON produtos.projeto_id = projeto.id
            WHERE
                produtos.deletedAt IS NULL AND produtos.status = 'Liberado'
                ${whereClause ? ` AND ${whereClause}` : ''}
            ORDER BY updatedAt DESC;
        `;
        
        const [rows] = await pool.query(sql, values);
        return rows;
    } catch (error) {
        throw new AppError({
            title: 'Erro ao listar produtos',
            message: 'Não foi possível consultar a lista de produtos. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};
   
export const consultarPorId = async (id) => {
    try {
        const sql = `
            SELECT 
                produtos.*,
                JSON_EXTRACT(JSON_EXTRACT(projeto.status, '$[0]'),'$.status') as projeto_status
            from 
                produtos
                    JOIN
                projeto ON produtos.projeto_id = projeto.id
            WHERE
                produtos.deletedAt IS NULL AND 
                produtos.status = 'Liberado' AND
                produtos.id = ?
            ORDER BY updatedAt DESC;
        `;
        const [rows] = await pool.query(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new AppError({
            title: 'Erro ao consultar produto',
            message: 'Não foi possível consultar o produto pelo ID informado. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};
