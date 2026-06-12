# Persona Fusion Hub

Aplicação web para consultar, calcular e planejar fusões de Personas em
**Persona 3 Reload** e **Persona 5 Royal**.

O projeto foi desenvolvido como uma SPA em React, com foco em usabilidade,
clareza visual e automatização de regras que normalmente exigem consulta manual
a tabelas de arcanas, níveis, receitas especiais e exceções de cada jogo.

## Integrantes

- 823163058 - Matheus Pereira Pagaime
- 823211819 - Henrique Doescher Dias
- 823223786 - Caique Alves Correia da Silva
- 824121134 - Leonardo de Souza Morais
- 824217196 - Leonardo Kenji Sato
- 822129662 - Daniel J. Rodrigues

## Visão Geral

No universo de Persona, a fusão de Personas depende de regras específicas:

- combinação de arcanas;
- média de nível das Personas usadas como base;
- Personas especiais;
- DLCs;
- Demônios do Tesouro em Persona 5 Royal;
- exceções próprias de cada jogo.

O **Persona Fusion Hub** reduz esse esforço ao oferecer uma interface direta
para buscar Personas, calcular resultados e encontrar receitas reversas.

## Funcionalidades

### Hub Inicial

Tela inicial com escolha entre:

- Persona 5 Royal;
- Persona 3 Reload.

Cada jogo possui identidade visual própria e rota dedicada.

### Fusão Normal

Permite selecionar duas Personas e calcular o resultado da fusão.

O fluxo valida entradas inválidas, impede fusão da mesma Persona consigo mesma
e retorna a Persona resultante quando a combinação é válida.

### Busca Reversa

Permite selecionar uma Persona alvo e buscar quais pares podem gerá-la.

O sistema simula combinações possíveis em memória e lista as receitas
compatíveis com o resultado desejado.

### Compêndio

Lista pesquisável de Personas, com filtro por nome ou arcana.

Cada Persona pode ser aberta em um modal com informações detalhadas, como:

- arcana;
- nível;
- atributos base;
- fraquezas;
- resistências;
- imunidades;
- reflexões;
- absorções.

### Persona Guess

Minigame de adivinhação para Persona 3 Reload, inspirado em jogos de tentativa
e pista.

O jogador recebe feedback sobre:

- arcana;
- nível;
- fraquezas;
- resistências;
- imunidades.

O modo possui treino e desafio diário, com persistência local para o desafio do
dia.

### Tutorial

O fluxo de Persona 5 Royal possui tutorial de primeira visita, com controle via
`localStorage` para não exibir novamente após o usuário concluir ou pular.

## Escopo

### Incluído

- cálculo de fusão normal;
- busca reversa;
- suporte separado para Persona 3 Reload e Persona 5 Royal;
- regras especiais por jogo;
- tratamento de Demônios do Tesouro em P5R;
- tratamento de Personas especiais e DLC;
- compêndio pesquisável;
- modal de detalhes;
- Persona Guess para P3R;
- cuidados básicos de acessibilidade.

### Fora do escopo atual

- herança de skills;
- builds otimizadas de combate;
- guias de mapas;
- localização de itens;
- estratégias de batalha;
- autenticação de usuários;
- painel administrativo.

## Tecnologias

| Camada | Tecnologia | Uso no projeto |
|---|---|---|
| Frontend | React 18 | Componentização da interface, estados e renderização reativa |
| Build | Vite 5 | Ambiente de desenvolvimento e build de produção |
| Rotas | React Router DOM | Navegação entre Hub, P5R, P3R e Persona Guess |
| Linguagem | JavaScript ES6+ | Algoritmos de fusão, busca reversa e chamadas HTTP |
| Estilo | CSS3 | Temas visuais, responsividade, grid, flexbox e animações |
| API | Serverless function | Proxy para consumo das APIs externas |

## APIs Consumidas

O frontend consulta dados de Personas por meio de um proxy serverless local em
`api/proxy.js`.

Endpoints externos usados pela aplicação:

```text
Persona 5 Royal:
https://mpppersona5-api.onrender.com/personas/

Persona 3 Reload:
https://persona-compendium.onrender.com/personas/
```

O proxy recebe uma URL externa por query string:

```text
/api/proxy?url=<url-externa>
```

Ele repassa o conteúdo da API e adiciona cache HTTP:

```http
Cache-Control: s-maxage=3600, stale-while-revalidate=86400
```

## Rotas da Aplicação

| Rota | Tela |
|---|---|
| `/` | Hub inicial |
| `/p5r` | Calculadora de Persona 5 Royal |
| `/p3r` | Calculadora de Persona 3 Reload |
| `/p3r/guess` | Persona Guess |

## Arquitetura do Projeto

```text
persona-fusion-hub
├── api
│   └── proxy.js
├── public
├── src
│   ├── components
│   │   ├── BuscaPersona.jsx
│   │   ├── FusaoNormalP3R.jsx
│   │   ├── FusaoNormalP5R.jsx
│   │   ├── FusaoReversaP3R.jsx
│   │   ├── FusaoReversaP5R.jsx
│   │   ├── LoaderP3R.jsx
│   │   ├── LoaderP5R.jsx
│   │   ├── ModalPersona.jsx
│   │   └── Tutorial.jsx
│   ├── dados
│   │   ├── arcanasP3R.js
│   │   └── arcanasP5R.js
│   ├── pages
│   │   ├── Hub.jsx
│   │   ├── P3R.jsx
│   │   ├── P3RGuess.jsx
│   │   └── P5R.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── fusao.js
│   ├── fusaoP3R.js
│   ├── main.jsx
│   └── style.css
├── index.html
├── package.json
└── vite.config.js
```

## Organização da Lógica

### `src/fusao.js`

Contém a lógica de fusão para Persona 5 Royal.

Responsabilidades principais:

- identificar Demônios do Tesouro;
- aplicar receitas especiais;
- tratar Personas Picaro;
- calcular fusão normal por arcana e nível;
- executar busca reversa por simulação de pares.

### `src/fusaoP3R.js`

Contém a lógica de fusão para Persona 3 Reload.

Responsabilidades principais:

- aplicar receitas especiais;
- remover DLCs e especiais do pool de fusão normal;
- calcular resultado por arcana e média de nível;
- executar busca reversa com limite de resultados.

### `src/api.js`

Centraliza as chamadas para os compêndios externos e marca Personas especiais
com base nos dados locais de cada jogo.

### `api/proxy.js`

Função serverless responsável por buscar dados externos no lado do servidor e
repassar a resposta para o frontend.

## Acessibilidade e Usabilidade

O projeto possui cuidados implementados para melhorar navegação e leitura:

- foco visível em inputs e elementos interativos;
- abas com `role="tablist"`, `role="tab"` e `role="tabpanel"`;
- uso de `aria-selected`, `aria-controls` e `aria-labelledby`;
- mensagens de erro com `role="alert"`;
- mensagens dinâmicas com `role="status"`;
- modais com `role="dialog"` e `aria-modal="true"`;
- controle de foco dentro dos modais;
- retorno de foco ao elemento que abriu o modal;
- textos visualmente ocultos para leitores de tela;
- Persona Guess com símbolos e texto complementar, evitando depender apenas de
  cor.

Esses pontos se relacionam principalmente com critérios WCAG de foco visível,
nome/função/valor, mensagens de status e uso de cor.

## Como Executar

### Pré-requisitos

- Node.js instalado;
- npm instalado.

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

O Vite exibirá a URL local no terminal.

Observação: o frontend usa `/api/proxy` para buscar dados externos. Essa função
foi escrita no formato serverless. Em desenvolvimento com Vite puro, pode ser
necessário rodar a aplicação em um ambiente compatível com funções serverless
ou configurar um proxy local equivalente para testar a integração completa com
as APIs.

### Build de produção

```bash
npm run build
```

### Prévia do build

```bash
npm run preview
```

## Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente o build gerado |

## Decisões de Projeto

- A lógica de P3R e P5R fica separada para evitar misturar regras diferentes.
- Componentes de fusão e busca são separados por jogo para permitir ajustes
  específicos sem afetar a outra calculadora.
- A interface usa temas visuais distintos para reforçar a identidade de cada
  jogo.
- O proxy serverless reduz acoplamento entre frontend e APIs externas.
- A busca reversa prioriza clareza e previsibilidade, simulando combinações e
  filtrando resultados inválidos.

## Limitações Conhecidas

- O projeto depende da disponibilidade das APIs externas.
- O proxy serverless precisa de ambiente compatível para funcionar fora do Vite
  puro.
- A aplicação não calcula herança de skills.
- A busca reversa pode exigir otimizações futuras caso o volume de dados cresça.
- Imagens externas de Personas podem sofrer bloqueios de hotlinking dependendo
  da origem.

## Possíveis Melhorias Futuras

- cache local dos compêndios;
- retry com backoff para APIs em cold start;
- testes automatizados para os algoritmos de fusão;
- documentação dos casos especiais de cada jogo;
- melhorias de performance na busca reversa;
- suporte a herança de skills;
- tratamento local ou self-hosting de imagens das Personas.

## Objetivo Acadêmico

Este projeto foi desenvolvido com foco em usabilidade, organização de interface
e aplicação prática de regras de domínio em uma aplicação web. Ele demonstra
como transformar uma mecânica complexa de jogo em uma experiência mais clara,
guiada e acessível para o usuário.
