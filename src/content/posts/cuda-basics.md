---
title: "CUDA Programming Basics for ML Engineers"
date: "2025-02-12"
excerpt: "Master the GPU thread hierarchy and memory model to write custom high-performance kernels."
tags: ["CUDA", "HPC", "C++"]
readTime: "12 min read"
---

## Thread Hierarchy

CUDA programs execute on thousands of threads organized into a hierarchy:
- **Thread**: Executes a kernel instance.
- **Block**: A group of threads that can share memory (SRAM).
- **Grid**: A collection of blocks.

## Indexing

To identify which piece of data a thread should work on, we calculate a unique ID:

$$
\text{idx} = \text{blockIdx.x} \times \text{blockDim.x} + \text{threadIdx.x}
$$

### Vector Addition Kernel

This is the "Hello World" of CUDA:

```cpp
__global__ void vectorAdd(const float *A, const float *B, float *C, int numElements) {
    int i = blockDim.x * blockIdx.x + threadIdx.x;

    if (i < numElements) {
        C[i] = A[i] + B[i];
    }
}
```

## Memory Types

1. **Global Memory**: Large, high latency (HBM).
2. **Shared Memory**: Small, extremely fast (on-chip SRAM).
3. **Registers**: Fastest, local to each thread.