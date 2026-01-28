import pool from '../database/data.js';

export const listarPerfis = async () => {
  const cmdSql = 'SELECT id, nome, descricao, createdAt, updatedAt FROM perfil ORDER BY nome;';
  const [dados] = await pool.execute(cmdSql);
  return dados;
};

export const listarPerfisDoUsuario = async (usuarioId) => {
  const cmdSql = `
    SELECT p.id, p.nome, p.descricao
    FROM usuario_perfil up
    JOIN perfil p ON p.id = up.perfil_id
    WHERE up.usuario_id = ?
    ORDER BY p.nome;
  `;
  const [dados] = await pool.execute(cmdSql, [usuarioId]);
  return dados;
};

export const listarNomesPerfisDoUsuario = async (usuarioId) => {
  const cmdSql = `
    SELECT DISTINCT p.nome
    FROM usuario_perfil up
    JOIN perfil p ON p.id = up.perfil_id
    WHERE up.usuario_id = ?
    ORDER BY p.nome;
  `;
  const [dados] = await pool.execute(cmdSql, [usuarioId]);
  return dados.map((r) => r.nome);
};

export const listarPermissoesChavePorUsuario = async (usuarioId) => {
  const cmdSql = `
    SELECT DISTINCT pe.metodo, pe.rota_template
    FROM usuario_perfil up
    JOIN perfil_permissao_endpoint ppe ON ppe.perfil_id = up.perfil_id
    JOIN permissao_endpoint pe ON pe.id = ppe.permissao_endpoint_id
    WHERE up.usuario_id = ?
    ORDER BY pe.metodo, pe.rota_template;
  `;
  const [dados] = await pool.execute(cmdSql, [usuarioId]);
  return dados.map((r) => `${String(r.metodo).toUpperCase()} ${r.rota_template}`);
};

export const atribuirPerfilAoUsuario = async (usuarioId, perfilId) => {
  const cmdSql = 'INSERT IGNORE INTO usuario_perfil (usuario_id, perfil_id) VALUES (?, ?);';
  const [result] = await pool.execute(cmdSql, [usuarioId, perfilId]);
  return result.affectedRows > 0;
};

export const removerPerfilDoUsuario = async (usuarioId, perfilId) => {
  const cmdSql = 'DELETE FROM usuario_perfil WHERE usuario_id = ? AND perfil_id = ?;';
  const [result] = await pool.execute(cmdSql, [usuarioId, perfilId]);
  return result.affectedRows > 0;
};
