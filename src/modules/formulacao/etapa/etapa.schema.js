import { z } from 'zod';

// Tabela: etapa
// id: AUTO_INCREMENT — excluído do createSchema
export const createEtapaSchema = z.object({
  projeto:   z.number().int().optional(),       // FK → projeto.id
  nome:      z.string().max(255).optional(),
  descricao: z.string().max(255).optional(),
  ordem:     z.number().int().optional(),       // tinyint
});

export const updateEtapaSchema = createEtapaSchema.partial();
