
/**
 * Classe de erro de aplicação personalizada para tratamento estruturado de erros..
 * @class AppError
 * @extends Error
 */
export class AppError extends Error {
  /**
   * Cria uma instância de AppError.
   * @param {Object} params - Parâmetros do erro.
   * @param {string} params.title - Título curto descrevendo o erro.
   * @param {string} params.message - Mensagem de erro detalhada.
   * @param {*} [params.details] - Detalhes adicionais sobre o erro.
   * @param {number} [params.code=500] - Código de status HTTP associado ao erro.
   */
  constructor(
    {
      title = 'Erro Interno',
      message = 'Erro interno do servidor', 
      details,
      code=500
  }) {
    super(message);
    this.name = 'AppError';
    this.title = title;
    this.details = details;
    this.code = code;
  }
}
