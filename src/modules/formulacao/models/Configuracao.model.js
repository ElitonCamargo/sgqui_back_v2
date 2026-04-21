import pool from '../../../core/database/data.js';

export const cadastrar = async (configuracao={key:'', value:{}}) => {    
    try {
       const { key, value } = configuracao;

       const cmdSql = 'INSERT INTO configuracao (`key`, `value`, `status`) VALUES (?,?,?);';
        
       const [rows] = await pool.execute(cmdSql, [key, JSON.stringify(value), JSON.stringify([])]);
        if(rows.affectedRows == 0){
            throw new Error('Erro ao cadastrar configuração');
        }

        return await consultarPorKey(key);
    } 
    catch (error) {
        throw error;
    }
};

export const alterar = async (configuracao={}, responsavel) => {
    try {
        const { key, value } = configuracao;

        const cmdSql = `
            UPDATE 
                configuracao SET 
                value = ?, 
                status = JSON_MERGE_PRESERVE(JSON_ARRAY(JSON_OBJECT('data_alteracao', (SELECT CURRENT_TIMESTAMP), 'id_responsavel', '${responsavel}')),status) 
            WHERE 
                \`key\` = ?;            
        `;
        
        await pool.execute(cmdSql, [JSON.stringify(value), key]);       
        return await consultarPorKey(key);
    }
    catch (error) {
        throw error;
    }
};

export const consultar = async () => {
    try {  
        const cmdSql = 'SELECT * FROM configuracao ORDER BY `key` ASC;';
        const [rows] = await pool.execute(cmdSql);
        return rows;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorKey = async (key) => {
    try {
        const cmdSql = 'SELECT * FROM configuracao WHERE `key` = ?;';
        const [rows] = await pool.execute(cmdSql, [key]);
        return rows[0];
    } 
    catch (error) {
        throw error;
    }
};

export const deletar = async (key) => {
    try {
        const cmdSql = 'DELETE FROM configuracao WHERE `key` = ?;';
        const [rows] = await pool.execute(cmdSql, [key]);
        return rows.affectedRows > 0;
    } 
    catch (error) {
        throw error;
    }
};