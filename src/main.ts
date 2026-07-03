import 'dotenv/config';
import express from 'express';
import { KommoLeadRepository } from './repository/KommoLeadRepository';
import { CreateLeadUseCase } from './usecases/CreateLeadUseCase';
import { CreateLeadController } from './controllers/CreateLeadController';
import { FindLeadByIdUseCase } from './usecases/FindLeadByIdUseCase';
import { FindLeadByIdController } from './controllers/FindLeadByIdControler';

const app = express();
app.use(express.json());

// Variáveis de ambiente
const subdomain = process.env.KOMMO_SUBDOMAIN || 'seu-subdominio';
const token = process.env.KOMMO_TOKEN || 'seu-long-lived-token';
const port = process.env.PORT || 3000;

// Injeção de dependências
const repository = new KommoLeadRepository(subdomain, token);
const createUseCase = new CreateLeadUseCase(repository);
const findLeadByIdUseCase = new FindLeadByIdUseCase(repository);
const createController = new CreateLeadController(createUseCase);
const findLeadByIdController = new FindLeadByIdController(findLeadByIdUseCase);

// Rota da nossa API
app.post('/api/meus-leads', (req, res) => createController.handle(req, res));
app.get('/api/meus-leads/:id', (req, res) => findLeadByIdController.handle(req, res));

app.listen(port, () => {
  console.log(`🚀 API rodando de boa na porta ${port}!`);
});
