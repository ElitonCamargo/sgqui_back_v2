import { z } from 'zod';


const dataSchema = z.string().regex(
  /^\d{4}-\d{2}-\d{2}$/,
  'A data deve estar no formato YYYY-MM-DD'
);

const horaSchema = z.string().regex(
  /^\d{2}:\d{2}(:\d{2})?$/,
  'A hora deve estar no formato HH:MM ou HH:MM:SS'
);

export const createRegistrosProdSchema = z.object({
  produto_id: z.number({ required_error: 'O produto é obrigatório', invalid_type_error: 'O produto deve ser um número' }).int({ message: 'O ID do produto deve ser um número inteiro' }).positive({ message: 'O ID do produto deve ser um número positivo' }),
  quantidade: z.number({ required_error: 'A quantidade é obrigatória', invalid_type_error: 'A quantidade deve ser um número' }).min(0, { message: 'A quantidade não pode ser negativa' }),
  unid_medida: z.enum(['L', 'Kg'], {
    required_error: 'A unidade de medida é obrigatória',
    invalid_type_error: 'A unidade de medida deve ser um texto'
  }),
  tanque: z.string({ required_error: 'O tanque é obrigatório', invalid_type_error: 'O tanque deve ser um texto' }).max(100, { message: 'O tanque deve ter no máximo 100 caracteres' }),
  observacao: z.string({ invalid_type_error: 'A observação deve ser um texto' }).max(255, { message: 'A observação deve ter no máximo 255 caracteres' }).optional(),

  lote_pa: z.string().max(100),

  codigo: z.string().max(100),

  data_inspecao: dataSchema,

  inspecionado_por: z.string().max(100),

  validado_por: z.string().max(100),

  data_separacao: dataSchema,

  hora_separacao: horaSchema,

  responsavel_separacao: z.string().max(100),

  data_inicio_envase: dataSchema,

  data_fim_envase: dataSchema,

  responsavel_linha_envase: z.string().max(100),

  amostra_laboratorio: z.string().max(255),

  responsavel_laboratorio: z.string().max(100),

  separado_operador: z.string().max(100),

  hora_inicio: horaSchema,

  data_inicio: dataSchema,

  hora_final: horaSchema,

  data_final: dataSchema,

  conferido_por: z.string().max(100),

  nome_responsavel_laboratorio: z.string().max(100),

  volumes_embalagens: z.string(),

  op_extra:  z.any().optional(),

  orde_servico:  z.any().optional(),
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
