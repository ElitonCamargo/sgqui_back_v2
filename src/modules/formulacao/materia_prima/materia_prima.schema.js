import { z } from 'zod';

// Tabela: materia_prima
// id: AUTO_INCREMENT — excluído do createSchema
export const createMateriaPrimaSchema = z.object({
  codigo:    z.string().max(50).optional(),
  nome:      z.string().max(100).optional(),
  formula:   z.string().max(50).optional(),
  cas_number: z.string().max(50).optional(),
  densidade:  z.number().optional(),               // double UNSIGNED nullable
  descricao:  z.string().max(1000).optional(),
});

export const updateMateriaPrimaSchema = createMateriaPrimaSchema.partial();
