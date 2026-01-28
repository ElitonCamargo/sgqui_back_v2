import pool from '../database/data.js';

export const cadastrar = async (materia_prima={}) => {    
    try {
        let valores = [];
        let campos = '';
        let placeholders = '';
        
        for(const key in materia_prima){
            campos += `${key},`;            
            placeholders += '?,';
            valores.push(materia_prima[key]);            
        }
        campos = campos.slice(0, -1);
        placeholders = placeholders.slice(0, -1);
        const cmdSql = `INSERT INTO materia_prima (${campos}) VALUES (${placeholders});`;        
        await pool.execute(cmdSql, valores);

        const [result] = await pool.execute('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados] = await pool.execute('SELECT * FROM materia_prima WHERE id = ?;', [lastId]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const alterar = async (materia_prima={}) => {
    try {
        let valores = [];
        let cmdSql = 'UPDATE materia_prima SET ';

        for(const key in materia_prima){
            valores.push(materia_prima[key]);
            cmdSql += `${key} = ?, `;
        }

        cmdSql = cmdSql.replace(', id = ?,', '');
        cmdSql += 'WHERE id = ?;';
        const [execucao] = await pool.execute(cmdSql, valores);
        if(execucao.affectedRows > 0){
            const [dados] = await pool.execute('SELECT * FROM materia_prima WHERE id = ?;', materia_prima.id);
            return dados;
        }
        return [];

    }
    catch (error) {
        throw error;
    }
};

export const consultar = async (filtro = '') => {
    try {  
        const cmdSql = 'SELECT * FROM materia_prima WHERE nome LIKE ? or codigo LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`,`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM materia_prima WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorNome = async (nome) => {
    try {
        const cmdSql = 'SELECT * FROM materia_prima WHERE nome like ?;';
        const [dados] = await pool.execute(cmdSql, [nome]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorCodigo = async (codigo) => {
    try {
        const cmdSql = 'SELECT * FROM materia_prima WHERE codigo like ?;';
        const [dados] = await pool.execute(cmdSql, [codigo]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM materia_prima WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

