---
title: "Post-DeepSeek RL: Implementing DPO and GRPO from Scratch in NumPy"
date: "2025-02-24"
excerpt: "Deconstruct modern alignment algorithms like DPO and GRPO by implementing them from first principles using NumPy and Statsmodels."
tags: ["Reinforcement Learning", "Machine Learning", "NumPy", "RLHF"]
---

The landscape of Reinforcement Learning from Human Feedback (RLHF) has shifted. While PPO (Proximal Policy Optimization) was once the gold standard, newer techniques like DPO (Direct Preference Optimization) and GRPO (Group Relative Policy Optimization) have simplified the pipeline by removing complex actor-critic architectures.

In this post, we will strip away the complexity of PyTorch and Transformers to implement these algorithms using nothing but NumPy and Statsmodels. This first principles approach will help you understand the statistical mechanics behind the models powering the latest AI breakthroughs.

### 1. Direct Preference Optimization (DPO)

DPO simplifies RLHF by treating preference learning as a binary classification task. It eliminates the need for a separate Reward Model, instead using the policy itself to define an implicit reward.

Conceptually, DPO assumes that human preferences follow the Bradley-Terry model. We can define the implicit reward $r$ as:

$$r_{\theta}(x, y) = \beta \log \frac{\pi_{\theta}(y|x)}{\pi_{\text{ref}}(y|x)}$$

**Analogy:** Think of DPO like a food critic who no longer needs a detailed 100-point rubric (the Reward Model). Instead, the critic looks at two plates and simply says "Plate A is better than Plate B." By doing this repeatedly, the critic implicitly learns what makes a good meal.

#### Statistical Analysis with Statsmodels
Before building a training loop, we can use statsmodels to treat DPO as a Logistic Regression. Here, we measure how well a model aligns with preferences by analyzing the log-ratio differences between chosen and rejected responses.

```python
import numpy as np
import statsmodels.api as sm

def run_dpo_stats(log_probs_chosen, log_probs_rejected, ref_log_probs_chosen, ref_log_probs_rejected, beta=0.1):
    """
    Analyzes DPO alignment using a Logistic Regression framework.
    """
    # 1. Compute implicit rewards (log-ratios relative to a reference model)
    reward_chosen = beta * (log_probs_chosen - ref_log_probs_chosen)
    reward_rejected = beta * (log_probs_rejected - ref_log_probs_rejected)
    
    # 2. DPO features: the difference in log-ratios
    X = reward_chosen - reward_rejected
    X = sm.add_constant(X)  # Add intercept for statistical fitting
    
    # 3. Target: 1 (since the 'chosen' response is by definition preferred)
    y = np.ones(len(X))
    
    # 4. Use Logit to evaluate the preference margin
    model = sm.Logit(y, X)
    try:
        results = model.fit(disp=0)
        return results.summary()
    except Exception as e:
        return f"Optimization failed: {e} (Likely due to perfect separation)"

# Simulation with dummy data
n_samples = 100
log_p_c, log_p_r = np.random.randn(n_samples), np.random.randn(n_samples)
ref_p_c, ref_p_r = np.random.randn(n_samples), np.random.randn(n_samples)

print(run_dpo_stats(log_p_c, log_p_r, ref_p_c, ref_p_r))
```

### 2. The DPO Training Loop (Pure NumPy)

To actually train a model using DPO, we implement a gradient descent loop. We represent the model as a weight vector $\theta$ and update it by maximizing the likelihood that the preferred response has a higher implicit reward than the rejected one. The loss function we minimize is:

$$\mathcal{L}_{DPO}(\pi_{\theta}; \pi_{\text{ref}}) = -\mathbb{E}_{(x, y_w, y_l) \sim D} \left[ \log \sigma \left( \beta \log \frac{\pi_{\theta}(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi_{\theta}(y_l|x)}{\pi_{\text{ref}}(y_l|x)} \right) \right]$$

```python
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def dpo_train_numpy(X_chosen, X_rejected, ref_log_probs_c, ref_log_probs_r, 
                   epochs=100, lr=0.01, beta=0.1):
    """
    Full DPO Gradient Descent Loop in NumPy.
    """
    n_samples, n_features = X_chosen.shape
    theta = np.zeros(n_features) # Initialize policy weights
    
    for epoch in range(epochs):
        # Forward Pass: Current model log-probs
        log_p_c = X_chosen @ theta
        log_p_r = X_rejected @ theta
        
        # Log-Ratios (Policy vs Reference)
        logits = beta * ((log_p_c - ref_log_probs_c) - (log_p_r - ref_log_probs_r))
        
        # Loss Calculation
        loss = -np.mean(np.log(sigmoid(logits) + 1e-8))
        
        # Gradient: Difference between chosen/rejected features scaled by error
        error = -(1 - sigmoid(logits))
        grad = (beta * error[:, np.newaxis] * (X_chosen - X_rejected)).mean(axis=0)
        
        # Update Weights
        theta -= lr * grad
        
        if epoch % 10 == 0:
            print(f"Epoch {epoch}: Loss = {loss:.4f}")
            
    return theta

# Simulation
N, D = 100, 10
X_c, X_r = np.random.randn(N, D), np.random.randn(N, D)
ref_w = np.random.randn(D)
ref_c, ref_r = X_c @ ref_w, X_r @ ref_w

final_theta = dpo_train_numpy(X_c, X_r, ref_c, ref_r)
```

### 3. Group Relative Policy Optimization (GRPO)

Modern models like DeepSeek-V3 use GRPO. Unlike DPO, which compares two items, GRPO samples a group of outputs for a single prompt and calculates their advantage relative to the group's average performance. This removes the need for a separate Critic or Value model, significantly reducing memory consumption.

The secret sauce here is the Relative Advantage: 

$$A_i = \frac{r_i - \text{mean}(R)}{\text{std}(R)}$$

**Analogy:** Imagine a classroom where every test is graded on a curve. You don't get a score based on a fixed key, but based on how much better or worse you did compared to the rest of the class. If the whole class fails, a 50% might still be an A.

```python
import numpy as np

def grpo_step_numpy(X_group, rewards, old_log_probs, theta, 
                   beta=0.1, epsilon=0.2, lr=0.01):
    """
    GRPO implementation: Group-based advantages with PPO clipping.
    """
    # 1. Compute Group-Relative Advantages (The 'Relative' in GRPO)
    mean_r = np.mean(rewards)
    std_r = np.std(rewards) + 1e-8
    advantages = (rewards - mean_r) / std_r
    
    # 2. Current policy log-probs
    current_log_probs = X_group @ theta
    
    # 3. Importance Sampling Ratio
    # ratio = pi_theta / pi_old
    ratios = np.exp(current_log_probs - old_log_probs)
    
    # 4. PPO Clipped Objective
    surr1 = ratios * advantages
    surr2 = np.clip(ratios, 1 - epsilon, 1 + epsilon) * advantages
    
    # 5. KL Divergence Penalty (keeps policy close to reference)
    kl_penalty = beta * (current_log_probs - old_log_probs)
    
    # 6. Gradient Descent (on negative objective)
    # Masking ensures we only update based on the 'minimum' of the surrogate terms
    mask = (surr1 <= surr2).astype(float)
    grad_surr = (mask * advantages)[:, np.newaxis] * X_group
    grad_kl = beta * X_group
    
    total_grad = -(grad_surr - grad_kl).mean(axis=0)
    
    return theta - lr * total_grad

# Simulation
G, D = 8, 10 # 8 completions per group
X_samples = np.random.randn(G, D)
rewards = np.array([1, 0, 1, 0, 0.5, 0, 1, 0.2]) 
theta_init = np.random.randn(D)
old_probs = X_samples @ theta_init

new_theta = grpo_step_numpy(X_samples, rewards, old_probs, theta_init)
print("GRPO weight update successful.")
```

### 4. Scaling Up: Vectorized Reward Normalization

In a production setting, you do not just process one group or one pair at a time; you process batches of groups. Furthermore, real-world alignment often involves multi-objective rewards (e.g., balancing helpfulness and safety).

To handle this, we need to vectorize the advantage calculation across multiple batches and normalize rewards to ensure the gradients do not explode when one prompt is significantly harder than another.

**Concept:** We are moving from a single group of size $G$ to a tensor of shape $(N, G, D)$, where $N$ is the batch size.

```python
def vectorized_reward_norm(batch_rewards):
    """
    Normalizes rewards across multiple groups simultaneously.
    batch_rewards: Shape (N_batches, G_group_size)
    """
    means = np.mean(batch_rewards, axis=1, keepdims=True)
    stds = np.std(batch_rewards, axis=1, keepdims=True) + 1e-8
    return (batch_rewards - means) / stds

def train_grpo_batch_numpy(X_batches, rewards_batches, old_log_probs_batches, theta, 
                          lr=0.001, beta=0.05):
    """
    Full batch-based GRPO update.
    X_batches: (N, G, D)
    rewards_batches: (N, G)
    """
    N_batch, G_size, D_feat = X_batches.shape
    
    # 1. Normalize advantages across each group independently
    advantages = vectorized_reward_norm(rewards_batches) # (N, G)
    
    # 2. Compute current log-probs for all samples in all batches
    X_flat = X_batches.reshape(-1, D_feat)
    current_log_probs = (X_flat @ theta).reshape(N_batch, G_size)
    
    # 3. Calculate Ratio and KL Penalty
    ratios = np.exp(current_log_probs - old_log_probs_batches)
    kl_grad_term = beta * (current_log_probs - old_log_probs_batches)
    
    # 4. Compute Gradient
    # Weights for the features based on advantages and KL
    weights = (ratios * advantages) - kl_grad_term
    
    # Weighted average of features across all batches and groups
    grad = -(weights[:, :, np.newaxis] * X_batches).mean(axis=(0, 1))
    
    # 5. Step
    theta -= lr * grad
    return theta

# Simulation for 10 prompts, 8 completions each, 10-dimensional features
X_batch_data = np.random.randn(10, 8, 10)
R_batch_data = np.random.rand(10, 8)
P_old_data = (X_batch_data.reshape(-1, 10) @ np.random.randn(10)).reshape(10, 8)
current_theta = np.zeros(10)

updated_theta = train_grpo_batch_numpy(X_batch_data, R_batch_data, P_old_data, current_theta)
print(f"Batch training complete. New theta norm: {np.linalg.norm(updated_theta):.4f}")
```

### 5. Summary: From Statistics to Scale

In this guide, we have traveled from the statistical foundations of alignment to high-performance vectorized training:

1.  **DPO** taught us that preference tuning is essentially a Logistic Regression where the data is the delta between two model outputs.
2.  **GRPO** showed us how to ditch the Critic network by using the variance within a group of samples to define goodness.
3.  **Vectorization** demonstrated that even complex RL algorithms boil down to weighted sums of feature vectors when implemented in NumPy.

Why does this matter? Understanding these algorithms in pure NumPy removes the magic of deep learning libraries. Whether you are fine-tuning a 7B parameter model or building a custom recommendation engine, the core principle remains: amplify the features that lead to higher than average rewards.

### 6. Adding Safety Guardrails: Penalized Optimization

In production, maximizing rewards is not enough: you must also ensure the model does not output unsafe content. In a NumPy RL loop, we implement this by adding a Penalty Term to the objective.

Think of it as a soft constraint: if a completion triggers a safety flag (represented here as a binary or scalar safety score), we subtract that from the reward before normalization.

$$R_{\text{total}} = R_{\text{reward}} - \alpha \cdot S_{\text{safety}}$$

```python
def apply_safety_penalty(rewards, safety_scores, penalty_weight=2.0):
    """
    Subtracts a weighted penalty for safety violations.
    safety_scores: (N, G) - higher means more unsafe.
    """
    return rewards - (penalty_weight * safety_scores)

def safe_grpo_update(X_batches, rewards_batches, safety_batches, old_log_probs, theta, 
                    penalty_w=1.5, lr=0.001):
    """
    GRPO update with an integrated safety guardrail.
    """
    # 1. Adjust rewards based on safety violations
    adjusted_rewards = apply_safety_penalty(rewards_batches, safety_batches, penalty_w)
    
    # 2. Normalize these adjusted rewards to get the Safe Advantage
    safe_advantages = vectorized_reward_norm(adjusted_rewards)
    
    # 3. Calculate gradients
    N, G, D = X_batches.shape
    X_flat = X_batches.reshape(-1, D)
    current_log_probs = (X_flat @ theta).reshape(N, G)
    
    # Ratio of current/old policy
    ratios = np.exp(current_log_probs - old_log_probs)
    
    # Gradient weights informed by both reward and safety
    weights = (ratios * safe_advantages) - 0.01 * (current_log_probs - old_log_probs)
    
    grad = -(weights[:, :, np.newaxis] * X_batches).mean(axis=(0, 1))
    
    return theta - lr * grad

# --- Final Simulation ---
X_data = np.random.randn(10, 8, 10)
R_data = np.random.rand(10, 8)     # Helpfuless reward
S_data = np.random.binomial(1, 0.1, (10, 8)) # 10% safety violation chance
P_old = (X_data.reshape(-1, 10) @ np.random.randn(10)).reshape(10, 8)

safe_theta = safe_grpo_update(X_data, R_data, S_data, P_old, np.zeros(10))
print(f"Safety-aware training complete. Optimized theta: {safe_theta[:3]}...")
```

### 7. The Math to Code Cheat Sheet

To wrap up, it is helpful to see the direct translation from the LaTeX equations found in research papers (like Direct Preference Optimization and DeepSeek-V3's GRPO) into the NumPy logic we have written.

| Concept | Mathematical Notation | NumPy Implementation |
| :--- | :--- | :--- |
| **Implicit Reward** | $r_{\theta}(x, y) = \beta \left( \log \pi_{\theta}(y \mid x) - \log \pi_{\text{ref}}(y \mid x) \right)$ | `beta * (log_p - ref_log_p)` |
| **DPO Loss Gradient** | $\nabla_{\theta} \mathcal{L}_{DPO} = \beta \left( \sigma(\hat{r}_{w} - \hat{r}_{l}) - 1 \right) \left( X_w - X_l \right)$ | `beta * (sigmoid(logits) - 1) * (X_w - X_l)` |
| **Relative Advantage** | $A_i = \frac{r_i - \mu_R}{\sigma_R}$ | `(rewards - np.mean(r)) / np.std(r)` |
| **Importance Sampling** | $\rho = \frac{\pi_{\theta}}{\pi_{\theta_{\text{old}}}} = \exp(\log \pi_{\theta} - \log \pi_{\theta_{\text{old}}})$ | `np.exp(current_log_probs - old_log_probs)` |
| **KL Divergence** | $D_{KL}(\pi_{\theta} \parallel \pi_{\text{ref}}) \approx \log \pi_{\theta} - \log \pi_{\text{ref}}$ | `current_log_probs - ref_log_probs` |

### 8. Summary: Choosing the Right Alignment Tool

Not all alignment tasks are created equal. Use this decision matrix to determine which of our NumPy implementations fits your specific project:

| Feature | DPO (Direct Preference) | GRPO (Group Relative) |
| :--- | :--- | :--- |
| **Data Required** | Static pairs (Winner/Loser) | Dynamic samples + Reward Function |
| **Memory Overhead** | Low (Policy + Ref Model) | Lowest (Policy only, No Critic) |
| **Best Use Case** | Human preference datasets | Math, Coding, Logic verification |
| **Key Strength** | Extremely stable convergence | High sample efficiency in Groups |
| **Primary Risk** | Overfitting to the preference set | Policy collapse without enough groups |

### Final Thoughts: The NumPy Advantage

By implementing DPO, GRPO, Vectorization, and Safety Penalties from scratch, we have demystified the black box of modern AI alignment. 

While deep learning frameworks like PyTorch or JAX are necessary for the billions of parameters in a Llama or DeepSeek model, the core logic remains a simple game of statistical weight adjustment. You are essentially telling the model: "Look at these $G$ options, see which ones performed better than the group average while staying safe, and move your weights in that direction."

This concludes our deep dive into the NumPy powered mechanics of modern RL. Whether you are building a tiny experimental model or scaling to the frontier, you now have the foundational code to align any system with precision.