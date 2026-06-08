# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# 🃏 Persona Fusion Hub

<div align="center">

# ⚡ PERSONA FUSION HUB ⚡

### *"Roube o coração dos cálculos de fusão."*

![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![Node.js](https://img.shields.io/badge/API-Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge)

---

### 🎭 Calculadora de Fusões para Persona 3 Reload e Persona 5 Royal

**Planeje suas fusões. Descubra combinações. Domine a Velvet Room.**

</div>

---

# 📖 Visão Geral

O **Persona Fusion Hub** é uma aplicação web desenvolvida para auxiliar jogadores de **Persona 3 Reload** e **Persona 5 Royal** a encontrarem rapidamente as melhores combinações de Personas.

No universo de Persona, a mecânica de fusão da **Velvet Room** utiliza regras complexas envolvendo:

* 🃏 Arcanas
* 📈 Níveis das Personas
* ⚔️ Fusões Especiais
* 💎 Demônios do Tesouro
* 👑 Personas DLC e Picaro

Realizar esses cálculos manualmente pode consumir muito tempo e exigir diversas tentativas dentro do jogo.

O objetivo deste projeto é automatizar completamente esse processo através de algoritmos de cálculo e busca, oferecendo uma interface moderna, intuitiva e rápida para consulta e planejamento de fusões.

---

# 🎯 Funcionalidades

## ⚔️ Guilhotina de Fusão (Cálculo Direto)

Selecione duas Personas e descubra instantaneamente qual será o resultado da fusão.

### Recursos

* Cálculo automático de Arcanas
* Aplicação das regras oficiais dos jogos
* Suporte a Personas DLC
* Tratamento de Demônios do Tesouro

---

## 🔍 Busca Reversa de Fusões

Deseja obter uma Persona específica?

O sistema realiza uma varredura completa no compêndio utilizando algoritmos de busca para encontrar todas as combinações possíveis capazes de gerar a Persona desejada.

### Inclui

* Fusões comuns
* Fusões avançadas
* Fusões especiais
* Variações DLC/Picaro

---

## 📊 Fichas Detalhadas das Personas

Visualize informações completas através de modais interativos.

### Dados Disponíveis

* Arcana
* Nível
* Trait
* Status Base
* Força (ST)
* Magia (MA)
* Resistência (EN)
* Agilidade (AG)
* Sorte (LU)

### Afinidades Elementais

* ❌ Fraquezas
* 🛡️ Resistências
* 🔄 Repel
* 🚫 Imunidades
* 🔥 Absorções

---

## 🎮 Persona Guess (Persona 3 Reload)

Modo bônus inspirado em Wordle.

O jogador deve descobrir qual Persona foi selecionada utilizando pistas relacionadas a:

* Arcana
* Nível
* Afinidades
* Estatísticas

---

## 🎓 Tutorial Interativo

Na primeira visita, o usuário recebe um guia rápido apresentando todas as funcionalidades da aplicação.

As preferências ficam armazenadas localmente através do `localStorage`.

---

# 📌 Escopo do Projeto

## ✅ Incluído

* Cálculo de Arcanas
* Fusões por Nível
* Fusões Especiais
* Personas DLC/Picaro
* Demônios do Tesouro
* Estatísticas Base
* Afinidades Elementais
* Busca Reversa
* Minigame Persona Guess

## ❌ Não Incluído

* Herança de Skills
* Guias de Mapas
* Localização de Itens
* Estratégias de Combate
* Builds de Personas

---

# 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando **React**, recriando toda a lógica de fusão dos jogos através de componentes reutilizáveis e gerenciamento moderno de estado.

## ⚛️ Frontend

### React

Biblioteca principal da aplicação.

Utilizada para:

* Componentização da interface
* Gerenciamento de estados
* Renderização reativa
* Reutilização de lógica
* Atualização dinâmica dos dados

### JavaScript (ES6+)

* Async/Await
* Promises
* Fetch API
* Manipulação de dados
* Algoritmos de fusão

### HTML5

Estrutura semântica da aplicação.

### CSS3

Responsável por toda a identidade visual inspirada nos jogos.

#### Persona 5 Royal

🖤 Tema Phantom Thieves

* Vermelho e Preto
* Elementos angulares
* Animações dinâmicas

#### Persona 3 Reload

💙 Tema Velvet Room

* Tons azulados
* Glassmorphism
* Efeitos translúcidos

Recursos utilizados:

* Flexbox
* CSS Grid
* Keyframes
* Clip-path
* Responsividade

---

## 🌐 Backend e Infraestrutura

### Node.js

Utilizado nas APIs responsáveis por fornecer os dados dos compêndios.

### Express.js

Criação dos endpoints REST consumidos pela aplicação.

### Render

Hospedagem das APIs em nuvem.

---

# 🚀 Como Executar

## 🌐 Versão Online

Acesse a aplicação diretamente pelo navegador:

```text
👉 [Link da aplicação](https://matheuspagaime17.github.io/Persona-Fusion-Calculator/)
```

---

## 💻 Executando Localmente

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/persona-fusion-hub.git
```

Entre na pasta do projeto:

```bash
cd persona-fusion-hub
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível localmente através do endereço exibido pelo Vite.

---

# 📡 Integração com APIs

A aplicação consome APIs REST responsáveis por disponibilizar os dados dos compêndios dos jogos.

## Persona 5 Royal

```http
https://mpppersona5-api.onrender.com/personas/
```

## Persona 3 Reload

```http
https://persona-compendium.onrender.com/personas/
```

---

# 🛡️ Estratégias de Resiliência

## 🔓 API Pública

As APIs funcionam em modo somente leitura.

Não é necessário utilizar:

* API Keys
* Tokens
* Autenticação

---

## 🔥 Warm-Up Automático

Como os servidores utilizam o plano gratuito do Render, eles podem entrar em estado de repouso.

Ao abrir a aplicação, um ping automático é realizado para ativar os serviços antes da primeira consulta.

---

## ⏱️ Retry com Backoff Exponencial

Em caso de falha:

```text
Tentativa 1 → 4s
Tentativa 2 → 8s
Tentativa 3 → 16s
```

Isso reduz falhas causadas por inicialização fria dos servidores.

---

## 💾 Cache Inteligente

Após o primeiro carregamento:

* Os dados são armazenados no localStorage
* É registrado um timestamp de validade
* O cache permanece válido por 24 horas

Resultado:

⚡ Carregamentos praticamente instantâneos em visitas futuras.

---

# 📂 Estrutura do Projeto

```text
📦 persona-fusion-hub
┃
┣ 📂 public
┃
┣ 📂 src
┃ ┣ 📂 components
┃ ┣ 📂 pages
┃ ┣ 📂 hooks
┃ ┣ 📂 services
┃ ┣ 📂 assets
┃ ┣ 📂 utils
┃ ┣ 📜 App.jsx
┃ ┗ 📜 main.jsx
┃
┣ 📜 package.json
┣ 📜 vite.config.js
┗ 📜 README.md
```

---

# 🎭 Filosofia do Projeto

O Persona Fusion Hub foi construído com três objetivos principais:

### ⚡ Performance

Consultas rápidas e poucos cliques.

### 🎨 Imersão

Visual inspirado diretamente na identidade dos jogos Persona.

### 🧠 Usabilidade

Transformar regras complexas de fusão em uma experiência simples e intuitiva.

---

# 🙏 Agradecimentos Especiais

Gostaríamos de agradecer ao criador e mantenedor da Persona Compendium API:

### ⭐ luylish

Seu trabalho de catalogação das Personas, atributos, afinidades e informações dos jogos foi essencial para a validação dos cálculos e para o desenvolvimento do minigame Persona Guess.

Muito obrigado por sua contribuição para a comunidade Persona.

E ao Professor Danilo :)

---

<div align="center">

# 🎭 "Eu sou tu, tu és eu."

### Obrigado por visitar o Persona Fusion Hub!

⭐ Se gostou do projeto, considere deixar uma estrela no repositório.

</div>



