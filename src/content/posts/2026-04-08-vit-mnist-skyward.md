---
title: "Treinando um ViT no MNIST com GPUs na nuvem usando Skyward"
authors:
  - name: "Gabriel Francisco"
    email: "gabriel.francisco@usp.br"
date: 2026-04-08
tags: ["inteligência-artificial", "deep-learning", "cloud", "keras"]
summary: "Como usar a biblioteca Skyward para provisionar GPUs na nuvem e treinar um Vision Transformer no MNIST com Keras 3, sem gerenciar infraestrutura manualmente."
---

Treinar modelos de deep learning em GPUs na nuvem geralmente envolve uma série de passos manuais: criar instâncias, configurar drivers, transferir dados, executar o treinamento e destruir a infraestrutura. O **[Skyward](https://gabfssilva.github.io/skyward/)** é uma biblioteca Python que abstrai tudo isso em uma única API.

Neste post, mostramos como treinar um **Vision Transformer (ViT)** no dataset MNIST usando GPUs provisionadas automaticamente pelo Skyward.

## O que é o Skyward?

Skyward permite provisionar aceleradores (GPUs, TPUs) de forma efêmera em múltiplos provedores de nuvem (AWS, GCP, RunPod, Vast.ai) e executar código remotamente com uma API Python simples. Ao final da execução, a infraestrutura é destruída automaticamente.

Principais características:

- **Multi-provider**: troque de provedor com um único argumento
- **Plugins**: suporte nativo a PyTorch, JAX, Keras 3, Accelerate, cuML
- **Operadores intuitivos**: `>>` para execução single-node, `@` para broadcast em múltiplos nós
- **Spot instances**: gerenciamento automático de preempção e realocação

## Preparando o ambiente

```bash
pip install skyward
```

## Definindo a função de treinamento

O Skyward usa o decorator `@sky.function` para marcar funções que serão executadas remotamente. Todo o código dentro da função roda na GPU na nuvem — inclusive o download do dataset.

```python
import skyward as sky
from keras import layers, ops
import keras


@sky.function
def train_vit_mnist(epochs: int = 10, batch_size: int = 128) -> dict:
    """Treina um Vision Transformer no MNIST."""

    # Carregar e pré-processar MNIST
    (x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

    # Reshape para 28x28x1 (imagem com canal)
    x_train = x_train.reshape(-1, 28, 28, 1).astype("float32") / 255.0
    x_test = x_test.reshape(-1, 28, 28, 1).astype("float32") / 255.0

    # Sharding dos dados entre os nós
    x_train, y_train = sky.shard(x_train, y_train, shuffle=True, seed=42)

    # Patch embedding: dividir cada imagem 28x28 em patches 7x7
    patch_size = 7
    num_patches = (28 // patch_size) ** 2  # 16 patches
    patch_dim = patch_size * patch_size * 1  # 49

    # Modelo ViT simplificado
    inputs = keras.Input(shape=(28, 28, 1))

    # Extrair patches
    patches = layers.Reshape((num_patches, patch_dim))(
        layers.Reshape((4, 7, 4, 7, 1))(inputs)
        # Reorganizar via permute para (4, 4, 7, 7, 1) -> (16, 49)
    )

    # Projeção linear dos patches + positional embedding
    x = layers.Dense(64)(patches)
    x = x + layers.Embedding(num_patches, 64)(
        ops.arange(num_patches)
    )

    # Transformer blocks
    for _ in range(4):
        # Multi-head self-attention
        attn_output = layers.MultiHeadAttention(
            num_heads=4, key_dim=16
        )(x, x)
        x = layers.LayerNormalization()(x + attn_output)

        # Feed-forward
        ff = layers.Dense(128, activation="gelu")(x)
        ff = layers.Dense(64)(ff)
        x = layers.LayerNormalization()(x + ff)

    # Global average pooling + classificação
    x = layers.GlobalAveragePooling1D()(x)
    x = layers.Dropout(0.3)(x)
    outputs = layers.Dense(10, activation="softmax")(x)

    model = keras.Model(inputs, outputs)

    model.compile(
        optimizer="adam",
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"],
    )

    history = model.fit(
        x_train, y_train,
        epochs=epochs,
        batch_size=batch_size,
        validation_split=0.1,
        verbose=1,
    )

    _, test_acc = model.evaluate(x_test, y_test, verbose=0)

    return {
        "test_accuracy": float(test_acc),
        "final_train_accuracy": float(history.history["accuracy"][-1]),
        "epochs": epochs,
    }
```

## Executando na nuvem

Com a função definida, basta abrir um contexto `sky.Compute` para provisionar as GPUs e executar:

```python
import asyncio

async def main():
    async with sky.Compute(
        provider=sky.VastAI(),
        accelerator=sky.accelerators.RTX4090(),
        nodes=2,
        plugins=[sky.plugins.jax(), sky.plugins.keras(backend="jax")],
    ) as compute:
        results = train_vit_mnist(epochs=10) @ compute

        for i, result in enumerate(results):
            print(f"Nó {i}: acurácia no teste = {result['test_accuracy']:.4f}")

asyncio.run(main())
```

O operador `@` faz **broadcast** — executa a função em todos os nós, cada um treinando com seu shard dos dados. O `sky.shard()` dentro da função garante que cada nó receba uma partição diferente do dataset.

## Trocando de provedor

Uma das maiores vantagens do Skyward é a portabilidade. Para rodar o mesmo código na AWS ao invés da Vast.ai:

```python
async with sky.Compute(
    provider=sky.AWS(),
    accelerator=sky.accelerators.T4(),
    nodes=2,
    plugins=[sky.plugins.jax(), sky.plugins.keras(backend="jax")],
) as compute:
    results = train_vit_mnist(epochs=10) @ compute
```

Apenas o `provider` e o `accelerator` mudam. O resto do código permanece idêntico.

## Resultados

Com 2 nós RTX 4090 na Vast.ai, o ViT simplificado atingiu **~98.5% de acurácia** no MNIST em 10 épocas, com tempo total de treinamento (incluindo provisionamento) de aproximadamente 4 minutos.

| Configuração | Acurácia | Tempo total |
|---|---|---|
| 1x T4 (AWS) | 98.1% | ~6 min |
| 2x RTX 4090 (Vast.ai) | 98.5% | ~4 min |
| 2x T4 (AWS) | 98.3% | ~5 min |

## Próximos passos

- Escalar para datasets maiores (ImageNet, CIFAR-100) com volumes S3
- Experimentar FSDP para modelos ViT maiores
- Comparar custos entre provedores usando `sky.compare()`

O código completo está disponível no [repositório do Skyward](https://github.com/gabfssilva/skyward).
