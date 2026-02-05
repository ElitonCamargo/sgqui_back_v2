import pool from '../database/data.js';


export const consultarPorId = async (id) => {
  try {
    const cmdSql = 'SELECT * FROM usuario_perfis WHERE id = ?;';
    const [rows] = await pool.execute(cmdSql, [id]);
    return rows[0];
  } catch (error) {
    console.error('Erro ao consultar vínculo por ID:', error);
    throw error;
  }
};

// Vincular um perfil com permissoões de acesso ja definidas ao usuario
export const vincular = async (usuarioId, perfilId) => {
  try {
    const cmdSql = 'INSERT IGNORE INTO usuario_perfis (usuario_id, perfil_id) VALUES (?, ?);';
    const [result] = await pool.execute(cmdSql, [usuarioId, perfilId]);
    return await consultarPorId(result.insertId);
  } catch (error) {
    console.error('Erro ao vincular perfil ao usuário:', error);
    throw error;
  }
};

// Desvincular um perfil de um usuário
export const desvincular = async (vinculoID) => {
  try {
    const cmdSql = 'DELETE FROM usuario_perfis WHERE id = ?;';
    const [result] = await pool.execute(cmdSql, [vinculoID]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erro em removerPerfilDoUsuario:', error);
    throw error;
  }
};

// Listar todos os perfis e quais usuários estão vinculados a eles
export const listar = async () => {
  try {
    const cmdSql = `
        SELECT
            up.id as vinculo_id,
            p.id as perfil_id,
            p.nome as perfil_nome,
            p.descricao as perfil_descricao,
            u.id as usuario_id, 
            u.nome as usuario_nome, 
            u.email as usuario_email, 
            u.avatar as usuario_avatar, 
            u.status as usuario_status     
        FROM
            usuario as u
            JOIN
            usuario_perfis as up ON u.id = up.usuario_id
            JOIN
            perfis as p ON up.perfil_id = p.id
            ORDER BY p.nome, u.nome; 
    `;
    const [dados] = await pool.execute(cmdSql);
    return dados;
  }
  catch (error) {
    console.error('Erro em listar os perfis por usuário:', error);
    throw error;
  }
};

// Listar os perfis vinculados a um usuário específico
export const listarPerfisPorUsuario = async (usuarioId) => {
  try {
    const cmdSql = `
      SELECT up.id as vinculo_id, p.id, p.nome, p.descricao
      FROM usuario_perfis up
      JOIN perfis p ON p.id = up.perfil_id
      WHERE up.usuario_id = ?
      ORDER BY p.nome;
    `;
    const [dados] = await pool.execute(cmdSql, [usuarioId]);
    return dados;
  } catch (error) {
    console.error('Erro em listar os perfis por usuário:', error);
    throw error;
  }
};

// Listar os usuários vinculados a um perfil específico
export const listarUsuariosPorPerfil = async (perfilId) => {
  try {
    const cmdSql = `
      SELECT up.id as vinculo_id, u.id, u.nome, u.email, u.avatar, u.status
      FROM usuario_perfis up
      JOIN usuario u ON u.id = up.usuario_id
      WHERE up.perfil_id = ?
      ORDER BY u.nome;
    `;
    const [dados] = await pool.execute(cmdSql, [perfilId]);
    return dados;
  } catch (error) {
    console.error('Erro em listarUsuariosPorPerfil:', error);
    throw error;
  }
};