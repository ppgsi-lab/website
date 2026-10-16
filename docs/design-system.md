# Design system — PPgSI

Sistema visual do site do Programa de Pós-Graduação em Sistemas de Informação da EACH-USP, tirado da proposta F: estrutura de revista e jornal, títulos em serifa, interface em grotesca, teal e amarelo da USP sobre branco, faixas escuras e fios no lugar de sombras.

## Voz e conteúdo

- Escreva em português, com frases curtas, em caixa normal e sem ponto de exclamação.
- Publique só o que está no edital, no regulamento ou no site oficial. Nunca descreva etapa, data ou requisito de seleção sem conferir no edital vigente.
- Cite edital pelo número oficial: "Edital EACH/CPG 90/2025".
- Escreva datas por extenso no texto ("30 de novembro") e abreviadas no cronograma ("30 nov", "1 a 30 nov", "até 30 dez").
- Comece botões pelo verbo e diga o que acontece: "Ler o edital e inscrever-se", "Inscrever-se", "Ver editais e inscrever-se".
- Nomeie links com seta pelo destino: "Conheça a pesquisa", "Todas as notícias e o blog".
- Use rótulos de uma ou duas palavras: Ingresso, Em números, Notícias, Cronograma, Documentos.
- Numere só o que é sequência: os passos da seleção.
- Não repita selos óbvios, como "recomendado pela CAPES", em rodapé ou chamada. A informação vai no FAQ.

## Cor

- Use `paper` de fundo, `ink` no texto, `deep` nos títulos em serifa e `teal` em tudo que é ação: botão, link, rótulo, sinal de mais.
- Use `muted` para texto secundário e `deck` só na linha fina da capa.
- Pinte faixas escuras (faixa do Início, hero de página interna) com o degradê de 100°: `deep` até 55% e `deep-end` na borda direita. O rodapé é `deep` liso.
- Sobre `deep`, escreva em `on-dark`, rotule em `teal-light`, use `on-dark-soft` na linha de apoio e `rule-on-dark` ou `row-rule-on-dark` nos fios.
- Reserve `yellow` para o badge de prazo e o botão amarelo da faixa de chamada e do hero. Texto sobre `yellow` é sempre `ink`.
- Use `teal` como fundo só na faixa de chamada.
- Não use padrão de pontos, sombra nem degradê fora das faixas escuras.

## Tipografia

- Use Newsreader (`font-serif`) em títulos e texto corrido, e Hanken Grotesk (`font-sans`) em interface, números e rótulos.
- Títulos ficam em peso 400. Os grandes (`display`, `headline`, `cta-title`, `section`) têm tracking negativo e entrelinha perto de 1.
- Componha texto corrido em `text`, 19px com entrelinha 1,6, numa coluna de até 36em.
- Use `body` (17px) na interface, `small` (16px) em listas e cronogramas e `meta` (15px) em metadados.
- Rótulos (`label`) têm 12px, peso 700, caixa alta, tracking de 0,16em, cor `teal` e fio de 1px `ink` embaixo.
- Use algarismos tabulares em `stat` e `code`.
- Não destaque uma palavra dentro de um título com cor, itálico ou negrito.

## Grade e espaço

- Use o container `.wrap` (`container-max` de 1264px com `page-margin` de 32px, ou seja, 1200px de conteúdo) e a grade `.g12` (12 colunas, `gutter` de 32px).
- Divida assim: capa 6+6, faixa escura 4+4+4 com divisória no meio da calha, linhas de pesquisa 6+6, disciplinas 6+6, orientadores em três colunas de texto e rodapé 4+2+2+4.
- No edital em andamento, o título ocupa as colunas 1 a 8 e as ações as colunas 9 a 12. Cronograma e documentos ficam em 6+6.
- Em resultados anteriores, o ano ocupa as colunas 1 e 2 e cada processo as colunas 3 a 12, divididas 5+5.
- Abra cada seção com `section-gap` (80px). Deixe `head-gap` (32px) entre o cabeçalho da seção e o conteúdo, e `row-pad` (12px) acima e abaixo de cada linha de lista.

## Fios, raios e superfícies

- `rule-frame` (3px duplo) é moldura: fecha o cabeçalho em `ink` e abre os créditos do rodapé em `frame-on-dark`.
- `rule-section` (3px) em `ink` abre cada seção, acima do título.
- `rule-hairline` (1px) separa linhas de lista em `hairline` e fecha rótulos em `ink`.
- Use raios pequenos e só nestes papéis: `radius-xs` no badge, `radius-sm` em botões e códigos, `radius-md` em imagens e `radius-lg` no acordeão. Faixas e seções não têm raio.
- Use `panel` para linhas clicáveis do acordeão e `tint` para código de disciplina, hover do acordeão e badge suave.

## Imagens

- Use as ilustrações do campus do grupo Imagens. Não use fotos de banco.
- Na capa, a ilustração em retrato preenche a altura da coluna de texto. Ela fica ancorada na base e é desenhada a 118% da altura para cortar o céu, sem cortar o mural do prédio.
- No topo escuro de seção, use a ilustração noturna em 4:3 no desktop e no telefone e em 16:9 no tablet.
- Use `radius-md` em toda imagem e não ponha legenda.

## Logos e assinatura

- No cabeçalho, a assinatura é conjunta: PPgSI, um fio vertical em `ink` a 35% de opacidade, EACH e USP. No desktop, PPgSI tem 56px, EACH 46px e USP 38px de altura, com 20px de espaço.
- No tablet, PPgSI fica à esquerda e EACH e USP à direita, com 48px entre eles e sem fio. O menu desce para a linha de baixo, alinhado à esquerda, com fio `hairline` em cima. Alturas: 48, 40 e 34px.
- No telefone, o PPgSI é recortado ao logotipo (82 por 32px), seguido do fio, de EACH (24px), de USP (20px) e do botão Menu.
- No rodapé, os três logos ficam brancos, com o filtro `brightness(0) invert(1)`, PPgSI e EACH lado a lado, ocupando a largura da coluna na proporção de 44 para 28px de altura, e o USP embaixo, no centro, com 22% da largura.
- Os arquivos não seguem `color` do CSS. Use sempre os arquivos do grupo Logos e não redesenhe nenhuma marca.

## Ícones

- Não há biblioteca de ícones nem emoji. Existem dois sinais, desenhados em CSS.
- A seta (`.arrow`, 22 por 14px, em `currentColor`) vai no fim de botões e links com seta.
- O sinal de mais (`.plus`, 22px, `teal`) vai nas linhas de acordeão. Sem a barra vertical, ele vira menos.

## Responsivo

- Os pontos de quebra são `bp-tablet` (1099px) e `bp-phone` (699px).
- No tablet, a capa vira título, depois imagem em 3:2, depois deck, ações e doutorado à esquerda e texto corrido à direita. A faixa escura mantém 4+4+4. Os orientadores ficam recolhidos atrás da linha "Ver os orientadores" e abrem em duas colunas. Os passos ficam em três colunas.
- No telefone, a margem é `page-margin-phone` (20px) e tudo empilha. O menu fica atrás do botão Menu. Botões principais ocupam a largura toda. Os passos viram lista numerada e o submenu rola na horizontal, aberto na aba ativa. O espaço entre seções é `section-gap-phone` (56px).

## Estados

- No hover, links passam a `deep` com sublinhado, o botão `teal` passa a `deep`, o botão amarelo passa a `paper` e a linha de acordeão passa a `tint`.
- O foco usa o anel padrão do navegador. A única exceção é a linha de recolher orientadores, com contorno `teal` de 2px. Defina um anel de foco antes de levar a produção.

## No código

- `src/styles/tokens.css`: os tokens do design system como variáveis CSS (`--ink`, `--deep`, `--teal`, `--rule-section`, `--container-max`…). Os breakpoints não viram variável, porque media queries não leem variáveis: escreva `1099px` e `699px`.
- `src/styles/global.css`: a base e as peças usadas em qualquer seção, na camada `base`: `.wrap`, `.g12`, `.sec`, `.btn` (`.yellow`, `.lg`), `.arrow`, `.plus`, `.more`, `.badge` (`.soft`), `.lbl`, `.rows`, `.docs`, `.dark`, o texto corrido `.prose` e o conteúdo de páginas e posts em `.doc`, com `.tbl`, `.ft`, `.note` e os blocos de código. Dentro de `.doc`, blocos com tipografia própria levam `.not-doc` e ficam fora das regras de parágrafo, link e lista.
- `src/components/ds/`: um componente por bloco, cada um com o CSS escopado. Como a camada `base` fica abaixo dos estilos escopados, o componente sempre vence a regra global equivalente. Os componentes leem o idioma da URL: links internos passam por `url(rota, idioma)` e os textos fixos vêm de `src/data/ui.yaml`.
- O Markdown e o MDX passam por três ajustes em `astro.config.mjs`: o Shiki usa o tema `css-variables` e envolve cada bloco no quadro `.code`, com a linguagem em cima; cada tabela ganha o contêiner `.tbl`; e os links internos ganham o base e o idioma da pasta do arquivo.

| Componente | O que é |
| --- | --- |
| `Masthead` | Cabeçalho fixo com a assinatura e o menu principal, cada item com um painel de páginas, e o seletor de idioma no fim do menu. A assinatura e o espaço entre os itens diminuem com a tela para tudo caber numa linha de 1100px para cima. Dados em `src/data/navigation.yaml`. |
| `Footer` | Rodapé escuro. Colunas de links em `navigation.yaml`, endereço em `ui.yaml`. No telefone, as duas colunas de links ficam lado a lado. |
| `Front` | Capa do Início. |
| `Band` | Faixa escura de três colunas abaixo da capa, com `.item`, `.rows.nums` e `.rows.news`. |
| `SectionHead` | Abertura de seção, com ação opcional. |
| `Accordion` | Coluna de linha de pesquisa com as áreas em acordeão. |
| `PeopleList` | Orientadores em três colunas; com `toggle`, recolhidos no tablet e no telefone. |
| `CourseList` | Disciplinas do semestre. |
| `CtaBand` | Faixa de chamada antes do rodapé. |
| `PageHero` | Abertura de página interna: escura com ilustração ou clara, com fio fino quando não há submenu (`closed`). O topo é da seção: todas as abas do submenu ficam sob o mesmo, com o nome e a introdução da seção, e a ilustração e o botão vêm de `navigation.yaml`. Páginas fora do menu, como a de um autor, têm topo próprio. A trilha de volta (Início | …) só aparece nelas e nos posts. |
| `SubNav` | Submenu da seção. As abas trocam só o conteúdo, sem recarregar a página (ClientRouter do Astro), e a tela fica onde estava. |
| `CallCard` | Edital em andamento. |
| `Steps` | Etapas numeradas da seleção, três por linha. |
| `YearResults` | Resultados anteriores por ano. |
| `DocLayout` | Corpo de página e post: coluna lateral fixa e texto em `.doc`. Editais e resultados também usa, com os editais, as etapas e os resultados em `.not-doc`. |
| `SideList` | Bloco da coluna lateral: Nesta página, Documentos, Temas. |
| `Byline` | Autores e data de um post. |
| `EntryList` | Lista de avisos ou textos: data, título e uma linha abaixo. |
| `AlsoList` | Mais textos, no fim de um post. |
| `Table` | Tabela `.tbl` a partir de colunas e linhas; uma célula pode ser link. |
| `Button`, `ArrowLink`, `Badge` | Botão com seta, link com seta e badge. |
