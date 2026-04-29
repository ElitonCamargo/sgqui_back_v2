import { z } from 'zod';

// Tabela: configuracao
// PK: key (varchar, não auto-gerada — incluída no createSchema)
export const createConfiguracaoSchema = z.object({
  key:    z.string().max(100),
  value:  z.any().optional(),    // json nullable
  status: z.any().optional(),    // json nullable
});

export const updateConfiguracaoSchema = createConfiguracaoSchema.partial();
