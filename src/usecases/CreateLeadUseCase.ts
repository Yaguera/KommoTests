import { ILeadRepository, LeadData } from '../repository/KommoLeadRepository';

export class CreateLeadUseCase {
  constructor(private leadRepository: ILeadRepository) {}

  async execute(data: LeadData) {
    if (!data.name) {
      throw new Error('O nome do lead é obrigatório para a criação.');
    }

    // Regras adicionais podem entrar aqui
    const result = await this.leadRepository.create(data);
    return result;
  }
}
