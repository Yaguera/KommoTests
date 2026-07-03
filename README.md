# Kommo API v4 Integration (Clean Architecture)

Integração em **Node.js** com **TypeScript** utilizando princípios **SOLID** e **Clean Architecture** para criação de Leads na API v4 da **Kommo** (antiga amoCRM).

## 📁 Estrutura de Arquivos

```
├── src/
│   ├── infrastructure/
│   │   └── kommo/
│   │       └── KommoLeadRepository.ts   # Acesso a Dados Externos (Axios HTTP)
│   ├── application/
│   │   └── usecases/
│   │       └── CreateLeadUseCase.ts     # Regra de Negócio e Validações
│   ├── presentation/
│   │   └── controllers/
│   │       └── CreateLeadController.ts  # Controller HTTP (Express)
│   └── main.ts                          # Injeção de Dependências e Servidor
├── .env.example                         # Exemplo de variáveis de ambiente
├── package.json
└── tsconfig.json
```

## 🚀 Como Executar

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (baseado no `.env.example`) e preencha as credenciais da Kommo:

```env
KOMMO_SUBDOMAIN=seu-subdominio
KOMMO_TOKEN=seu-long-lived-token
PORT=3000
```

### 3. Rodar em ambiente de desenvolvimento

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:3000`.

### 4. Testar a criação de um Lead

Envie uma requisição POST para a rota `/api/meus-leads`:

**Via cURL:**
```bash
curl -X POST http://localhost:3000/api/meus-leads \
  -H "Content-Type: application/json" \
  -d '{"name": "Lead de Teste", "price": 1500}'
```
