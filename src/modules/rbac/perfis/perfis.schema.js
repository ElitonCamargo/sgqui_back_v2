import { z } from 'zod';

// Tabela: perfis
// id: AUTO_INCREMENT — excluído do createSchema
// nome: NOT NULL
export const createPerfisSchema = z.object({
  nome:      z.string().max(50),
  descricao: z.string().max(255).optional(),
});

export const updatePerfisSchema = createPerfisSchema.partial();
