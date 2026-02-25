---
title: "Introduction to LLM Quantization"
date: "2025-02-10"
excerpt: "How to fit 70B models into consumer GPUs using INT8, FP4, and NF4 techniques."
tags: ["AI", "LLM", "Efficiency"]
---

## Why Quantize?

Large Language Models (LLMs) are memory-bound. A 70B parameter model in FP16 requires ~140GB of VRAM. Quantization reduces the bit-precision of weights (e.g., to 4-bit), allowing that same model to fit in ~40GB.

## Linear Quantization

The most common approach is mapping a range of floating-point values to a range of integers:

$$
Q(x, s, z) = \text{round}\left(\frac{x}{s} + z\right)
$$

Where $s$ is the **scale** and $z$ is the **zero-point**.

## Modern Techniques

1. **GPTQ**: Layer-wise post-training quantization based on second-order information.
2. **AWQ (Activation-aware Weight Quantization)**: Protects important weights by looking at activation magnitudes.
3. **NF4 (NormalFloat 4)**: Used in QLoRA, optimized for normally distributed weights.

### Loading a Quantized Model

Using `bitsandbytes` to load a model in 4-bit:

```python
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype="fb16",
    bnb_4bit_quant_type="nf4"
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=bnb_config
)
```