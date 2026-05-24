# TechSolutions — Gestão de Projetos

Aplicação web de gestão de projetos e tarefas desenvolvida com React e TypeScript.

---

## Pré-requisitos

Antes de correr o projeto, certifique-se que tem instalado:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- npm (incluído com o Node.js)
  Para verificar se tem o Node.js instalado, abra o terminal e escreva:

```bash
node --version
npm --version
```

---

## Instalação

**1. Clone ou extraia o projeto para uma pasta no seu computador.**

**2. Abra o terminal dentro da pasta do projeto e instale as dependências:**

```bash
npm install
```

---

## Como correr o projeto

O projeto precisa de **dois terminais abertos em simultâneo**.

**Terminal 1 — Iniciar a API (base de dados simulada):**

```bash
npm run server
```

Deverá ver a mensagem:

```
Resources
http://localhost:3001/projects
```

**Terminal 2 — Iniciar a aplicação:**

```bash
npm start
```

A aplicação abre automaticamente no browser em `http://localhost:3000`.

> ?? Os dois comandos têm de estar a correr ao mesmo tempo para a aplicação funcionar corretamente.

---

## Como correr os testes

Com o terminal dentro da pasta do projeto:

```bash
npm test -- --watchAll=false
```
