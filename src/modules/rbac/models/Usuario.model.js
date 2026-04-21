import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';


export const cadastrar = async (usuario) => {
    try{
        const keys = Object.keys(usuario);
        const values = Object.values(usuario);
        const setCollumns = keys.join(', ');
        const setClause = keys.map(k => `?`).join(', ');

        const cmdSql = `INSERT INTO usuario (${setCollumns}) VALUES (${setClause});`;
        const [result] = await pool.execute(cmdSql, values);

        return await consultarPorId(result.insertId);
    }
    catch(error){
        throw new AppError('Erro ao cadastrar usuário', error.message, 500);
    }

};

export const alterar = async (id, usuario) => {
    const keys = Object.keys(usuario);
    const values = Object.values(usuario);
    const setClause = keys.map(k => `${k} = ?`).join(', ');

    const sql = `
        UPDATE usuario
        SET ${setClause}, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ? `;

    await pool.execute(sql, [...values, id]);
    return consultarPorId(id);

};

export const consultarPorEmail = async (email) => {
    const cmdSql = 'SELECT * FROM usuario WHERE email = ?;';
    const [dados] = await pool.execute(cmdSql, [email]);
    return dados[0];

};

export const consultar = async (filtro = '') => {
    const cmdSql = 'SELECT id, nome, email,  avatar, status, createdAt, updatedAt FROM usuario WHERE nome LIKE ?;';
    const [dados] = await pool.execute(cmdSql, [`%${filtro}%`]);
    return dados;

};

export const consultarPorId = async (id) => {
    const cmdSql = 'SELECT * FROM usuario WHERE id = ?;';
    const [dados] = await pool.execute(cmdSql, [id]);
    return dados[0];
};


export const deletar = async (id) => {
    const cmdSql = 'DELETE FROM usuario WHERE id = ?;';
    const [dados] = await pool.execute(cmdSql, [id]);
    return dados.affectedRows > 0;
};


