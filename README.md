📚 BookByte

BookByte é uma rede social para leitores que desejam compartilhar suas opiniões sobre livros, recomendar (ou não) obras que já leram, e interagir com outros leitores apaixonados por literatura. A plataforma permite a publicação de resenhas, reações, comentários, sistema de seguidores e muito mais.

⚙️ Tecnologias Utilizadas

Frontend

Next.js

React

Tailwind CSS

Axios (para requisições HTTP)

Backend

Node.js

Express

Banco de dados (MySQL)

JWT para autenticação

nodemon

🚀 Funcionalidades Iniciais (MVP)

Cadastro e login de usuários

Publicação de reviews de livros

Listagem de reviews no feed

Curtir, comentar e reagir a resenhas

Perfil do usuário com suas publicações

Busca por livro ou autor

Edição e exclusão de reviews próprias

🛠️ Como rodar o projeto localmente

🔹 Pré-requisitos

Node.js instalado

MySQL instalado

Git

🔹 Clonando o repositório

git clone https://github.com/JoseGuilherme0/BookByte.git
cd BookByte

🔹 Instalando dependências

# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

🔹 Rodando o projeto

# Rodar backend
cd api
npm start

# Em outra aba do terminal, rodar o frontend
cd client/rede-social
npm run dev

🧚‍♂️ Estrutura do Projeto

bookbyte/
│
├── api/
│   ├── controllers/
│   ├── routes/
│   ├── index.js
│   └── connect.js
│   └── .env
│
├── client/
│   ├── rede-social
│   │   ├── public/
│   │   └── scr/
│   │   │   ├── app/
│   │   │   ├── components/

🤩 Possibilidades Futuras

Sistema de seguidores e notificações

Reações personalizadas (como "amei", "de olho", etc.)

Listas personalizadas como “Quero ler”, “Lidos” e “Favoritos”

Rankings de usuários mais ativos

Grupos por gênero literário

📄 Todos os direitos reservados para os desenvolvedores do projeto.
