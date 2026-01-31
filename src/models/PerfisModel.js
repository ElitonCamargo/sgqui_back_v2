import pool from '../database/data.js';


export const cadastrar = async ({ nome, descricao = null }) => {
  try {
    const cmdSql = 'INSERT INTO perfis (nome, descricao) VALUES (?, ?);';
    const [result] = await pool.execute(cmdSql, [nome, descricao]);
    return await listarPorId(result.insertId);
  } catch (error) {
    console.error('Erro em cadastrar:', error);
    throw error;
  }
};

export const listar = async () => {
  try {
    const cmdSql = 'SELECT * FROM perfis ORDER BY nome;';
    const [dados] = await pool.execute(cmdSql);
    return dados;
  } catch (error) {
    console.error('Erro em listar:', error);
    throw error;
  }
};


export const listarPorId = async (perfilId) => {
  try {
    const cmdSql = 'SELECT * FROM perfis WHERE id = ?';
    const [dados] = await pool.execute(cmdSql, [perfilId]);
    return dados[0];
  } catch (error) {
    console.error('Erro em listar perfis por Id:', error);
    throw error;
  }
};

export const listarPorNome = async (perfilNome) => {
  try {
    const cmdSql = 'SELECT * FROM perfis WHERE nome = ?';
    const [dados] = await pool.execute(cmdSql, [perfilNome]);
    return dados[0];
  } catch (error) {
    console.error('Erro em listar perfis por nome:', error);
    throw error;
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
    console.error('Erro em alterar:', error);
    throw error;
  }
};

export const remover = async (perfilId) => {
  try {
    const cmdSql = 'DELETE FROM perfis WHERE id = ?;';
    const [result] = await pool.execute(cmdSql, [perfilId]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erro em remover:', error);
    throw error;
  }
};

