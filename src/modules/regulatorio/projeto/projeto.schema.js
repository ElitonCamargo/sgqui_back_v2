import { z } from 'zod';

export const searchProjetoSchema = z.object({
    codigo: z
        .string()
        .trim()
        .min(1, 'Código não pode ser vazio.')
        .max(255, 'Código deve ter no máximo 255 caracteres.')
        .optional(),

    nome: z
        .string()
        .trim()
        .min(1, 'Nome não pode ser vazio.')
        .max(255, 'Nome deve ter no máximo 255 caracteres.')
        .optional(),

    cliente: z
        .string()
        .trim()
        .min(1, 'Cliente não pode ser vazio.')
        .max(255, 'Cliente deve ter no máximo 255 caracteres.')
        .optional(),

    descricao: z
        .string()
        .trim()
        .min(1, 'Descrição não pode ser vazia.')
        .max(255, 'Descrição deve ter no máximo 255 caracteres.')
        .optional(),

    densidade: z
        .coerce
        .number({
            invalid_type_error: 'Densidade deve ser um número.'
        })
        .min(0, 'Densidade não pode ser menor que zero.')
        .optional(),

    ph: z
        .string()
        .trim()
        .min(1, 'pH não pode ser vazio.')
        .max(255, 'pH deve ter no máximo 255 caracteres.')
        .optional(),

    tipo: z
        .string()
        .trim()
        .min(1, 'Tipo não pode ser vazio.')
        .max(255, 'Tipo deve ter no máximo 255 caracteres.')
        .optional(),

    natureza_fisica: z
        .string()
        .trim()
        .min(1, 'Natureza física não pode ser vazia.')
        .max(255, 'Natureza física deve ter no máximo 255 caracteres.')
        .optional()
});

export const getByIdSchema = z.object({
    id: z
        .coerce.number({
            invalid_type_error: 'ID deve ser um número.'
        })
});