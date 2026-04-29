import { z } from 'zod';

// Tabela: sessoes
// id: bigint UNSIGNED PK (auto-gerado pelo banco)
// usuario, token, validade: NOT NULL
export const createSessoesSchema = z.object({
  usuario:  z.number().int(),
  token:    z.string().max(255),
  validade: z.string(),    // datetime (ISO)
});

export const updateSessoesSchema = createSessoesSchema.partial();
