import{S as Subscribable,p as pendingThenable,a as resolveEnabled,s as shallowEqualObjects,b as resolveStaleTime,n as noop,i as isServer,d as isValidTimeout,t as timeUntilStale,e as timeoutManager,f as focusManager,h as fetchState,k as replaceData,l as notifyManager,r as reactExports,m as shouldThrowError,u as useQueryClient,c as createLucideIcon,o as getAugmentedNamespace,g as getDefaultExportFromCjs}from"./index-DOm2L5b4.js";var QueryObserver=class extends Subscribable{constructor(r,t){super(),this.options=t,this.#r=r,this.#i=null,this.#t=pendingThenable(),this.bindMethods(),this.setOptions(t)}#r;#e=void 0;#d=void 0;#n=void 0;#a;#c;#t;#i;#m;#f;#p;#s;#u;#o;#h=new Set;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(this.#e.addObserver(this),shouldFetchOnMount(this.#e,this.options)?this.#l():this.updateResult(),this.#v())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return shouldFetchOn(this.#e,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return shouldFetchOn(this.#e,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#x(),this.#b(),this.#e.removeObserver(this)}setOptions(r){const t=this.options,d=this.#e;if(this.options=this.#r.defaultQueryOptions(r),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof resolveEnabled(this.options.enabled,this.#e)!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");this.#w(),this.#e.setOptions(this.options),t._defaulted&&!shallowEqualObjects(this.options,t)&&this.#r.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#e,observer:this});const o=this.hasListeners();o&&shouldFetchOptionally(this.#e,d,this.options,t)&&this.#l(),this.updateResult(),o&&(this.#e!==d||resolveEnabled(this.options.enabled,this.#e)!==resolveEnabled(t.enabled,this.#e)||resolveStaleTime(this.options.staleTime,this.#e)!==resolveStaleTime(t.staleTime,this.#e))&&this.#g();const l=this.#y();o&&(this.#e!==d||resolveEnabled(this.options.enabled,this.#e)!==resolveEnabled(t.enabled,this.#e)||l!==this.#o)&&this.#_(l)}getOptimisticResult(r){const t=this.#r.getQueryCache().build(this.#r,r),d=this.createResult(t,r);return shouldAssignObserverCurrentProperties(this,d)&&(this.#n=d,this.#c=this.options,this.#a=this.#e.state),d}getCurrentResult(){return this.#n}trackResult(r,t){return new Proxy(r,{get:(d,o)=>(this.trackProp(o),t?.(o),o==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&this.#t.status==="pending"&&this.#t.reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(d,o))})}trackProp(r){this.#h.add(r)}getCurrentQuery(){return this.#e}refetch({...r}={}){return this.fetch({...r})}fetchOptimistic(r){const t=this.#r.defaultQueryOptions(r),d=this.#r.getQueryCache().build(this.#r,t);return d.fetch().then(()=>this.createResult(d,t))}fetch(r){return this.#l({...r,cancelRefetch:r.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#n))}#l(r){this.#w();let t=this.#e.fetch(this.options,r);return r?.throwOnError||(t=t.catch(noop)),t}#g(){this.#x();const r=resolveStaleTime(this.options.staleTime,this.#e);if(isServer||this.#n.isStale||!isValidTimeout(r))return;const d=timeUntilStale(this.#n.dataUpdatedAt,r)+1;this.#s=timeoutManager.setTimeout(()=>{this.#n.isStale||this.updateResult()},d)}#y(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.#e):this.options.refetchInterval)??!1}#_(r){this.#b(),this.#o=r,!(isServer||resolveEnabled(this.options.enabled,this.#e)===!1||!isValidTimeout(this.#o)||this.#o===0)&&(this.#u=timeoutManager.setInterval(()=>{(this.options.refetchIntervalInBackground||focusManager.isFocused())&&this.#l()},this.#o))}#v(){this.#g(),this.#_(this.#y())}#x(){this.#s&&(timeoutManager.clearTimeout(this.#s),this.#s=void 0)}#b(){this.#u&&(timeoutManager.clearInterval(this.#u),this.#u=void 0)}createResult(r,t){const d=this.#e,o=this.options,l=this.#n,c=this.#a,f=this.#c,i=r!==d?r.state:this.#d,{state:s}=r;let a={...s},h=!1,x;if(t._optimisticResults){const B=this.hasListeners(),G=!B&&shouldFetchOnMount(r,t),W=B&&shouldFetchOptionally(r,d,t,o);(G||W)&&(a={...a,...fetchState(s.data,r.options)}),t._optimisticResults==="isRestoring"&&(a.fetchStatus="idle")}let{error:C,errorUpdatedAt:q,status:k}=a;x=a.data;let P=!1;if(t.placeholderData!==void 0&&x===void 0&&k==="pending"){let B;l?.isPlaceholderData&&t.placeholderData===f?.placeholderData?(B=l.data,P=!0):B=typeof t.placeholderData=="function"?t.placeholderData(this.#p?.state.data,this.#p):t.placeholderData,B!==void 0&&(k="success",x=replaceData(l?.data,B,t),h=!0)}if(t.select&&x!==void 0&&!P)if(l&&x===c?.data&&t.select===this.#m)x=this.#f;else try{this.#m=t.select,x=t.select(x),x=replaceData(l?.data,x,t),this.#f=x,this.#i=null}catch(B){this.#i=B}this.#i&&(C=this.#i,x=this.#f,q=Date.now(),k="error");const D=a.fetchStatus==="fetching",N=k==="pending",L=k==="error",$=N&&D,M=x!==void 0,Y={status:k,fetchStatus:a.fetchStatus,isPending:N,isSuccess:k==="success",isError:L,isInitialLoading:$,isLoading:$,data:x,dataUpdatedAt:a.dataUpdatedAt,error:C,errorUpdatedAt:q,failureCount:a.fetchFailureCount,failureReason:a.fetchFailureReason,errorUpdateCount:a.errorUpdateCount,isFetched:a.dataUpdateCount>0||a.errorUpdateCount>0,isFetchedAfterMount:a.dataUpdateCount>i.dataUpdateCount||a.errorUpdateCount>i.errorUpdateCount,isFetching:D,isRefetching:D&&!N,isLoadingError:L&&!M,isPaused:a.fetchStatus==="paused",isPlaceholderData:h,isRefetchError:L&&M,isStale:isStale(r,t),refetch:this.refetch,promise:this.#t,isEnabled:resolveEnabled(t.enabled,r)!==!1};if(this.options.experimental_prefetchInRender){const B=Y.data!==void 0,G=Y.status==="error"&&!B,W=X=>{G?X.reject(Y.error):B&&X.resolve(Y.data)},ee=()=>{const X=this.#t=Y.promise=pendingThenable();W(X)},J=this.#t;switch(J.status){case"pending":r.queryHash===d.queryHash&&W(J);break;case"fulfilled":(G||Y.data!==J.value)&&ee();break;case"rejected":(!G||Y.error!==J.reason)&&ee();break}}return Y}updateResult(){const r=this.#n,t=this.createResult(this.#e,this.options);if(this.#a=this.#e.state,this.#c=this.options,this.#a.data!==void 0&&(this.#p=this.#e),shallowEqualObjects(t,r))return;this.#n=t;const d=()=>{if(!r)return!0;const{notifyOnChangeProps:o}=this.options,l=typeof o=="function"?o():o;if(l==="all"||!l&&!this.#h.size)return!0;const c=new Set(l??this.#h);return this.options.throwOnError&&c.add("error"),Object.keys(this.#n).some(f=>{const g=f;return this.#n[g]!==r[g]&&c.has(g)})};this.#R({listeners:d()})}#w(){const r=this.#r.getQueryCache().build(this.#r,this.options);if(r===this.#e)return;const t=this.#e;this.#e=r,this.#d=r.state,this.hasListeners()&&(t?.removeObserver(this),r.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#v()}#R(r){notifyManager.batch(()=>{r.listeners&&this.listeners.forEach(t=>{t(this.#n)}),this.#r.getQueryCache().notify({query:this.#e,type:"observerResultsUpdated"})})}};function shouldLoadOnMount(r,t){return resolveEnabled(t.enabled,r)!==!1&&r.state.data===void 0&&!(r.state.status==="error"&&t.retryOnMount===!1)}function shouldFetchOnMount(r,t){return shouldLoadOnMount(r,t)||r.state.data!==void 0&&shouldFetchOn(r,t,t.refetchOnMount)}function shouldFetchOn(r,t,d){if(resolveEnabled(t.enabled,r)!==!1&&resolveStaleTime(t.staleTime,r)!=="static"){const o=typeof d=="function"?d(r):d;return o==="always"||o!==!1&&isStale(r,t)}return!1}function shouldFetchOptionally(r,t,d,o){return(r!==t||resolveEnabled(o.enabled,r)===!1)&&(!d.suspense||r.state.status!=="error")&&isStale(r,d)}function isStale(r,t){return resolveEnabled(t.enabled,r)!==!1&&r.isStaleByTime(resolveStaleTime(t.staleTime,r))}function shouldAssignObserverCurrentProperties(r,t){return!shallowEqualObjects(r.getCurrentResult(),t)}var IsRestoringContext=reactExports.createContext(!1),useIsRestoring=()=>reactExports.useContext(IsRestoringContext);IsRestoringContext.Provider;function createValue(){let r=!1;return{clearReset:()=>{r=!1},reset:()=>{r=!0},isReset:()=>r}}var QueryErrorResetBoundaryContext=reactExports.createContext(createValue()),useQueryErrorResetBoundary=()=>reactExports.useContext(QueryErrorResetBoundaryContext),ensurePreventErrorBoundaryRetry=(r,t,d)=>{const o=d?.state.error&&typeof r.throwOnError=="function"?shouldThrowError(r.throwOnError,[d.state.error,d]):r.throwOnError;(r.suspense||r.experimental_prefetchInRender||o)&&(t.isReset()||(r.retryOnMount=!1))},useClearResetErrorBoundary=r=>{reactExports.useEffect(()=>{r.clearReset()},[r])},getHasError=({result:r,errorResetBoundary:t,throwOnError:d,query:o,suspense:l})=>r.isError&&!t.isReset()&&!r.isFetching&&o&&(l&&r.data===void 0||shouldThrowError(d,[r.error,o])),ensureSuspenseTimers=r=>{if(r.suspense){const d=l=>l==="static"?l:Math.max(l??1e3,1e3),o=r.staleTime;r.staleTime=typeof o=="function"?(...l)=>d(o(...l)):d(o),typeof r.gcTime=="number"&&(r.gcTime=Math.max(r.gcTime,1e3))}},willFetch=(r,t)=>r.isLoading&&r.isFetching&&!t,shouldSuspend=(r,t)=>r?.suspense&&t.isPending,fetchOptimistic=(r,t,d)=>t.fetchOptimistic(r).catch(()=>{d.clearReset()});function useBaseQuery(r,t,d){const o=useIsRestoring(),l=useQueryErrorResetBoundary(),c=useQueryClient(),f=c.defaultQueryOptions(r);c.getDefaultOptions().queries?._experimental_beforeQuery?.(f);const g=c.getQueryCache().get(f.queryHash);f._optimisticResults=o?"isRestoring":"optimistic",ensureSuspenseTimers(f),ensurePreventErrorBoundaryRetry(f,l,g),useClearResetErrorBoundary(l);const i=!c.getQueryCache().get(f.queryHash),[s]=reactExports.useState(()=>new t(c,f)),a=s.getOptimisticResult(f),h=!o&&r.subscribed!==!1;if(reactExports.useSyncExternalStore(reactExports.useCallback(x=>{const C=h?s.subscribe(notifyManager.batchCalls(x)):noop;return s.updateResult(),C},[s,h]),()=>s.getCurrentResult(),()=>s.getCurrentResult()),reactExports.useEffect(()=>{s.setOptions(f)},[f,s]),shouldSuspend(f,a))throw fetchOptimistic(f,s,l);if(getHasError({result:a,errorResetBoundary:l,throwOnError:f.throwOnError,query:g,suspense:f.suspense}))throw a.error;return c.getDefaultOptions().queries?._experimental_afterQuery?.(f,a),f.experimental_prefetchInRender&&!isServer&&willFetch(a,o)&&(i?fetchOptimistic(f,s,l):g?.promise)?.catch(noop).finally(()=>{s.updateResult()}),f.notifyOnChangeProps?a:s.trackResult(a)}function useQuery(r,t){return useBaseQuery(r,QueryObserver)}const __iconNode$1=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],Calendar=createLucideIcon("calendar",__iconNode$1);const __iconNode=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Clock=createLucideIcon("clock",__iconNode),__vite_glob_0_0=`---
title: "CUDA Programming Basics for ML Engineers"
date: "2025-02-12"
excerpt: "Master the GPU thread hierarchy and memory model to write custom high-performance kernels."
tags: ["CUDA", "HPC", "C++"]
---

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
3. **Registers**: Fastest, local to each thread.`,__vite_glob_0_1=`---
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

$$r_{\\theta}(x, y) = \\beta \\log \\frac{\\pi_{\\theta}(y|x)}{\\pi_{\\text{ref}}(y|x)}$$

**Analogy:** Think of DPO like a food critic who no longer needs a detailed 100-point rubric (the Reward Model). Instead, the critic looks at two plates and simply says "Plate A is better than Plate B." By doing this repeatedly, the critic implicitly learns what makes a good meal.

#### Statistical Analysis with Statsmodels
Before building a training loop, we can use statsmodels to treat DPO as a Logistic Regression. Here, we measure how well a model aligns with preferences by analyzing the log-ratio differences between chosen and rejected responses.

\`\`\`python
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
\`\`\`

### 2. The DPO Training Loop (Pure NumPy)

To actually train a model using DPO, we implement a gradient descent loop. We represent the model as a weight vector $\\theta$ and update it by maximizing the likelihood that the preferred response has a higher implicit reward than the rejected one. The loss function we minimize is:

$$\\mathcal{L}_{DPO}(\\pi_{\\theta}; \\pi_{\\text{ref}}) = -\\mathbb{E}_{(x, y_w, y_l) \\sim D} \\left[ \\log \\sigma \\left( \\beta \\log \\frac{\\pi_{\\theta}(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta \\log \\frac{\\pi_{\\theta}(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)} \\right) \\right]$$

\`\`\`python
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
\`\`\`

### 3. Group Relative Policy Optimization (GRPO)

Modern models like DeepSeek-V3 use GRPO. Unlike DPO, which compares two items, GRPO samples a group of outputs for a single prompt and calculates their advantage relative to the group's average performance. This removes the need for a separate Critic or Value model, significantly reducing memory consumption.

The secret sauce here is the Relative Advantage: 

$$A_i = \\frac{r_i - \\text{mean}(R)}{\\text{std}(R)}$$

**Analogy:** Imagine a classroom where every test is graded on a curve. You don't get a score based on a fixed key, but based on how much better or worse you did compared to the rest of the class. If the whole class fails, a 50% might still be an A.

\`\`\`python
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
\`\`\`

### 4. Scaling Up: Vectorized Reward Normalization

In a production setting, you do not just process one group or one pair at a time; you process batches of groups. Furthermore, real-world alignment often involves multi-objective rewards (e.g., balancing helpfulness and safety).

To handle this, we need to vectorize the advantage calculation across multiple batches and normalize rewards to ensure the gradients do not explode when one prompt is significantly harder than another.

**Concept:** We are moving from a single group of size $G$ to a tensor of shape $(N, G, D)$, where $N$ is the batch size.

\`\`\`python
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
\`\`\`

### 5. Summary: From Statistics to Scale

In this guide, we have traveled from the statistical foundations of alignment to high-performance vectorized training:

1.  **DPO** taught us that preference tuning is essentially a Logistic Regression where the data is the delta between two model outputs.
2.  **GRPO** showed us how to ditch the Critic network by using the variance within a group of samples to define goodness.
3.  **Vectorization** demonstrated that even complex RL algorithms boil down to weighted sums of feature vectors when implemented in NumPy.

Why does this matter? Understanding these algorithms in pure NumPy removes the magic of deep learning libraries. Whether you are fine-tuning a 7B parameter model or building a custom recommendation engine, the core principle remains: amplify the features that lead to higher than average rewards.

### 6. Adding Safety Guardrails: Penalized Optimization

In production, maximizing rewards is not enough: you must also ensure the model does not output unsafe content. In a NumPy RL loop, we implement this by adding a Penalty Term to the objective.

Think of it as a soft constraint: if a completion triggers a safety flag (represented here as a binary or scalar safety score), we subtract that from the reward before normalization.

$$R_{\\text{total}} = R_{\\text{reward}} - \\alpha \\cdot S_{\\text{safety}}$$

\`\`\`python
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
\`\`\`

### 7. The Math to Code Cheat Sheet

To wrap up, it is helpful to see the direct translation from the LaTeX equations found in research papers (like Direct Preference Optimization and DeepSeek-V3's GRPO) into the NumPy logic we have written.

| Concept | Mathematical Notation | NumPy Implementation |
| :--- | :--- | :--- |
| **Implicit Reward** | $r_{\\theta}(x, y) = \\beta \\left( \\log \\pi_{\\theta}(y \\mid x) - \\log \\pi_{\\text{ref}}(y \\mid x) \\right)$ | \`beta * (log_p - ref_log_p)\` |
| **DPO Loss Gradient** | $\\nabla_{\\theta} \\mathcal{L}_{DPO} = \\beta \\left( \\sigma(\\hat{r}_{w} - \\hat{r}_{l}) - 1 \\right) \\left( X_w - X_l \\right)$ | \`beta * (sigmoid(logits) - 1) * (X_w - X_l)\` |
| **Relative Advantage** | $A_i = \\frac{r_i - \\mu_R}{\\sigma_R}$ | \`(rewards - np.mean(r)) / np.std(r)\` |
| **Importance Sampling** | $\\rho = \\frac{\\pi_{\\theta}}{\\pi_{\\theta_{\\text{old}}}} = \\exp(\\log \\pi_{\\theta} - \\log \\pi_{\\theta_{\\text{old}}})$ | \`np.exp(current_log_probs - old_log_probs)\` |
| **KL Divergence** | $D_{KL}(\\pi_{\\theta} \\parallel \\pi_{\\text{ref}}) \\approx \\log \\pi_{\\theta} - \\log \\pi_{\\text{ref}}$ | \`current_log_probs - ref_log_probs\` |

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

This concludes our deep dive into the NumPy powered mechanics of modern RL. Whether you are building a tiny experimental model or scaling to the frontier, you now have the foundational code to align any system with precision.`,__vite_glob_0_2=`---
title: "Understanding FlashAttention: IO-Aware Exact Attention"
date: "2025-02-08"
excerpt: "Deep dive into the math and implementation of FlashAttention, optimizing GPU HBM access patterns."
tags: ["Optimization", "CUDA", "HPC"]
---

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
\`\`\``,__vite_glob_0_3=`---
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
\`\`\``,__vite_glob_0_4=`---
title: "The Architecture of Autonomy: A Deep Dive into Meta’s Dr. Zero and HRPO"
date: "2026-02-09"
excerpt: "An exhaustive technical breakdown of the DeepResearch-Zero framework, exploring the Proposer-Solver co-evolution loop and the 75% efficiency gains of Hop-Grouped Relative Policy Optimization."
tags: ["Machine Learning", "Reinforcement Learning", "Meta AI", "HRPO", "Deep Research"]
---

# The Dawn of DeepResearch-Zero: When AI Teaches Itself to Research

In January 2026, **Meta Superintelligence Labs** published a seminal paper titled *“Dr. Zero: Self-Evolving Search Agents without Training Data.”* It tackles the most significant bottleneck in modern AI: the finite supply of high-quality, human-labeled data.

Dr. Zero isn't just a model; it is a **self-evolutionary framework** that allows search agents to reach state-of-the-art performance by playing a "game of research" against themselves. By the end of this deep dive, you will understand the co-evolutionary loop, the difficulty-guided rewards, and the breakthrough efficiency of **HRPO**.

---

## 1. The Philosophy: Zero-Shot Self-Evolution

Traditional models rely on human-curated search logs. Dr. Zero replaces humans with a **Co-Evolutionary Loop** between two agents initialized from the same base model (e.g., Llama 3).

### The Proposer ($\\pi_\\theta$)

The Proposer acts as the "Architect of Complexity." It scans raw, unlabelled text (like a Wikipedia dump) and synthesizes "Knowledge Bridges." It finds two distant facts and creates a question that requires a "hop" between them.

### The Solver ($\\pi_\\phi$)

The Solver is the "Active Researcher." It receives a question and must use an interleaved **Thought  Action  Observation** loop to navigate a search environment and find the answer.

---

## 2. The Multi-Hop Reasoning Mechanics

The Solver utilizes a state-space search strategy. It doesn't just "Google and summarize"; it performs **Iterative Query Expansion**.

1. **Selection:** Identifies missing links in the current context.
2. **Transformation:** Converts thoughts into keyword-dense queries.
3. **Cross-Document Verification:** Validates Fact A from Source 1 against Fact B from Source 2.

---

## 3. The Mathematics of Optimization: HRPO

The biggest breakthrough in Dr. Zero is **Hop-Grouped Relative Policy Optimization (HRPO)**. It solves the "Nested Sampling" problem—where training an agent to search is usually too expensive.

### The Advantage Formula

Instead of comparing an agent to itself on the same question (GRPO), HRPO clusters questions by their **Hop Count** (structural complexity).

$$\\hat{A}_t = \\frac{R_i - \\text{mean}(R_{\\text{hop-group}})}{\\text{std}(R_{\\text{hop-group}})}$$

### The Policy Gradient Loss

The loss function $L(\\theta)$ ensures stable updates:

$$L(\\theta) = - \\mathbb{E} \\left[ \\sum_{t=1}^{T} \\frac{\\pi_\\theta(a_t | s_t)}{\\pi_{\\text{old}}(a_t | s_t)} \\hat{A}_t \\right]$$

---

## 4. The Proposer’s Reward Logic

The Proposer is rewarded for finding the **Proximal Development Zone**—the "Goldilocks Zone" of difficulty.

$$R_{prop} = \\mathbb{I}(0 < k < n) \\cdot \\exp\\left( -\\alpha \\left| \\frac{k}{n} - 0.5 \\right| \\right) + \\beta \\cdot \\text{HopPenalty}$$

* **:** The success rate of the Solver.
* **Peak Reward:** Occurs at 0.5 (50% failure rate), where maximum learning happens.
* **Hard Gate:** If the Solver gets 0% or 100% correct, the Proposer receives **zero reward**.

---

## 5. Implementation: HRPO in Python

Below is the core logic for the HRPO grouping mechanism, which allows for a 75% reduction in computational costs.

\`\`\`python
import torch
import torch.nn.functional as F

def compute_hrpo_advantage(rewards, hop_counts):
    """
    rewards: Tensor (batch_size,) - Accuracy scores (0 or 1)
    hop_counts: Tensor (batch_size,) - The 'difficulty' category (e.g., 2-hop, 4-hop)
    """
    unique_hops = torch.unique(hop_counts)
    advantages = torch.zeros_like(rewards)
    
    for hop in unique_hops:
        # Isolate all questions of the same structural complexity
        mask = (hop_counts == hop)
        group_rewards = rewards[mask]
        
        # Compute the baseline for this difficulty class
        mean_reward = group_rewards.mean()
        std_reward = group_rewards.std() + 1e-8 
        
        # Compute Advantage relative to the complexity group
        advantages[mask] = (group_rewards - mean_reward) / std_reward
        
    return advantages

# Policy update step
def train_step(model, optimizer, batch):
    outputs = model(batch['questions'])
    rewards = verify_answers(outputs, batch['ground_truth']) 
    
    # HRPO grouping logic
    advantages = compute_hrpo_advantage(rewards, batch['hop_counts'])
    
    # Policy Gradient update
    loss = - (log_probs * advantages).mean()
    loss.backward()
    optimizer.step()

\`\`\`

---

## 6. Performance and Results

The results published by Meta were striking. By removing the need for human SFT (Supervised Fine-Tuning) data, Dr. Zero actually performed *better* in complex scenarios.

| Benchmark | Model Type | Accuracy (Avg) |
| --- | --- | --- |
| **Natural Questions** | Base LLM (Zero-shot) | 28.4% |
| **Natural Questions** | Supervised Agent | 41.2% |
| **Natural Questions** | **Dr. Zero (Data-Free)** | **46.8%** |
| **2WikiMQA** | **Dr. Zero (Data-Free)** | **+14.1% over Supervised** |

---

## 7. Why the "Dr. Zero" Paper is a Paradigm Shift

1. **Data Democratization:** You no longer need a multi-million dollar labeling budget to build a specialist research agent. You just need a base model and a niche corpus (like legal or medical docs).
2. **Beyond Human Limits:** Because the model isn't imitating human search logs, it can discover more efficient reasoning paths that humans might not even consider.
3. **Efficiency:** HRPO makes RL training for agents accessible to researchers with a fraction of the hardware previously required.

Dr. Zero represents the first true step into **Recursive Self-Improvement** for agentic systems. By learning to research, the AI has learned how to learn.
`,__viteBrowserExternal={},__viteBrowserExternal$1=Object.freeze(Object.defineProperty({__proto__:null,default:__viteBrowserExternal},Symbol.toStringTag,{value:"Module"})),require$$0=getAugmentedNamespace(__viteBrowserExternal$1);var kindOf,hasRequiredKindOf;function requireKindOf(){if(hasRequiredKindOf)return kindOf;hasRequiredKindOf=1;var r=Object.prototype.toString;kindOf=function(h){if(h===void 0)return"undefined";if(h===null)return"null";var x=typeof h;if(x==="boolean")return"boolean";if(x==="string")return"string";if(x==="number")return"number";if(x==="symbol")return"symbol";if(x==="function")return f(h)?"generatorfunction":"function";if(d(h))return"array";if(s(h))return"buffer";if(i(h))return"arguments";if(l(h))return"date";if(o(h))return"error";if(c(h))return"regexp";switch(t(h)){case"Symbol":return"symbol";case"Promise":return"promise";case"WeakMap":return"weakmap";case"WeakSet":return"weakset";case"Map":return"map";case"Set":return"set";case"Int8Array":return"int8array";case"Uint8Array":return"uint8array";case"Uint8ClampedArray":return"uint8clampedarray";case"Int16Array":return"int16array";case"Uint16Array":return"uint16array";case"Int32Array":return"int32array";case"Uint32Array":return"uint32array";case"Float32Array":return"float32array";case"Float64Array":return"float64array"}if(g(h))return"generator";switch(x=r.call(h),x){case"[object Object]":return"object";case"[object Map Iterator]":return"mapiterator";case"[object Set Iterator]":return"setiterator";case"[object String Iterator]":return"stringiterator";case"[object Array Iterator]":return"arrayiterator"}return x.slice(8,-1).toLowerCase().replace(/\s/g,"")};function t(a){return typeof a.constructor=="function"?a.constructor.name:null}function d(a){return Array.isArray?Array.isArray(a):a instanceof Array}function o(a){return a instanceof Error||typeof a.message=="string"&&a.constructor&&typeof a.constructor.stackTraceLimit=="number"}function l(a){return a instanceof Date?!0:typeof a.toDateString=="function"&&typeof a.getDate=="function"&&typeof a.setDate=="function"}function c(a){return a instanceof RegExp?!0:typeof a.flags=="string"&&typeof a.ignoreCase=="boolean"&&typeof a.multiline=="boolean"&&typeof a.global=="boolean"}function f(a,h){return t(a)==="GeneratorFunction"}function g(a){return typeof a.throw=="function"&&typeof a.return=="function"&&typeof a.next=="function"}function i(a){try{if(typeof a.length=="number"&&typeof a.callee=="function")return!0}catch(h){if(h.message.indexOf("callee")!==-1)return!0}return!1}function s(a){return a.constructor&&typeof a.constructor.isBuffer=="function"?a.constructor.isBuffer(a):!1}return kindOf}var isExtendable,hasRequiredIsExtendable;function requireIsExtendable(){return hasRequiredIsExtendable||(hasRequiredIsExtendable=1,isExtendable=function(t){return typeof t<"u"&&t!==null&&(typeof t=="object"||typeof t=="function")}),isExtendable}var extendShallow,hasRequiredExtendShallow;function requireExtendShallow(){if(hasRequiredExtendShallow)return extendShallow;hasRequiredExtendShallow=1;var r=requireIsExtendable();extendShallow=function(l){r(l)||(l={});for(var c=arguments.length,f=1;f<c;f++){var g=arguments[f];r(g)&&t(l,g)}return l};function t(o,l){for(var c in l)d(l,c)&&(o[c]=l[c])}function d(o,l){return Object.prototype.hasOwnProperty.call(o,l)}return extendShallow}var sectionMatter,hasRequiredSectionMatter;function requireSectionMatter(){if(hasRequiredSectionMatter)return sectionMatter;hasRequiredSectionMatter=1;var r=requireKindOf(),t=requireExtendShallow();sectionMatter=function(i,s){typeof s=="function"&&(s={parse:s});var a=o(i),h={section_delimiter:"---",parse:f},x=t({},h,s),C=x.section_delimiter,q=a.content.split(/\r?\n/),k=null,P=c(),D=[],N=[];function L(G){a.content=G,k=[],D=[]}function $(G){N.length&&(P.key=l(N[0],C),P.content=G,x.parse(P,k),k.push(P),P=c(),D=[],N=[])}for(var M=0;M<q.length;M++){var z=q[M],Y=N.length,B=z.trim();if(d(B,C)){if(B.length===3&&M!==0){if(Y===0||Y===2){D.push(z);continue}N.push(B),P.data=D.join(`
`),D=[];continue}k===null&&L(D.join(`
`)),Y===2&&$(D.join(`
`)),N.push(B);continue}D.push(z)}return k===null?L(D.join(`
`)):$(D.join(`
`)),a.sections=k,a};function d(i,s){return!(i.slice(0,s.length)!==s||i.charAt(s.length+1)===s.slice(-1))}function o(i){if(r(i)!=="object"&&(i={content:i}),typeof i.content!="string"&&!g(i.content))throw new TypeError("expected a buffer or string");return i.content=i.content.toString(),i.sections=[],i}function l(i,s){return i?i.slice(s.length).trim():""}function c(){return{key:"",data:"",content:""}}function f(i){return i}function g(i){return i&&i.constructor&&typeof i.constructor.isBuffer=="function"?i.constructor.isBuffer(i):!1}return sectionMatter}var engines={exports:{}},jsYaml$1={},loader={},common={},hasRequiredCommon;function requireCommon(){if(hasRequiredCommon)return common;hasRequiredCommon=1;function r(f){return typeof f>"u"||f===null}function t(f){return typeof f=="object"&&f!==null}function d(f){return Array.isArray(f)?f:r(f)?[]:[f]}function o(f,g){var i,s,a,h;if(g)for(h=Object.keys(g),i=0,s=h.length;i<s;i+=1)a=h[i],f[a]=g[a];return f}function l(f,g){var i="",s;for(s=0;s<g;s+=1)i+=f;return i}function c(f){return f===0&&Number.NEGATIVE_INFINITY===1/f}return common.isNothing=r,common.isObject=t,common.toArray=d,common.repeat=l,common.isNegativeZero=c,common.extend=o,common}var exception,hasRequiredException;function requireException(){if(hasRequiredException)return exception;hasRequiredException=1;function r(t,d){Error.call(this),this.name="YAMLException",this.reason=t,this.mark=d,this.message=(this.reason||"(unknown reason)")+(this.mark?" "+this.mark.toString():""),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}return r.prototype=Object.create(Error.prototype),r.prototype.constructor=r,r.prototype.toString=function(d){var o=this.name+": ";return o+=this.reason||"(unknown reason)",!d&&this.mark&&(o+=" "+this.mark.toString()),o},exception=r,exception}var mark,hasRequiredMark;function requireMark(){if(hasRequiredMark)return mark;hasRequiredMark=1;var r=requireCommon();function t(d,o,l,c,f){this.name=d,this.buffer=o,this.position=l,this.line=c,this.column=f}return t.prototype.getSnippet=function(o,l){var c,f,g,i,s;if(!this.buffer)return null;for(o=o||4,l=l||75,c="",f=this.position;f>0&&`\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(f-1))===-1;)if(f-=1,this.position-f>l/2-1){c=" ... ",f+=5;break}for(g="",i=this.position;i<this.buffer.length&&`\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(i))===-1;)if(i+=1,i-this.position>l/2-1){g=" ... ",i-=5;break}return s=this.buffer.slice(f,i),r.repeat(" ",o)+c+s+g+`
`+r.repeat(" ",o+this.position-f+c.length)+"^"},t.prototype.toString=function(o){var l,c="";return this.name&&(c+='in "'+this.name+'" '),c+="at line "+(this.line+1)+", column "+(this.column+1),o||(l=this.getSnippet(),l&&(c+=`:
`+l)),c},mark=t,mark}var type,hasRequiredType;function requireType(){if(hasRequiredType)return type;hasRequiredType=1;var r=requireException(),t=["kind","resolve","construct","instanceOf","predicate","represent","defaultStyle","styleAliases"],d=["scalar","sequence","mapping"];function o(c){var f={};return c!==null&&Object.keys(c).forEach(function(g){c[g].forEach(function(i){f[String(i)]=g})}),f}function l(c,f){if(f=f||{},Object.keys(f).forEach(function(g){if(t.indexOf(g)===-1)throw new r('Unknown option "'+g+'" is met in definition of "'+c+'" YAML type.')}),this.tag=c,this.kind=f.kind||null,this.resolve=f.resolve||function(){return!0},this.construct=f.construct||function(g){return g},this.instanceOf=f.instanceOf||null,this.predicate=f.predicate||null,this.represent=f.represent||null,this.defaultStyle=f.defaultStyle||null,this.styleAliases=o(f.styleAliases||null),d.indexOf(this.kind)===-1)throw new r('Unknown kind "'+this.kind+'" is specified for "'+c+'" YAML type.')}return type=l,type}var schema,hasRequiredSchema;function requireSchema(){if(hasRequiredSchema)return schema;hasRequiredSchema=1;var r=requireCommon(),t=requireException(),d=requireType();function o(f,g,i){var s=[];return f.include.forEach(function(a){i=o(a,g,i)}),f[g].forEach(function(a){i.forEach(function(h,x){h.tag===a.tag&&h.kind===a.kind&&s.push(x)}),i.push(a)}),i.filter(function(a,h){return s.indexOf(h)===-1})}function l(){var f={scalar:{},sequence:{},mapping:{},fallback:{}},g,i;function s(a){f[a.kind][a.tag]=f.fallback[a.tag]=a}for(g=0,i=arguments.length;g<i;g+=1)arguments[g].forEach(s);return f}function c(f){this.include=f.include||[],this.implicit=f.implicit||[],this.explicit=f.explicit||[],this.implicit.forEach(function(g){if(g.loadKind&&g.loadKind!=="scalar")throw new t("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")}),this.compiledImplicit=o(this,"implicit",[]),this.compiledExplicit=o(this,"explicit",[]),this.compiledTypeMap=l(this.compiledImplicit,this.compiledExplicit)}return c.DEFAULT=null,c.create=function(){var g,i;switch(arguments.length){case 1:g=c.DEFAULT,i=arguments[0];break;case 2:g=arguments[0],i=arguments[1];break;default:throw new t("Wrong number of arguments for Schema.create function")}if(g=r.toArray(g),i=r.toArray(i),!g.every(function(s){return s instanceof c}))throw new t("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");if(!i.every(function(s){return s instanceof d}))throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.");return new c({include:g,explicit:i})},schema=c,schema}var str,hasRequiredStr;function requireStr(){if(hasRequiredStr)return str;hasRequiredStr=1;var r=requireType();return str=new r("tag:yaml.org,2002:str",{kind:"scalar",construct:function(t){return t!==null?t:""}}),str}var seq,hasRequiredSeq;function requireSeq(){if(hasRequiredSeq)return seq;hasRequiredSeq=1;var r=requireType();return seq=new r("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(t){return t!==null?t:[]}}),seq}var map,hasRequiredMap;function requireMap(){if(hasRequiredMap)return map;hasRequiredMap=1;var r=requireType();return map=new r("tag:yaml.org,2002:map",{kind:"mapping",construct:function(t){return t!==null?t:{}}}),map}var failsafe,hasRequiredFailsafe;function requireFailsafe(){if(hasRequiredFailsafe)return failsafe;hasRequiredFailsafe=1;var r=requireSchema();return failsafe=new r({explicit:[requireStr(),requireSeq(),requireMap()]}),failsafe}var _null,hasRequired_null;function require_null(){if(hasRequired_null)return _null;hasRequired_null=1;var r=requireType();function t(l){if(l===null)return!0;var c=l.length;return c===1&&l==="~"||c===4&&(l==="null"||l==="Null"||l==="NULL")}function d(){return null}function o(l){return l===null}return _null=new r("tag:yaml.org,2002:null",{kind:"scalar",resolve:t,construct:d,predicate:o,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"}},defaultStyle:"lowercase"}),_null}var bool,hasRequiredBool;function requireBool(){if(hasRequiredBool)return bool;hasRequiredBool=1;var r=requireType();function t(l){if(l===null)return!1;var c=l.length;return c===4&&(l==="true"||l==="True"||l==="TRUE")||c===5&&(l==="false"||l==="False"||l==="FALSE")}function d(l){return l==="true"||l==="True"||l==="TRUE"}function o(l){return Object.prototype.toString.call(l)==="[object Boolean]"}return bool=new r("tag:yaml.org,2002:bool",{kind:"scalar",resolve:t,construct:d,predicate:o,represent:{lowercase:function(l){return l?"true":"false"},uppercase:function(l){return l?"TRUE":"FALSE"},camelcase:function(l){return l?"True":"False"}},defaultStyle:"lowercase"}),bool}var int,hasRequiredInt;function requireInt(){if(hasRequiredInt)return int;hasRequiredInt=1;var r=requireCommon(),t=requireType();function d(i){return 48<=i&&i<=57||65<=i&&i<=70||97<=i&&i<=102}function o(i){return 48<=i&&i<=55}function l(i){return 48<=i&&i<=57}function c(i){if(i===null)return!1;var s=i.length,a=0,h=!1,x;if(!s)return!1;if(x=i[a],(x==="-"||x==="+")&&(x=i[++a]),x==="0"){if(a+1===s)return!0;if(x=i[++a],x==="b"){for(a++;a<s;a++)if(x=i[a],x!=="_"){if(x!=="0"&&x!=="1")return!1;h=!0}return h&&x!=="_"}if(x==="x"){for(a++;a<s;a++)if(x=i[a],x!=="_"){if(!d(i.charCodeAt(a)))return!1;h=!0}return h&&x!=="_"}for(;a<s;a++)if(x=i[a],x!=="_"){if(!o(i.charCodeAt(a)))return!1;h=!0}return h&&x!=="_"}if(x==="_")return!1;for(;a<s;a++)if(x=i[a],x!=="_"){if(x===":")break;if(!l(i.charCodeAt(a)))return!1;h=!0}return!h||x==="_"?!1:x!==":"?!0:/^(:[0-5]?[0-9])+$/.test(i.slice(a))}function f(i){var s=i,a=1,h,x,C=[];return s.indexOf("_")!==-1&&(s=s.replace(/_/g,"")),h=s[0],(h==="-"||h==="+")&&(h==="-"&&(a=-1),s=s.slice(1),h=s[0]),s==="0"?0:h==="0"?s[1]==="b"?a*parseInt(s.slice(2),2):s[1]==="x"?a*parseInt(s,16):a*parseInt(s,8):s.indexOf(":")!==-1?(s.split(":").forEach(function(q){C.unshift(parseInt(q,10))}),s=0,x=1,C.forEach(function(q){s+=q*x,x*=60}),a*s):a*parseInt(s,10)}function g(i){return Object.prototype.toString.call(i)==="[object Number]"&&i%1===0&&!r.isNegativeZero(i)}return int=new t("tag:yaml.org,2002:int",{kind:"scalar",resolve:c,construct:f,predicate:g,represent:{binary:function(i){return i>=0?"0b"+i.toString(2):"-0b"+i.toString(2).slice(1)},octal:function(i){return i>=0?"0"+i.toString(8):"-0"+i.toString(8).slice(1)},decimal:function(i){return i.toString(10)},hexadecimal:function(i){return i>=0?"0x"+i.toString(16).toUpperCase():"-0x"+i.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),int}var float,hasRequiredFloat;function requireFloat(){if(hasRequiredFloat)return float;hasRequiredFloat=1;var r=requireCommon(),t=requireType(),d=new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function o(i){return!(i===null||!d.test(i)||i[i.length-1]==="_")}function l(i){var s,a,h,x;return s=i.replace(/_/g,"").toLowerCase(),a=s[0]==="-"?-1:1,x=[],"+-".indexOf(s[0])>=0&&(s=s.slice(1)),s===".inf"?a===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:s===".nan"?NaN:s.indexOf(":")>=0?(s.split(":").forEach(function(C){x.unshift(parseFloat(C,10))}),s=0,h=1,x.forEach(function(C){s+=C*h,h*=60}),a*s):a*parseFloat(s,10)}var c=/^[-+]?[0-9]+e/;function f(i,s){var a;if(isNaN(i))switch(s){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===i)switch(s){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===i)switch(s){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(r.isNegativeZero(i))return"-0.0";return a=i.toString(10),c.test(a)?a.replace("e",".e"):a}function g(i){return Object.prototype.toString.call(i)==="[object Number]"&&(i%1!==0||r.isNegativeZero(i))}return float=new t("tag:yaml.org,2002:float",{kind:"scalar",resolve:o,construct:l,predicate:g,represent:f,defaultStyle:"lowercase"}),float}var json,hasRequiredJson;function requireJson(){if(hasRequiredJson)return json;hasRequiredJson=1;var r=requireSchema();return json=new r({include:[requireFailsafe()],implicit:[require_null(),requireBool(),requireInt(),requireFloat()]}),json}var core,hasRequiredCore;function requireCore(){if(hasRequiredCore)return core;hasRequiredCore=1;var r=requireSchema();return core=new r({include:[requireJson()]}),core}var timestamp,hasRequiredTimestamp;function requireTimestamp(){if(hasRequiredTimestamp)return timestamp;hasRequiredTimestamp=1;var r=requireType(),t=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),d=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function o(f){return f===null?!1:t.exec(f)!==null||d.exec(f)!==null}function l(f){var g,i,s,a,h,x,C,q=0,k=null,P,D,N;if(g=t.exec(f),g===null&&(g=d.exec(f)),g===null)throw new Error("Date resolve error");if(i=+g[1],s=+g[2]-1,a=+g[3],!g[4])return new Date(Date.UTC(i,s,a));if(h=+g[4],x=+g[5],C=+g[6],g[7]){for(q=g[7].slice(0,3);q.length<3;)q+="0";q=+q}return g[9]&&(P=+g[10],D=+(g[11]||0),k=(P*60+D)*6e4,g[9]==="-"&&(k=-k)),N=new Date(Date.UTC(i,s,a,h,x,C,q)),k&&N.setTime(N.getTime()-k),N}function c(f){return f.toISOString()}return timestamp=new r("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:o,construct:l,instanceOf:Date,represent:c}),timestamp}var merge,hasRequiredMerge;function requireMerge(){if(hasRequiredMerge)return merge;hasRequiredMerge=1;var r=requireType();function t(d){return d==="<<"||d===null}return merge=new r("tag:yaml.org,2002:merge",{kind:"scalar",resolve:t}),merge}function commonjsRequire(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var binary,hasRequiredBinary;function requireBinary(){if(hasRequiredBinary)return binary;hasRequiredBinary=1;var r;try{var t=commonjsRequire;r=t("buffer").Buffer}catch{}var d=requireType(),o=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function l(i){if(i===null)return!1;var s,a,h=0,x=i.length,C=o;for(a=0;a<x;a++)if(s=C.indexOf(i.charAt(a)),!(s>64)){if(s<0)return!1;h+=6}return h%8===0}function c(i){var s,a,h=i.replace(/[\r\n=]/g,""),x=h.length,C=o,q=0,k=[];for(s=0;s<x;s++)s%4===0&&s&&(k.push(q>>16&255),k.push(q>>8&255),k.push(q&255)),q=q<<6|C.indexOf(h.charAt(s));return a=x%4*6,a===0?(k.push(q>>16&255),k.push(q>>8&255),k.push(q&255)):a===18?(k.push(q>>10&255),k.push(q>>2&255)):a===12&&k.push(q>>4&255),r?r.from?r.from(k):new r(k):k}function f(i){var s="",a=0,h,x,C=i.length,q=o;for(h=0;h<C;h++)h%3===0&&h&&(s+=q[a>>18&63],s+=q[a>>12&63],s+=q[a>>6&63],s+=q[a&63]),a=(a<<8)+i[h];return x=C%3,x===0?(s+=q[a>>18&63],s+=q[a>>12&63],s+=q[a>>6&63],s+=q[a&63]):x===2?(s+=q[a>>10&63],s+=q[a>>4&63],s+=q[a<<2&63],s+=q[64]):x===1&&(s+=q[a>>2&63],s+=q[a<<4&63],s+=q[64],s+=q[64]),s}function g(i){return r&&r.isBuffer(i)}return binary=new d("tag:yaml.org,2002:binary",{kind:"scalar",resolve:l,construct:c,predicate:g,represent:f}),binary}var omap,hasRequiredOmap;function requireOmap(){if(hasRequiredOmap)return omap;hasRequiredOmap=1;var r=requireType(),t=Object.prototype.hasOwnProperty,d=Object.prototype.toString;function o(c){if(c===null)return!0;var f=[],g,i,s,a,h,x=c;for(g=0,i=x.length;g<i;g+=1){if(s=x[g],h=!1,d.call(s)!=="[object Object]")return!1;for(a in s)if(t.call(s,a))if(!h)h=!0;else return!1;if(!h)return!1;if(f.indexOf(a)===-1)f.push(a);else return!1}return!0}function l(c){return c!==null?c:[]}return omap=new r("tag:yaml.org,2002:omap",{kind:"sequence",resolve:o,construct:l}),omap}var pairs,hasRequiredPairs;function requirePairs(){if(hasRequiredPairs)return pairs;hasRequiredPairs=1;var r=requireType(),t=Object.prototype.toString;function d(l){if(l===null)return!0;var c,f,g,i,s,a=l;for(s=new Array(a.length),c=0,f=a.length;c<f;c+=1){if(g=a[c],t.call(g)!=="[object Object]"||(i=Object.keys(g),i.length!==1))return!1;s[c]=[i[0],g[i[0]]]}return!0}function o(l){if(l===null)return[];var c,f,g,i,s,a=l;for(s=new Array(a.length),c=0,f=a.length;c<f;c+=1)g=a[c],i=Object.keys(g),s[c]=[i[0],g[i[0]]];return s}return pairs=new r("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:d,construct:o}),pairs}var set,hasRequiredSet;function requireSet(){if(hasRequiredSet)return set;hasRequiredSet=1;var r=requireType(),t=Object.prototype.hasOwnProperty;function d(l){if(l===null)return!0;var c,f=l;for(c in f)if(t.call(f,c)&&f[c]!==null)return!1;return!0}function o(l){return l!==null?l:{}}return set=new r("tag:yaml.org,2002:set",{kind:"mapping",resolve:d,construct:o}),set}var default_safe,hasRequiredDefault_safe;function requireDefault_safe(){if(hasRequiredDefault_safe)return default_safe;hasRequiredDefault_safe=1;var r=requireSchema();return default_safe=new r({include:[requireCore()],implicit:[requireTimestamp(),requireMerge()],explicit:[requireBinary(),requireOmap(),requirePairs(),requireSet()]}),default_safe}var _undefined,hasRequired_undefined;function require_undefined(){if(hasRequired_undefined)return _undefined;hasRequired_undefined=1;var r=requireType();function t(){return!0}function d(){}function o(){return""}function l(c){return typeof c>"u"}return _undefined=new r("tag:yaml.org,2002:js/undefined",{kind:"scalar",resolve:t,construct:d,predicate:l,represent:o}),_undefined}var regexp,hasRequiredRegexp;function requireRegexp(){if(hasRequiredRegexp)return regexp;hasRequiredRegexp=1;var r=requireType();function t(c){if(c===null||c.length===0)return!1;var f=c,g=/\/([gim]*)$/.exec(c),i="";return!(f[0]==="/"&&(g&&(i=g[1]),i.length>3||f[f.length-i.length-1]!=="/"))}function d(c){var f=c,g=/\/([gim]*)$/.exec(c),i="";return f[0]==="/"&&(g&&(i=g[1]),f=f.slice(1,f.length-i.length-1)),new RegExp(f,i)}function o(c){var f="/"+c.source+"/";return c.global&&(f+="g"),c.multiline&&(f+="m"),c.ignoreCase&&(f+="i"),f}function l(c){return Object.prototype.toString.call(c)==="[object RegExp]"}return regexp=new r("tag:yaml.org,2002:js/regexp",{kind:"scalar",resolve:t,construct:d,predicate:l,represent:o}),regexp}var _function,hasRequired_function;function require_function(){if(hasRequired_function)return _function;hasRequired_function=1;var r;try{var t=commonjsRequire;r=t("esprima")}catch{typeof window<"u"&&(r=window.esprima)}var d=requireType();function o(g){if(g===null)return!1;try{var i="("+g+")",s=r.parse(i,{range:!0});return!(s.type!=="Program"||s.body.length!==1||s.body[0].type!=="ExpressionStatement"||s.body[0].expression.type!=="ArrowFunctionExpression"&&s.body[0].expression.type!=="FunctionExpression")}catch{return!1}}function l(g){var i="("+g+")",s=r.parse(i,{range:!0}),a=[],h;if(s.type!=="Program"||s.body.length!==1||s.body[0].type!=="ExpressionStatement"||s.body[0].expression.type!=="ArrowFunctionExpression"&&s.body[0].expression.type!=="FunctionExpression")throw new Error("Failed to resolve function");return s.body[0].expression.params.forEach(function(x){a.push(x.name)}),h=s.body[0].expression.body.range,s.body[0].expression.body.type==="BlockStatement"?new Function(a,i.slice(h[0]+1,h[1]-1)):new Function(a,"return "+i.slice(h[0],h[1]))}function c(g){return g.toString()}function f(g){return Object.prototype.toString.call(g)==="[object Function]"}return _function=new d("tag:yaml.org,2002:js/function",{kind:"scalar",resolve:o,construct:l,predicate:f,represent:c}),_function}var default_full,hasRequiredDefault_full;function requireDefault_full(){if(hasRequiredDefault_full)return default_full;hasRequiredDefault_full=1;var r=requireSchema();return default_full=r.DEFAULT=new r({include:[requireDefault_safe()],explicit:[require_undefined(),requireRegexp(),require_function()]}),default_full}var hasRequiredLoader;function requireLoader(){if(hasRequiredLoader)return loader;hasRequiredLoader=1;var r=requireCommon(),t=requireException(),d=requireMark(),o=requireDefault_safe(),l=requireDefault_full(),c=Object.prototype.hasOwnProperty,f=1,g=2,i=3,s=4,a=1,h=2,x=3,C=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,q=/[\x85\u2028\u2029]/,k=/[,\[\]\{\}]/,P=/^(?:!|!!|![a-z\-]+!)$/i,D=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function N(e){return Object.prototype.toString.call(e)}function L(e){return e===10||e===13}function $(e){return e===9||e===32}function M(e){return e===9||e===32||e===10||e===13}function z(e){return e===44||e===91||e===93||e===123||e===125}function Y(e){var p;return 48<=e&&e<=57?e-48:(p=e|32,97<=p&&p<=102?p-97+10:-1)}function B(e){return e===120?2:e===117?4:e===85?8:0}function G(e){return 48<=e&&e<=57?e-48:-1}function W(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"":e===95?" ":e===76?"\u2028":e===80?"\u2029":""}function ee(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function J(e,p,_){p==="__proto__"?Object.defineProperty(e,p,{configurable:!0,enumerable:!0,writable:!0,value:_}):e[p]=_}for(var X=new Array(256),U=new Array(256),Z=0;Z<256;Z++)X[Z]=W(Z)?1:0,U[Z]=W(Z);function xe(e,p){this.input=e,this.filename=p.filename||null,this.schema=p.schema||l,this.onWarning=p.onWarning||null,this.legacy=p.legacy||!1,this.json=p.json||!1,this.listener=p.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.documents=[]}function se(e,p){return new t(p,new d(e.filename,e.input,e.position,e.line,e.position-e.lineStart))}function O(e,p){throw se(e,p)}function ne(e,p){e.onWarning&&e.onWarning.call(null,se(e,p))}var re={YAML:function(p,_,S){var b,n,u;p.version!==null&&O(p,"duplication of %YAML directive"),S.length!==1&&O(p,"YAML directive accepts exactly one argument"),b=/^([0-9]+)\.([0-9]+)$/.exec(S[0]),b===null&&O(p,"ill-formed argument of the YAML directive"),n=parseInt(b[1],10),u=parseInt(b[2],10),n!==1&&O(p,"unacceptable YAML version of the document"),p.version=S[0],p.checkLineBreaks=u<2,u!==1&&u!==2&&ne(p,"unsupported YAML version of the document")},TAG:function(p,_,S){var b,n;S.length!==2&&O(p,"TAG directive accepts exactly two arguments"),b=S[0],n=S[1],P.test(b)||O(p,"ill-formed tag handle (first argument) of the TAG directive"),c.call(p.tagMap,b)&&O(p,'there is a previously declared suffix for "'+b+'" tag handle'),D.test(n)||O(p,"ill-formed tag prefix (second argument) of the TAG directive"),p.tagMap[b]=n}};function K(e,p,_,S){var b,n,u,m;if(p<_){if(m=e.input.slice(p,_),S)for(b=0,n=m.length;b<n;b+=1)u=m.charCodeAt(b),u===9||32<=u&&u<=1114111||O(e,"expected valid JSON character");else C.test(m)&&O(e,"the stream contains non-printable characters");e.result+=m}}function te(e,p,_,S){var b,n,u,m;for(r.isObject(_)||O(e,"cannot merge mappings; the provided source object is unacceptable"),b=Object.keys(_),u=0,m=b.length;u<m;u+=1)n=b[u],c.call(p,n)||(J(p,n,_[n]),S[n]=!0)}function Q(e,p,_,S,b,n,u,m){var y,w;if(Array.isArray(b))for(b=Array.prototype.slice.call(b),y=0,w=b.length;y<w;y+=1)Array.isArray(b[y])&&O(e,"nested arrays are not supported inside keys"),typeof b=="object"&&N(b[y])==="[object Object]"&&(b[y]="[object Object]");if(typeof b=="object"&&N(b)==="[object Object]"&&(b="[object Object]"),b=String(b),p===null&&(p={}),S==="tag:yaml.org,2002:merge")if(Array.isArray(n))for(y=0,w=n.length;y<w;y+=1)te(e,p,n[y],_);else te(e,p,n,_);else!e.json&&!c.call(_,b)&&c.call(p,b)&&(e.line=u||e.line,e.position=m||e.position,O(e,"duplicated mapping key")),J(p,b,n),delete _[b];return p}function ue(e){var p;p=e.input.charCodeAt(e.position),p===10?e.position++:p===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):O(e,"a line break is expected"),e.line+=1,e.lineStart=e.position}function j(e,p,_){for(var S=0,b=e.input.charCodeAt(e.position);b!==0;){for(;$(b);)b=e.input.charCodeAt(++e.position);if(p&&b===35)do b=e.input.charCodeAt(++e.position);while(b!==10&&b!==13&&b!==0);if(L(b))for(ue(e),b=e.input.charCodeAt(e.position),S++,e.lineIndent=0;b===32;)e.lineIndent++,b=e.input.charCodeAt(++e.position);else break}return _!==-1&&S!==0&&e.lineIndent<_&&ne(e,"deficient indentation"),S}function ie(e){var p=e.position,_;return _=e.input.charCodeAt(p),!!((_===45||_===46)&&_===e.input.charCodeAt(p+1)&&_===e.input.charCodeAt(p+2)&&(p+=3,_=e.input.charCodeAt(p),_===0||M(_)))}function oe(e,p){p===1?e.result+=" ":p>1&&(e.result+=r.repeat(`
`,p-1))}function le(e,p,_){var S,b,n,u,m,y,w,R,v=e.kind,E=e.result,A;if(A=e.input.charCodeAt(e.position),M(A)||z(A)||A===35||A===38||A===42||A===33||A===124||A===62||A===39||A===34||A===37||A===64||A===96||(A===63||A===45)&&(b=e.input.charCodeAt(e.position+1),M(b)||_&&z(b)))return!1;for(e.kind="scalar",e.result="",n=u=e.position,m=!1;A!==0;){if(A===58){if(b=e.input.charCodeAt(e.position+1),M(b)||_&&z(b))break}else if(A===35){if(S=e.input.charCodeAt(e.position-1),M(S))break}else{if(e.position===e.lineStart&&ie(e)||_&&z(A))break;if(L(A))if(y=e.line,w=e.lineStart,R=e.lineIndent,j(e,!1,-1),e.lineIndent>=p){m=!0,A=e.input.charCodeAt(e.position);continue}else{e.position=u,e.line=y,e.lineStart=w,e.lineIndent=R;break}}m&&(K(e,n,u,!1),oe(e,e.line-y),n=u=e.position,m=!1),$(A)||(u=e.position+1),A=e.input.charCodeAt(++e.position)}return K(e,n,u,!1),e.result?!0:(e.kind=v,e.result=E,!1)}function ce(e,p){var _,S,b;if(_=e.input.charCodeAt(e.position),_!==39)return!1;for(e.kind="scalar",e.result="",e.position++,S=b=e.position;(_=e.input.charCodeAt(e.position))!==0;)if(_===39)if(K(e,S,e.position,!0),_=e.input.charCodeAt(++e.position),_===39)S=e.position,e.position++,b=e.position;else return!0;else L(_)?(K(e,S,b,!0),oe(e,j(e,!1,p)),S=b=e.position):e.position===e.lineStart&&ie(e)?O(e,"unexpected end of the document within a single quoted scalar"):(e.position++,b=e.position);O(e,"unexpected end of the stream within a single quoted scalar")}function fe(e,p){var _,S,b,n,u,m;if(m=e.input.charCodeAt(e.position),m!==34)return!1;for(e.kind="scalar",e.result="",e.position++,_=S=e.position;(m=e.input.charCodeAt(e.position))!==0;){if(m===34)return K(e,_,e.position,!0),e.position++,!0;if(m===92){if(K(e,_,e.position,!0),m=e.input.charCodeAt(++e.position),L(m))j(e,!1,p);else if(m<256&&X[m])e.result+=U[m],e.position++;else if((u=B(m))>0){for(b=u,n=0;b>0;b--)m=e.input.charCodeAt(++e.position),(u=Y(m))>=0?n=(n<<4)+u:O(e,"expected hexadecimal character");e.result+=ee(n),e.position++}else O(e,"unknown escape sequence");_=S=e.position}else L(m)?(K(e,_,S,!0),oe(e,j(e,!1,p)),_=S=e.position):e.position===e.lineStart&&ie(e)?O(e,"unexpected end of the document within a double quoted scalar"):(e.position++,S=e.position)}O(e,"unexpected end of the stream within a double quoted scalar")}function pe(e,p){var _=!0,S,b=e.tag,n,u=e.anchor,m,y,w,R,v,E={},A,T,I,F;if(F=e.input.charCodeAt(e.position),F===91)y=93,v=!1,n=[];else if(F===123)y=125,v=!0,n={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=n),F=e.input.charCodeAt(++e.position);F!==0;){if(j(e,!0,p),F=e.input.charCodeAt(e.position),F===y)return e.position++,e.tag=b,e.anchor=u,e.kind=v?"mapping":"sequence",e.result=n,!0;_||O(e,"missed comma between flow collection entries"),T=A=I=null,w=R=!1,F===63&&(m=e.input.charCodeAt(e.position+1),M(m)&&(w=R=!0,e.position++,j(e,!0,p))),S=e.line,V(e,p,f,!1,!0),T=e.tag,A=e.result,j(e,!0,p),F=e.input.charCodeAt(e.position),(R||e.line===S)&&F===58&&(w=!0,F=e.input.charCodeAt(++e.position),j(e,!0,p),V(e,p,f,!1,!0),I=e.result),v?Q(e,n,E,T,A,I):w?n.push(Q(e,null,E,T,A,I)):n.push(A),j(e,!0,p),F=e.input.charCodeAt(e.position),F===44?(_=!0,F=e.input.charCodeAt(++e.position)):_=!1}O(e,"unexpected end of the stream within a flow collection")}function ae(e,p){var _,S,b=a,n=!1,u=!1,m=p,y=0,w=!1,R,v;if(v=e.input.charCodeAt(e.position),v===124)S=!1;else if(v===62)S=!0;else return!1;for(e.kind="scalar",e.result="";v!==0;)if(v=e.input.charCodeAt(++e.position),v===43||v===45)a===b?b=v===43?x:h:O(e,"repeat of a chomping mode identifier");else if((R=G(v))>=0)R===0?O(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):u?O(e,"repeat of an indentation width identifier"):(m=p+R-1,u=!0);else break;if($(v)){do v=e.input.charCodeAt(++e.position);while($(v));if(v===35)do v=e.input.charCodeAt(++e.position);while(!L(v)&&v!==0)}for(;v!==0;){for(ue(e),e.lineIndent=0,v=e.input.charCodeAt(e.position);(!u||e.lineIndent<m)&&v===32;)e.lineIndent++,v=e.input.charCodeAt(++e.position);if(!u&&e.lineIndent>m&&(m=e.lineIndent),L(v)){y++;continue}if(e.lineIndent<m){b===x?e.result+=r.repeat(`
`,n?1+y:y):b===a&&n&&(e.result+=`
`);break}for(S?$(v)?(w=!0,e.result+=r.repeat(`
`,n?1+y:y)):w?(w=!1,e.result+=r.repeat(`
`,y+1)):y===0?n&&(e.result+=" "):e.result+=r.repeat(`
`,y):e.result+=r.repeat(`
`,n?1+y:y),n=!0,u=!0,y=0,_=e.position;!L(v)&&v!==0;)v=e.input.charCodeAt(++e.position);K(e,_,e.position,!1)}return!0}function he(e,p){var _,S=e.tag,b=e.anchor,n=[],u,m=!1,y;for(e.anchor!==null&&(e.anchorMap[e.anchor]=n),y=e.input.charCodeAt(e.position);y!==0&&!(y!==45||(u=e.input.charCodeAt(e.position+1),!M(u)));){if(m=!0,e.position++,j(e,!0,-1)&&e.lineIndent<=p){n.push(null),y=e.input.charCodeAt(e.position);continue}if(_=e.line,V(e,p,i,!1,!0),n.push(e.result),j(e,!0,-1),y=e.input.charCodeAt(e.position),(e.line===_||e.lineIndent>p)&&y!==0)O(e,"bad indentation of a sequence entry");else if(e.lineIndent<p)break}return m?(e.tag=S,e.anchor=b,e.kind="sequence",e.result=n,!0):!1}function be(e,p,_){var S,b,n,u,m=e.tag,y=e.anchor,w={},R={},v=null,E=null,A=null,T=!1,I=!1,F;for(e.anchor!==null&&(e.anchorMap[e.anchor]=w),F=e.input.charCodeAt(e.position);F!==0;){if(S=e.input.charCodeAt(e.position+1),n=e.line,u=e.position,(F===63||F===58)&&M(S))F===63?(T&&(Q(e,w,R,v,E,null),v=E=A=null),I=!0,T=!0,b=!0):T?(T=!1,b=!0):O(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,F=S;else if(V(e,_,g,!1,!0))if(e.line===n){for(F=e.input.charCodeAt(e.position);$(F);)F=e.input.charCodeAt(++e.position);if(F===58)F=e.input.charCodeAt(++e.position),M(F)||O(e,"a whitespace character is expected after the key-value separator within a block mapping"),T&&(Q(e,w,R,v,E,null),v=E=A=null),I=!0,T=!1,b=!1,v=e.tag,E=e.result;else if(I)O(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=m,e.anchor=y,!0}else if(I)O(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=m,e.anchor=y,!0;else break;if((e.line===n||e.lineIndent>p)&&(V(e,p,s,!0,b)&&(T?E=e.result:A=e.result),T||(Q(e,w,R,v,E,A,n,u),v=E=A=null),j(e,!0,-1),F=e.input.charCodeAt(e.position)),e.lineIndent>p&&F!==0)O(e,"bad indentation of a mapping entry");else if(e.lineIndent<p)break}return T&&Q(e,w,R,v,E,null),I&&(e.tag=m,e.anchor=y,e.kind="mapping",e.result=w),I}function de(e){var p,_=!1,S=!1,b,n,u;if(u=e.input.charCodeAt(e.position),u!==33)return!1;if(e.tag!==null&&O(e,"duplication of a tag property"),u=e.input.charCodeAt(++e.position),u===60?(_=!0,u=e.input.charCodeAt(++e.position)):u===33?(S=!0,b="!!",u=e.input.charCodeAt(++e.position)):b="!",p=e.position,_){do u=e.input.charCodeAt(++e.position);while(u!==0&&u!==62);e.position<e.length?(n=e.input.slice(p,e.position),u=e.input.charCodeAt(++e.position)):O(e,"unexpected end of the stream within a verbatim tag")}else{for(;u!==0&&!M(u);)u===33&&(S?O(e,"tag suffix cannot contain exclamation marks"):(b=e.input.slice(p-1,e.position+1),P.test(b)||O(e,"named tag handle cannot contain such characters"),S=!0,p=e.position+1)),u=e.input.charCodeAt(++e.position);n=e.input.slice(p,e.position),k.test(n)&&O(e,"tag suffix cannot contain flow indicator characters")}return n&&!D.test(n)&&O(e,"tag name cannot contain such characters: "+n),_?e.tag=n:c.call(e.tagMap,b)?e.tag=e.tagMap[b]+n:b==="!"?e.tag="!"+n:b==="!!"?e.tag="tag:yaml.org,2002:"+n:O(e,'undeclared tag handle "'+b+'"'),!0}function me(e){var p,_;if(_=e.input.charCodeAt(e.position),_!==38)return!1;for(e.anchor!==null&&O(e,"duplication of an anchor property"),_=e.input.charCodeAt(++e.position),p=e.position;_!==0&&!M(_)&&!z(_);)_=e.input.charCodeAt(++e.position);return e.position===p&&O(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(p,e.position),!0}function we(e){var p,_,S;if(S=e.input.charCodeAt(e.position),S!==42)return!1;for(S=e.input.charCodeAt(++e.position),p=e.position;S!==0&&!M(S)&&!z(S);)S=e.input.charCodeAt(++e.position);return e.position===p&&O(e,"name of an alias node must contain at least one character"),_=e.input.slice(p,e.position),c.call(e.anchorMap,_)||O(e,'unidentified alias "'+_+'"'),e.result=e.anchorMap[_],j(e,!0,-1),!0}function V(e,p,_,S,b){var n,u,m,y=1,w=!1,R=!1,v,E,A,T,I;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,n=u=m=s===_||i===_,S&&j(e,!0,-1)&&(w=!0,e.lineIndent>p?y=1:e.lineIndent===p?y=0:e.lineIndent<p&&(y=-1)),y===1)for(;de(e)||me(e);)j(e,!0,-1)?(w=!0,m=n,e.lineIndent>p?y=1:e.lineIndent===p?y=0:e.lineIndent<p&&(y=-1)):m=!1;if(m&&(m=w||b),(y===1||s===_)&&(f===_||g===_?T=p:T=p+1,I=e.position-e.lineStart,y===1?m&&(he(e,I)||be(e,I,T))||pe(e,T)?R=!0:(u&&ae(e,T)||ce(e,T)||fe(e,T)?R=!0:we(e)?(R=!0,(e.tag!==null||e.anchor!==null)&&O(e,"alias node should not have any properties")):le(e,T,f===_)&&(R=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):y===0&&(R=m&&he(e,I))),e.tag!==null&&e.tag!=="!")if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&O(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),v=0,E=e.implicitTypes.length;v<E;v+=1)if(A=e.implicitTypes[v],A.resolve(e.result)){e.result=A.construct(e.result),e.tag=A.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else c.call(e.typeMap[e.kind||"fallback"],e.tag)?(A=e.typeMap[e.kind||"fallback"][e.tag],e.result!==null&&A.kind!==e.kind&&O(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+A.kind+'", not "'+e.kind+'"'),A.resolve(e.result)?(e.result=A.construct(e.result),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):O(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")):O(e,"unknown tag !<"+e.tag+">");return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||R}function Re(e){var p=e.position,_,S,b,n=!1,u;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap={},e.anchorMap={};(u=e.input.charCodeAt(e.position))!==0&&(j(e,!0,-1),u=e.input.charCodeAt(e.position),!(e.lineIndent>0||u!==37));){for(n=!0,u=e.input.charCodeAt(++e.position),_=e.position;u!==0&&!M(u);)u=e.input.charCodeAt(++e.position);for(S=e.input.slice(_,e.position),b=[],S.length<1&&O(e,"directive name must not be less than one character in length");u!==0;){for(;$(u);)u=e.input.charCodeAt(++e.position);if(u===35){do u=e.input.charCodeAt(++e.position);while(u!==0&&!L(u));break}if(L(u))break;for(_=e.position;u!==0&&!M(u);)u=e.input.charCodeAt(++e.position);b.push(e.input.slice(_,e.position))}u!==0&&ue(e),c.call(re,S)?re[S](e,S,b):ne(e,'unknown document directive "'+S+'"')}if(j(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,j(e,!0,-1)):n&&O(e,"directives end mark is expected"),V(e,e.lineIndent-1,s,!1,!0),j(e,!0,-1),e.checkLineBreaks&&q.test(e.input.slice(p,e.position))&&ne(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&ie(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,j(e,!0,-1));return}if(e.position<e.length-1)O(e,"end of the stream or a document separator is expected");else return}function ge(e,p){e=String(e),p=p||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var _=new xe(e,p),S=e.indexOf("\0");for(S!==-1&&(_.position=S,O(_,"null byte is not allowed in input")),_.input+="\0";_.input.charCodeAt(_.position)===32;)_.lineIndent+=1,_.position+=1;for(;_.position<_.length-1;)Re(_);return _.documents}function ye(e,p,_){p!==null&&typeof p=="object"&&typeof _>"u"&&(_=p,p=null);var S=ge(e,_);if(typeof p!="function")return S;for(var b=0,n=S.length;b<n;b+=1)p(S[b])}function _e(e,p){var _=ge(e,p);if(_.length!==0){if(_.length===1)return _[0];throw new t("expected a single document in the stream, but found more")}}function Ae(e,p,_){return typeof p=="object"&&p!==null&&typeof _>"u"&&(_=p,p=null),ye(e,p,r.extend({schema:o},_))}function ve(e,p){return _e(e,r.extend({schema:o},p))}return loader.loadAll=ye,loader.load=_e,loader.safeLoadAll=Ae,loader.safeLoad=ve,loader}var dumper={},hasRequiredDumper;function requireDumper(){if(hasRequiredDumper)return dumper;hasRequiredDumper=1;var r=requireCommon(),t=requireException(),d=requireDefault_full(),o=requireDefault_safe(),l=Object.prototype.toString,c=Object.prototype.hasOwnProperty,f=9,g=10,i=13,s=32,a=33,h=34,x=35,C=37,q=38,k=39,P=42,D=44,N=45,L=58,$=61,M=62,z=63,Y=64,B=91,G=93,W=96,ee=123,J=124,X=125,U={};U[0]="\\0",U[7]="\\a",U[8]="\\b",U[9]="\\t",U[10]="\\n",U[11]="\\v",U[12]="\\f",U[13]="\\r",U[27]="\\e",U[34]='\\"',U[92]="\\\\",U[133]="\\N",U[160]="\\_",U[8232]="\\L",U[8233]="\\P";var Z=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"];function xe(n,u){var m,y,w,R,v,E,A;if(u===null)return{};for(m={},y=Object.keys(u),w=0,R=y.length;w<R;w+=1)v=y[w],E=String(u[v]),v.slice(0,2)==="!!"&&(v="tag:yaml.org,2002:"+v.slice(2)),A=n.compiledTypeMap.fallback[v],A&&c.call(A.styleAliases,E)&&(E=A.styleAliases[E]),m[v]=E;return m}function se(n){var u,m,y;if(u=n.toString(16).toUpperCase(),n<=255)m="x",y=2;else if(n<=65535)m="u",y=4;else if(n<=4294967295)m="U",y=8;else throw new t("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+m+r.repeat("0",y-u.length)+u}function O(n){this.schema=n.schema||d,this.indent=Math.max(1,n.indent||2),this.noArrayIndent=n.noArrayIndent||!1,this.skipInvalid=n.skipInvalid||!1,this.flowLevel=r.isNothing(n.flowLevel)?-1:n.flowLevel,this.styleMap=xe(this.schema,n.styles||null),this.sortKeys=n.sortKeys||!1,this.lineWidth=n.lineWidth||80,this.noRefs=n.noRefs||!1,this.noCompatMode=n.noCompatMode||!1,this.condenseFlow=n.condenseFlow||!1,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function ne(n,u){for(var m=r.repeat(" ",u),y=0,w=-1,R="",v,E=n.length;y<E;)w=n.indexOf(`
`,y),w===-1?(v=n.slice(y),y=E):(v=n.slice(y,w+1),y=w+1),v.length&&v!==`
`&&(R+=m),R+=v;return R}function re(n,u){return`
`+r.repeat(" ",n.indent*u)}function K(n,u){var m,y,w;for(m=0,y=n.implicitTypes.length;m<y;m+=1)if(w=n.implicitTypes[m],w.resolve(u))return!0;return!1}function te(n){return n===s||n===f}function Q(n){return 32<=n&&n<=126||161<=n&&n<=55295&&n!==8232&&n!==8233||57344<=n&&n<=65533&&n!==65279||65536<=n&&n<=1114111}function ue(n){return Q(n)&&!te(n)&&n!==65279&&n!==i&&n!==g}function j(n,u){return Q(n)&&n!==65279&&n!==D&&n!==B&&n!==G&&n!==ee&&n!==X&&n!==L&&(n!==x||u&&ue(u))}function ie(n){return Q(n)&&n!==65279&&!te(n)&&n!==N&&n!==z&&n!==L&&n!==D&&n!==B&&n!==G&&n!==ee&&n!==X&&n!==x&&n!==q&&n!==P&&n!==a&&n!==J&&n!==$&&n!==M&&n!==k&&n!==h&&n!==C&&n!==Y&&n!==W}function oe(n){var u=/^\n* /;return u.test(n)}var le=1,ce=2,fe=3,pe=4,ae=5;function he(n,u,m,y,w){var R,v,E,A=!1,T=!1,I=y!==-1,F=-1,H=ie(n.charCodeAt(0))&&!te(n.charCodeAt(n.length-1));if(u)for(R=0;R<n.length;R++){if(v=n.charCodeAt(R),!Q(v))return ae;E=R>0?n.charCodeAt(R-1):null,H=H&&j(v,E)}else{for(R=0;R<n.length;R++){if(v=n.charCodeAt(R),v===g)A=!0,I&&(T=T||R-F-1>y&&n[F+1]!==" ",F=R);else if(!Q(v))return ae;E=R>0?n.charCodeAt(R-1):null,H=H&&j(v,E)}T=T||I&&R-F-1>y&&n[F+1]!==" "}return!A&&!T?H&&!w(n)?le:ce:m>9&&oe(n)?ae:T?pe:fe}function be(n,u,m,y){n.dump=(function(){if(u.length===0)return"''";if(!n.noCompatMode&&Z.indexOf(u)!==-1)return"'"+u+"'";var w=n.indent*Math.max(1,m),R=n.lineWidth===-1?-1:Math.max(Math.min(n.lineWidth,40),n.lineWidth-w),v=y||n.flowLevel>-1&&m>=n.flowLevel;function E(A){return K(n,A)}switch(he(u,v,n.indent,R,E)){case le:return u;case ce:return"'"+u.replace(/'/g,"''")+"'";case fe:return"|"+de(u,n.indent)+me(ne(u,w));case pe:return">"+de(u,n.indent)+me(ne(we(u,R),w));case ae:return'"'+Re(u)+'"';default:throw new t("impossible error: invalid scalar style")}})()}function de(n,u){var m=oe(n)?String(u):"",y=n[n.length-1]===`
`,w=y&&(n[n.length-2]===`
`||n===`
`),R=w?"+":y?"":"-";return m+R+`
`}function me(n){return n[n.length-1]===`
`?n.slice(0,-1):n}function we(n,u){for(var m=/(\n+)([^\n]*)/g,y=(function(){var T=n.indexOf(`
`);return T=T!==-1?T:n.length,m.lastIndex=T,V(n.slice(0,T),u)})(),w=n[0]===`
`||n[0]===" ",R,v;v=m.exec(n);){var E=v[1],A=v[2];R=A[0]===" ",y+=E+(!w&&!R&&A!==""?`
`:"")+V(A,u),w=R}return y}function V(n,u){if(n===""||n[0]===" ")return n;for(var m=/ [^ ]/g,y,w=0,R,v=0,E=0,A="";y=m.exec(n);)E=y.index,E-w>u&&(R=v>w?v:E,A+=`
`+n.slice(w,R),w=R+1),v=E;return A+=`
`,n.length-w>u&&v>w?A+=n.slice(w,v)+`
`+n.slice(v+1):A+=n.slice(w),A.slice(1)}function Re(n){for(var u="",m,y,w,R=0;R<n.length;R++){if(m=n.charCodeAt(R),m>=55296&&m<=56319&&(y=n.charCodeAt(R+1),y>=56320&&y<=57343)){u+=se((m-55296)*1024+y-56320+65536),R++;continue}w=U[m],u+=!w&&Q(m)?n[R]:w||se(m)}return u}function ge(n,u,m){var y="",w=n.tag,R,v;for(R=0,v=m.length;R<v;R+=1)e(n,u,m[R],!1,!1)&&(R!==0&&(y+=","+(n.condenseFlow?"":" ")),y+=n.dump);n.tag=w,n.dump="["+y+"]"}function ye(n,u,m,y){var w="",R=n.tag,v,E;for(v=0,E=m.length;v<E;v+=1)e(n,u+1,m[v],!0,!0)&&((!y||v!==0)&&(w+=re(n,u)),n.dump&&g===n.dump.charCodeAt(0)?w+="-":w+="- ",w+=n.dump);n.tag=R,n.dump=w||"[]"}function _e(n,u,m){var y="",w=n.tag,R=Object.keys(m),v,E,A,T,I;for(v=0,E=R.length;v<E;v+=1)I="",v!==0&&(I+=", "),n.condenseFlow&&(I+='"'),A=R[v],T=m[A],e(n,u,A,!1,!1)&&(n.dump.length>1024&&(I+="? "),I+=n.dump+(n.condenseFlow?'"':"")+":"+(n.condenseFlow?"":" "),e(n,u,T,!1,!1)&&(I+=n.dump,y+=I));n.tag=w,n.dump="{"+y+"}"}function Ae(n,u,m,y){var w="",R=n.tag,v=Object.keys(m),E,A,T,I,F,H;if(n.sortKeys===!0)v.sort();else if(typeof n.sortKeys=="function")v.sort(n.sortKeys);else if(n.sortKeys)throw new t("sortKeys must be a boolean or a function");for(E=0,A=v.length;E<A;E+=1)H="",(!y||E!==0)&&(H+=re(n,u)),T=v[E],I=m[T],e(n,u+1,T,!0,!0,!0)&&(F=n.tag!==null&&n.tag!=="?"||n.dump&&n.dump.length>1024,F&&(n.dump&&g===n.dump.charCodeAt(0)?H+="?":H+="? "),H+=n.dump,F&&(H+=re(n,u)),e(n,u+1,I,!0,F)&&(n.dump&&g===n.dump.charCodeAt(0)?H+=":":H+=": ",H+=n.dump,w+=H));n.tag=R,n.dump=w||"{}"}function ve(n,u,m){var y,w,R,v,E,A;for(w=m?n.explicitTypes:n.implicitTypes,R=0,v=w.length;R<v;R+=1)if(E=w[R],(E.instanceOf||E.predicate)&&(!E.instanceOf||typeof u=="object"&&u instanceof E.instanceOf)&&(!E.predicate||E.predicate(u))){if(n.tag=m?E.tag:"?",E.represent){if(A=n.styleMap[E.tag]||E.defaultStyle,l.call(E.represent)==="[object Function]")y=E.represent(u,A);else if(c.call(E.represent,A))y=E.represent[A](u,A);else throw new t("!<"+E.tag+'> tag resolver accepts not "'+A+'" style');n.dump=y}return!0}return!1}function e(n,u,m,y,w,R){n.tag=null,n.dump=m,ve(n,m,!1)||ve(n,m,!0);var v=l.call(n.dump);y&&(y=n.flowLevel<0||n.flowLevel>u);var E=v==="[object Object]"||v==="[object Array]",A,T;if(E&&(A=n.duplicates.indexOf(m),T=A!==-1),(n.tag!==null&&n.tag!=="?"||T||n.indent!==2&&u>0)&&(w=!1),T&&n.usedDuplicates[A])n.dump="*ref_"+A;else{if(E&&T&&!n.usedDuplicates[A]&&(n.usedDuplicates[A]=!0),v==="[object Object]")y&&Object.keys(n.dump).length!==0?(Ae(n,u,n.dump,w),T&&(n.dump="&ref_"+A+n.dump)):(_e(n,u,n.dump),T&&(n.dump="&ref_"+A+" "+n.dump));else if(v==="[object Array]"){var I=n.noArrayIndent&&u>0?u-1:u;y&&n.dump.length!==0?(ye(n,I,n.dump,w),T&&(n.dump="&ref_"+A+n.dump)):(ge(n,I,n.dump),T&&(n.dump="&ref_"+A+" "+n.dump))}else if(v==="[object String]")n.tag!=="?"&&be(n,n.dump,u,R);else{if(n.skipInvalid)return!1;throw new t("unacceptable kind of an object to dump "+v)}n.tag!==null&&n.tag!=="?"&&(n.dump="!<"+n.tag+"> "+n.dump)}return!0}function p(n,u){var m=[],y=[],w,R;for(_(n,m,y),w=0,R=y.length;w<R;w+=1)u.duplicates.push(m[y[w]]);u.usedDuplicates=new Array(R)}function _(n,u,m){var y,w,R;if(n!==null&&typeof n=="object")if(w=u.indexOf(n),w!==-1)m.indexOf(w)===-1&&m.push(w);else if(u.push(n),Array.isArray(n))for(w=0,R=n.length;w<R;w+=1)_(n[w],u,m);else for(y=Object.keys(n),w=0,R=y.length;w<R;w+=1)_(n[y[w]],u,m)}function S(n,u){u=u||{};var m=new O(u);return m.noRefs||p(n,m),e(m,0,n,!0,!0)?m.dump+`
`:""}function b(n,u){return S(n,r.extend({schema:o},u))}return dumper.dump=S,dumper.safeDump=b,dumper}var hasRequiredJsYaml$1;function requireJsYaml$1(){if(hasRequiredJsYaml$1)return jsYaml$1;hasRequiredJsYaml$1=1;var r=requireLoader(),t=requireDumper();function d(o){return function(){throw new Error("Function "+o+" is deprecated and cannot be used.")}}return jsYaml$1.Type=requireType(),jsYaml$1.Schema=requireSchema(),jsYaml$1.FAILSAFE_SCHEMA=requireFailsafe(),jsYaml$1.JSON_SCHEMA=requireJson(),jsYaml$1.CORE_SCHEMA=requireCore(),jsYaml$1.DEFAULT_SAFE_SCHEMA=requireDefault_safe(),jsYaml$1.DEFAULT_FULL_SCHEMA=requireDefault_full(),jsYaml$1.load=r.load,jsYaml$1.loadAll=r.loadAll,jsYaml$1.safeLoad=r.safeLoad,jsYaml$1.safeLoadAll=r.safeLoadAll,jsYaml$1.dump=t.dump,jsYaml$1.safeDump=t.safeDump,jsYaml$1.YAMLException=requireException(),jsYaml$1.MINIMAL_SCHEMA=requireFailsafe(),jsYaml$1.SAFE_SCHEMA=requireDefault_safe(),jsYaml$1.DEFAULT_SCHEMA=requireDefault_full(),jsYaml$1.scan=d("scan"),jsYaml$1.parse=d("parse"),jsYaml$1.compose=d("compose"),jsYaml$1.addConstructor=d("addConstructor"),jsYaml$1}var jsYaml,hasRequiredJsYaml;function requireJsYaml(){if(hasRequiredJsYaml)return jsYaml;hasRequiredJsYaml=1;var r=requireJsYaml$1();return jsYaml=r,jsYaml}var hasRequiredEngines;function requireEngines(){return hasRequiredEngines||(hasRequiredEngines=1,(function(module,exports$1){const yaml=requireJsYaml(),engines=module.exports;engines.yaml={parse:yaml.safeLoad.bind(yaml),stringify:yaml.safeDump.bind(yaml)},engines.json={parse:JSON.parse.bind(JSON),stringify:function(r,t){const d=Object.assign({replacer:null,space:2},t);return JSON.stringify(r,d.replacer,d.space)}},engines.javascript={parse:function parse(str,options,wrap){try{return wrap!==!1&&(str=`(function() {
return `+str.trim()+`;
}());`),eval(str)||{}}catch(r){if(wrap!==!1&&/(unexpected|identifier)/i.test(r.message))return parse(str,options,!1);throw new SyntaxError(r)}},stringify:function(){throw new Error("stringifying JavaScript is not supported")}}})(engines)),engines.exports}var utils={};var stripBomString,hasRequiredStripBomString;function requireStripBomString(){return hasRequiredStripBomString||(hasRequiredStripBomString=1,stripBomString=function(r){return typeof r=="string"&&r.charAt(0)==="\uFEFF"?r.slice(1):r}),stripBomString}var hasRequiredUtils;function requireUtils(){return hasRequiredUtils||(hasRequiredUtils=1,(function(r){const t=requireStripBomString(),d=requireKindOf();r.define=function(o,l,c){Reflect.defineProperty(o,l,{enumerable:!1,configurable:!0,writable:!0,value:c})},r.isBuffer=function(o){return d(o)==="buffer"},r.isObject=function(o){return d(o)==="object"},r.toBuffer=function(o){return typeof o=="string"?Buffer.from(o):o},r.toString=function(o){if(r.isBuffer(o))return t(String(o));if(typeof o!="string")throw new TypeError("expected input to be a string or buffer");return t(o)},r.arrayify=function(o){return o?Array.isArray(o)?o:[o]:[]},r.startsWith=function(o,l,c){return typeof c!="number"&&(c=l.length),o.slice(0,c)===l}})(utils)),utils}var defaults,hasRequiredDefaults;function requireDefaults(){if(hasRequiredDefaults)return defaults;hasRequiredDefaults=1;const r=requireEngines(),t=requireUtils();return defaults=function(d){const o=Object.assign({},d);return o.delimiters=t.arrayify(o.delims||o.delimiters||"---"),o.delimiters.length===1&&o.delimiters.push(o.delimiters[0]),o.language=(o.language||o.lang||"yaml").toLowerCase(),o.engines=Object.assign({},r,o.parsers,o.engines),o},defaults}var engine,hasRequiredEngine;function requireEngine(){if(hasRequiredEngine)return engine;hasRequiredEngine=1,engine=function(t,d){let o=d.engines[t]||d.engines[r(t)];if(typeof o>"u")throw new Error('gray-matter engine "'+t+'" is not registered');return typeof o=="function"&&(o={parse:o}),o};function r(t){switch(t.toLowerCase()){case"js":case"javascript":return"javascript";case"coffee":case"coffeescript":case"cson":return"coffee";case"yaml":case"yml":return"yaml";default:return t}}return engine}var stringify,hasRequiredStringify;function requireStringify(){if(hasRequiredStringify)return stringify;hasRequiredStringify=1;const r=requireKindOf(),t=requireEngine(),d=requireDefaults();stringify=function(l,c,f){if(c==null&&f==null)switch(r(l)){case"object":c=l.data,f={};break;case"string":return l;default:throw new TypeError("expected file to be a string or object")}const g=l.content,i=d(f);if(c==null){if(!i.data)return l;c=i.data}const s=l.language||i.language,a=t(s,i);if(typeof a.stringify!="function")throw new TypeError('expected "'+s+'.stringify" to be a function');c=Object.assign({},l.data,c);const h=i.delimiters[0],x=i.delimiters[1],C=a.stringify(c,f).trim();let q="";return C!=="{}"&&(q=o(h)+o(C)+o(x)),typeof l.excerpt=="string"&&l.excerpt!==""&&g.indexOf(l.excerpt.trim())===-1&&(q+=o(l.excerpt)+o(x)),q+o(g)};function o(l){return l.slice(-1)!==`
`?l+`
`:l}return stringify}var excerpt,hasRequiredExcerpt;function requireExcerpt(){if(hasRequiredExcerpt)return excerpt;hasRequiredExcerpt=1;const r=requireDefaults();return excerpt=function(t,d){const o=r(d);if(t.data==null&&(t.data={}),typeof o.excerpt=="function")return o.excerpt(t,o);const l=t.data.excerpt_separator||o.excerpt_separator;if(l==null&&(o.excerpt===!1||o.excerpt==null))return t;const c=typeof o.excerpt=="string"?o.excerpt:l||o.delimiters[0],f=t.content.indexOf(c);return f!==-1&&(t.excerpt=t.content.slice(0,f)),t},excerpt}var toFile,hasRequiredToFile;function requireToFile(){if(hasRequiredToFile)return toFile;hasRequiredToFile=1;const r=requireKindOf(),t=requireStringify(),d=requireUtils();return toFile=function(o){return r(o)!=="object"&&(o={content:o}),r(o.data)!=="object"&&(o.data={}),o.contents&&o.content==null&&(o.content=o.contents),d.define(o,"orig",d.toBuffer(o.content)),d.define(o,"language",o.language||""),d.define(o,"matter",o.matter||""),d.define(o,"stringify",function(l,c){return c&&c.language&&(o.language=c.language),t(o,l,c)}),o.content=d.toString(o.content),o.isEmpty=!1,o.excerpt="",o},toFile}var parse,hasRequiredParse;function requireParse(){if(hasRequiredParse)return parse;hasRequiredParse=1;const r=requireEngine(),t=requireDefaults();return parse=function(d,o,l){const c=t(l),f=r(d,c);if(typeof f.parse!="function")throw new TypeError('expected "'+d+'.parse" to be a function');return f.parse(o,c)},parse}var grayMatter,hasRequiredGrayMatter;function requireGrayMatter(){if(hasRequiredGrayMatter)return grayMatter;hasRequiredGrayMatter=1;const r=require$$0,t=requireSectionMatter(),d=requireDefaults(),o=requireStringify(),l=requireExcerpt(),c=requireEngines(),f=requireToFile(),g=requireParse(),i=requireUtils();function s(h,x){if(h==="")return{data:{},content:h,excerpt:"",orig:h};let C=f(h);const q=s.cache[C.content];if(!x){if(q)return C=Object.assign({},q),C.orig=q.orig,C;s.cache[C.content]=C}return a(C,x)}function a(h,x){const C=d(x),q=C.delimiters[0],k=`
`+C.delimiters[1];let P=h.content;C.language&&(h.language=C.language);const D=q.length;if(!i.startsWith(P,q,D))return l(h,C),h;if(P.charAt(D)===q.slice(-1))return h;P=P.slice(D);const N=P.length,L=s.language(P,C);L.name&&(h.language=L.name,P=P.slice(L.raw.length));let $=P.indexOf(k);return $===-1&&($=N),h.matter=P.slice(0,$),h.matter.replace(/^\s*#[^\n]+/gm,"").trim()===""?(h.isEmpty=!0,h.empty=h.content,h.data={}):h.data=g(h.language,h.matter,C),$===N?h.content="":(h.content=P.slice($+k.length),h.content[0]==="\r"&&(h.content=h.content.slice(1)),h.content[0]===`
`&&(h.content=h.content.slice(1))),l(h,C),(C.sections===!0||typeof C.section=="function")&&t(h,C.section),h}return s.engines=c,s.stringify=function(h,x,C){return typeof h=="string"&&(h=s(h,C)),o(h,x,C)},s.read=function(h,x){const C=r.readFileSync(h,"utf8"),q=s(C,x);return q.path=h,q},s.test=function(h,x){return i.startsWith(h,d(x).delimiters[0])},s.language=function(h,x){const q=d(x).delimiters[0];s.test(h)&&(h=h.slice(q.length));const k=h.slice(0,h.search(/\r?\n/));return{raw:k,name:k?k.trim():""}},s.cache={},s.clearCache=function(){s.cache={}},grayMatter=s,grayMatter}var grayMatterExports=requireGrayMatter();const matter=getDefaultExportFromCjs(grayMatterExports),postFiles=Object.assign({"/src/content/posts/cuda-basics.md":__vite_glob_0_0,"/src/content/posts/dpo-grpo-numpy.md":__vite_glob_0_1,"/src/content/posts/flash-attention.md":__vite_glob_0_2,"/src/content/posts/intro-to-quantization.md":__vite_glob_0_3,"/src/content/posts/meta-dr-zero.md":__vite_glob_0_4}),usePosts=()=>useQuery({queryKey:["posts"],queryFn:async()=>Object.entries(postFiles).map(([t,d])=>{const o=t.split("/").pop()?.replace(".md","")||"",{data:l}=matter(d),c=l;return{id:o,slug:o,title:c.title||"Untitled",excerpt:c.excerpt||"",date:c.date||"",tags:c.tags||[],readTime:c.readTime||"",content:""}}).sort((t,d)=>new Date(d.date).getTime()-new Date(t.date).getTime()),staleTime:1/0}),usePost=r=>useQuery({queryKey:["post",r],queryFn:async()=>{const t=`/src/content/posts/${r}.md`,d=postFiles[t];if(!d)throw new Error(`Post not found: ${r}`);const{data:o,content:l}=matter(d),c=o;return{id:r,slug:r,title:c.title,excerpt:c.excerpt,date:c.date,tags:c.tags,readTime:c.readTime,content:l}},enabled:!!r});export{Calendar as C,Clock as a,usePost as b,usePosts as u};
