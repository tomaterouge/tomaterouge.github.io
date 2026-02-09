import { Post } from '../types';

const CONTENT_FLASH_ATTENTION: string = `
## The IO Bottleneck

In standard Attention, the GPU spends more time moving data between HBM (High Bandwidth Memory) and SRAM than actually performing computations. 

$$
\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V
$$

FlashAttention addresses this by being **IO-Aware**. It uses **Tiling** to load blocks of $Q, K, V$ into SRAM, computes partial attention, and writes back the result, reducing HBM access from $O(N^2)$ to $O(N)$.

## Key Innovation: Online Softmax

To compute softmax in tiles, we need to track the running maximum $m$ and the running sum $l$.

$$
m_{new} = \\max(m_{old}, m_{block})
$$
$$
l_{new} = e^{m_{old} - m_{new}} l_{old} + e^{m_{block} - m_{new}} l_{block}
$$

### Optimized Kernel Stub

\`\`\`python
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
\`\`\`
`;

const CONTENT_QUANTIZATION: string = `
## Why Quantize?

Large Language Models (LLMs) are memory-bound. A 70B parameter model in FP16 requires ~140GB of VRAM. Quantization reduces the bit-precision of weights (e.g., to 4-bit), allowing that same model to fit in ~40GB.

## Linear Quantization

The most common approach is mapping a range of floating-point values to a range of integers:

$$
Q(x, s, z) = \\text{round}\\left(\\frac{x}{s} + z\\right)
$$

Where $s$ is the **scale** and $z$ is the **zero-point**.

## Modern Techniques

1. **GPTQ**: Layer-wise post-training quantization based on second-order information.
2. **AWQ (Activation-aware Weight Quantization)**: Protects important weights by looking at activation magnitudes.
3. **NF4 (NormalFloat 4)**: Used in QLoRA, optimized for normally distributed weights.

### Loading a Quantized Model

Using \`bitsandbytes\` to load a model in 4-bit:

\`\`\`python
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
\`\`\`
`;

const CONTENT_CUDA_BASICS: string = `
## Thread Hierarchy

CUDA programs execute on thousands of threads organized into a hierarchy:
- **Thread**: Executes a kernel instance.
- **Block**: A group of threads that can share memory (SRAM).
- **Grid**: A collection of blocks.

## Indexing

To identify which piece of data a thread should work on, we calculate a unique ID:

$$
\\text{idx} = \\text{blockIdx.x} \\times \\text{blockDim.x} + \\text{threadIdx.x}
$$

### Vector Addition Kernel

This is the "Hello World" of CUDA:

\`\`\`cpp
__global__ void vectorAdd(const float *A, const float *B, float *C, int numElements) {
    int i = blockDim.x * blockIdx.x + threadIdx.x;

    if (i < numElements) {
        C[i] = A[i] + B[i];
    }
}
\`\`\`

## Memory Types

1. **Global Memory**: Large, high latency (HBM).
2. **Shared Memory**: Small, extremely fast (on-chip SRAM).
3. **Registers**: Fastest, local to each thread.
`;

const POSTS: Post[] = [
  {
    id: '1',
    slug: 'flash-attention-explained',
    title: 'Understanding FlashAttention: IO-Aware Exact Attention',
    excerpt: 'Deep dive into the math and implementation of FlashAttention, optimizing GPU HBM access patterns.',
    content: CONTENT_FLASH_ATTENTION,
    date: '2025-02-08',
    tags: ['Optimization', 'CUDA', 'HPC'],
    readTime: '8 min read'
  },
  {
    id: '2',
    slug: 'intro-to-quantization',
    title: 'Introduction to LLM Quantization',
    excerpt: 'How to fit 70B models into consumer GPUs using INT8, FP4, and NF4 techniques.',
    content: CONTENT_QUANTIZATION,
    date: '2025-02-10',
    tags: ['AI', 'LLM', 'Efficiency'],
    readTime: '6 min read'
  },
  {
    id: '3',
    slug: 'cuda-programming-basics',
    title: 'CUDA Programming Basics for ML Engineers',
    excerpt: 'Master the GPU thread hierarchy and memory model to write custom high-performance kernels.',
    content: CONTENT_CUDA_BASICS,
    date: '2025-02-12',
    tags: ['CUDA', 'HPC', 'C++'],
    readTime: '12 min read'
  }
];

export const getPosts = async (): Promise<Post[]> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return POSTS;
};

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return POSTS.find((p) => p.slug === slug);
};