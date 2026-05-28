import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

// Vincular uma lista de permissões a um perfil
export const vincular = async (perfilId, permissoesIds = []) => {
  try {    
    // Apagar vinculos antigos antes de revincular
    const cmdDelete = `DELETE FROM perfis_permissoes WHERE perfil_id = ?;`;
    await pool.execute(cmdDelete, [perfilId]);

    const values = permissoesIds.map(() => '(?, ?)').join(', ');
    const params = [];
    for (const permissaoId of permissoesIds) {
      params.push(perfilId, permissaoId);
    }

    const cmdSql = `INSERT IGNORE INTO perfis_permissoes (perfil_id, permissao_id) VALUES ${values};`;
    const [result] = await pool.execute(cmdSql, params);
    return result.affectedRows;
  } catch (error) {
    throw new AppError({
      title: 'Erro ao vincular permissões ao perfil',
      message: 'Não foi possível sincronizar as permissões do perfil. Verifique se o perfil e as permissões informadas existem.',
      details: error.message,
      code: 500
    });
  }
};

// Listar as permissões vinculadas a um perfil específico
export const listarVinculos = async (perfilId) => {
  try {
    let cmdSql = `
      SELECT    
        permissoes.*
      FROM
        perfis_permissoes
        JOIN
        permissoes ON perfis_permissoes.permissao_id = permissoes.id
      WHERE perfis_permissoes.perfil_id = ?
      ORDER BY 
        permissoes.recurso, permissoes.metodo, permissoes.rota_template;
    `;
    const [dados] = await pool.execute(cmdSql, [perfilId]);
    return dados;
  } catch (error) {
    throw new AppError({
      title: 'Erro ao listar permissões do perfil',
      message: 'Não foi possível consultar as permissões vinculadas ao perfil informado. Verifique a conectividade com o banco de dados.',
      details: error.message,
      code: 500
    });
  }
};


export const permissoesPerfilAcessos = async (perfilId) => {
  try {
    const sql = `
      SELECT DISTINCT
        p.*
      FROM (
          SELECT 
            permissoes.*
          FROM 
            perfis_permissoes
              JOIN 
            permissoes ON perfis_permissoes.permissao_id = permissoes.id
          WHERE 
            perfis_permissoes.perfil_id = ?

          UNION ALL

          SELECT
            permissoes.*
          FROM permissoes
          WHERE eh_publica = 1
      ) p
      ORDER BY p.metodo, p.rota_template;
    `;

    const [dados] = await pool.execute(sql, [perfilId]);
    return dados;
  } catch (error) {
    throw new AppError({
      title: 'Erro ao consultar acessos do perfil',
      message: 'Não foi possível consultar as permissões de acesso do perfil informado. Verifique a conectividade com o banco de dados.',
      details: error.message,
      code: 500
    });
  }
};
