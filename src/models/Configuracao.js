import pool from '../database/data.js';

export const cadastrar = async (configuracao={}) => {    
    try {
        let valores = [];
        let campos = '';
        let placeholders = '';
        
        for(const key in configuracao){
            campos += `${key},`;            
            placeholders += '?,';
            valores.push(configuracao[key]);            
        }
        campos = campos.slice(0, -1);
        placeholders = placeholders.slice(0, -1);
        const cmdSql = `INSERT INTO configuracao (${campos}) VALUES (${placeholders});`;        
        await pool.execute(cmdSql, valores);

        const [result] = await pool.execute('SELECT LAST_INSERT_ID() as lastId');
        const lastId = result[0].lastId;

        const [dados] = await pool.execute('SELECT * FROM configuracao WHERE id = ?;', [lastId]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const alterar = async (configuracao={}) => {
    try {
        console.log(configuracao);
        let valores = [];
        let cmdSql = 'UPDATE configuracao SET ';

        for(const key in configuracao){
            valores.push(configuracao[key]);
            cmdSql += `${key} = ?, `;
        }

        cmdSql = cmdSql.replace(', id = ?,', '');
        cmdSql += 'WHERE id = ?;';
        const [execucao] = await pool.execute(cmdSql, valores);
        if(execucao.affectedRows > 0){
            const [dados] = await pool.execute('SELECT * FROM configuracao WHERE id = ?;', configuracao.id);
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
        const cmdSql = 'SELECT * FROM configuracao WHERE conteudo LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM configuracao WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorConteudo = async (conteudo) => {
    try {
        const cmdSql = 'SELECT * FROM configuracao WHERE conteudo like ?;';
        const [dados] = await pool.execute(cmdSql, [conteudo]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM configuracao WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};