# Kommo API v4 Integration (Clean Architecture)

Integração em **Node.js** com **TypeScript** utilizando princípios **SOLID** e **Clean Architecture** para gestão de Leads na API v4 da **Kommo** (antiga amoCRM).

## 📁 Estrutura de Arquivos

```
├── src/
│   ├── repository/
│   │   └── KommoLeadRepository.ts   # Acesso a Dados Externos (Axios HTTP para API v4 da Kommo)
│   ├── usecases/
│   │   ├── CreateLeadUseCase.ts     # Regra de Negócio para Criação de Lead
│   │   └── FindLeadByIdUseCase.ts   # Regra de Negócio para Consulta de Lead por ID
│   ├── controllers/
│   │   └── LeadController.ts        # Controllers HTTP reunidos (Express)
│   └── main.ts                      # Injeção de Dependências, Rotas e Servidor
├── .env.example                     # Exemplo de variáveis de ambiente
├── package.json
└── tsconfig.json
```

## 🚀 Como Executar

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (baseado no `.env.example`) e preencha as credenciais da sua conta da Kommo:

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

---

## 🔌 Endpoints Disponíveis

### 1️⃣ Criar um Lead
Envie uma requisição POST com o nome e opcionalmente o preço do lead.

**Via cURL:**
```bash
curl -X POST http://localhost:3000/api/meus-leads \
  -H "Content-Type: application/json" \
  -d '{"name": "Lead de Teste", "price": 1500}'
```

**Resposta de Sucesso (`201 Created`):**
```json
{
  "success": true,
  "data": {
    "_total_items": 1,
    "_embedded": {
      "leads": [
        {
          "id": 24421740,
          "request_id": "0"
        }
      ]
    }
  }
}
```

---

### 2️⃣ Consultar um Lead por ID
Envie uma requisição GET informando o ID do lead diretamente nos parâmetros da URL (`:id`).

**Via cURL:**
```bash
curl -X GET http://localhost:3000/api/meus-leads/24421740
```

**Resposta de Sucesso (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "id": 24421740,
    "name": "Lead de Teste",
    "price": 1500,
    "responsible_user_id": 123456,
    "status_id": 142,
    "pipeline_id": 31,
    "created_at": 1719999999,
    "updated_at": 1719999999
  }
}
```
