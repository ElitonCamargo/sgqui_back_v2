import pool from '../../../core/database/data.js';
import { AppError } from '../../../core/utils/AppError.js';

export const cadastrar = async (projeto = {}, loginId = 0) => {
    try {
        const camposPermitidos = [
            'codigo',
            'nome',
            'cliente',
            'descricao',
            'data_inicio',
            'data_termino',
            'densidade',
            'ph',
            'tipo',
            'natureza_fisica'
        ];

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
                message: 'Nenhum dado informado para cadastro',
                reason: 'Informe ao menos um campo válido para cadastrar o projeto.',
                code: 400
            });
        }

        const params_cmdSql = campos.join(', ');
        const values_cmdSql = placeholders.join(', ');

        const cmdSql = `
            INSERT INTO projeto (${params_cmdSql})
            VALUES (${values_cmdSql});
        `;

        const [result] = await pool.execute(cmdSql, valores);

        return await consultarPorId(result.insertId);

    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        if (error.code === 'ER_DUP_ENTRY') {
            throw new AppError({
                message: 'Projeto já cadastrado',
                reason: 'Já existe um projeto cadastrado com os dados únicos informados, como código ou outro campo com restrição de unicidade.',
                code: 409
            });
        }

        throw new AppError({
            message: 'Erro ao cadastrar projeto',
            reason: `Falha na execução do INSERT na tabela 'projeto'; verifique se os campos obrigatórios foram fornecidos e se os valores de status e aplicação são válidos. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const duplicar = async (id = 0) => {
    try {
        const cmdSql = 'CALL duplicar_projeto(?)';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados[0];
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao duplicar projeto',
            reason: `Falha na execução da stored procedure 'duplicar_projeto'; verifique se o ID do projeto origem existe e se a procedure está criada no banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const alterar = async (projeto={},loginId=0) => {
    try {
        let valores = [];
        let cmdSql = 'UPDATE projeto SET ';

        if('status' in projeto){
            cmdSql += `status = JSON_MERGE_PRESERVE(JSON_ARRAY(JSON_OBJECT('status', '${projeto['status']}', 'data_alteracao', (SELECT CURRENT_TIMESTAMP), 'id_responsavel', '${loginId}')),status), `;
            delete projeto['status'];
        }
        if('aplicacao' in projeto){
            let aplic = JSON.stringify(projeto['aplicacao'].splice(','));
            cmdSql += `aplicacao = '${aplic}', `;
            delete projeto['aplicacao'];
        }

        for(const key in projeto){
            valores.push(projeto[key]);
            cmdSql += `${key} = ?, `;
        }

        cmdSql = cmdSql.replace(', id = ?,', '');
        cmdSql += 'WHERE id = ?;';
        const [execucao] = await pool.execute(cmdSql, valores);
        if(execucao.affectedRows > 0){
            const [dados] = await pool.execute('SELECT * FROM projeto WHERE id = ?;', [projeto.id]);
            return dados;
        }
        return [];

    }
    catch (error) {
        throw new AppError({
            message: 'Erro ao alterar projeto',
            reason: `Falha na execução do UPDATE na tabela 'projeto'; verifique se o ID fornecido existe e se os campos de status e aplicação são válidos. Detalhe: ${error.message}`,
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
            message: 'Erro ao adicionar resultado do projeto',
            reason: `Falha na execução do UPDATE no campo 'resultado' da tabela 'projeto'; verifique se o ID do projeto existe e se o objeto de resultado é serealizável em JSON. Detalhe: ${error.message}`,
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
            message: 'Erro ao consultar projetos',
            reason: `Falha na execução do SELECT na tabela 'projeto' com filtro por nome e descrição; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

const filtroAvancado = (projetos=[], filtroConsulta)=>{
    let dados_essenciais = projetos.map((projeto)=>{
        let result = {
            projeto_id: projeto.id,
            materias_primas:[],
            nutrientes:[]
        }
        projeto.etapas.forEach(etapa =>{
            etapa.etapa_mp.forEach(mp=>{
                result.materias_primas.push({
                    id: mp.mp_id,
                    percentual: mp.percentual
                })
            })
        })
        projeto.nutrientes.forEach(nutr => {
            result.nutrientes.push({
                id: nutr.id,
                percentual: nutr.percentual
            })
        });
        return result;
    });
    
    const filtrar = (dados_essenciais=[] , filtroConsulta = {}) => {
        return dados_essenciais.filter(projeto => {
               const todasMateriasPrimas = filtroConsulta.materia_prima.every(filtroMateriaPrima => {
                return projeto.materias_primas.some(materiaPrima => {
                    return materiaPrima.id == filtroMateriaPrima.id && (materiaPrima.percentual >= filtroMateriaPrima.percentual[0] && materiaPrima.percentual <= filtroMateriaPrima.percentual[1]);
                });
            });    

            const todosNutrientes = filtroConsulta.nutriente.every(filtroNutriente => {
                return projeto.nutrientes.some(nutriente => {
                    return nutriente.id == filtroNutriente.id && (nutriente.percentual >= filtroNutriente.percentual[0] && nutriente.percentual <= filtroNutriente.percentual[1]);
                });
            });
            return todasMateriasPrimas && todosNutrientes;
        });
    };
    return (filtrar(dados_essenciais, filtroConsulta)).map(projeto=>projeto.projeto_id); //Retorna apenas os IDs
    // return filtrar(dados_essenciais, filtroConsulta);
}

export const consultarFiltroAvacado = async (filtro = []) => {
    try {
        let filtroConsulta = {
            materia_prima:[], 
            nutriente:[] 
        }
        filtro = JSON.parse(filtro);
        // Separar os filtros em materia_prima e nutriente
        filtro.forEach(elemento => {
            if (elemento.tipo === "nutriente") {
                filtroConsulta.nutriente.push({id: elemento.id, percentual: [elemento.percentual[0],elemento.percentual[1]]});
            } else{
                filtroConsulta.materia_prima.push({id: elemento.id, percentual: [elemento.percentual[0],elemento.percentual[1]]});
            }
        });

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
        let projetos = estruturarProjeto(dados);        
        let IDs_projeto_compativeis = filtroAvancado(projetos, filtroConsulta);
        return projetos.filter(projeto=>{
            return IDs_projeto_compativeis.some(id => id == projeto.id);
        })

    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar projetos com filtro avançado',
            reason: `Falha na execução da consulta de filtro avançado sobre a view 'projeto_detalhado'; verifique se o JSON de filtros é válido e se a view existe no banco. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const estruturarProjeto = (dados) => {
    let projetos = [];
    const addProjeto = (projeto = {}) => {
        let projetoExistente = projetos.find(p => p.id === projeto.projeto_id);
        if (!projetoExistente) {
            projetoExistente = {
                "id": projeto.projeto_id,
                "codigo": projeto.projeto_codigo,
                "nome": projeto.projeto_nome,
                "cliente": projeto.projeto_cliente,
                "descricao": projeto.projeto_descricao,
                "data_inicio": projeto.projeto_data_inicio,
                "data_termino": projeto.projeto_data_termino,
                "densidade": projeto.projeto_densidade,
                "ph": projeto.projeto_ph,
                "tipo": projeto.projeto_tipo,
                "aplicacao": projeto.projeto_aplicacao,
                "natureza_fisica": projeto.projeto_natureza_fisica,
                "status": projeto.projeto_status,
                "etapas": [],
                "nutrientes": [],
                "percentual_concluido": 0,
                "dencidade_estimada": 0,
                "createdAt": projeto.projeto_createdAt,
                "updatedAt": projeto.projeto_updatedAt

            };
            projetos.push(projetoExistente);
        }
        return projetoExistente;
    }

    const addEtapasProjeto = (etapa, projeto) => {       
        let etapaExistente = projeto.etapas.find(e => e.id === etapa.etapa_id);
        if (!etapaExistente) {
            etapaExistente = {
                "id": etapa.etapa_id,
                "nome": etapa.etapa_nome,
                "descricao": etapa.etapa_descricao,
                "ordem": etapa.etapa_ordem,
                "etapa_mp": []
            };
            if(etapaExistente.id){
                projeto.etapas.push(etapaExistente);    
            }
        }
        return etapaExistente;        
    }

    const addEtapa_MpEtapas = (etapa_mp, etapa, projeto) => {
        if (etapa_mp.etapa_mp_id) {
            let etapa_MpExistente = etapa.etapa_mp.find(e_mp => e_mp.id === etapa_mp.etapa_mp_id);
            if (!etapa_MpExistente) {
                etapa.etapa_mp.push({
                    "id": etapa_mp.etapa_mp_id,
                    "mp_id": etapa_mp.materia_prima_id,
                    "mp_codigo": etapa_mp.materia_prima_codigo,
                    "materia_prima": etapa_mp.materia_prima_nome,
                    "percentual": etapa_mp.etapa_mp_percentual,
                    "tempo_agitacao": etapa_mp.etapa_mp_tempo_agitacao,
                    "observacao": etapa_mp.etapa_mp_observacao,
                    "lote": etapa_mp.etapa_mp_lote,
                    "ordem": etapa_mp.etapa_mp_ordem
                });
                projeto.dencidade_estimada += etapa_mp.parcial_densidade || 0;
            }
        }
    }

    const addNutrientes = (nutriente, projeto) => {
        if (nutriente.nutriente_id) {
            let index_nutriente = projeto.nutrientes.findIndex(n => n.id === nutriente.nutriente_id);
            if (index_nutriente === -1) {
                projeto.nutrientes.push({
                    "id": nutriente.nutriente_id,
                    "nome": nutriente.nutriente_nome,
                    "formula": nutriente.nutriente_formula,
                    "visivel": nutriente.nutriente_visivel,
                    "percentual": nutriente.percentual_origem,
                    "origem": [{
                        "mp": nutriente.materia_prima_nome,
                        "percentual": nutriente.percentual_origem
                    }]
                });
            } else {
                projeto.nutrientes[index_nutriente].percentual += nutriente.percentual_origem;
                projeto.nutrientes[index_nutriente].origem.push({
                    "mp": nutriente.materia_prima_nome,
                    "percentual": nutriente.percentual_origem
                });
            }
        }
    };

    if (dados) {
        for (const elemento of dados) {
            let projeto_referenciado = addProjeto(elemento);
            let etapa_referenciada = addEtapasProjeto(elemento, projeto_referenciado);
            addEtapa_MpEtapas(elemento, etapa_referenciada, projeto_referenciado);
            addNutrientes(elemento, projeto_referenciado);
            // Atualizar percentual_concluido e densidade_estimada
            projeto_referenciado.percentual_concluido = projeto_referenciado.etapas.reduce((total, etapa) => 
                total + etapa.etapa_mp.reduce((subtotal, mp) => subtotal + mp.percentual, 0), 0);
        }
    }
    return projetos;
};


export const consultarPorId = async (id) => {
    try {
        await pool.execute("UPDATE projeto SET updatedAt = CURRENT_TIMESTAMP WHERE projeto.id = ?;", [id]);
        const cmdSql = 'SELECT * FROM projeto WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar projeto por ID',
            reason: `Falha na execução do SELECT na tabela 'projeto' filtrando por ID; verifique se o ID fornecido é válido e a conectividade com o banco. Detalhe: ${error.message}`,
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
            message: 'Erro ao consultar projeto por código',
            reason: `Falha na execução do SELECT na tabela 'projeto' filtrando por código; verifique a conectividade com o banco de dados. Detalhe: ${error.message}`,
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
            message: 'Erro ao consultar projetos por data',
            reason: `Falha na execução do SELECT na tabela 'projeto' filtrando por intervalo de datas; verifique se o formato de data informado é válido (YYYY-MM-DD). Detalhe: ${error.message}`,
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
            message: 'Erro ao consultar projetos por status',
            reason: `Falha na execução do SELECT na tabela 'projeto' usando JSON_EXTRACT sobre o campo 'status'; verifique se o valor de status fornecido é válido. Detalhe: ${error.message}`,
            code: 500
        });
    }
};

export const deletar = async (id) => {
    try {
        const cmdSql = 'DELETE FROM projeto WHERE id = ?;';
        const [dados] = await pool.execute(cmdSql, [id]);
        return dados;
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao deletar projeto',
            reason: `Falha na execução do DELETE na tabela 'projeto'; o registro pode não existir ou possuir etapas e resultados vinculados que impedem a exclusão. Detalhe: ${error.message}`,
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
        return estruturarProjeto(dados);
    } 
    catch (error) {
        throw new AppError({
            message: 'Erro ao consultar detalhes do projeto',
            reason: `Falha na execução do SELECT na view 'projeto_detalhado' filtrando por ID; verifique se o projeto existe e se a view está criada no banco de dados. Detalhe: ${error.message}`,
            code: 500
        });
    }
};
