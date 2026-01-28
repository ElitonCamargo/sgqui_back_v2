import pool from '../database/data.js';

export const cadastrar = async (etapa={}) => {    
    try {
        let valores = [];
        let campos = '';
        let placeholders = '';
        
        for(const key in etapa){
            campos += `${key},`;            
            placeholders += '?,';
            valores.push(etapa[key]);            
        }
        campos = campos.slice(0, -1);
        placeholders = placeholders.slice(0, -1);
        const cmdSql = `INSERT INTO etapa (${campos}) VALUES (${placeholders});`;        
        await pool.execute(cmdSql, valores);

        const [result] = await pool.execute('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados] = await pool.execute('SELECT * FROM etapa WHERE id = ?;', [lastId]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const alterar = async (etapa={}) => {
    try {
        let valores = [];
        let cmdSql = 'UPDATE etapa SET ';

        for(const key in etapa){
            valores.push(etapa[key]);
            cmdSql += `${key} = ?, `;
        }

        cmdSql = cmdSql.replace(', id = ?,', '');
        cmdSql += 'WHERE id = ?;';
        const [execucao] = await pool.execute(cmdSql, valores);
        if(execucao.affectedRows > 0){
            const [dados] = await pool.execute('SELECT * FROM etapa WHERE id = ?;', etapa.id);
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
        const cmdSql = 'SELECT * FROM etapa WHERE nome LIKE ? or descricao LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`,`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM etapa WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorNome = async (nome) => {
    try {
        const cmdSql = 'SELECT * FROM etapa WHERE nome like ?;';
        const [dados] = await pool.execute(cmdSql, [nome]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorProjeto = async (projeto_id) => {
    try {
        const cmdSql = 'SELECT * FROM etapa WHERE projeto_id = ?;';
        const [dados] = await pool.execute(cmdSql, [projeto_id]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM etapa WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};
