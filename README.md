# Agenda Interativa Full-Stack (To-Do List & Calendário)

Este é um projeto **Full-Stack** focado na criação de uma agenda interativa completa. O sistema permite a gestão dinâmica de tarefas e eventos, conectando uma interface moderna em React a uma API RESTful robusta com persistência de dados.

## 🚀 Tecnologias Utilizadas

### Frontend (Interface)
* **React** (Vite)
* **React Router Dom** (Navegação SPA)
* **JavaScript (ES6+)**
* **CSS3** (Layouts com Grid e Flexbox)

### Backend (Servidor & Persistência)
* **Node.js** & **Express.js**
* **MongoDB** (Banco de dados NoSQL)
* **Mongoose** (Modelagem de objetos e conexão com o banco)
* **API RESTful** (Endpoints para CRUD de usuários, tarefas e eventos)

## 🛠️ Funcionalidades
- [x] **Persistência de Dados:** Todos os usuários, eventos e tarefas são armazenados de forma estruturada no MongoDB via Mongoose.
- [x] **Autenticação:** Fluxo de Cadastro e Login integrado ao banco de dados.
- [x] **Calendário Inteligente:** Cálculo dinâmico de datas e meses no frontend.
- [x] **Gestão de Agenda:** Clique nos dias para visualizar, criar ou remover itens vinculados ao seu ID no banco.
- [x] **Interface Responsiva:** Modal interativo para detalhes diários.

## 📊 Arquitetura de Dados (Mongoose)
O projeto utiliza o Mongoose para definir Schemas rigorosos, garantindo que as tarefas e eventos possuam campos validados (título, descrição, data inicial/final, ...) antes de serem persistidos no MongoDB.


## 🛠️ Próximas Etapas (Roadmap)

O projeto está em desenvolvimento ativo e as seguintes funcionalidades estão planeadas:

### 1. Integração e Persistência
- [ ] **Conexão Front-End & Back-End:** Substituir os dados simulados (mockados) por chamadas reais via `fetch` ou `Axios` para a API Node.js.
- [ ] **Refinação de CSS:** Aplicação de CSS Grid e Flexbox avançado para tornar o calendário totalmente responsivo.
- [ ] **Feedback Visual:** Adição de estados de carregamento (loaders) e notificações de sucesso/erro ao salvar tarefas.
- [ ] **Módulo de Notificações:** Envio de lembretes automáticos via E-mail ou WhatsApp utilizando a biblioteca `whatsapp-web.js` já configurada no backend.
- [ ] **Dockerização:** Configuração de containers Docker para facilitar o ambiente de desenvolvimento e deploy.


## 💻 Como rodar o projeto localmente

### 1. Configurar o Backend
```bash
# Entre na pasta do backend
cd to_do_list/backend

# Instale as dependências
npm install

# Certifique-se de que o seu MongoDB local (ou Atlas) está rodando
# Inicie o servidor (Porta 8080)
npm start