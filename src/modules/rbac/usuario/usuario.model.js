import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';


/**
 * Cadastra um novo usuário na tabela 'usuario'.
 * 
 * @param {Object} usuario - Objeto contendo os dados do usuário
 * @param {string} usuario.nome - Nome do usuário (3-100 caracteres, trim)
 * @param {string} usuario.email - Email único do usuário (válido, máx 100 caracteres, trim)
 * @param {string} usuario.senha - Senha do usuário (mín 6, máx 255 caracteres)
 * @param {string} [usuario.avatar] - URL válida do avatar (opcional, trim)
 * @param {boolean} [usuario.status] - Status do usuário (opcional)
 * 
 * @returns {Promise<Object>} Retorna os dados completos do usuário cadastrado
 * 
 * @throws {AppError} Lança erro se houver falha no INSERT ou se já existe usuário com o mesmo email
 * 
 * @example
 * const novoUsuario = await cadastrar({
 *   nome: 'João Silva',
 *   email: 'joao@example.com',
 *   senha: 'senha123',
 *   avatar: 'https://example.com/avatar.jpg',
 *   status: true
 * });
 */
export const cadastrar = async (usuario) => {
    try{
        const cmdSql = `INSERT INTO usuario SET ?`;
        const [result] = await pool.query(cmdSql, [usuario]);
        return await consultarPorId(result.insertId);
    }
    catch(error){
        console.error('Erro ao cadastrar usuário:', error);
        
        if (error.code === 'ER_DUP_ENTRY') {
            throw new AppError({
                title: 'E-mail já cadastrado',
                message: 'Já existe um usuário cadastrado com o e-mail informado.',
                details: error.message,
                code: 409
            });
        }

        throw new AppError({
            title: 'Erro ao cadastrar usuário',
            message: 'Falha ao tentar cadastrar um novo usuário.',
            details: error.message,
            code: 500
        });
    }

};

export const alterar = async (id, usuario) => {
    try {
        const keys = Object.keys(usuario);
        const values = Object.values(usuario);
        const setClause = keys.map(k => `${k} = ?`).join(', ');

        const sql = `
            UPDATE usuario
            SET ${setClause}, updatedAt = CURRENT_TIMESTAMP
            WHERE id = ? `;

        await pool.execute(sql, [...values, id]);
        return consultarPorId(id);
    }
    catch (error) {
        throw new AppError({
            title: 'Erro ao alterar usuário',
            message: 'Não foi possível alterar o usuário. Verifique se o ID existe e se os dados fornecidos são válidos.',
            details: error.message,
            code: 500
        });
    }

};

export const consultarPorEmail = async (email) => {
    try {
        const cmdSql = 'SELECT * FROM usuario WHERE email = ?;';
        const [dados] = await pool.execute(cmdSql, [email]);
        return dados[0];
    }
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar usuário',
            message: 'Não foi possível consultar o usuário pelo e-mail informado. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }

};

export const consultar = async (filtro = '') => {
    try {
        const cmdSql = 'SELECT id, nome, email,  avatar, status, createdAt, updatedAt FROM usuario WHERE nome LIKE ?;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`]);
        return dados;
    }
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar usuários',
            message: 'Não foi possível consultar a lista de usuários. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }

};

export const consultarPorId = async (id) => {
    try {
        const cmdSql = 'SELECT * FROM usuario WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0];
    }
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar usuário',
            message: 'Não foi possível consultar o usuário pelo ID informado. Verifique se o ID é válido.',
            details: error.message,
            code: 500
        });
    }
};


export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM usuario WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados.affectedRows > 0;
    }
    catch (error) {
        throw new AppError({
            title: 'Erro ao deletar usuário',
            message: 'Não foi possível excluir o usuário. O registro pode possuir dependências em outras tabelas que impedem a exclusão.',
            details: error.message,
            code: 500
        });
    }
};
