import { Request, Response } from 'express';
import { CreateLeadUseCase } from '../usecases/CreateLeadUseCase';
import { FindLeadByIdUseCase } from '../usecases/FindLeadByIdUseCase';

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

export class FindLeadByIdController {
  constructor(private findLeadByIdUseCase: FindLeadByIdUseCase){}

  async handle(req: Request, res: Response): Promise<Response>{
    try{
       const id = Number(req.params.id);
       if (isNaN(id)) {
         return res.status(400).json({ success: false, error: "ID inválido na URL" });
       }
       const result = await this.findLeadByIdUseCase.execute(id);
       if(!result){
        return res.status(404).json({
          success: false,
          message: 'Lead não encontrado'
        })
       }
       return res.status(200).json({
        success: true,
        data: result
       })
    }catch(erro: any){
        const errorMessage = erro.response?.data || erro.message;
        return res.status(400).json({
            success: false,
            error: errorMessage
        })
    }
  }
}
