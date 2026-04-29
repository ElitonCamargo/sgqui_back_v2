import { z } from 'zod';

// Tabela: projeto
// id: AUTO_INCREMENT — excluído do createSchema
export const createProjetoSchema = z.object({
  codigo:          z.string().max(20).optional(),
  nome:            z.string().max(255).optional(),
  cliente:         z.string().max(255).optional(),
  descricao:       z.string().optional(),            // text nullable
  data_inicio:     z.string().optional(),            // date (ISO)
  data_termino:    z.string().optional(),            // date (ISO)
  densidade:       z.number().optional(),            // double UNSIGNED nullable
  ph:              z.string().max(255).optional(),
  tipo:            z.string().max(255).optional(),
  aplicacao:       z.any().optional(),               // json nullable
  natureza_fisica: z.string().max(255).optional(),
  status:          z.any().optional(),               // json nullable
  resultado:       z.any().optional(),               // json nullable
});

export const updateProjetoSchema = createProjetoSchema.partial();
