import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const consultarPorNutriente = async (nutrienteId) => {    
    try {
        const cmdSql = `SELECT 
            materia_prima.id as materia_prima_Id,
            materia_prima.nome as materia_prima_Nome,
            materia_prima.formula as materia_prima_Formula,
            materia_prima.densidade as materia_prima_Densidade,
            materia_prima.descricao as materia_prima_Descricao,
            materia_prima.cas_number as materia_prima_Cas_number,
            materia_prima.codigo as materia_prima_Codigo,
            garantia.id as garantia_Id,
            garantia.percentual as garantia_Percentual
        FROM 
            materia_prima
        JOIN
            garantia on materia_prima.id = garantia.materia_prima
        WHERE
            garantia.nutriente = ?;`;
        const [dados] = await pool.execute(cmdSql, [nutrienteId]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar garantias por nutriente',
            message: 'Não foi possível consultar as garantias pelo nutriente informado. Verifique se o nutriente existe.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarPorMateria_prima = async (materia_primaId) => {
    try {
        const cmdSql = `SELECT
            nutriente.id as nutriente_Id,
            nutriente.nome as nutriente_Nome,
            nutriente.formula as nutriente_Formula,
            garantia.id as garantia_Id,
            garantia.percentual as garantia_Percentual
        FROM
            nutriente
            JOIN
            garantia ON nutriente.id = garantia.nutriente
        WHERE
            garantia.materia_prima = ?;`;
        const [dados] = await pool.execute(cmdSql, [materia_primaId]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar garantias por matéria-prima',
            message: 'Não foi possível consultar as garantias pela matéria-prima informada. Verifique se a matéria-prima existe.',
            details: error.message,
            code: 500
        });
    }
};

export const cadastrar = async (garantia={}) => {    
    try {
        const campos = Object.keys(garantia);
        const values = Object.values(garantia);

        const params_cmdSql = campos.join(', ');
        const values_cmdSql = campos.map(() => '?').join(', ');

        const cmdSql = `INSERT INTO garantia (${params_cmdSql}) VALUES (${values_cmdSql});`;
        const [execucao] = await pool.execute(cmdSql, values);
        const lastId = execucao.insertId;

        return await consultarPorId(lastId);
    } 
    catch (error) {
        
        if (error.code === 'ER_DUP_ENTRY') {
            throw new AppError({
                title: 'Erro ao cadastrar garantia',
                message: 'Já existe uma garantia cadastrada com os dados informados.',
                details: `Conflito de unicidade ao cadastrar garantia para matéria-prima ${garantia.materia_prima ?? 'não informada'} e nutriente ${garantia.nutriente ?? 'não informado'}: ${error.message}`,
                code: 409
            });
        }

        throw new AppError({
            title: 'Erro ao cadastrar garantia',
            message: 'Não foi possível cadastrar a garantia. Verifique se o nutriente e a matéria-prima informados existem e se os dados são válidos.',
            details: error.message,
            code: 500
        });
    }
};

export const alterar = async (garantia={}) => {
    try {

        const keys = Object.keys(garantia);
        const values = Object.values(garantia);
        const setClause = keys.map(k=> `${k} = ?`).join(', ');

        const sql = `UPDATE garantia SET ${setClause}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?;`;

        const [result] = await pool.execute(sql, [...values, garantia.id]);
        if(result.affectedRows === 0){
            return null;
        }

        return await consultarPorId(garantia.id);
    }
    catch (error) {
        throw new AppError({
            title: 'Erro ao alterar garantia',
            message: 'Não foi possível alterar a garantia. Verifique se o registro existe e se os dados fornecidos são válidos.',
            details: error.message,
            code: 500
        });
    }
};

export const consultar = async () => {
    try {  
        const cmdSql = 'SELECT * FROM garantia ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar garantias',
            message: 'Não foi possível consultar a lista de garantias. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM garantia WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0] || null;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar garantia',
            message: 'Não foi possível consultar a garantia pelo ID informado. Verifique se o ID é válido.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarPorMP = async (mp_id) => {
    try {
        const cmdSql = 'SELECT * FROM garantia WHERE mp_id = ?;';
        const [dados] = await pool.execute(cmdSql, [mp_id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar garantia',
            message: 'Não foi possível consultar as garantias da matéria-prima informada. Verifique se a matéria-prima existe.',
            details: error.message,
            code: 500
        });
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM garantia WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados.affectedRows > 0;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao deletar garantia',
            message: 'Não foi possível excluir a garantia. O registro pode não existir ou possuir dependências que impedem a exclusão.',
            details: error.message,
            code: 500
        });
    }
};
