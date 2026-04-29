import { z } from 'zod';

// Tabela: etapa_mp
// id: AUTO_INCREMENT — excluído do createSchema
export const createEtapaMpSchema = z.object({
  etapa:          z.number().int().optional(),       // FK → etapa.id
  mp:             z.number().int().optional(),       // FK → materia_prima.id
  percentual:     z.number().optional(),             // double nullable
  tempo_agitacao: z.string().max(10).optional(),
  observacao:     z.string().max(1000).optional(),
  ordem:          z.number().int().optional(),       // tinyint
  lote:           z.string().max(20).optional(),
});

export const updateEtapaMpSchema = createEtapaMpSchema.partial();
