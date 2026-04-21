import pool from "../../../core/database/data.js";

export const criar = async ({ usuario = 0, validade = 0, token = '' }) => {
  const cmdSql = `INSERT INTO sessoes (usuario, token, validade) VALUES (?, ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL ? HOUR));`;
  const [rows] = await pool.execute(cmdSql, [usuario, token, validade]);
  return await consultarPorId(rows.insertId);

};


const consultarPorId = async (sessoes_id) => {
  const cmdSql = "SELECT * FROM sessoes WHERE id = ?;";
  const [rows] = await pool.execute(cmdSql, [sessoes_id]);
  return (rows.length > 0) ? rows[0] : null;
};

const consultarPorSessaoEUsuario = async (sessoes_id, sessoes_usuario) => {
  const cmdSql = "SELECT * FROM sessoes WHERE id = ? and usuario = ?;";
  const [rows] = await pool.execute(cmdSql, [sessoes_id, sessoes_usuario]);
  return (rows.length > 0) ? rows[0] : null;
};

export const buscarSessao = async (sessoes_id, sessoes_usuario) => {
  const sessao = await consultarPorSessaoEUsuario(sessoes_id, sessoes_usuario);
  return sessao;
};



export const extender = async (sessoes_id, tempo_em_horas) => {
  const cmdSql = "UPDATE sessoes SET validade = DATE_ADD(validade, INTERVAL ? HOUR) WHERE id = ?;";
  const [rows] = await pool.execute(cmdSql, [tempo_em_horas, sessoes_id]);
  return rows.affectedRows > 0;
};
