import pool from '../database/data.js';

/** Monta token composto para sessão.
 * Formato: id.user_id.token
 * @param {{id:number,usuario:number,token:string}} session
 * @returns {string}
 */
export const buildToken = (session={id:0, usuario:0, token: ''})=>{
    const {id, usuario, token} = session; 
    return `${id}.${usuario}.${token}`;
};

/** Quebra token composto em partes.
 * @param {string} buildToken
 * @returns {{id:string,usuario:string,token:string}}
 */
export const deconstructToken = (buildToken)=>{
    const values = buildToken.split('.');
    return { id: values[0], usuario: values[1], token: values[2] };
};



export const getCurrentDateMySQL = () => {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}


/** Verifica se o objeto possui uma chave própria.
 * @param {object} obj
 * @param {string|symbol} key
 * @returns {boolean}
 */
export const hasOwnKey = (obj, key) => {
    return Object.prototype.hasOwnProperty.call(obj, key);
};



export const connectDatabaseStatus = async () => {
    try {
        await pool.query('SELECT 1');

        return {
            connected: true,
            state: 'connected',
            message: 'Conectado ao banco de dados',
            checkedAt: new Date().toISOString()
        };
    } catch {
        return {
            connected: false,
            state: 'disconnected',
            message: 'Desconectado do banco de dados',
            checkedAt: new Date().toISOString()
        };
    }
};