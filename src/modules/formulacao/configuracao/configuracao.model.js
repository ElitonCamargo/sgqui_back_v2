import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

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
        throw new AppError({
            title: 'Erro ao cadastrar configuração',
            message: 'Não foi possível cadastrar a configuração. Verifique se já existe uma configuração com a mesma chave ou se os dados são inválidos.',
            details: error.message,
            code: 500
        });
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
        throw new AppError({
            title: 'Erro ao alterar configuração',
            message: 'Não foi possível alterar a configuração. Verifique se a chave informada existe e se os dados são válidos.',
            details: error.message,
            code: 500
        });
    }
};

export const consultar = async () => {
    try {  
        const cmdSql = 'SELECT * FROM configuracao ORDER BY `key` ASC;';
        const [rows] = await pool.execute(cmdSql);
        return rows;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar configurações',
            message: 'Não foi possível consultar a lista de configurações. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarPorKey = async (key) => {
    try {
        const cmdSql = 'SELECT * FROM configuracao WHERE `key` = ?;';
        const [rows] = await pool.execute(cmdSql, [key]);
        return rows[0];
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar configuração',
            message: 'Não foi possível consultar a configuração pela chave informada. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const deletar = async (key) => {
    try {
        const cmdSql = 'DELETE FROM configuracao WHERE `key` = ?;';
        const [rows] = await pool.execute(cmdSql, [key]);
        return rows.affectedRows > 0;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao deletar configuração',
            message: 'Não foi possível excluir a configuração. A chave pode não existir ou possuir dependências que impedem a exclusão.',
            details: error.message,
            code: 500
        });
    }
};
