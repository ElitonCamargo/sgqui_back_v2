import pool from "../database/data.js";
import crypto from "crypto";

const consultarPorId = async (sessoes_id) => {
  try {    
    const cmdSql = "SELECT * FROM sessoes WHERE id = ?;"; 
    const [rows] = await pool.execute(cmdSql, [sessoes_id]);
    return (rows.length > 0) ? rows[0] : null;
  } catch (error) {
    throw new Error("Erro ao buscar sessão por ID: " + error.message);
  } 
};

const consultarPorSessaoEUsuario = async (sessoes_id, sessoes_usuario) => {
   try {    
    const cmdSql = "SELECT * FROM sessoes WHERE id = ? and usuario = ?;";
    const [rows] = await pool.execute(cmdSql, [sessoes_id, sessoes_usuario]);
    return (rows.length > 0) ? rows[0] : null;
  } catch (error) {
    throw new Error("Erro ao buscar usuário por ID: " + error.message);
  } 
};

export const buscarSessao = async (sessoes_id, sessoes_usuario , token) => {
  try {
    const sessao = await consultarPorSessaoEUsuario(sessoes_id, sessoes_usuario);
    if (!sessao || sessao.token !== token) {
      return null;
    }
    return sessao;
  } catch (error) {
    throw error;
  }
};


export const criar = async (usuario, validade) => {  
  try {
    const token = crypto.randomBytes(64).toString("hex"); // 128 caracteres
    const cmdSql = `INSERT INTO sessoes (usuario, token, validade) VALUES (?, ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL ? HOUR));`;
    const [rows] = await pool.execute(cmdSql, [usuario, token, validade]);

    if (rows.affectedRows === 0) {
      throw new Error("Erro ao criar uma sessão para o usuário");
    }

    return await consultarPorId(rows.insertId);
    
  } catch (error) {
    throw error;
  } 
};

export const extender = async (sessoes_id, tempo_em_horas) => {
  try {
    const cmdSql = "UPDATE sessoes SET validade = DATE_ADD(validade, INTERVAL ? HOUR) WHERE id = ?;";
    const [rows] = await pool.execute(cmdSql, [tempo_em_horas, sessoes_id]);
    return rows.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};
