import * as Etapa_MP from '../models/Etapa_MP.js';
import * as responses from '../utils/responses.js';

export const cadastrar = async (req, res) => {
    try {
        const etapa_mp = req.body;
        
        const novoEtapa_MP = await Etapa_MP.cadastrar(etapa_mp);
        
        return responses.created(res, { data: novoEtapa_MP });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const alterar = async (req, res) => {
    try {
        let etapa_mp = req.body;
        
        etapa_mp.id = req.params.id;
        
        const etapa_mpAlterada = await Etapa_MP.alterar(etapa_mp);
        
        return responses.success(res, { data: etapa_mpAlterada });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const consultarPorId = async (req, res) => {
    try {
        let id = req.params.id;
        
        const data = await Etapa_MP.consultarPorId(id);
        
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const consultarPorEtapa = async (req, res) => {
    try {
        let id_projeto = req.params.id;
        
        const data = await Etapa_MP.consultarPorEtapa(id_projeto);
        
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const deletar = async (req, res) => {
    try {
        let id = req.params.id;
        
        const data = await Etapa_MP.deletar(id);
        
        return responses.success(res, { data });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

export const alterarOrdem = async (req, res) => {
    try {
        const ordemetapa_mp = req.body;
        const ordemetapa_mpReordenadas = await Etapa_MP.alterarOrdem(ordemetapa_mp);        
        const message = Array.isArray(ordemetapa_mpReordenadas) && ordemetapa_mpReordenadas.length === 0
            ? "Nenhuma alteração realizada"
            : undefined;
        return responses.success(res, { data: ordemetapa_mpReordenadas, ...(message ? { message } : {}) });
    } catch (error) {
        return responses.error(res, { message: error.message });
    }
}

