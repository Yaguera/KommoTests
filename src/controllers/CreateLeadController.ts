import { Request, Response } from 'express';
import { CreateLeadUseCase } from '../usecases/CreateLeadUseCase';

export class CreateLeadController {
  constructor(private createLeadUseCase: CreateLeadUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price } = req.body;
      
      const result = await this.createLeadUseCase.execute({ name, price });
      
      return res.status(201).json({ 
        success: true, 
        data: result 
      });
    } catch (error: any) {
      // Pega o erro da API da Kommo ou o erro de validação do UseCase
      const errorMessage = error.response?.data || error.message;
      return res.status(400).json({ 
        success: false, 
        error: errorMessage 
      });
    }
  }
}
