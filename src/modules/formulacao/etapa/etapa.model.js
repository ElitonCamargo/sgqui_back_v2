import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (etapa={}) => {    
    try {

        const campos = Object.keys(etapa).join(', ');
        const valores = Object.values(etapa);

        const placeholders = valores.map(() => '?').join(', ');

        const cmdSql = `INSERT INTO etapa (${campos}) VALUES (${placeholders});`; 

        const [result] = await pool.execute(cmdSql, valores);
        const lastId = result.insertId;

        return await consultarPorId(lastId);
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao cadastrar etapa',
            reason: `Falha na execução do INSERT na tabela 'etapas'; verifique se o projeto informado existe e se os dados fornecidos são válidos. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const alterar = async (id=0, etapa={}) => {
    try {
        const keys = Object.keys(etapa);
        const values = Object.values(etapa);
        const placeholders = keys.map(key => `${key} = ?`).join(', ');

        const cmdSql = `UPDATE etapa SET ${placeholders} WHERE id = ?;`;

        const [result] = await pool.execute(cmdSql, [...values, id]);
        return result.affectedRows > 0 ? await consultarPorId(id) : null;
    }
    catch (error) {
        throw new AppError({
            message: 'Erro ao alterar etapa',
            reason: `Falha na execução do UPDATE na tabela 'etapas'; verifique se o registro existe e se os dados fornecidos são compatíveis com o esquema. Detalhe: ${error.message}`,
            code: 500
        });
    }
};


export const alterarOrdem = async (ordemEtapa = []) => {

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const results = [];

        for (const { id, ordem } of ordemEtapa) {
            const cmdSql = `
                UPDATE etapa 
                SET ordem = ? 
                WHERE id = ?;
            `;

            const [result] = await connection.execute(cmdSql, [ordem, id]);

            if (result.affectedRows === 0) {
                throw new AppError({
                    message: 'Etapa não encontrada para reordenação',
                    reason: `Nenhuma etapa foi encontrada com o ID ${id} informado para alteração de ordem.`,
                    code: 404
                });
            }

            results.push({
                id,
                ordem
            });
        }

        await connection.commit();

        return results;

    } catch (error) {
        await connection.rollback();

        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError({
            message: 'Erro ao alterar ordem das etapas',
            reason: `Falha na execução do UPDATE para reordenar as etapas; verifique se os IDs fornecidos são válidos e se a estrutura do array está correta. Detalhe: ${error.message}`,
            code: 500
        });

    } finally {
        connection.release();
    }
};


export const consultar = async (filtro = '') => {
    try {  
        const cmdSql = 'SELECT * FROM etapa WHERE nome LIKE ? or descricao LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`,`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar etapas',
            reason: `Falha na execução do SELECT na tabela 'etapas'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM etapa WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0] || null;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar etapa por ID',
            reason: `Falha na execução do SELECT na tabela 'etapas' filtrando por ID; verifique se o ID fornecido é válido e a conectividade com o banco. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorNome = async (nome) => {
    try {
        const cmdSql = 'SELECT * FROM etapa WHERE nome like ?;';
        const [dados] = await pool.execute(cmdSql, [nome]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar etapa por nome',
            reason: `Falha na execução do SELECT na tabela 'etapas' filtrando pelo nome; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorProjeto = async (projeto_id) => {
    try {
        const cmdSql = 'SELECT * FROM etapa WHERE projeto = ?;';
        const [dados] = await pool.execute(cmdSql, [projeto_id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar etapas por projeto',
            reason: `Falha na execução do SELECT na tabela 'etapas' filtrando pelo ID do projeto; verifique se o projeto informado existe. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM etapa WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados.affectedRows > 0;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao deletar etapa',
            reason: `Falha na execução do DELETE na tabela 'etapas'; o registro pode não existir ou possuir etapas de matéria-prima vinculadas que impedem a exclusão. Detalhe: ${error.message}`,
            code: 500
        });
    }
};
