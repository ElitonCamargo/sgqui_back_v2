import pool from '../database/data.js';

export const cadastrar = async (elemento={}) => {    
    try {
        let valores = [];
        let campos = '';
        let placeholders = '';
        
        for(const key in elemento){
            campos += `${key},`;            
            placeholders += '?,';
            valores.push(elemento[key]);            
        }
        campos = campos.slice(0, -1);
        placeholders = placeholders.slice(0, -1);
        const cmdSql = `INSERT INTO elemento (${campos}) VALUES (${placeholders});`;        
        await pool.execute(cmdSql, valores);

        const [result] = await pool.execute('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados] = await pool.execute('SELECT * FROM elemento WHERE id = ?;', [lastId]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const alterar = async (elemento={}) => {
    try {
        let valores = [];
        let cmdSql = 'UPDATE elemento SET ';

        for(const key in elemento){
            valores.push(elemento[key]);
            cmdSql += `${key} = ?, `;
        }

        cmdSql = cmdSql.replace(', id = ?,', '');
        cmdSql += 'WHERE id = ?;';
        const [execucao] = await pool.execute(cmdSql, valores);
        if(execucao.affectedRows > 0){
            const [dados] = await pool.execute('SELECT * FROM elemento WHERE id = ?;', elemento.id);
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
        const cmdSql = 'SELECT * FROM elemento WHERE nome LIKE ? or simbolo LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`,`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM elemento WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorNome = async (nome) => {
    try {
        const cmdSql = 'SELECT * FROM elemento WHERE nome like ?;';
        const [dados] = await pool.execute(cmdSql, [nome]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorSimbolo = async (simbolo) => {
    try {
        const cmdSql = 'SELECT * FROM elemento WHERE simbolo like ?;';
        const [dados] = await pool.execute(cmdSql, [simbolo]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM elemento WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};
