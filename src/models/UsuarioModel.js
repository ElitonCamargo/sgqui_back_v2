import pool from '../database/data.js';
import bcrypt from 'bcryptjs';

export const consultar = async (filtro = '') => {    
    try {
        const cmdSql = 'SELECT id, nome, email,  avatar, status, createdAt, updatedAt FROM usuario WHERE nome LIKE ?;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT id,nome,email,avatar,status,createdAt,updatedAt FROM usuario WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0];
    } 
    catch (error) {
        throw error;
    }
};

export const consultarPorEmail = async (email) => {
    try {
        const cmdSql = 'SELECT id,nome,email,avatar,status,createdAt,updatedAt FROM usuario WHERE email = ?;';
        const [dados] = await pool.execute(cmdSql, [email]);
        return dados[0];
    } 
    catch (error) {
        throw error;
    }
};

export const login = async (email, senha)=>{
    try {
        const cmdSql = 'SELECT * FROM usuario WHERE email = ?;';
        const [result] = await pool.execute(cmdSql, [email]);
        if(result.affectedRows === 0){
            return false;
        }
        const usuario = result[0];
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida){
            return false;
        }
        usuario.senha = "";
        return usuario;
    } 
    catch (error) {
        throw error;     
    }
}

export const cadastrar = async (usuario) => {
    try {
        const keys = Object.keys(usuario);
        const values = Object.values(usuario);
        const setCollumns = keys.join(', ');
        const setClause = keys.map(k => `?`).join(', ');       
        
        
        const cmdSql = `INSERT INTO usuario (${setCollumns}) VALUES (${setClause});`;

        const senhaIndex = keys.indexOf('senha');
        values[senhaIndex] = await bcrypt.hash(values[senhaIndex], 10);


        const [result] = await pool.execute(cmdSql, [...values]);

        if(result.affectedRows === 0){
            throw new Error("Erro ao cadastrar o usuário");
        }

        return await consultarPorId(result.insertId);
    } 
    catch (error) {
        throw error;
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

        const senhaIndex = keys.indexOf('senha');
        if(senhaIndex !== -1){
            values[senhaIndex] = await bcrypt.hash(values[senhaIndex], 10);
        }
        
        await pool.execute(sql, [...values, id]);
        return consultarPorId(id);
    }
    catch (error) {
        console.error('Error in update:', error);
        throw error;
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM usuario WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados.affectedRows > 0;
    } 
    catch (error) {
        throw error;
    }
};


