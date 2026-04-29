import { z } from 'zod';

// Tabela: elemento
// id: AUTO_INCREMENT — excluído do createSchema
export const createElementoSchema = z.object({
  simbolo:                  z.string().max(3),
  nome:                     z.string().max(50).optional(),
  numero_atomico:           z.number().int().optional(),
  massa_atomica:            z.number().optional(),
  grupo:                    z.number().int().optional(),
  periodo:                  z.number().int().optional(),
  ponto_de_fusao:           z.number().optional(),
  ponto_de_ebulicao:        z.number().optional(),
  densidade:                z.number().optional(),
  estado_padrao:            z.string().max(20).optional(),
  configuracao_eletronica:  z.string().max(50).optional(),
  propriedades:             z.string().optional(),   // text nullable
});

export const updateElementoSchema = createElementoSchema.partial();
