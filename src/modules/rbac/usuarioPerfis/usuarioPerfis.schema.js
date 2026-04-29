import { z } from 'zod';

// Tabela: usuario_perfis
// id: AUTO_INCREMENT — excluído do createSchema
// usuario_id e perfil_id: NOT NULL
export const createUsuarioPerfisSchema = z.object({
  usuario_id: z.number().int(),
  perfil_id:  z.number().int(),
});

export const updateUsuarioPerfisSchema = createUsuarioPerfisSchema.partial();
