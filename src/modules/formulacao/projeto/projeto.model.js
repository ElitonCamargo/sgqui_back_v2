import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (projeto = {}, loginId = 0) => {
    try {
        const camposPermitidos = ['codigo','nome','cliente','descricao','data_inicio','data_termino','densidade','ph','tipo','natureza_fisica'];

        const campos = [];
        const placeholders = [];
        const valores = [];

        const possuiCampo = (obj, campo) =>
            Object.prototype.hasOwnProperty.call(obj, campo);

        if (possuiCampo(projeto, 'status')) {
            campos.push('status');

            placeholders.push(`
                JSON_ARRAY(
                    JSON_OBJECT(
                        'status', ?,
                        'data_alteracao', CURRENT_TIMESTAMP,
                        'id_responsavel', ?
                    )
                )
            `);

            valores.push(projeto.status, loginId);
        }

        if (possuiCampo(projeto, 'aplicacao')) {
            campos.push('aplicacao');
            placeholders.push('?');
            valores.push(JSON.stringify(projeto.aplicacao));
        }

        for (const campo of camposPermitidos) {
            if (possuiCampo(projeto, campo)) {
                campos.push(campo);
                placeholders.push('?');
                valores.push(projeto[campo]);
            }
        }

        if (campos.length === 0) {
            throw new AppError({
                title: 'Erro ao cadastrar projeto',
                message: 'Informe ao menos um campo válido para cadastrar o projeto.',
                details: `Payload sem campos permitidos para cadastro de projeto. Campos recebidos: ${Object.keys(projeto).join(', ')}.`,
                code: 400
            });
        }

        const params_cmdSql = campos.join(', ');
        const values_cmdSql = placeholders.join(', ');

        const cmdSql = `INSERT INTO projeto (${params_cmdSql}) VALUES (${values_cmdSql});`;

        const [result] = await pool.execute(cmdSql, valores);

        return await consultarPorId(result.insertId);

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        if (error.code === 'ER_DUP_ENTRY') {
            throw new AppError({
                title: 'Erro ao cadastrar projeto',
                message: 'Já existe um projeto cadastrado com os dados informados.',
                details: error.message,
                code: 409
            });
        }

        throw new AppError({
            title: 'Erro ao cadastrar projeto',
            message: 'Não foi possível cadastrar o projeto. Verifique se todos os campos obrigatórios foram fornecidos e se os valores de status e aplicação são válidos.',
            details: error.message,
            code: 500
        });
    }
};

export const duplicar = async (id = 0, loginId = 0) => {
    try {
        const cmdSql = 'CALL duplicar_projeto(?,?)';
        const [dados] = await pool.execute(cmdSql, [id, loginId]);
        return dados[0].length > 0 ? dados[0][0] : null;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao duplicar projeto',
            message: 'Não foi possível duplicar o projeto. Verifique se o projeto origem existe e se a procedure está disponível no banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const alterar = async (id=0,projeto={},loginId=0) => {
    try {
        const campos = [];
        const values = [];

        
        if('status' in projeto){
            campos.push(`status = JSON_MERGE_PRESERVE(JSON_ARRAY(JSON_OBJECT('status', ?, 'data_alteracao', (SELECT CURRENT_TIMESTAMP), 'id_responsavel', ?)),status)`);
            values.push(projeto['status'], loginId);
            delete projeto.status;
        }
        if('aplicacao' in projeto){
            let aplic = JSON.stringify(projeto['aplicacao'].splice(','));
            campos.push(`aplicacao = ?, `);
            values.push(aplic);
            delete projeto.aplicacao;
        }

        campos.push(...Object.keys(projeto).map(campo => `${campo} = ?`));
        values.push(...Object.values(projeto));

        const cmdSql = 'UPDATE projeto SET ' + campos.join(', ') + ' WHERE id = ?;';
        await pool.execute(cmdSql, [...values, id]);
        return await consultarPorId(id);
    }
    catch (error) {
        throw new AppError({
            title: 'Erro ao alterar projeto',
            message: 'Não foi possível atualizar os dados do projeto. Verifique se o ID existe e se os campos de status e aplicação são válidos.',
            details: error.message,
            code: 500
        });
    }
};

export const addResultado = async (projetoId, resultado={}) => {
    try {
        let cmdSql = 'UPDATE projeto SET resultado = ? WHERE id = ?;';

        const resultadoJson = JSON.stringify(resultado);
        await pool.execute(cmdSql, [resultadoJson, projetoId]);
        const [dados] = await pool.execute('SELECT resultado FROM projeto WHERE id = ?;', [projetoId]);
        return dados[0].resultado;
    }
    catch (error) {
        throw new AppError({
            title: 'Erro ao adicionar resultado',
            message: 'Não foi possível salvar o resultado do projeto. Verifique se o ID do projeto existe e se os dados do resultado são válidos.',
            details: error.message,
            code: 500
        });
    }
};

export const consultar = async (filtro = '') => {
    try {  
        const cmdSql = 'SELECT * FROM projeto WHERE nome LIKE ? or descricao LIKE ? ORDER BY updatedAt DESC;';
        const [dados] = await pool.execute(cmdSql, [`%${filtro}%`,`%${filtro}%`]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar projetos',
            message: 'Não foi possível consultar a lista de projetos. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarFiltroAvancado = async (filtroConsulta) => {
    try {
        
        let cmdSelectMp = '';
        let cmdSelectNut = '';

        // Construir a parte do SQL para materia_prima
        if (filtroConsulta.materia_prima.length > 0) {
            cmdSelectMp = "SELECT DISTINCT projeto_id FROM projeto_detalhado WHERE ";
            cmdSelectMp += filtroConsulta.materia_prima.map(elemento =>
                `(materia_prima_id = ${elemento.id} AND etapa_mp_percentual BETWEEN ${elemento.percentual[0]} AND ${elemento.percentual[1]})`
            ).join(' OR ');
        }

        // Construir a parte do SQL para nutriente
        if (filtroConsulta.nutriente.length > 0) {
            cmdSelectNut = "SELECT DISTINCT projeto_id FROM percentual_nutriente_projeto WHERE ";
            cmdSelectNut += filtroConsulta.nutriente.map(elemento =>
                `(nutriente_id = ${elemento.id} AND percentual_nutriente BETWEEN ${elemento.percentual[0]} AND ${elemento.percentual[1]})`
            ).join(' OR ');
        }

        // Construir o comando SQL final
        const cmdSql = `
            SELECT projeto_detalhado.* 
            FROM projeto_detalhado
            INNER JOIN (
                ${cmdSelectMp ? cmdSelectMp : ''} 
                ${cmdSelectMp && cmdSelectNut ? ' UNION ' : ''} 
                ${cmdSelectNut ? cmdSelectNut : ''} 
            ) AS pnp
            ON projeto_detalhado.projeto_id = pnp.projeto_id;
        `;

        
        // Executar a consulta no banco de dados
        const [dados] = await pool.execute(cmdSql.trim());
        return dados.length > 0 ? dados : [];
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro no filtro avançado',
            message: 'Não foi possível executar a consulta de filtro avançado. Verifique se os parâmetros de filtro são válidos.',
            details: error.message,
            code: 500
        });
    }
};


export const consultarPorId = async (id) => {
    try {
        await pool.execute("UPDATE projeto SET updatedAt = CURRENT_TIMESTAMP WHERE projeto.id = ?;", [id]);
        const cmdSql = 'SELECT * FROM projeto WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados.length > 0 ? dados[0] : null;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar projeto',
            message: 'Não foi possível consultar o projeto pelo ID informado. Verifique se o ID é válido.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarPorCodigo = async (codigo) => {
    try {
        const cmdSql = 'SELECT * FROM projeto WHERE codigo like ?;';
        const [dados] = await pool.execute(cmdSql, [codigo]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar projeto',
            message: 'Não foi possível consultar o projeto pelo código informado. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarPorData = async (data_inicio="", data_termino="") => {
    try {
        const cmdSql = `
        SELECT * FROM projeto
        WHERE (data_inicio BETWEEN '${data_inicio}' AND '${data_termino}')
           OR (data_termino BETWEEN '${data_inicio}' AND '${data_termino}')
           OR (data_inicio <= '${data_inicio}' AND data_termino >= '${data_termino}')
        ORDER BY updatedAt DESC
        ;
        `;
        const [dados] = await pool.execute(cmdSql);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar projetos por data',
            message: 'Não foi possível consultar os projetos no período informado. Verifique se o formato das datas está correto (AAAA-MM-DD).',
            details: error.message,
            code: 500
        });
    }
};


export const consultarPorStatus = async (status='') => {
    try {
        const cmdSql = `SELECT * FROM projeto WHERE JSON_UNQUOTE(JSON_EXTRACT(status, '$[0].status')) LIKE ? ORDER BY updatedAt DESC;`; 
        const [dados] = await pool.execute(cmdSql,[status]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar projetos por status',
            message: 'Não foi possível consultar os projetos com o status informado. Verifique se o valor do status é válido.',
            details: error.message,
            code: 500
        });
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM projeto WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados.affectedRows > 0;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao deletar projeto',
            message: 'Não foi possível excluir o projeto. O registro pode não existir ou possuir etapas e resultados vinculados que impedem a exclusão.',
            details: error.message,
            code: 500
        });
    }
};

export const auditarProjetoDelete = async (projeto = {}, loginId = 0) => {

    delete projeto.dencidade_estimada;
    delete projeto.updatedAt;
    try {
        const keys = Object.keys(projeto);
        const values = Object.values(projeto);
        const cmdSql = `INSERT INTO projetos_deletados (${keys.join(', ')}, responsavel_delecao) VALUES (${keys.map(() => '?').join(', ')}, ?);`;
        await pool.execute(cmdSql, [ ...values, loginId]);

    } catch (error) {
        throw new AppError({
            title: 'Erro ao auditar exclusão de projeto',
            message: 'Não foi possível registrar a auditoria de exclusão do projeto. Verifique se a tabela de auditoria existe no banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

export const consultarDeletados = async () => {
    try {
        const cmdSql = 'SELECT * FROM projetos_deletados ORDER BY createdAt DESC;';
        const [dados] = await pool.execute(cmdSql);
        return dados;
    }
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar projetos deletados',
            message: 'Não foi possível consultar o histórico de projetos excluídos. Verifique a conectividade com o banco de dados.',
            details: error.message,
            code: 500
        });
    }
};

// *************** Consultas Entre vária entidades ***********************

export const consultaDetalhada = async (id) => {
    try { 
        await pool.execute("UPDATE projeto SET updatedAt = CURRENT_TIMESTAMP WHERE projeto.id = ?;", [id]);
        const cmdSql = 'SELECT * FROM projeto_detalhado WHERE projeto_id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            title: 'Erro ao consultar detalhes do projeto',
            message: 'Não foi possível obter os detalhes do projeto. Verifique se o projeto existe e se a view está disponível no banco de dados.',
            details: error.message,
            code: 500
        });
    }
};
