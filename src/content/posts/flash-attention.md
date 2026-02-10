---
title: "Understanding FlashAttention: IO-Aware Exact Attention"
date: "2025-02-08"
excerpt: "Deep dive into the math and implementation of FlashAttention, optimizing GPU HBM access patterns."
tags: ["Optimization", "CUDA", "HPC"]
readTime: "8 min read"
---

## The IO Bottleneck

In standard Attention, the GPU spends more time moving data between HBM (High Bandwidth Memory) and SRAM than actually performing computations. 

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

FlashAttention addresses this by being **IO-Aware**. It uses **Tiling** to load blocks of $Q, K, V$ into SRAM, computes partial attention, and writes back the result, reducing HBM access from $O(N^2)$ to $O(N)$.

## Key Innovation: Online Softmax

To compute softmax in tiles, we need to track the running maximum $m$ and the running sum $l$.

$$
m_{new} = \max(m_{old}, m_{block})
$$
$$
l_{new} = e^{m_{old} - m_{new}} l_{old} + e^{m_{block} - m_{new}} l_{block}
$$

### Optimized Kernel Stub

```python
import torch

def flash_attn_forward(q, k, v, sm_scale):
    # This simulates the tiling logic performed in CUDA
    L = q.shape[0]
    out = torch.empty_like(q)
    
    # In reality, these loops are parallelized across GPU blocks
    for i in range(0, L, BLOCK_SIZE_M):
        # Load Q block to SRAM
        # Compute S = QK^T, update running softmax stats
        # Compute O = SV
        pass
    return out
```