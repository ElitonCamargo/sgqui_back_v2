import pool from '../database/data.js';

export const listar = async () => {
  try {
    let cmdSql = 'SELECT * FROM permissoes ORDER BY recurso, metodo, rota_template;';
    const [dados] = await pool.execute(cmdSql);
    return dados;
  } catch (error) {
    console.error('Erro em listar permissoes:', error);
    throw error;
  }
};


export const listarPermissoesPorUsuario = async (usuarioId) => {
  try {
    const sql = `
      SELECT DISTINCT
          p.recurso, p.metodo, p.rota_template, p.descricao, p.eh_publica
      FROM (
          SELECT 
            permissoes.recurso, permissoes.metodo, permissoes.rota_template, permissoes.descricao, permissoes.eh_publica
          FROM usuario_perfis
          JOIN perfis
              ON usuario_perfis.perfil_id = perfis.id
          JOIN perfis_permissoes
              ON perfis.id = perfis_permissoes.perfil_id
          JOIN permissoes
              ON perfis_permissoes.permissao_id = permissoes.id
          WHERE usuario_perfis.usuario_id = ?

          UNION ALL

          SELECT
            recurso, metodo, rota_template, descricao, eh_publica
          FROM permissoes
          WHERE eh_publica = 1
      ) p
      ORDER BY p.metodo, p.rota_template;
    `;

    const [dados] = await pool.execute(sql, [usuarioId]);
    return dados;
  } catch (error) {
    console.error('Erro ao listar permissões do usuário:', error);
    throw error;
  }
};
