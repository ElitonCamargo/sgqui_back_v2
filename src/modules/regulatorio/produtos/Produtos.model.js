import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';


export const cadastrar = async (produto={}) => {
    try {  
       const [result] = await pool.query('INSERT INTO produtos SET ?', [produto]);
       return await consultarPorId(result.insertId);
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao cadastrar produto',
            reason: `Falha na execução do INSERT na tabela 'produtos'; verifique os dados fornecidos. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

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
                produtos.deletedAt IS NULL ${whereClause ? ` AND ${whereClause}` : ''}
            ORDER BY updatedAt DESC;
        `;
        
        const [rows] = await pool.query(sql, values);
        return rows;
    } catch (error) {
        throw new AppError({
            message: 'Erro ao listar produtos',
            reason: `Falha na execução do SELECT na tabela 'produtos'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const listarDeletados = async () => {
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
                produtos.deletedAt IS NOT NULL
            ORDER BY updatedAt DESC;
        `;
        
        const [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        throw new AppError({
            message: 'Erro ao listar produtos deletados',
            reason: `Falha na execução do SELECT na tabela 'produtos'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
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
                produtos.deletedAt IS NULL AND produtos.id = ?
            ORDER BY updatedAt DESC;
        `;
        const [rows] = await pool.query(sql, [id]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new AppError({
            message: 'Erro ao obter produto',
            reason: `Falha na execução do SELECT na tabela 'produtos'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const atualizar = async (id, produto={}) => {
    try {
        await pool.query('UPDATE produtos SET ? WHERE id = ?', [produto, id]); 
        return await consultarPorId(id);
        
    } catch (error) {
        throw new AppError({
            message: 'Erro ao atualizar produto',
            reason: `Falha na execução do UPDATE na tabela 'produtos'; verifique os dados fornecidos e a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const deletar = async (id, loginId) => {
    try {
        const [result] = await pool.query('UPDATE produtos SET deletedAt = NOW(), deletedBy = ? WHERE id = ? AND deletedAt IS NULL', [loginId, id]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new AppError({
            message: 'Erro ao deletar produto',
            reason: `Falha na execução do SOFT DELETE na tabela 'produtos'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

