import { z } from 'zod';

// Tabela: usuario
// id: AUTO_INCREMENT — excluído do createSchema
export const createUsuarioSchema = z.object({
  nome:   z.string().max(100).optional(),
  email:  z.string().max(100).optional(),
  senha:  z.string().max(255).optional(),
  avatar: z.string().optional(),          // text nullable
  status: z.number().int().optional(),    // tinyint nullable
});

export const updateUsuarioSchema = createUsuarioSchema.partial();
