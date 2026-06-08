# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


🎩 Persona Fusion Hub

1. Sobre o Projeto

O Persona Fusion Hub é uma aplicação web interativa projetada para auxiliar os jogadores da franquia de RPG Persona (especificamente Persona 3 Reload e Persona 5 Royal).

Objetivo e Problema Resolvido: No jogo, a mecânica principal envolve sacrificar criaturas (Personas) na Velvet Room para fundi-las e criar aliados mais fortes, baseando-se em matrizes matemáticas complexas de Arcanas (Classes) e Níveis Base. Fazer isso de cabeça ou via tentativa-e-erro consome muito tempo do jogador. Este projeto resolve o problema simulando a matemática do jogo em tempo real, permitindo aos jogadores planejarem fusões perfeitas e descobrirem receitas exatas antes mesmo de abrirem o jogo.

Tema Central: A atmosfera do sistema foi desenhada simulando as interfaces skeuomórficas originais dos jogos (Menu Dark Phantom Thief para P5R, e Glassmorphism Aqua para P3R). É um cruzamento prático entre Algoritmos Matemáticos de Matrizes e Web Design Imersivo.

2. Escopo e Funcionalidades

O sistema foi delimitado para prover as ferramentas de fusão de forma rápida e segura.

Principais Funcionalidades:

Guilhotina de Fusão (Cálculo Normal): O usuário cruza o nome de dois ingredientes e o algoritmo calcula a Persona resultante com base nos pesos das Arcanas.

Busca de Registros (Cálculo Reverso): Algoritmo de força bruta de complexidade O(N²) que varre o compêndio e devolve todas as combinações matemáticas possíveis para se chegar em uma Persona Alvo, separando receitas comuns, avançadas e DLC Upgrades.

Fichas de Status (Modal): Painel rico em detalhes apresentando as Afinidades Elementais (Fraquezas, Imunidades, Reflexões), Status Base (Strength, Magic, etc.) e os Traits.

Persona Guess (Minigame P3R): Um modo bônus estilo Wordle que utiliza os dados complexos da API para gerar desafios diários onde o usuário adivinha uma Persona através de dicas de cores (Acerto Exato e Acerto Parcial).

Tutorial Interativo: Sistema Onboarding passo a passo no primeiro acesso à página ensinando a utilizar o hub.

O que faz parte do escopo: * Cálculo matemático de herança de nível e cruzamento de Arcanas.

Exibição visual de status e afinidades consumidos de uma API REST.

Tutoriais e Minigames utilizando os dados de contexto.

O que NÃO faz parte do escopo: * Transferência simulada de Movesets/Skills dinâmicas (embora previsto no Back-end, não foi integrado nesta versão do Front-end).

Negociações, drops de itens ou localizações de mapas.

3. Tecnologias Utilizadas

Este projeto principal foi construído utilizando a fundação raiz do Web Development, com foco em otimização extrema no Client-side, dispensando Frameworks reativos na camada de UI.

(Nota de Projeto: Visando aprofundar os estudos em diferentes arquiteturas, outros membros do nosso grupo também realizaram um porte desta aplicação para React, estruturando a mesma lógica matemática dentro de um ecossistema baseado em componentes e manipulação de estados complexos).

Frontend (Client-Side):

HTML5: Semântica e acessibilidade estrutural.

CSS3: Animações baseadas em Keyframes, Flexbox/CSS Grid avançados, Variáveis Globais de Tema, e recortes geométricos via clip-path.

JavaScript (Vanilla ES6+): * Manipulação avançada e reativa do DOM via document.createElement.

Requisições Assíncronas usando a Fetch API (Async/Await, Promises).

Web Storage API (localStorage) para sistema inteligente de Cache Client-Side.

Backend / Banco de Dados (API Externa):

Ambiente de Execução: Node.js

Framework: Express.js

Hospedagem: Render

Banco de Dados: Arquivos JSON documentais hospedados junto à API.

4. Integrações Externas / API

A aplicação abandonou bancos estáticos locais para consumir os dados via REST API Pública.

Endpoints Utilizados (Método GET):

https://mpppersona5-api.onrender.com/personas/ (Compêndio do Persona 5)

https://persona-compendium.onrender.com/personas/ (Compêndio do Persona 3)

Tratamento de Dados e Engenharia de Rede:

Autenticação: A API é Read-only (pública e focada no consumo do Front-end), não exigindo API Key ou Bearer Tokens.

Bypass de CORS: Implementação pontual de Proxies Seguros (Ex: corsproxy.io) como fallback se o navegador apresentar restrições estritas de requisições de origem cruzada.

Arquitetura de Resiliência (Cold Start):

A API hospedada em versão Free do Render desliga após inatividade.

O Front-end realiza um Warm-up autônomo (um ping Fetch ignorado) assim que a interface abre, acordando a máquina virtual nos bastidores.

Aplica-se uma lógica de Retry com Backoff Exponencial: Se a API não responder, o sistema aguarda 4s, depois 8s, depois 16s, até obter sucesso, comunicando ativamente o status ao usuário via uma barra de Loading dinâmica.

Cache em LocalStorage: Ao obter sucesso na primeira requisição, os dados e um Timestamp (registro de data e hora) são salvos no navegador. As visitas nas próximas 24 horas saltam a rede e carregam o site instantaneamente (0.01s).

5. Como Executar e Acessar

🌐 Acesso Online (Live Preview)

O projeto está hospedado gratuitamente e pode ser testado diretamente em qualquer navegador moderno através do GitHub Pages:
Acessar Persona Fusion Hub

💻 Execução Local (Self-Host)

A arquitetura Client-Side não exige processos de "Build" pesados (como npm run build ou bundlers). Qualquer servidor HTTP local rodará a aplicação com perfeição.

Passo a passo:

Clone este repositório em sua máquina:

git clone [https://github.com/SeuUsuario/persona-fusion-hub.git](https://github.com/SeuUsuario/persona-fusion-hub.git)


Abra a pasta do projeto no seu editor de código (Ex: VS Code).

Utilize a extensão Live Server (ou o pacote global http-server do Node.js/NPM, se preferir via terminal) na raiz do projeto.

O navegador abrirá automaticamente a URL local, ex: http://127.0.0.1:5500/index.html.

6. Estrutura de Pastas

A arquitetura de arquivos foi setorizada por jogo para facilitar a manutenção visual (pois os CSS themes de P3R e P5R diferem drasticamente):

📁 persona-fusion-hub/
├── 📄 index.html                # Portal principal (Menu de Seleção dos Jogos)
├── 📄 global.css                # CSS reset e utilitários globais (esconder scrollbars, etc.)
│
├── 📁 p5r/                      # Módulo do Persona 5 Royal
│   ├── 📄 index.html            # UI das Calculadoras P5R (Guilhotina & Reversa)
│   ├── 📄 style.css             # Tema P5R (Phantom Thief Dark Mode)
│   └── 📄 script.js             # Lógica de fusão, DOM, Fetch API P5R e Tutorial P5R
│
└── 📁 p3r/                      # Módulo do Persona 3 Reload
    ├── 📄 index.html            # UI das Calculadoras P3R
    ├── 📄 p3r-guess.html        # Interface do Minigame "Persona Guess" (Wordle)
    ├── 📄 p3r-style.css         # Tema P3R (Velvet Room Aqua Theme)
    ├── 📄 p3r-script.js         # Lógica de fusão, Minigame, Fetch API P3R e Tutorial P3R
    └── 📁 img-personas/         # Diretório "Self-Hosted" das imagens de Personas


7. Observações Finais

O desenvolvimento deste software exigiu uma tradução robusta e fiel da matemática imersiva aplicada pela desenvolvedora ATLUS nos jogos da franquia, provando a flexibilidade e a eficiência de algoritmos construídos de raiz (Vanilla JS). Ele cumpre os requisitos de Usabilidade, Heurísticas de Controle de UI e Arquitetura Assíncrona Moderna.

8. Agradecimentos

Um agradecimento especial a luylish, desenvolvedor responsável pela criação da Persona Compendium API (Persona 3 Reload).
A estruturação e a disponibilidade pública dessa riquíssima base de dados (com lore, atributos precisos e árvore de imunidades) não só validou a nossa lógica de Fetch, como foi o pilar fundamental que nos permitiu sonhar e construir o minigame Persona Guess. Muito obrigado!
E ao Professor Danilo :)
