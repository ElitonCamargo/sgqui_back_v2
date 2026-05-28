import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';


export const cadastrar = async ({ nome, descricao = null }) => {
  try {
    const cmdSql = 'INSERT INTO perfis (nome, descricao) VALUES (?, ?);';
    const [result] = await pool.execute(cmdSql, [nome, descricao]);
    return await listarPorId(result.insertId);
  } catch (error) {
    throw new AppError({
      title: 'Erro ao cadastrar perfil',
      message: 'Não foi possível cadastrar o perfil. Verifique se já existe um perfil com o mesmo nome ou se os dados são inválidos.',
      details: error.message,
      code: 500
    });
  }
};

export const listar = async () => {
  try {
    const cmdSql = 'SELECT * FROM perfis ORDER BY nome;';
    const [dados] = await pool.execute(cmdSql);
    return dados;
  } catch (error) {
    throw new AppError({
      title: 'Erro ao listar perfis',
      message: 'Não foi possível consultar a lista de perfis. Verifique a conectividade com o banco de dados.',
      details: error.message,
      code: 500
    });
  }
};


export const listarPorId = async (perfilId) => {
  try {
    const cmdSql = 'SELECT * FROM perfis WHERE id = ?';
    const [dados] = await pool.execute(cmdSql, [perfilId]);
    return dados[0];
  } catch (error) {
    throw new AppError({
      title: 'Erro ao consultar perfil',
      message: 'Não foi possível consultar o perfil pelo ID informado. Verifique se o ID é válido.',
      details: error.message,
      code: 500
    });
  }
};

export const listarPorNome = async (perfilNome) => {
  try {
    const cmdSql = 'SELECT * FROM perfis WHERE nome = ?';
    const [dados] = await pool.execute(cmdSql, [perfilNome]);
    return dados[0];
  } catch (error) {
    throw new AppError({
      title: 'Erro ao consultar perfil',
      message: 'Não foi possível consultar o perfil pelo nome informado. Verifique a conectividade com o banco de dados.',
      details: error.message,
      code: 500
    });
  }
};

export const alterar = async (perfilId, dados = { nome:'', descricao:''}) => {
  try {

    const keys = Object.keys(dados);
    const values = Object.values(dados);
    const setClause = keys.map(k => `${k} = ?`).join(', ');

    const sql = `
    UPDATE perfis
    SET ${setClause}, updatedAt = CURRENT_TIMESTAMP
    WHERE id = ? `;  
    
    await pool.execute(sql, [...values, perfilId]);
    return listarPorId(perfilId);

  } catch (error) {
    throw new AppError({
      title: 'Erro ao alterar perfil',
      message: 'Não foi possível alterar o perfil. Verifique se o ID é válido e se os dados fornecidos são compatíveis.',
      details: error.message,
      code: 500
    });
  }
};

export const remover = async (perfilId) => {
  try {
    const cmdSql = 'DELETE FROM perfis WHERE id = ?;';
    const [result] = await pool.execute(cmdSql, [perfilId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new AppError({
      title: 'Erro ao remover perfil',
      message: 'Não foi possível excluir o perfil. O registro pode possuir permissões ou usuários vinculados que impedem a exclusão.',
      details: error.message,
      code: 500
    });
  }
};
