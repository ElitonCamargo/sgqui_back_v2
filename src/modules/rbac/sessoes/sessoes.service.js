import * as sessoesModel from './sessoes.model.js';
import { AppError } from '../../../core/utils/AppError.js';
import crypto from "crypto";


export const criar = async ({ usuario = 0, validade = 0 }) => {
  if (!usuario || !validade) {
    throw new AppError({
      title: 'Erro ao criar sessão',
      message: 'Informe o usuário e a validade para criar a sessão.',
      details: `Dados recebidos para criação de sessão: usuario=${usuario}, validade=${validade}.`,
      code: 400
    });
  }
  const token = crypto.randomBytes(64).toString("hex"); // 128 caracteres
  const data = await sessoesModel.criar({ usuario, validade, token });
  if (!data) {
    throw new AppError({
      title: 'Erro ao criar sessão',
      message: 'Não foi possível criar a sessão.',
      details: `A criação da sessão para o usuário ${usuario} com validade ${validade} não retornou registro válido.`,
      code: 500
    });
  }
  return data;
};


export const buscarSessao = async ({ sessoes_id = 0, sessoes_usuario = 0, token = '' }) => {
  const sessao = await sessoesModel.buscarSessao(sessoes_id, sessoes_usuario);
  if (!sessao) {
    return null;
  }
  if (sessao.token !== token) {
    return null;
  }
  return sessao;
};


export const extender = async (sessoes_id, tempo_em_horas) => {
  return await sessoesModel.extender(sessoes_id, tempo_em_horas);

};
