import pool from '../database/data.js';

export const cadastrar = async (nutriente={}) => {    
    try {
        let valores = [];
        let campos = '';
        let placeholders = '';
        
        for(const key in nutriente){
            campos += `${key},`;            
            placeholders += '?,';
            valores.push(nutriente[key]);            
        }
        campos = campos.slice(0, -1);
        placeholders = placeholders.slice(0, -1);
        const cmdSql = `INSERT INTO nutriente (${campos}) VALUES (${placeholders});`;        
        await pool.execute(cmdSql, valores);

        const [result] = await pool.execute('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados] = await pool.execute('SELECT * FROM nutriente WHERE id = ?;', [lastId]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const alterar = async (nutriente={}) => {
    try {
        let valores = [];
        let cmdSql = 'UPDATE nutriente SET ';

        for(const key in nutriente){
            valores.push(nutriente[key]);
            cmdSql += `${key} = ?, `;
        }

        cmdSql = cmdSql.replace(', id = ?,', '');
        cmdSql += 'WHERE id = ?;';
        const [execucao] = await pool.execute(cmdSql, valores);
        if(execucao.affectedRows > 0){
            const [dados] = await pool.execute('SELECT * FROM nutriente WHERE id = ?;', nutriente.id);
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
        const cmdSql = 'SELECT * FROM nutriente WHERE nome LIKE ? or formula LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`,`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM nutriente WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorNome = async (nome) => {
    try {
        const cmdSql = 'SELECT * FROM nutriente WHERE nome like ?;';
        const [dados] = await pool.execute(cmdSql, [nome]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorFormula = async (formula) => {
    try {
        const cmdSql = 'SELECT * FROM nutriente WHERE formula like ?;';
        const [dados] = await pool.execute(cmdSql, [formula]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM nutriente WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

