import { z } from 'zod';

// Tabela: nutriente
// id: AUTO_INCREMENT — excluído do createSchema

export const createNutrienteSchema = z.object({
  nome: z.string().trim().min(2).max(100),
  formula: z.string().trim().min(1).max(100),
  visivel: z.number().int().default(1).refine(val => val === 0 || val === 1, {
    message: "O campo 'visivel' deve ser 0 ou 1"
  })
});

export const updateNutrienteSchema = createNutrienteSchema
  .partial()
  .refine(data => Object.keys(data).length > 0, {
    message: "Pelo menos um campo deve ser enviado"
});