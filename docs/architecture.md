# 🏗️ Arquitetura Simples do BookByte

O **BookByte** é uma aplicação web composta por duas partes principais:

## 🔹 Backend (API)
**Local:** `/api`  
**Tecnologia:** Node.js + Express

Responsável por:
- Autenticação de usuários
- Cadastro e gerenciamento de perfis
- Conexão com banco de dados
- Exposição de rotas para o frontend

**Pastas principais:**
- `controllers/`: Lógica das funcionalidades
- `routes/`: Definição das rotas da API
- `connect.js`: Conexão com o banco de dados
- `index.js`: Arquivo principal da aplicação backend

---

## 🔹 Frontend (Interface)
**Local:** `/client/rede-social`  
**Tecnologia:** Next.js + TypeScript

Responsável por:
- Interface que o usuário interage
- Consumo da API do backend
- Autenticação e navegação entre páginas
- Exibição de reviews, livros e perfis

**Pastas principais:**
- `src/app/`: Rotas e páginas da aplicação
- `src/components/`: Componentes reutilizáveis
- `public/`: Arquivos públicos como imagens

---

## 🔐 Autenticação
- Utiliza JWT (JSON Web Tokens)
- Tokens armazenados com segurança via cookies

---

## 🗄️ Banco de Dados
- Uso de MySQL
- Estrutura com tabelas: usuários, livros, reviews

---

## 📌 Resumo
O projeto é dividido entre:
- Um **backend** Node.js que fornece uma API REST
- Um **frontend** Next.js que consome essa API
- Comunicação entre cliente e servidor feita via HTTP

