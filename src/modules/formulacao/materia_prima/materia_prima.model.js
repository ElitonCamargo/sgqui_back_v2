import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const consultar = async (filtro = '') => {
    
    try {
        
        const cmdSql = 'SELECT * FROM materia_prima WHERE nome LIKE ?;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar matérias-primas',
            message: 'Não foi possível consultar a lista de matérias-primas. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    } 

};


export const consultarPorId = async (id) => {
    
    try {
        
        const cmdSql = 'SELECT * FROM materia_prima WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0];
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar matéria-prima',
            message: 'Não foi possível consultar a matéria-prima pelo ID informado. Verifique se o ID é válido.',
            details: error.message,
            code: 500
        });
    } 

};

export const consultarPorCodigo = async (codigo) => {
    
    try {
        
        const cmdSql = 'SELECT * FROM materia_prima WHERE codigo = ?;';
        const [dados] = await pool.execute(cmdSql, [codigo]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar matéria-prima',
            message: 'Não foi possível consultar a matéria-prima pelo código informado. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    } 

};

export const consultarPorCas_number = async (cas_number) => {
    
    try {
        
        const cmdSql = 'SELECT * FROM materia_prima WHERE cas_number = ?;';
        const [dados] = await pool.execute(cmdSql, [cas_number]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar matéria-prima',
            message: 'Não foi possível consultar a matéria-prima pelo CAS Number informado. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    } 

};

export const consultarPorFormula = async (formula) => {
    
    try {
        
        const cmdSql = 'SELECT * FROM materia_prima WHERE formula LIKE ?;';
        const [dados] = await pool.execute(cmdSql, [`%${formula}%`]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar matéria-prima',
            message: 'Não foi possível consultar a matéria-prima pela fórmula química informada. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    } 

};

export const consultarMP_precentual_nutriente = async (nutrienteID=0,percentual=0.0) => {
    
    try {
        
        // const cmdSql = 'CALL mp_precentual_nutriente(?,?);';
        const cmdSql = `
        SELECT
            materia_prima.id 		as mp_id,
            materia_prima.nome 		as mp_nome,
            materia_prima.formula 	as mp_formula,
            (${percentual} * 100) / garantia.percentual 	as percentual,
            nutriente_percentualComposicao(materia_prima.id, ((${percentual} * 100) / garantia.percentual)) as composicao
        FROM
            nutriente
            JOIN
            garantia ON nutriente.id = garantia.nutriente
            JOIN
            materia_prima ON garantia.materia_prima = materia_prima.id
        WHERE
            nutriente.id = ${nutrienteID} AND ((${percentual} * 100) / garantia.percentual) < 100
            ORDER BY percentual ASC
        `;
        const [data] = await pool.execute(cmdSql);
        return data;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar composição por nutriente',
            message: 'Não foi possível consultar as matérias-primas por nutriente e percentual. Verifique se os parâmetros informados são válidos.',
            details: error.message,
            code: 500
        });
    } 

};

export const cadastrar = async (materia_prima) => {
    
    try {        
        const campos = Object.keys(materia_prima);
        const values = Object.values(materia_prima);

        const params_cmdSql = campos.join(', ');
        const values_cmdSql = campos.map(() => '?').join(', ');

        const cmdSql = `INSERT INTO materia_prima (${params_cmdSql}) VALUES (${values_cmdSql})`;
        
        const [result] = await pool.execute(cmdSql, values);


        return await consultarPorId(result.insertId);
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao cadastrar matéria-prima',
            message: 'Não foi possível cadastrar a matéria-prima. Verifique se há duplicidade de código ou CAS Number, ou se os dados são inválidos.',
            details: error.message,
            code: 500
        });
    } 

};

export const alterar = async (materia_prima) => {
    
    try {
        const { id, ...dadosAtualizacao } = materia_prima;
        const campos = Object.keys(dadosAtualizacao);
        const valores = campos.map((campo) => dadosAtualizacao[campo]);

        const cmdSql = `UPDATE materia_prima SET ${campos.map((campo) => `${campo} = ?`).join(', ')} WHERE id = ?;`;

        valores.push(id);

        const [result] = await pool.execute(cmdSql, valores);
        if (result.affectedRows === 0) {
            return null;
        }

        return await consultarPorId(id);

    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao alterar matéria-prima',
            message: 'Não foi possível alterar a matéria-prima. Verifique se o ID existe e se os dados fornecidos são válidos.',
            details: error.message,
            code: 500
        });
    } 

};

export const deletar = async (id) => {    
    try {        
        const cmdSql = 'DELETE FROM materia_prima WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados.affectedRows > 0;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao deletar matéria-prima',
            message: 'Não foi possível excluir a matéria-prima. O registro pode não existir ou possuir garantias e etapas vinculadas que impedem a exclusão.',
            details: error.message,
            code: 500
        });
    } 

};
