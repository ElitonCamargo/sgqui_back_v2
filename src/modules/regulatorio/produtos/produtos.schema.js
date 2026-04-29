import { z } from 'zod';

// Tabela: produtos
// id: AUTO_INCREMENT — excluído do createSchema
// Campos com NOT NULL (sem DEFAULT) são obrigatórios no createSchema
export const createProdutosSchema = z.object({
  projeto:         z.number().int(),
  n_desenvolvimento: z.string().max(255),
  descricao:       z.string().max(255),
  data_emissao:    z.string(),              // date (ISO)
  unid_medida:     z.string().max(50),
  capacidade:      z.number(),              // decimal(10,4)
  grupo:           z.string().max(100),
  subgrupo:        z.string().max(100),
  classif_fiscal:  z.string().max(50),
  classe:          z.number().int(),
  modelo:          z.string().max(100),
  peso_liquido:    z.number(),              // decimal(10,4)
  peso_bruto:      z.number(),              // decimal(10,4)
  validade:        z.string().max(50),
  n_registro:      z.string().max(100),
  densidade:       z.number(),              // decimal(10,6) UNSIGNED
  garantias:       z.any(),                 // json NOT NULL
  tipo:            z.string().max(100),
  natureza_fisica: z.string().max(100),
  aplicacao:       z.string().max(255),
  formulacao:      z.any(),                 // json NOT NULL
  embalagens:      z.any(),                 // json NOT NULL
  status:          z.enum(['Rascunho', 'Aguardando', 'Liberado']).optional(),
});

export const updateProdutosSchema = createProdutosSchema.partial();
