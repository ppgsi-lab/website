# Design System — PPgSI Website

Referencia completa dos tokens, utilitarios e padroes visuais do site.

---

## Cores

### Paleta USP

| Token | Valor | Uso |
|---|---|---|
| `teal` | `#1094AB` | Cor primaria, links, destaques |
| `teal-dark` | `#0B7A8F` | Hover em links |
| `teal-light` | `#64C4D2` | Destaques secundarios |
| `teal-50` | `#EDF8FA` | Background de tags, hover leve |
| `yellow` | `#FCB421` | Cor de acento, hover nav |
| `yellow-light` | `#FFF3D6` | Background de callouts |

### Neutros

| Token | Valor | Uso |
|---|---|---|
| `ink` | `#111` | Texto primario, headings |
| `ink-2` | `#444` | Texto de corpo |
| `ink-3` | `#777` | Texto terciario |
| `ink-4` | `#AAA` | Metadados, datas, placeholders |
| `bone` | `#FFFFFF` | Background principal |
| `rule` | `#E8E4DF` | Bordas e divisores |

### On-Primary (sobre fundo teal)

| Token | Valor | Uso |
|---|---|---|
| `on-primary` | `#FFFFFF` | Texto principal |
| `on-primary-muted` | `rgba(255,255,255,0.7)` | Links do footer |
| `on-primary-subtle` | `rgba(255,255,255,0.6)` | Endereco, texto secundario |
| `on-primary-faint` | `rgba(255,255,255,0.4)` | Labels eyebrow |
| `on-primary-ghost` | `rgba(255,255,255,0.15)` | Divisores |
| `on-primary-dim` | `rgba(255,255,255,0.3)` | Copyright |

### Misc

| Token | Valor | Uso |
|---|---|---|
| `code-bg` | `#F3F4F6` | Background de codigo inline |

---

## Tipografia

### Fontes

- **Display**: Chillax (headings, titulos, nav) — `font-display`
- **Body**: Synonym (corpo, listas, metadados) — `font-body`
- **Base**: 18px (`html { font-size: 18px }`)

### Escala Display (Chillax)

| Token | Valor | Uso |
|---|---|---|
| `text-display-hero` | `clamp(2.5rem, 5vw, 5rem)` | Titulos de secoes na homepage |
| `text-display-page` | `clamp(2rem, 4vw, 4rem)` | Titulos de pagina (h1) |
| `text-display-post` | `clamp(1.75rem, 3.5vw, 3rem)` | Titulo de post individual |
| `text-display-section` | `clamp(1.375rem, 2vw, 1.75rem)` | Headings de secao (h2) |
| `text-display-card` | `clamp(1.5rem, 2vw, 2rem)` | Titulos de cards, editais |

### Escala Body (Synonym)

| Token | Valor | Uso |
|---|---|---|
| `text-body-lg` | `1.25rem` (20px) | Prosa principal, FAQ, about |
| `text-body` (base) | `1rem` (18px) | Corpo padrao |
| `text-body-sm` | `0.8333rem` (15px) | Texto secundario, footer links |
| `text-body-xs` | `0.7222rem` (13px) | Metadados, datas, codigos |

### Escala UI

| Token | Valor | Uso |
|---|---|---|
| `text-nav` | `1.222rem` (22px) | Links de navegacao desktop |
| `text-eyebrow` | `0.6111rem` (11px) | Labels eyebrow |
| `text-tag` | `0.6667rem` (12px) | Tags |
| `text-stat` | `clamp(4rem, 6vw, 5rem)` | Numeros estatisticos |

### Line Heights

| Token | Valor | Uso |
|---|---|---|
| `leading-display-hero` | `1.0` | Hero e secoes grandes |
| `leading-display-page` | `1.1` | Titulos de pagina |
| `leading-display-section` | `1.2` | Headings h2 |
| `leading-display-card` | `1.25` | Titulos de card |

### Font Weights

| Contexto | Peso | Classe |
|---|---|---|
| Headings (h1-h3) | 700 | `font-bold` |
| Elementos interativos (FAQ summary) | 600 | `font-semibold` |
| Nav dropdown items | 600 | `font-semibold` |
| Enfase no corpo | 500 | `font-medium` |
| Corpo normal | 400 | `font-normal` |

---

## Spacing

### Secoes

| Token | Valor | Uso |
|---|---|---|
| `py-section` | `5rem` (80px) | Padding vertical padrao |
| `py-section-md` | `7rem` (112px) | Padding vertical em md+ |
| `py-section-compact` | `3rem` (48px) | Secoes compactas |
| `py-section-compact-md` | `4rem` (64px) | Compactas em md+ |

### Containers

| Token | Valor | Uso |
|---|---|---|
| `max-w-container` | `87.5rem` (1400px) | Layout principal |
| `max-w-content` | `56rem` (~896px) | Conteudo estruturado (cursos) |
| `max-w-prose` | `50rem` (800px) | Leitura de posts |
| `max-w-narrative` | `48rem` (~768px) | Prosa longa (about) |

### Heading Margins (padrao)

- **h2**: `mt-12 mb-4`
- **h3**: `mt-8 mb-3`
- **PageHeader h1**: `mb-4` (com eyebrow) ou `mb-12` (standalone)

---

## Utilitarios

### `eyebrow`

Label de rotulo: 11px, bold, uppercase, letter-spacing 0.1em.

```html
<p class="eyebrow text-teal">Secao</p>
<p class="eyebrow text-ink-4">Categoria</p>
<p class="eyebrow text-on-primary-faint">Footer label</p>
```

### `code-inline`

Codigo inline fora do contexto prose.

```html
<code class="code-inline">SIN5000</code>
```

---

## Componentes

### `.callout`

Caixa de alerta/aviso com borda amarela.

```html
<div class="callout mt-8">
  <p>Texto do aviso.</p>
</div>
```

### `.hover-item`

Hover com fundo amarelo para elementos interativos (nav, filtros).

```html
<a href="..." class="hover-item px-4 py-2 text-sm font-medium text-ink">
  Link
</a>
```

---

## Padroes de Link

| Padrao | Classes | Onde |
|---|---|---|
| **Nav** | `.hover-item` (fundo amarelo) | Header, filtros |
| **Conteudo** | `text-teal hover:underline` | Links inline em texto |
| **Card titulo** | `text-ink hover:text-teal transition-colors` | Titulos clicaveis |
| **Sutil** | `text-ink-4 hover:text-ink transition-colors` | Back links, "ver todos" |

---

## Padroes de Card

### Card padrao (posts, editais)
```html
<div class="border border-rule p-6 md:p-8 hover:border-teal transition-colors">
  ...
</div>
```

### Card de enfase (linhas de pesquisa)
```html
<div class="border-2 border-teal hover:bg-teal-50 transition-colors">
  ...
</div>
```

A borda `border-2` e intencional para enfase visual.

---

## Tabelas

O componente `DataTable.astro` padroniza tabelas com:
- Header: `border-b-2 border-ink`, texto bold
- Rows: `border-b border-rule`
- Primeira coluna: `text-ink font-medium`
- Demais: `text-ink-2`

Para tabelas customizadas em paginas, seguir o mesmo padrao.

---

## Regras Globais

1. **`border-radius: 0`** em todos os elementos
2. **Texto justificado** em `<p>`, `<li>`, `<td>` dentro de `<main>`
3. **Transicoes**: `transition-fast` (150ms) e `transition-default` (200ms)
4. **Animacao `.rise`**: entrada com fade + translateY, delays `.rise-d1` a `.rise-d4`
5. **Selection**: fundo teal, texto branco
6. **Focus-visible**: outline 2px teal com 3px offset

---

## Section.astro

O componente `Section` aceita props:
- `width`: `'full'` | `'content'` | `'prose'` | `'narrative'`
- `narrow`: alias para `width="narrative"`
- `class`: classes adicionais

```html
<Section>Full width (1400px)</Section>
<Section narrow>Narrative width (768px)</Section>
<Section width="prose">Post reading (800px)</Section>
<Section width="content">Structured content (896px)</Section>
```
