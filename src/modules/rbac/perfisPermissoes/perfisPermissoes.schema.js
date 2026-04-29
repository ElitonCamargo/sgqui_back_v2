import { z } from 'zod';

// Tabela: perfis_permissoes
// PK composta: (perfil_id, permissao_id) — ambos obrigatórios e não auto-gerados
export const createPerfisPermissoesSchema = z.object({
  perfil_id:    z.number().int(),
  permissao_id: z.number().int(),
});

export const updatePerfisPermissoesSchema = createPerfisPermissoesSchema.partial();
