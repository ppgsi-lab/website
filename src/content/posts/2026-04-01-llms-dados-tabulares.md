---
title: "LLMs para imputação de dados tabulares: resultados preliminares"
authors:
  - name: "Gabriel Francisco"
    email: "gabriel.francisco@usp.br"
  - name: "Sarajane Marques Peres"
    email: "sarajane@usp.br"
date: 2026-04-01
tags: ["inteligência-artificial", "dados-tabulares", "llm"]
summary: "Resultados preliminares do uso de Large Language Models para imputação de valores faltantes em datasets tabulares do domínio de saúde."
doi: "10.1234/example.5678"
---

Apresentamos os resultados preliminares da pesquisa de mestrado sobre o uso de **Large Language Models** para imputação de dados tabulares, com foco em datasets do domínio de saúde.

## Motivação

Dados faltantes são um problema recorrente em bases de dados reais. Métodos tradicionais como MICE e KNN-Imputer têm limitações quando os padrões de ausência são complexos (MNAR — Missing Not At Random).

## Abordagem

Avaliamos a capacidade de LLMs de compreender a estrutura semântica de colunas tabulares e gerar valores plausíveis para células faltantes, usando:

- **GPT-4o** e **Claude 3.5 Sonnet** com prompting estruturado
- Serialização row-by-row com nomes de colunas como contexto
- Comparação contra baselines estatísticos (média, mediana, MICE, missForest)

## Resultados preliminares

| Método | RMSE (normalizado) | R² |
|--------|--------------------|----|
| Média | 0.342 | 0.41 |
| MICE | 0.281 | 0.58 |
| missForest | 0.254 | 0.63 |
| GPT-4o | 0.238 | 0.67 |
| Claude 3.5 | **0.221** | **0.71** |

Os LLMs superaram os baselines em 4 dos 5 datasets avaliados, com ganho mais expressivo em colunas com alta cardinalidade textual.
