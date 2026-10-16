# PPgSI — Website (Prova de Conceito)

> ⚠️ **Este repositório é uma prova de conceito.** Não é o site oficial do PPgSI/EACH-USP, nem está vinculado institucionalmente ao programa. É um exercício de redesign feito por conta própria para explorar como o site atual ([ppgsi.each.usp.br](https://ppgsi.each.usp.br)) poderia ser reestruturado com tecnologias modernas, arquitetura de conteúdo mais limpa e uma experiência melhor para alunos, candidatos e pesquisadores.

## Por que essa POC existe

O site atual do PPgSI cumpre a função, mas a navegação é fragmentada, o conteúdo está espalhado entre páginas estáticas, e não há separação clara entre **dados** (pessoas, disciplinas, linhas de pesquisa, editais) e **apresentação**. Esta POC demonstra uma alternativa:

- **Dados como fonte de verdade** — professores, alunos, egressos, CCP, disciplinas, linhas de pesquisa e estatísticas do programa vivem em arquivos YAML versionados (`src/data/`). Atualizar o site = editar YAML + PR.
- **Conteúdo editorial em Markdown** — posts/notícias como coleção de conteúdo Astro, com autores, tags e slug dinâmico.
- **Build estático** — sem CMS, sem banco, sem servidor. Deploy é um bucket ou GitHub Pages.
- **Design coerente** — componentes do design system (`src/components/ds/`, ver [docs/design-system.md](docs/design-system.md)) em vez de HTML duplicado por página.
- **Três idiomas** — português, inglês e espanhol, com o português como padrão.

## Stack

- [Astro 6](https://astro.build) — static site generator
- CSS com os tokens do design system e estilos escopados do Astro — styling ([docs/design-system.md](docs/design-system.md))
- Markdown + YAML — conteúdo
- Node ≥ 22.12

## Estrutura

```
src/
├── data/             # Fonte de verdade: professores, alunos, disciplinas, editais, menu, textos da interface
├── content/
│   ├── pages/<idioma>/  # Páginas de texto (apresentação, normas, FAQ...) — collection `pages`
│   ├── posts/<idioma>/  # Textos de alunos e docentes — collection `posts`
│   └── news/<idioma>/   # Avisos do programa — collection `news`
├── pages/
│   ├── [...locale]/  # Rotas com idioma: Início, editais, pessoas, disciplinas, linhas, avisos, textos
│   └── [...path].astro  # Páginas da collection `pages`
├── components/
│   ├── ds/           # Design system: cabeçalho, rodapé e blocos de página
│   └── Template.astro  # Texto traduzido com trechos marcados ({nome}) preenchidos por elementos
├── layouts/          # Layout (casca), PageLayout (páginas do menu), PostLayout (avisos e textos)
├── lib/
│   ├── data.ts       # Loader dos YAMLs, já no idioma pedido
│   ├── content.ts    # Collections por idioma, com o português como reserva
│   ├── i18n.ts       # Idiomas, idioma da URL, datas
│   └── url.ts        # Links com base e idioma
└── styles/
```

## Idiomas

O português fica sem prefixo (`/website/about`); inglês e espanhol ficam em `/website/en/...` e `/website/es/...`. As rotas são as mesmas nos três idiomas.

- **Dados (`src/data/*.yaml`)**: cada campo de texto é um mapa `{ pt-br, en, es }`. Nomes, links, códigos e datas numéricas são texto simples, iguais em todos os idiomas. Faltando uma tradução, vale o português.
- **Textos da interface e das páginas de Início e Editais**: `src/data/ui.yaml`. Marcadores como `{count}` são preenchidos no código; não traduza o nome dentro das chaves.
- **Conteúdo (`src/content/<collection>/<idioma>/`)**: cada página, aviso ou texto tem um arquivo por idioma, com o mesmo nome. Sem a versão de um idioma, a página aparece em português com um aviso.

## Rodando localmente

```sh
npm install
npm run dev          # http://localhost:4321/website/
npm run build        # gera ./dist
npm run preview
```

## Criando um novo post ou notícia

Posts e notícias são **content collections** distintas do Astro, com esquemas, diretórios e rotas separadas:

| Tipo         | Diretório            | Rota listagem | Rota detalhe         | Propósito                                                |
| :----------- | :------------------- | :------------ | :------------------- | :------------------------------------------------------- |
| **Post**     | `src/content/posts/<idioma>/` | `/posts`      | `/posts/<slug>`      | Artigos autorais de alunos/professores (pesquisa, tutoriais, experimentos). Tem autores, tags, DOI opcional. |
| **Notícia**  | `src/content/news/<idioma>/`  | `/news`       | `/news/<slug>`       | Comunicados oficiais do programa (editais, defesas, eventos). Sem autor individual — é o programa falando. |

Os schemas vivem em [`src/content.config.ts`](src/content.config.ts).

### Criar um post

Nome no padrão `YYYY-MM-DD-slug-descritivo.mdx` em `src/content/posts/pt-br/`; as traduções levam o mesmo nome em `en/` e `es/`:

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
| `doi`     | não         | DOI de publicação vinculada                               |

### Criar uma notícia

Nome no padrão `YYYY-MM-DD-slug-descritivo.mdx` em `src/content/news/pt-br/`; as traduções levam o mesmo nome em `en/` e `es/`. Os três avisos mais recentes aparecem no Início.

```markdown
---
title: "Edital de Mestrado 2026 – 1º semestre publicado"
date: 2026-04-10
summary: "Inscrições abertas para o processo seletivo (Edital EACH/CPG 90/2025)."
source: "EACH/CPG"      # opcional
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

Notícias **não têm autor nem tags** por design — a listagem `/news` é cronológica e enxuta.

### Preview e publicação

**Fluxo recomendado (sem precisar de editor ou conhecer Markdown/YAML):**

1. No GitHub, clique em **Issues → New issue**.
2. Escolha **📰 Nova notícia** ou **✍️ Novo post**.
3. Preencha o formulário (título, data, resumo, conteúdo) e submeta.
4. Um workflow automático lê a issue, gera o `.mdx` com frontmatter correto e abre um **pull request**.
5. Um mantenedor revisa e faz o merge — o site é reconstruído e publicado.

O workflow que faz isso vive em [`.github/workflows/issue-to-pr.yml`](.github/workflows/issue-to-pr.yml), e os formulários em [`.github/ISSUE_TEMPLATE/`](.github/ISSUE_TEMPLATE/).

**Fluxo manual (para quem já está editando o repo localmente):**

```sh
npm run dev                                    # http://localhost:4321/website/
git add src/content/<colecao>/pt-br/<arquivo>.mdx
git commit -m "post: título curto"             # ou "news: ..."
git push
```

## Status

POC funcional cobrindo as principais seções do site atual. Conteúdo usa dados públicos do site oficial como referência. **Não usar em produção sem revisão e curadoria institucional.**

## Licença

Código sob MIT. Conteúdo (textos e imagens derivados do site oficial do PPgSI) pertence ao programa e à USP.
