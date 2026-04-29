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
            message: 'Erro ao consultar garantias por nutriente',
            reason: `Falha na execução do SELECT na tabela 'garantia' filtrando pelo ID do nutriente; verifique se o nutriente informado existe. Detalhe: ${error.message}`,
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
            message: 'Erro ao consultar garantias por matéria-prima',
            reason: `Falha na execução do SELECT na tabela 'garantia' filtrando pelo ID da matéria-prima; verifique se a matéria-prima informada existe. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const cadastrar = async (garantia={}) => {    
    try {
        let valores = [];
        let campos = '';
        let placeholders = '';
        
        for(const key in garantia){
            campos += `${key},`;            
            placeholders += '?,';
            valores.push(garantia[key]);            
        }
        campos = campos.slice(0, -1);
        placeholders = placeholders.slice(0, -1);
        const cmdSql = `INSERT INTO garantia (${campos}) VALUES (${placeholders});`;        
        await pool.execute(cmdSql, valores);

        const [result] = await pool.execute('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados] = await pool.execute('SELECT * FROM garantia WHERE id = ?;', [lastId]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao cadastrar garantia',
            reason: `Falha na execução do INSERT na tabela 'garantia'; verifique se o nutriente e a matéria-prima informados existem e se os dados são válidos. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const alterar = async (garantia={}) => {
    try {
        let valores = [];
        let cmdSql = 'UPDATE garantia SET ';

        for(const key in garantia){
            valores.push(garantia[key]);
            cmdSql += `${key} = ?, `;
        }

        cmdSql = cmdSql.replace(', id = ?,', '');
        cmdSql += 'WHERE id = ?;';
        const [execucao] = await pool.execute(cmdSql, valores);
        if(execucao.affectedRows > 0){
            const [dados] = await pool.execute('SELECT * FROM garantia WHERE id = ?;', garantia.id);
            return dados;
        }
        return [];

    }
    catch (error) {
        throw new AppError({
            message: 'Erro ao alterar garantia',
            reason: `Falha na execução do UPDATE na tabela 'garantia'; verifique se o registro existe e se os dados fornecidos são compatíveis com o esquema. Detalhe: ${error.message}`,
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
            message: 'Erro ao consultar garantias',
            reason: `Falha na execução do SELECT na tabela 'garantia'; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM garantia WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar garantia por ID',
            reason: `Falha na execução do SELECT na tabela 'garantia' filtrando por ID; verifique se o ID fornecido é válido. Detalhe: ${error.message}`,
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
            message: 'Erro ao consultar garantia por matéria-prima',
            reason: `Falha na execução do SELECT na tabela 'garantia' filtrando pelo ID da matéria-prima (consulta MP); verifique se a matéria-prima informada existe. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM garantia WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao deletar garantia',
            reason: `Falha na execução do DELETE na tabela 'garantia'; o registro pode não existir ou possuir dependências que impedem a exclusão. Detalhe: ${error.message}`,
            code: 500
        });
    }
};
