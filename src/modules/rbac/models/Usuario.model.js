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
    try {
        const keys = Object.keys(usuario);
        const values = Object.values(usuario);
        const setClause = keys.map(k => `${k} = ?`).join(', ');

        const sql = `
            UPDATE usuario
            SET ${setClause}, updatedAt = CURRENT_TIMESTAMP
            WHERE id = ? `;

        await pool.execute(sql, [...values, id]);
        return consultarPorId(id);
    }
    catch (error) {
        throw new AppError('Erro ao alterar usuário', error.message, 500);
    }

};

export const consultarPorEmail = async (email) => {
    try {
        const cmdSql = 'SELECT * FROM usuario WHERE email = ?;';
        const [dados] = await pool.execute(cmdSql, [email]);
        return dados[0];
    }
    catch (error) {
        throw new AppError('Erro ao consultar usuário por email', error.message, 500);
    }

};

export const consultar = async (filtro = '') => {
    try {
        const cmdSql = 'SELECT id, nome, email,  avatar, status, createdAt, updatedAt FROM usuario WHERE nome LIKE ?;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`]);
        return dados;
    }
    catch (error) {
        throw new AppError('Erro ao consultar usuários', error.message, 500);
    }

};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM usuario WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0];
    }
    catch (error) {
        throw new AppError('Erro ao consultar usuário por ID', error.message, 500);
    }
};


export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM usuario WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados.affectedRows > 0;
    }
    catch (error) {
        throw new AppError('Erro ao deletar usuário', error.message, 500);
    }
};


