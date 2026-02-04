# 🚀 MentoriaFlow 

   **Choose your language:**
[🇺🇸 English Version](#-mentoriaflow) - [🇧🇷 Versão em Português](#-mentoriaflow-br)

---

## 🇺🇸 MentoriaFlow

A robust Full Stack application (MERN) designed for mentorship management. This project prioritizes **backend integrity**, featuring complex business rules, secure authentication, and a clean MVC architecture.

### 💡 Key Features & Business Logic
* **Anti-Self-Scheduling:** Logic to prevent mentors from booking their own sessions.
* **Duplication Control:** Prevents users from booking the same mentorship multiple times.
* **Lifecycle Management:** Functional flow to "Complete" a mentorship, updating its availability status.
* **Advanced Security:** * Password hashing with **bcrypt**.
    * Stateless session management via **JWT (JSON Web Tokens)**.
    * Protected routes using custom `verifyToken` middleware.
* **Media Handling:** Image upload support for profiles and mentorships via **Multer**.

### 🛠 Tech Stack
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB with Mongoose (ODM).
* **Frontend:** React.js (Hooks & Context API).

### 📈 Future Improvements
* **Unit Testing:** Implementation of Jest and Supertest for backend route validation.
* **Email Notifications:** Integration with Nodemailer for appointment reminders.

---

## 🇧🇷 MentoriaFlow (BR)

Uma aplicação Full Stack robusta (MERN) para gerenciamento de mentorias. Este projeto foca na **integridade do backend**, implementando regras de negócio complexas, autenticação segura e uma arquitetura MVC limpa.

### 💡 Pontos Fortes e Diferenciais
* **Prevenção de Auto-agendamento:** Impede inteligentemente que um mentor agende sua própria mentoria.
* **Controle de Duplicidade:** Verifica se o usuário já agendou aquela mentoria específica para evitar duplicatas.
* **Ciclo de Vida:** Fluxo funcional para "Concluir" uma mentoria, alterando automaticamente o status de disponibilidade.
* **Segurança Avançada:** * Criptografia de senhas com **bcrypt**.
    * Autenticação via **JWT (JSON Web Tokens)**.
    * Proteção de rotas através do middleware customizado `verifyToken`.
* **Upload de Arquivos:** Gerenciamento de imagens para perfis e vitrine de mentorias via **Multer**.

### 🛠 Tecnologias Utilizadas
* **Backend:** Node.js, Express.js.
* **Banco de Dados:** MongoDB com Mongoose (ODM).
* **Frontend:** React.js (Hooks, Context API).

### 📈 Melhorias Futuras
* **Testes Unitários:** Implementação de Jest e Supertest para validar as rotas do backend.
* **Notificações por E-mail:** Integração com Nodemailer para avisos de agendamento.

---

## Project Structure / Estrutura do Projeto

```bash
MentoriaFlow/
├── backend/
│   ├── controllers/    # Business logic / Lógica de negócio
│   ├── db/             # Database connection / Conexão com o banco
│   ├── helpers/        # Middlewares (auth/upload) / Auxiliares
│   ├── models/         # Mongoose schemas / Modelagem de dados
│   ├── public/         # Static files (images) / Arquivos estáticos
│   ├── routes/         # API Endpoints / Rotas
│   ├── .env.example    # Environment variables template
│   ├── index.js        # Server entry point / Ponto de entrada
│   └── package.json
└── frontend/
    ├── public/         # Public assets
    ├── src/            # React source code
    ├── .env.example    # Frontend env template
    ├── .env.local      # Local environment variables
    └── package.json
