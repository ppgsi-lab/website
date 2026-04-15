# PPgSI — Website (Prova de Conceito)

> ⚠️ **Este repositório é uma prova de conceito.** Não é o site oficial do PPgSI/EACH-USP, nem está vinculado institucionalmente ao programa. É um exercício de redesign feito por conta própria para explorar como o site atual ([ppgsi.each.usp.br](https://ppgsi.each.usp.br)) poderia ser reestruturado com tecnologias modernas, arquitetura de conteúdo mais limpa e uma experiência melhor para alunos, candidatos e pesquisadores.

## Por que essa POC existe

O site atual do PPgSI cumpre a função, mas a navegação é fragmentada, o conteúdo está espalhado entre páginas estáticas, e não há separação clara entre **dados** (pessoas, disciplinas, linhas de pesquisa, editais) e **apresentação**. Esta POC demonstra uma alternativa:

- **Dados como fonte de verdade** — professores, alunos, egressos, CCP, disciplinas, linhas de pesquisa e estatísticas do programa vivem em arquivos YAML versionados (`src/data/pt-br/`). Atualizar o site = editar YAML + PR.
- **Conteúdo editorial em Markdown** — posts/notícias como coleção de conteúdo Astro, com autores, tags e slug dinâmico.
- **Build estático** — sem CMS, sem banco, sem servidor. Deploy é um bucket ou GitHub Pages.
- **Design coerente** — sistema de componentes reutilizáveis (`PageHeader`, `Section`, `DataTable`, `PersonCard`, etc.) em vez de HTML duplicado por página.

## Stack

- [Astro 6](https://astro.build) — static site generator
- [Tailwind CSS 4](https://tailwindcss.com) — styling
- Markdown + YAML — conteúdo
- Node ≥ 22.12

## Estrutura

```
src/
├── data/pt-br/       # Fonte de verdade: professores, alunos, disciplinas, linhas...
├── content/
│   ├── posts/        # Artigos autorais (alunos, professores) — collection `posts`
│   └── news/         # Comunicados oficiais do programa — collection `news`
├── pages/            # Rotas
│   ├── about/        # Sobre, pesquisa, produção, regimentos
│   ├── academic/     # Defesa, qualificação, PAE, proficiência, bolsas, formulários
│   ├── admission/    # Editais abertos, aluno especial, estrangeiros
│   ├── courses/      # Catálogo de disciplinas
│   ├── people/       # Orientadores, orientandos, CCP, egressos
│   ├── posts/        # Blog com rota dinâmica, autores e tags
│   ├── news/         # Notícias com rota dinâmica
│   └── faq/
├── components/
│   ├── layout/       # Header, Footer, navegação desktop/mobile
│   ├── ui/           # Componentes reutilizáveis
│   └── *.astro       # Componentes da home
├── layouts/
├── lib/data.ts       # Loader dos YAMLs
└── styles/
```

## Rodando localmente

```sh
npm install
npm run dev          # http://localhost:4321
npm run build        # gera ./dist
npm run preview
```

## Criando um novo post ou notícia

Posts e notícias são **content collections** distintas do Astro, com esquemas, diretórios e rotas separadas:

| Tipo         | Diretório            | Rota listagem | Rota detalhe         | Propósito                                                |
| :----------- | :------------------- | :------------ | :------------------- | :------------------------------------------------------- |
| **Post**     | `src/content/posts/` | `/posts`      | `/posts/<slug>`      | Artigos autorais de alunos/professores (pesquisa, tutoriais, experimentos). Tem autores, tags, DOI opcional. |
| **Notícia**  | `src/content/news/`  | `/news`       | `/news/<slug>`       | Comunicados oficiais do programa (editais, defesas, eventos). Sem autor individual — é o programa falando. |

Os schemas vivem em [`src/content.config.ts`](src/content.config.ts).

### Criar um post

Nome no padrão `YYYY-MM-DD-slug-descritivo.md` em `src/content/posts/`:

```markdown
---
title: "Treinando um ViT no MNIST com GPUs na nuvem"
authors:
  - name: "Gabriel Francisco"
    email: "gabriel.francisco@usp.br"
date: 2026-04-08
tags: ["deep-learning", "cloud"]
summary: "Resumo curto que aparece no card e na home (1-2 frases)."
doi: "10.xxxx/yyyy"   # opcional
cover: "/covers/vit.png"  # opcional
---

Corpo em Markdown (CommonMark + extensões do Astro).
```

| Campo     | Obrigatório | Descrição                                                 |
| :-------- | :---------- | :-------------------------------------------------------- |
| `title`   | sim         | Título exibido no card e na página                        |
| `authors` | sim         | Lista `{name, email}` — cada autor vira `/posts/autores/<nome>` |
| `date`    | sim         | Ordena a listagem                                         |
| `summary` | sim         | Aparece no card e na home                                 |
| `tags`    | não         | Cada tag gera `/posts/tags/<tag>`                         |
| `cover`   | não         | Caminho da imagem de capa                                 |
| `doi`     | não         | DOI de publicação vinculada                               |

O último post aparece automaticamente na home (componente `LatestPosts`).

### Criar uma notícia

Nome no padrão `YYYY-MM-DD-slug-descritivo.md` em `src/content/news/`:

```markdown
---
title: "Edital de Mestrado 2026 – 1º semestre publicado"
date: 2026-04-10
summary: "Inscrições abertas para o processo seletivo (Edital EACH/CPG 90/2025)."
source: "EACH/CPG"      # opcional
cover: "/covers/edital.png"  # opcional
---

Corpo em Markdown. Links internos para páginas do site:
[Editais abertos](/admission/open).
```

| Campo     | Obrigatório | Descrição                                           |
| :-------- | :---------- | :-------------------------------------------------- |
| `title`   | sim         | Título da notícia                                   |
| `date`    | sim         | Data do comunicado                                  |
| `summary` | sim         | Resumo exibido na listagem                          |
| `source`  | não         | Órgão emissor (ex: "EACH/CPG", "CAPES", "CNPq")     |
| `cover`   | não         | Imagem de capa                                      |

Notícias **não têm autor nem tags** por design — a listagem `/news` é cronológica e enxuta.

### Preview e publicação

**Fluxo recomendado (sem precisar de editor ou conhecer Markdown/YAML):**

1. No GitHub, clique em **Issues → New issue**.
2. Escolha **📰 Nova notícia** ou **✍️ Novo post**.
3. Preencha o formulário (título, data, resumo, conteúdo) e submeta.
4. Um workflow automático lê a issue, gera o `.md` com frontmatter correto e abre um **pull request**.
5. Um mantenedor revisa e faz o merge — o site é reconstruído e publicado.

O workflow que faz isso vive em [`.github/workflows/issue-to-pr.yml`](.github/workflows/issue-to-pr.yml), e os formulários em [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/).

**Fluxo manual (para quem já está editando o repo localmente):**

```sh
npm run dev                                    # http://localhost:4321
git add src/content/<colecao>/<arquivo>.md
git commit -m "post: título curto"             # ou "news: ..."
git push
```

## Status

POC funcional cobrindo as principais seções do site atual. Conteúdo usa dados públicos do site oficial como referência. **Não usar em produção sem revisão e curadoria institucional.**

## Licença

Código sob MIT. Conteúdo (textos e imagens derivados do site oficial do PPgSI) pertence ao programa e à USP.
