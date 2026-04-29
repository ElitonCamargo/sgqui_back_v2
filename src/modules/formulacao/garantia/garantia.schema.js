import { z } from 'zod';

// Tabela: garantia
// id: AUTO_INCREMENT — excluído do createSchema
// materia_prima e nutriente: NOT NULL (FKs obrigatórias)
export const createGarantiaSchema = z.object({
  materia_prima: z.number().int(),
  nutriente:     z.number().int(),
  percentual:    z.number().optional(),    // double UNSIGNED nullable
});

export const updateGarantiaSchema = createGarantiaSchema.partial();
