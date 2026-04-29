import { z } from 'zod';

// Tabela: permissoes
// id: não tem AUTO_INCREMENT explícito no SQL — incluído como opcional
// codigo, recurso, metodo, rota_template, eh_publica: NOT NULL
export const createPermissoesSchema = z.object({
  codigo:        z.string().max(50),
  recurso:       z.string().max(50),
  metodo:        z.string().max(10),
  rota_template: z.string().max(255),
  descricao:     z.string().max(255).optional(),
  eh_publica:    z.boolean(),
});

export const updatePermissoesSchema = createPermissoesSchema.partial();
