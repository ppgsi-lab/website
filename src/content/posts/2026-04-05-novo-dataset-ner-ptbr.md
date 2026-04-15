---
title: "Novo dataset para NER em português brasileiro"
authors:
  - name: "Norton Trevisan Roman"
    email: "norton@usp.br"
date: 2026-04-05
tags: ["pln", "dataset", "ner"]
summary: "Lançamento de um dataset anotado com 15 mil sentenças para reconhecimento de entidades nomeadas em textos jornalísticos em português brasileiro."
---

Anunciamos a disponibilização pública do **NER-PTBR-News**, um dataset para reconhecimento de entidades nomeadas (NER) em português brasileiro.

## Características

- **15.000 sentenças** extraídas de portais jornalísticos brasileiros (2020–2025)
- Anotação manual por 3 anotadores com concordância inter-anotador (Cohen's κ = 0.89)
- 6 categorias: PER, ORG, LOC, DATE, MONEY, MISC
- Formato CoNLL-2003

## Acesso

O dataset está disponível no Hugging Face:

```python
from datasets import load_dataset
ds = load_dataset("ppgsi-each/ner-ptbr-news")
```

## Baselines

Treinamos modelos base para referência:

| Modelo | F1 (micro) |
|--------|-----------|
| BiLSTM-CRF | 0.81 |
| BERTimbau-base | 0.88 |
| BERTimbau-large | **0.91** |
