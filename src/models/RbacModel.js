import pool from '../database/data.js';

export const listarPerfis = async () => {
  try {
    const cmdSql = 'SELECT id, nome, descricao, createdAt, updatedAt FROM perfil ORDER BY nome;';
    const [dados] = await pool.execute(cmdSql);
    return dados;
  } catch (error) {
    console.error('Erro em listarPerfis:', error);
    throw error;
  }
};

export const listarPerfisPorId = async (id) => {
  try {
    const cmdSql = 'SELECT id, nome, descricao, createdAt, updatedAt FROM perfil WHERE id = ? ORDER BY nome;';
    const [dados] = await pool.execute(cmdSql, [id]);
    return dados[0];
  } catch (error) {
    console.error('Erro em listarPerfisPorId:', error);
    throw error;
  }
};

export const listarPerfisDoUsuario = async (usuarioId) => {
  try {
    const cmdSql = `
      SELECT p.id, p.nome, p.descricao
      FROM usuario_perfil up
      JOIN perfil p ON p.id = up.perfil_id
      WHERE up.usuario_id = ?
      ORDER BY p.nome;
    `;
    const [dados] = await pool.execute(cmdSql, [usuarioId]);
    return dados;
  } catch (error) {
    console.error('Erro em listarPerfisDoUsuario:', error);
    throw error;
  }
};

export const listarNomesPerfisDoUsuario = async (usuarioId) => {
  try {
    const cmdSql = `
      SELECT DISTINCT p.nome
      FROM usuario_perfil up
      JOIN perfil p ON p.id = up.perfil_id
      WHERE up.usuario_id = ?
      ORDER BY p.nome;
    `;
    const [dados] = await pool.execute(cmdSql, [usuarioId]);
    return dados.map((r) => r.nome);
  } catch (error) {
    console.error('Erro em listarNomesPerfisDoUsuario:', error);
    throw error;
  }
};

export const listarPermissoesChavePorUsuario = async (usuarioId) => {
  try {
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
  } catch (error) {
    console.error('Erro em listarPermissoesChavePorUsuario:', error);
    throw error;
  }
};

export const atribuirPerfilAoUsuario = async (usuarioId, perfilId) => {
  try {
    const cmdSql = 'INSERT IGNORE INTO usuario_perfil (usuario_id, perfil_id) VALUES (?, ?);';
    const [result] = await pool.execute(cmdSql, [usuarioId, perfilId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erro em atribuirPerfilAoUsuario:', error);
    throw error;
  }
};

export const removerPerfilDoUsuario = async (usuarioId, perfilId) => {
  try {
    const cmdSql = 'DELETE FROM usuario_perfil WHERE usuario_id = ? AND perfil_id = ?;';
    const [result] = await pool.execute(cmdSql, [usuarioId, perfilId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erro em removerPerfilDoUsuario:', error);
    throw error;
  }
};

export const criarPerfil = async ({ nome, descricao = null }) => {
  try {
    const cmdSql = 'INSERT INTO perfil (nome, descricao) VALUES (?, ?);';
    const [result] = await pool.execute(cmdSql, [nome, descricao]);
    return result.insertId;
  } catch (error) {
    console.error('Erro em criarPerfil:', error);
    throw error;
  }
};

export const atualizarPerfil = async (perfilId, { nome, descricao = null }) => {
  try {
    const cmdSql = 'UPDATE perfil SET nome = ?, descricao = ? WHERE id = ?;';
    await pool.execute(cmdSql, [nome, descricao, perfilId]);
    return await listarPerfisPorId(perfilId);
  } catch (error) {
    console.error('Erro em atualizarPerfil:', error);
    throw error;
  }
};

export const removerPerfil = async (perfilId) => {
  try {
    const cmdSql = 'DELETE FROM perfil WHERE id = ?;';
    const [result] = await pool.execute(cmdSql, [perfilId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erro em removerPerfil:', error);
    throw error;
  }
};

export const listarPermissoes = async () => {
  try {
    let cmdSql = 'SELECT id, recurso, metodo, rota_template, descricao, createdAt, updatedAt FROM permissao_endpoint ORDER BY recurso, metodo, rota_template;';
    const [dados] = await pool.execute(cmdSql);
    return dados;
  } catch (error) {
    console.error('Erro em listarPermissoes:', error);
    throw error;
  }
};

export const listarRecursos = async () => {
  try {
    const cmdSql = 'SELECT DISTINCT recurso FROM permissao_endpoint ORDER BY recurso;';
    const [dados] = await pool.execute(cmdSql);
    return dados.map((r) => r.recurso);
  } catch (error) {
    console.error('Erro em listarRecursos:', error);
    throw error;
  }
};

export const listarPermissoesDoPerfil = async (perfilId) => {
  try {
    const cmdSql = `
      SELECT pe.id, pe.recurso, pe.metodo, pe.rota_template, pe.descricao
      FROM perfil_permissao_endpoint ppe
      JOIN permissao_endpoint pe ON pe.id = ppe.permissao_endpoint_id
      WHERE ppe.perfil_id = ?
      ORDER BY pe.recurso, pe.metodo, pe.rota_template;
    `;
    const [dados] = await pool.execute(cmdSql, [perfilId]);
    return dados;
  } catch (error) {
    console.error('Erro em listarPermissoesDoPerfil:', error);
    throw error;
  }
};

export const vincularPermissoesAoPerfil = async (perfilId, permissaoEndpointIds = []) => {
  try {
    if (!Array.isArray(permissaoEndpointIds) || permissaoEndpointIds.length === 0) {
      return { vinculadas: 0 };
    }

    const values = permissaoEndpointIds.map(() => '(?, ?)').join(', ');
    const params = [];
    for (const permissaoId of permissaoEndpointIds) {
      params.push(perfilId, permissaoId);
    }

    const cmdSql = `INSERT IGNORE INTO perfil_permissao_endpoint (perfil_id, permissao_endpoint_id) VALUES ${values};`;
    const [result] = await pool.execute(cmdSql, params);
    return { vinculadas: result.affectedRows ?? 0 };
  } catch (error) {
    console.error('Erro em vincularPermissoesAoPerfil:', error);
    throw error;
  }
};

export const desvincularPermissaoDoPerfil = async (perfilId, permissaoEndpointId) => {
  try {
    const cmdSql = 'DELETE FROM perfil_permissao_endpoint WHERE perfil_id = ? AND permissao_endpoint_id = ?;';
    const [result] = await pool.execute(cmdSql, [perfilId, permissaoEndpointId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erro em desvincularPermissaoDoPerfil:', error);
    throw error;
  }
};
