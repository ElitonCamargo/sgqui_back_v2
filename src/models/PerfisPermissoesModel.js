import pool from '../database/data.js';

// Vincular uma lista de permissões a um perfil
export const vincular = async (perfilId, permissoesIds = []) => {
  try {
    
    const values = permissoesIds.map(() => '(?, ?)').join(', ');
    const params = [];
    for (const permissaoId of permissoesIds) {
      params.push(perfilId, permissaoId);
    }

    const cmdSql = `INSERT IGNORE INTO perfis_permissoes (perfil_id, permissao_id) VALUES ${values};`;
    const [result] = await pool.execute(cmdSql, params);
    return result.affectedRows;
  } catch (error) {
    console.error('Erro a vincular permissões ao perfil:', error);
    throw error;
  }
};

// Desvincular uma permissão de um perfil pelo ID do vínculo
export const desvincular = async (vinculo_id) => {
  try {
    const cmdSql = 'DELETE FROM perfis_permissoes WHERE id = ?;';
    const [result] = await pool.execute(cmdSql, [vinculo_id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erro a desvincular permissões do perfil:', error);
    throw error;
  }
};

// Listar as permissões vinculadas a um perfil específico
export const listarPermissoesPorPerfil = async (perfilId=undefined) => {
  try {
    const WHERE = perfilId ? 'WHERE perfis.id = ?' : '';
    let cmdSql = `
      SELECT
        perfis_permissoes.id as vinculo_id,
        perfis.id as perfis_id,
        perfis.nome as perfis_nome,
        perfis.descricao as perfis_descricao,
        permissoes.id as permissoes_id,
        permissoes.recurso as permissoes_recurso,
        permissoes.metodo as permissoes_metodo,
        permissoes.rota_template as permissoes_rota_template,
        permissoes.descricao as permissoes_descricao
      FROM
        perfis
        JOIN
        perfis_permissoes ON perfis.id = perfis_permissoes.perfil_id
        JOIN
        permissoes ON perfis_permissoes.permissao_id = permissoes.id
      ${WHERE}
      ORDER BY 
        perfis.nome, permissoes.recurso, permissoes.metodo, permissoes.rota_template;
    `;
    const [dados] = await pool.execute(cmdSql, perfilId ? [perfilId] : []);
    return dados;
  } catch (error) {
    console.error('Erro ao listar permissões por perfil:', error);
    throw error;
  }
};



