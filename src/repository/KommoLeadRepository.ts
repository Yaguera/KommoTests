import axios from 'axios';

export interface LeadData {
  name: string;
  price?: number;
}

export interface ILeadRepository {
  create(lead: LeadData): Promise<any>;
  update(id: number, lead: Partial<LeadData>): Promise<any>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<any>;
}

export class KommoLeadRepository implements ILeadRepository {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(subdomain: string, token: string) {
    this.baseUrl = `https://${subdomain}.kommo.com/api/v4`;
    this.token = token;
  }

  async create(lead: LeadData): Promise<any> {
    const response = await axios.post(
      `${this.baseUrl}/leads`,
      [lead], // A API da Kommo sempre espera um array na criação
      {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }

  async update(id: number, lead: Partial<LeadData>): Promise<any> {
    const payload = [{id, ...lead}];
    
    const response = await axios.patch(
      `${this.baseUrl}/leads`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }

  async delete (id: number): Promise<void>{
    await axios.delete(
      `${this.baseUrl}/leads/${id}`,
      {
        headers:{
          'Authorization': `Bearer ${this.token}`
        }
      }
    );
  }

  async findById(id: number): Promise<any> {
    const response = await axios.get(
      `${this.baseUrl}/leads/${id}`,
      {
        headers:{
          'Authorization':`Bearer ${this.token}`
        }
      }
    );
    return response.data;
  }
}
