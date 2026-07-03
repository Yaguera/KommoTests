import { ILeadRepository } from "../repository/KommoLeadRepository";

export class FindLeadByIdUseCase {
    constructor(private leadRepository: ILeadRepository ){}

    async execute(id: number){
        if(!id)throw new Error("ID é obrigatório");
        
        const result = await this.leadRepository.findById(id);
        return result;
    }
}