import { z } from 'zod';


export const createRegistrosProdSchema = z.object({
  produto_id: z.number({ required_error: 'O produto é obrigatório', invalid_type_error: 'O produto deve ser um número' }).int({ message: 'O ID do produto deve ser um número inteiro' }).positive({ message: 'O ID do produto deve ser um número positivo' }),
  quantidade: z.number({ required_error: 'A quantidade é obrigatória', invalid_type_error: 'A quantidade deve ser um número' }).min(0, { message: 'A quantidade não pode ser negativa' }),
  unid_medida: z.enum(['L', 'Kg'], {
    required_error: 'A unidade de medida é obrigatória',
    invalid_type_error: 'A unidade de medida deve ser um texto'
  }),
  tanque: z.string({ required_error: 'O tanque é obrigatório', invalid_type_error: 'O tanque deve ser um texto' }).max(100, { message: 'O tanque deve ter no máximo 100 caracteres' }),
  observacao: z.string({ invalid_type_error: 'A observação deve ser um texto' }).max(255, { message: 'A observação deve ter no máximo 255 caracteres' }).optional()
});

export const updateRegistrosProdSchema = createRegistrosProdSchema
  .partial()
  .extend({
    deletedAt: z.null().optional(),
    deletedBy: z.null().optional()
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'Pelo menos um campo deve ser enviado para atualização'
  });
