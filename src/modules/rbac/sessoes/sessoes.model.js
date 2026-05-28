import pool from "../../../core/database/data.js";
import { AppError } from '../../../core/utils/AppError.js';

export const criar = async ({ usuario = 0, validade = 0, token = '' }) => {
  try {
    const cmdSql = `INSERT INTO sessoes (usuario, token, validade) VALUES (?, ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL ? HOUR));`;
    const [rows] = await pool.execute(cmdSql, [usuario, token, validade]);
    return await consultarPorId(rows.insertId);
  }
  catch (error) {
    throw new AppError({
      title: 'Erro ao criar sessão',
      message: 'Não foi possível criar a sessão. Verifique se o usuário informado existe e se os dados de validade são válidos.',
      details: error.message,
      code: 500
    });
  }

};


const consultarPorId = async (sessoes_id) => {
  try {
    const cmdSql = "SELECT * FROM sessoes WHERE id = ?;";
    const [rows] = await pool.execute(cmdSql, [sessoes_id]);
    return (rows.length > 0) ? rows[0] : null;
  }
  catch (error) {
    throw new AppError({
      title: 'Erro ao consultar sessão',
      message: 'Não foi possível consultar a sessão pelo ID informado. Verifique a conectividade com o banco de dados.',
      details: error.message,
      code: 500
    });
  }
};

const consultarPorSessaoEUsuario = async (sessoes_id, sessoes_usuario) => {
  try {
    const cmdSql = "SELECT * FROM sessoes WHERE id = ? and usuario = ?;";
    const [rows] = await pool.execute(cmdSql, [sessoes_id, sessoes_usuario]);
    return (rows.length > 0) ? rows[0] : null;
  }
  catch (error) {
    throw new AppError({
      title: 'Erro ao consultar sessão',
      message: 'Não foi possível consultar a sessão pelo ID e usuário informados. Verifique a conectividade com o banco de dados.',
      details: error.message,
      code: 500
    });
  }
};

export const buscarSessao = async (sessoes_id, sessoes_usuario) => {
  try {
    const sessao = await consultarPorSessaoEUsuario(sessoes_id, sessoes_usuario);
    return sessao;
  }
  catch (error) {
    throw new AppError({
      title: 'Erro ao buscar sessão',
      message: 'Não foi possível buscar a sessão ativa. Verifique se o ID da sessão e o usuário são válidos.',
      details: error.message,
      code: 500
    });
  }
};



export const extender = async (sessoes_id, tempo_em_horas) => {
  try {
    const cmdSql = "UPDATE sessoes SET validade = DATE_ADD(validade, INTERVAL ? HOUR) WHERE id = ?;";
    const [rows] = await pool.execute(cmdSql, [tempo_em_horas, sessoes_id]);
    return rows.affectedRows > 0;
  }
  catch (error) {
    throw new AppError({
      title: 'Erro ao estender sessão',
      message: 'Não foi possível estender o prazo da sessão. Verifique se o ID de sessão é válido.',
      details: error.message,
      code: 500
    });
  }
};
