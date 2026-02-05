import pool from '../database/data.js';

export const consultar = async (filtro = '') => {
    
    try {
        
        const cmdSql = 'SELECT * FROM materia_prima WHERE nome LIKE ?;';
        const [dados, meta_dados] = await pool.execute(cmdSql, [`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw error;
    } 

};


export const consultarPorId = async (id) => {
    
    try {
        
        const cmdSql = 'SELECT * FROM materia_prima WHERE id = ?;';
        const [dados, meta_dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw error;
    } 

};

export const consultarPorCodigo = async (codigo) => {
    
    try {
        
        const cmdSql = 'SELECT * FROM materia_prima WHERE codigo = ?;';
        const [dados, meta_dados] = await pool.execute(cmdSql, [codigo]);
        return dados;
    } 
    catch (error) {
        throw error;
    } 

};

export const consultarPorCas_number = async (cas_number) => {
    
    try {
        
        const cmdSql = 'SELECT * FROM materia_prima WHERE cas_number = ?;';
        const [dados, meta_dados] = await pool.execute(cmdSql, [cas_number]);
        return dados;
    } 
    catch (error) {
        throw error;
    } 

};

export const consultarPorFormula = async (formula) => {
    
    try {
        
        const cmdSql = 'SELECT * FROM materia_prima WHERE formula LIKE ?;';
        const [dados, meta_dados] = await pool.execute(cmdSql, [`%${formula}%`]);
        return dados;
    } 
    catch (error) {
        throw error;
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
        const [dados, meta_dados] = await pool.execute(cmdSql);
        return dados[0];
    } 
    catch (error) {
        throw error;
    } 

};

export const cadastrar = async (materia_prima) => {
    
    try {        
        let params_cmdSql = '';
        let values_cmdSql = '';
        let values = [];
        for(const key in materia_prima){
            values.push(materia_prima[key]);
            params_cmdSql += key+','
            values_cmdSql += '?,'
        }
        params_cmdSql = params_cmdSql.slice(0, -1);
        values_cmdSql = values_cmdSql.slice(0, -1);

        const cmdSql = 'INSERT INTO materia_prima ('+params_cmdSql+') VALUES ('+values_cmdSql+')';
        
        const [result] = await pool.execute(cmdSql, values);


        return await consultarPorId(result.insertId);
    } 
    catch (error) {
        throw error;
    } 

};

export const alterar = async (materia_prima) => {
    
    try {
        let valores = [];
        let cmdSql = 'UPDATE materia_prima SET ';
        for(const key in materia_prima){
            valores.push(materia_prima[key]);
            cmdSql += `${key} = ?, `;
        }
        cmdSql = cmdSql.replace(', id = ?,', '');
        cmdSql += 'WHERE id = ?;';
             
        await pool.execute(cmdSql, valores);

        return await consultarPorId(materia_prima.id);

    } 
    catch (error) {
        throw error;
    } 

};

export const deletar = async (id) => {    
    try {        
        const cmdSql = 'DELETE FROM materia_prima WHERE id = ?;';
        const [dados, meta_dados] = await pool.execute(cmdSql, [id]);
        return dados.affectedRows > 0;
    } 
    catch (error) {
        throw error;
    } 

};

