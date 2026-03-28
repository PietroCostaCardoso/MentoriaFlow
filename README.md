# 🚀 MentoriaFlow 
![Autor](https://img.shields.io/badge/Autor-Pietro%20Costa%20Cardoso-blue?style=flat-square&logo=github)
![Licença](https://img.shields.io/badge/Licença-MIT-yellow.svg?style=flat-square)
![Status](https://img.shields.io/badge/Status-Original%20Repo-green?style=flat-square)

> **Aviso:** Este é o repositório original do projeto MentoriaFlow. Se você encontrar este código em outro perfil sem os devidos créditos, ele foi plagiado........

   **Choose your language:**
[🇺🇸 English Version](#-mentoriaflow) - [🇧🇷 Versão em Português](#-mentoriaflow-br)

---

## 🇺🇸 MentoriaFlow

A robust Full Stack application designed for mentorship management. This project prioritizes **backend integrity**, featuring complex business rules, secure authentication, and a clean MVC architecture.

### 💡 Key Features & Business Logic
* **Anti-Self-Scheduling:** Logic to prevent mentors from booking their own sessions.
* **Duplication Control:** Prevents users from booking the same mentorship multiple times.
* **Lifecycle Management:** Functional flow to "Complete" a mentorship, updating its availability status.
* **Advanced Security:** * Password hashing with **bcrypt**.
    * Stateless session management via **JWT (JSON Web Tokens)**.
    * Protected routes using custom `verifyToken` middleware.
* **Media Handling:** Image upload support for profiles and mentorships via **Multer**.

### Tech Stack
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB with Mongoose (ODM).
* **Frontend:** React.js (Hooks & Context API).

### Future Improvements
* **Unit Testing:** Implementation of Jest and Supertest for backend route validation.
* **Email Notifications:** Integration with Nodemailer for appointment reminders.

---

## 🇧🇷 MentoriaFlow (BR)

Uma aplicação Full Stack robusta para gerenciamento de mentorias. Este projeto foca na **integridade do backend**, implementando regras de negócio complexas, autenticação segura e uma arquitetura MVC limpa.

### 💡 Pontos Fortes e Diferenciais
* **Prevenção de Auto-agendamento:** Impede inteligentemente que um mentor agende sua própria mentoria.
* **Controle de Duplicidade:** Verifica se o usuário já agendou aquela mentoria específica para evitar duplicatas.
* **Ciclo de Vida:** Fluxo funcional para "Concluir" uma mentoria, alterando automaticamente o status de disponibilidade.
* **Segurança Avançada:** * Criptografia de senhas com **bcrypt**.
    * Autenticação via **JWT (JSON Web Tokens)**.
    * Proteção de rotas através do middleware customizado `verifyToken`.
* **Upload de Arquivos:** Gerenciamento de imagens para perfis e vitrine de mentorias via **Multer**.

### Tecnologias Utilizadas
* **Backend:** Node.js, Express.js.
* **Banco de Dados:** MongoDB com Mongoose (ODM).
* **Frontend:** React.js (Hooks, Context API).

###  Melhorias Futuras
* **Testes Unitários:** Implementação de Jest e Supertest para validar as rotas do backend.
* **Notificações por E-mail:** Integração com Nodemailer para avisos de agendamento.

---
<div align="center">
  <img src="https://github.com/user-attachments/assets/3f01c317-283e-472d-be9d-14afe9e2812f" width="45%" />
  <img src="https://github.com/user-attachments/assets/7756db99-cc84-4de0-9c7e-be1dcae540f5" width="45%" />
  <img src="https://github.com/user-attachments/assets/1392d8b2-e00c-4296-a7fa-45505d4ffe7d" width="45%" />
  <img src="https://github.com/user-attachments/assets/1abed1d9-704c-4d2d-9f03-ce3b996e1092?v=1)" width="45%" height="205px" />
  <img src="https://github.com/user-attachments/assets/a0c8d957-7af1-455f-bcf6-d6b139fc6a43" width="45%" />
</div>


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

```
## 👤 Autor

Desenvolvido com dedicação por **Pietro Costa Cardoso**.  
Se este projeto te ajudou, considere dar uma ⭐ no repositório!
