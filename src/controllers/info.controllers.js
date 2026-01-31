import { listarTodas } from '../services/permissoesService.js';
import * as responses from '../utils/responses.js';

export const obterInfoSistema = async (req, res)=>{
    const rootDomain = req.protocol + '://' + req.get('host');
    const data ={
        status_server: '(DEV - v2) ok - API SGQUI v2.5',
        dominio_raiz : rootDomain,
        atualização: '26/01/2026 - 21:00',
        rotas:[
            `${rootDomain}/usuario/login`,
            `${rootDomain}/usuario`,
            `${rootDomain}/elemento`,
            `${rootDomain}/materia_prima`,
            `${rootDomain}/nutriente`,
            `${rootDomain}/garantia`,
            `${rootDomain}/projeto`,
            `${rootDomain}/etepa`,
            `${rootDomain}/etepa_mp`,
            `${rootDomain}/configuracao`,
            `${rootDomain}/upload`
        ]
    };
    return responses.success(res, { data });
}

export const endpoints = async (req, res)=>{
    const endpoints = await listarTodas();
    return responses.success(res, { message: 'Lista de endpoints', data: endpoints });
}