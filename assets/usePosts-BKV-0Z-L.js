import{S as Subscribable,p as pendingThenable,a as resolveEnabled,s as shallowEqualObjects,b as resolveStaleTime,n as noop,i as isServer,d as isValidTimeout,t as timeUntilStale,e as timeoutManager,f as focusManager,h as fetchState,k as replaceData,l as notifyManager,r as reactExports,m as shouldThrowError,u as useQueryClient,c as createLucideIcon,o as getAugmentedNamespace,g as getDefaultExportFromCjs}from"./index-DkG0WQNY.js";var QueryObserver=class extends Subscribable{constructor(t,i){super(),this.options=i,this.#r=t,this.#i=null,this.#t=pendingThenable(),this.bindMethods(),this.setOptions(i)}#r;#e=void 0;#p=void 0;#n=void 0;#a;#c;#t;#i;#m;#h;#f;#s;#l;#o;#d=new Set;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(this.#e.addObserver(this),shouldFetchOnMount(this.#e,this.options)?this.#u():this.updateResult(),this.#v())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return shouldFetchOn(this.#e,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return shouldFetchOn(this.#e,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#b(),this.#w(),this.#e.removeObserver(this)}setOptions(t){const i=this.options,p=this.#e;if(this.options=this.#r.defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof resolveEnabled(this.options.enabled,this.#e)!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");this.#x(),this.#e.setOptions(this.options),i._defaulted&&!shallowEqualObjects(this.options,i)&&this.#r.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#e,observer:this});const o=this.hasListeners();o&&shouldFetchOptionally(this.#e,p,this.options,i)&&this.#u(),this.updateResult(),o&&(this.#e!==p||resolveEnabled(this.options.enabled,this.#e)!==resolveEnabled(i.enabled,this.#e)||resolveStaleTime(this.options.staleTime,this.#e)!==resolveStaleTime(i.staleTime,this.#e))&&this.#g();const c=this.#y();o&&(this.#e!==p||resolveEnabled(this.options.enabled,this.#e)!==resolveEnabled(i.enabled,this.#e)||c!==this.#o)&&this.#_(c)}getOptimisticResult(t){const i=this.#r.getQueryCache().build(this.#r,t),p=this.createResult(i,t);return shouldAssignObserverCurrentProperties(this,p)&&(this.#n=p,this.#c=this.options,this.#a=this.#e.state),p}getCurrentResult(){return this.#n}trackResult(t,i){return new Proxy(t,{get:(p,o)=>(this.trackProp(o),i?.(o),o==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&this.#t.status==="pending"&&this.#t.reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(p,o))})}trackProp(t){this.#d.add(t)}getCurrentQuery(){return this.#e}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const i=this.#r.defaultQueryOptions(t),p=this.#r.getQueryCache().build(this.#r,i);return p.fetch().then(()=>this.createResult(p,i))}fetch(t){return this.#u({...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#n))}#u(t){this.#x();let i=this.#e.fetch(this.options,t);return t?.throwOnError||(i=i.catch(noop)),i}#g(){this.#b();const t=resolveStaleTime(this.options.staleTime,this.#e);if(isServer||this.#n.isStale||!isValidTimeout(t))return;const p=timeUntilStale(this.#n.dataUpdatedAt,t)+1;this.#s=timeoutManager.setTimeout(()=>{this.#n.isStale||this.updateResult()},p)}#y(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.#e):this.options.refetchInterval)??!1}#_(t){this.#w(),this.#o=t,!(isServer||resolveEnabled(this.options.enabled,this.#e)===!1||!isValidTimeout(this.#o)||this.#o===0)&&(this.#l=timeoutManager.setInterval(()=>{(this.options.refetchIntervalInBackground||focusManager.isFocused())&&this.#u()},this.#o))}#v(){this.#g(),this.#_(this.#y())}#b(){this.#s&&(timeoutManager.clearTimeout(this.#s),this.#s=void 0)}#w(){this.#l&&(timeoutManager.clearInterval(this.#l),this.#l=void 0)}createResult(t,i){const p=this.#e,o=this.options,c=this.#n,h=this.#a,f=this.#c,a=t!==p?t.state:this.#p,{state:l}=t;let s={...l},m=!1,w;if(i._optimisticResults){const $=this.hasListeners(),z=!$&&shouldFetchOnMount(t,i),J=$&&shouldFetchOptionally(t,p,i,o);(z||J)&&(s={...s,...fetchState(l.data,t.options)}),i._optimisticResults==="isRestoring"&&(s.fetchStatus="idle")}let{error:k,errorUpdatedAt:E,status:I}=s;w=s.data;let D=!1;if(i.placeholderData!==void 0&&w===void 0&&I==="pending"){let $;c?.isPlaceholderData&&i.placeholderData===f?.placeholderData?($=c.data,D=!0):$=typeof i.placeholderData=="function"?i.placeholderData(this.#f?.state.data,this.#f):i.placeholderData,$!==void 0&&(I="success",w=replaceData(c?.data,$,i),m=!0)}if(i.select&&w!==void 0&&!D)if(c&&w===h?.data&&i.select===this.#m)w=this.#h;else try{this.#m=i.select,w=i.select(w),w=replaceData(c?.data,w,i),this.#h=w,this.#i=null}catch($){this.#i=$}this.#i&&(k=this.#i,w=this.#h,E=Date.now(),I="error");const M=s.fetchStatus==="fetching",j=I==="pending",N=I==="error",H=j&&M,L=w!==void 0,U={status:I,fetchStatus:s.fetchStatus,isPending:j,isSuccess:I==="success",isError:N,isInitialLoading:H,isLoading:H,data:w,dataUpdatedAt:s.dataUpdatedAt,error:k,errorUpdatedAt:E,failureCount:s.fetchFailureCount,failureReason:s.fetchFailureReason,errorUpdateCount:s.errorUpdateCount,isFetched:s.dataUpdateCount>0||s.errorUpdateCount>0,isFetchedAfterMount:s.dataUpdateCount>a.dataUpdateCount||s.errorUpdateCount>a.errorUpdateCount,isFetching:M,isRefetching:M&&!j,isLoadingError:N&&!L,isPaused:s.fetchStatus==="paused",isPlaceholderData:m,isRefetchError:N&&L,isStale:isStale(t,i),refetch:this.refetch,promise:this.#t,isEnabled:resolveEnabled(i.enabled,t)!==!1};if(this.options.experimental_prefetchInRender){const $=U.data!==void 0,z=U.status==="error"&&!$,J=X=>{z?X.reject(U.error):$&&X.resolve(U.data)},ne=()=>{const X=this.#t=U.promise=pendingThenable();J(X)},V=this.#t;switch(V.status){case"pending":t.queryHash===p.queryHash&&J(V);break;case"fulfilled":(z||U.data!==V.value)&&ne();break;case"rejected":(!z||U.error!==V.reason)&&ne();break}}return U}updateResult(){const t=this.#n,i=this.createResult(this.#e,this.options);if(this.#a=this.#e.state,this.#c=this.options,this.#a.data!==void 0&&(this.#f=this.#e),shallowEqualObjects(i,t))return;this.#n=i;const p=()=>{if(!t)return!0;const{notifyOnChangeProps:o}=this.options,c=typeof o=="function"?o():o;if(c==="all"||!c&&!this.#d.size)return!0;const h=new Set(c??this.#d);return this.options.throwOnError&&h.add("error"),Object.keys(this.#n).some(f=>{const y=f;return this.#n[y]!==t[y]&&h.has(y)})};this.#A({listeners:p()})}#x(){const t=this.#r.getQueryCache().build(this.#r,this.options);if(t===this.#e)return;const i=this.#e;this.#e=t,this.#p=t.state,this.hasListeners()&&(i?.removeObserver(this),t.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#v()}#A(t){notifyManager.batch(()=>{t.listeners&&this.listeners.forEach(i=>{i(this.#n)}),this.#r.getQueryCache().notify({query:this.#e,type:"observerResultsUpdated"})})}};function shouldLoadOnMount(t,i){return resolveEnabled(i.enabled,t)!==!1&&t.state.data===void 0&&!(t.state.status==="error"&&i.retryOnMount===!1)}function shouldFetchOnMount(t,i){return shouldLoadOnMount(t,i)||t.state.data!==void 0&&shouldFetchOn(t,i,i.refetchOnMount)}function shouldFetchOn(t,i,p){if(resolveEnabled(i.enabled,t)!==!1&&resolveStaleTime(i.staleTime,t)!=="static"){const o=typeof p=="function"?p(t):p;return o==="always"||o!==!1&&isStale(t,i)}return!1}function shouldFetchOptionally(t,i,p,o){return(t!==i||resolveEnabled(o.enabled,t)===!1)&&(!p.suspense||t.state.status!=="error")&&isStale(t,p)}function isStale(t,i){return resolveEnabled(i.enabled,t)!==!1&&t.isStaleByTime(resolveStaleTime(i.staleTime,t))}function shouldAssignObserverCurrentProperties(t,i){return!shallowEqualObjects(t.getCurrentResult(),i)}var IsRestoringContext=reactExports.createContext(!1),useIsRestoring=()=>reactExports.useContext(IsRestoringContext);IsRestoringContext.Provider;function createValue(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}var QueryErrorResetBoundaryContext=reactExports.createContext(createValue()),useQueryErrorResetBoundary=()=>reactExports.useContext(QueryErrorResetBoundaryContext),ensurePreventErrorBoundaryRetry=(t,i,p)=>{const o=p?.state.error&&typeof t.throwOnError=="function"?shouldThrowError(t.throwOnError,[p.state.error,p]):t.throwOnError;(t.suspense||t.experimental_prefetchInRender||o)&&(i.isReset()||(t.retryOnMount=!1))},useClearResetErrorBoundary=t=>{reactExports.useEffect(()=>{t.clearReset()},[t])},getHasError=({result:t,errorResetBoundary:i,throwOnError:p,query:o,suspense:c})=>t.isError&&!i.isReset()&&!t.isFetching&&o&&(c&&t.data===void 0||shouldThrowError(p,[t.error,o])),ensureSuspenseTimers=t=>{if(t.suspense){const p=c=>c==="static"?c:Math.max(c??1e3,1e3),o=t.staleTime;t.staleTime=typeof o=="function"?(...c)=>p(o(...c)):p(o),typeof t.gcTime=="number"&&(t.gcTime=Math.max(t.gcTime,1e3))}},willFetch=(t,i)=>t.isLoading&&t.isFetching&&!i,shouldSuspend=(t,i)=>t?.suspense&&i.isPending,fetchOptimistic=(t,i,p)=>i.fetchOptimistic(t).catch(()=>{p.clearReset()});function useBaseQuery(t,i,p){const o=useIsRestoring(),c=useQueryErrorResetBoundary(),h=useQueryClient(),f=h.defaultQueryOptions(t);h.getDefaultOptions().queries?._experimental_beforeQuery?.(f);const y=h.getQueryCache().get(f.queryHash);f._optimisticResults=o?"isRestoring":"optimistic",ensureSuspenseTimers(f),ensurePreventErrorBoundaryRetry(f,c,y),useClearResetErrorBoundary(c);const a=!h.getQueryCache().get(f.queryHash),[l]=reactExports.useState(()=>new i(h,f)),s=l.getOptimisticResult(f),m=!o&&t.subscribed!==!1;if(reactExports.useSyncExternalStore(reactExports.useCallback(w=>{const k=m?l.subscribe(notifyManager.batchCalls(w)):noop;return l.updateResult(),k},[l,m]),()=>l.getCurrentResult(),()=>l.getCurrentResult()),reactExports.useEffect(()=>{l.setOptions(f)},[f,l]),shouldSuspend(f,s))throw fetchOptimistic(f,l,c);if(getHasError({result:s,errorResetBoundary:c,throwOnError:f.throwOnError,query:y,suspense:f.suspense}))throw s.error;return h.getDefaultOptions().queries?._experimental_afterQuery?.(f,s),f.experimental_prefetchInRender&&!isServer&&willFetch(s,o)&&(a?fetchOptimistic(f,l,c):y?.promise)?.catch(noop).finally(()=>{l.updateResult()}),f.notifyOnChangeProps?s:l.trackResult(s)}function useQuery(t,i){return useBaseQuery(t,QueryObserver)}const __iconNode$1=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],Calendar=createLucideIcon("calendar",__iconNode$1);const __iconNode=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Clock=createLucideIcon("clock",__iconNode);function r(t){var i,p,o="";if(typeof t=="string"||typeof t=="number")o+=t;else if(typeof t=="object")if(Array.isArray(t)){var c=t.length;for(i=0;i<c;i++)t[i]&&(p=r(t[i]))&&(o&&(o+=" "),o+=p)}else for(p in t)t[p]&&(o&&(o+=" "),o+=p);return o}function clsx(){for(var t,i,p=0,o="",c=arguments.length;p<c;p++)(t=arguments[p])&&(i=r(t))&&(o&&(o+=" "),o+=i);return o}const __vite_glob_0_0=`---
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
`,__vite_glob_0_5=`---
title: "Building a Self-Healing Producer-Consumer System: Active Control and Precision Rate Limiting"
date: "2026-02-11"
excerpt: "A deep dive into building a highly resilient, async Python service. Learn how centralized control, a Timestamped Ledger, and Adaptive Estimation solve the hardest problems in API rate limiting."
tags: ["System Design", "Python", "Asyncio", "Rate Limiting", "Concurrency", "Resilient Architecture", "Distributed Computing"]
---

If you have ever worked with third-party APIs, you know the pain of rate limits. One moment your application is flying, and the next, it is slammed with the dreaded \`429 Too Many Requests\` error. Building a system that respects these limits while maximizing throughput is a classic but surprisingly tricky engineering challenge.

Common approaches often fall short. Simple counters are inaccurate. Token buckets, while better, do not model a true sliding window and can lead to "thundering herd" problems where you exhaust your budget in the first second of a new minute. More complex, decentralized systems with workers managing their own concurrency often descend into a mess of locks, race conditions, and deadlocks.

What if we could build a system that was not just resilient, but intelligent? A system that not only respects limits perfectly but also learns, adapts, and even heals itself when it gets stuck?

Today, I am showcasing a project that does just that. It is a resilient producer-consumer service built in Python with \`asyncio\`. Its core philosophy is **Active, Centralized Control**: a single "brain" that orchestrates the entire system with the precision of a watchful eye.

### The Philosophy: An Active, Watching Brain

Most concurrent systems are passive. They react to events. A worker finishes a job, an event is fired, and a manager might assign a new one. This works, but it can be fragile. What happens if the system gets into a state where no events are firing, but there is still work to be done? Deadlock.

Our architecture flips this on its head. The entire system is orchestrated by a central **Controller** that runs on a continuous, high-frequency **heartbeat loop** (e.g., every 100ms). It is not waiting; it is always watching.

On each tick of the heartbeat, it executes a simple but powerful formula: \`F(event-state) -> ACTIONS\`.

*   **\`F\`**: The Controller's decision logic. This is not just a simple "if-then." It is a strict hierarchy of checks. Are we out of resources? Is all the work done? Is the system stuck? Is there work to do and a worker ready?
*   **\`event-state\`**: The input. This includes the Controller's complete model of the world (who is busy, how much budget is left) and a queue of recent events (like "Worker 5 just finished a job").
*   **\`ACTIONS\`**: A series of direct, unambiguous commands dispatched to other components, like "Worker 5, process this specific item."

This active model means the Controller sees opportunities the moment they arise. A rate-limit slot from 59 seconds ago just expired? The Controller sees it on the next tick and can dispatch new work instantly.

### The Architecture: A Clear Separation of Brain and Brawn

The system is split into two planes. The Control Plane is the brain, and the Data Plane is the brawn.

\`\`\`mermaid
sequenceDiagram
    autonumber
    participant P as Producer
    participant C as Controller (Brain)
    participant W as Worker
    participant S as Saver

    Note over P, S: Phase 1: Work Generation & Worker Readiness
    P->>C: [Event] ItemsProduced (Batch of 500 items)
    W->>C: [Event] WorkerReady (I am idle)

    Note over P, S: Phase 2: Estimation & Dispatch (Controller Heartbeat)
    
    Note right of C: 🧠 ADAPTIVE ESTIMATOR:<br/>Analyzes past 100 runs (95th percentile).<br/>Predicts next job will cost: 1,500 Tokens.
    
    Note right of C: 📖 TIMESTAMPED LEDGER:<br/>1. Prunes records older than 60s.<br/>2. Checks capacity: (Available TPM > 1,500)? YES.<br/>3. Logs provisional entry:[Est: 1,500 Tokens]
    
    C->>W: [Command] AssignItemToWorker (Item ID: 42)

    Note over P, S: Phase 3: Execution & Active Reconciliation
    
    Note over W: ⚙️ Worker executes external API call...
    
    W-->>C: [Event] RunCompleted (Success)<br/>"I have actually consumed 1,200 tokens!"
    
    Note right of C: 📖 LEDGER CORRECTION:<br/>Finds provisional entry.<br/>Mutates cost: 1,500 -> 1,200 Tokens.<br/>(Instantly frees up 300 tokens of capacity!)
    
    Note right of C: 🧠 ESTIMATOR UPDATE:<br/>Appends 1,200 to history window.<br/>Recalculates prediction for future jobs.

    Note over P, S: Phase 4: Persistence
    
    C->>S: [Command] RequestSaveResult (Item ID: 42)
    Note right of S: 💾 Appends result to disk asynchronously
    
    W->>C: [Event] WorkerReady (I am idle again)
    Note over W, C: The heartbeat loop immediately processes the next item...
\`\`\`

The components in the Data Plane are "dumb." They follow orders and report facts. The Producer reads data and yields batches. The Worker wakes up, announces it is ready, and waits for a command. It manages no state, no locks, and no limits. All intelligence resides in the Controller. This radical centralization makes the overall system state perfectly predictable.

### Deep Dive 1: The Timestamped Ledger

To manage a strict "Tokens Per Minute" (TPM) limit, we do not use a leaky bucket or a naive counter. We use a **Timestamped Ledger**, which is an advanced evolution of the Sliding Window Log algorithm.

#### The "Restaurant Fire Code" Analogy
Imagine you are managing a restaurant with a strict fire code capacity of 100 people. This is your rate limit. 

A standard counter is like a bouncer with a clicker. He clicks when people enter and deducts when they leave. But in an API, "leaving" is just time passing. A leaky bucket assumes people leave at a constant mathematical rate, which is rarely true.

Our Ledger is like a bouncer with a highly detailed logbook. 
When a group arrives, he writes down their exact entry time and the number of people in the party. To know the current capacity, he looks at the book, crosses out anyone who arrived more than 60 minutes ago, and sums up the remaining guests. This gives a mathematically perfect picture of the exact occupancy at any given millisecond.

#### The Technical Implementation
In code, this is a \`deque\` (a double-ended queue) of \`LedgerEntry\` objects. Each entry holds a \`run_id\`, a \`timestamp\`, and the \`tokens_per_run\`. 

When the Controller wants to dispatch a job, it performs three steps:
1.  **Prune**: It iterates from the oldest end of the \`deque\` and removes any entry older than 60 seconds.
2.  **Calculate**: It sums the \`tokens_per_run\` of all remaining entries.
3.  **Decide**: If \`(Total Allowed TPM) - (Sum of Ledger) >= (Cost of New Job)\`, the job is approved.

#### The "Correction" Superpower
Here is where our system goes beyond a standard Sliding Window Log. When we dispatch a job, we only have an *estimate* of its token cost. We add this estimate to the ledger. 

However, APIs have variable costs depending on the payload. When the Worker finishes the job, it reports the *actual* tokens consumed. The Controller then reaches back into the Ledger, finds the exact entry by its \`run_id\`, and mutates the \`tokens_per_run\` from the estimate to the actual cost.

\`\`\`text
CURRENT LEDGER STATE (60-second window):[Now - 55s] ID: a1b2 | Est: 1500 | Actual: 1200  (Corrected!)
[Now - 40s] ID: c3d4 | Est: 1500 | Actual: 1800  (Corrected!)[Now - 05s] ID: e5f6 | Est: 1500 | Actual: ????  (In-flight, holding estimated space)
\`\`\`

This prevents "capacity leaks" where over-estimation would permanently starve the system of resources for the rest of the minute. It is perfect, self-healing accounting.

### Deep Dive 2: Adaptive Estimation

The Ledger's accuracy depends entirely on having a good *initial estimate* before a job is dispatched. If you estimate 1,000 tokens but jobs actually cost 5,000, you will blow past your API limits. If you estimate 10,000 tokens but they only cost 1,000, you will process data at 10% of your maximum speed.

How do we predict the future cost of an API call? We use **Adaptive Estimation**.

#### The "Morning Commute" Analogy
Imagine trying to predict how long your drive to work will take. You do not just guess a static number forever. You base it on recent experience. 

If your last five commutes took 25, 27, 26, 25, and 28 minutes, predicting 26 minutes for tomorrow is a solid bet. This is a **Moving Average**. 

But what if your history looks like 25, 26, 25, 120 (due to a massive car crash), and 25? If you use the average, your prediction gets skewed to 44 minutes. You will leave for work way too early for weeks. Instead, you could use the **95th Percentile**. This mathematical approach ignores freak outliers and tells you the safest, most reliable number for the vast majority of days.

#### The Technical Implementation
Our Controller maintains a \`tpr_history\` (Tokens Per Run History) \`deque\` that stores the exact, actual cost of the last 100 successful runs. 

Before dispatching the next item, the Controller looks at this history to generate a \`RunCostEstimate\`. We configure the system to use the Percentile strategy:

1.  It sorts the history array of the last 100 costs.
2.  It picks the value at the 95th index (or whatever percentile we configure in \`settings.yaml\`). 
3.  This value becomes the initial estimate fed into the Timestamped Ledger for the next job.

As long as the API payload complexity gradually shifts, our system smoothly "rides the curve," keeping the estimates aggressively tight without ever violating the limits.

### Resilience in Action: The Self-Healing Loop

Here is where the active control model and adaptive estimation come together to create magic. 

Imagine our system has learned that jobs cost around 1,500 tokens. Suddenly, the dataset changes, and the true cost jumps to 2,500. However, the system currently only has 2,000 tokens of available space in the minute window.

*   **A passive system** would die right here. It thinks jobs cost 1,500, but they are failing or getting rejected. Or worse, the Controller refuses to dispatch because the newly required 2,500 tokens do not fit, but because it never dispatches, it never gets a new completed job to learn from. The system is deadlocked.
*   **Our active Controller** detects this. On every heartbeat, it notices a dangerous condition. Work exists, workers are idle, but nothing has been dispatched for 30 seconds. This is **stagnation**.

The Controller immediately enters **Recovery Mode**. It ignores its own learned estimate (which is currently causing the deadlock) and dispatches a single "probe" job using a safe, pre-configured fallback estimate. 

This job will process. When it finishes, it returns the new, true cost of 2,500 tokens. This fresh, accurate data point is pushed into the \`tpr_history\`. The system recalculates its estimations, realizes the new reality, and safely resumes processing. The deadlock is broken automatically.

### The Road Ahead

No design is perfect, and building on a solid foundation means being honest about the next steps. Here is what is next for hardening this system for true production scale:

1.  **Taming Memory with Backpressure**: Currently, the Producer can create items much faster than the rate-limited Workers can process them, causing the Controller's pending work queue to grow indefinitely. For massive datasets, this can lead to an out-of-memory crash. We need to convert the pending queue to a bounded \`asyncio.Queue\`, which will force the Producer to asynchronously pause when the queue is full.
2.  **Periodic Checkpointing**: The system saves its state on graceful shutdown, but a hard hardware crash would lose all progress from the current session. We plan to trigger periodic checkpoint commands via the Controller's \`MonitorTick\` event to persist snapshots every few minutes.
3.  **Streaming Data Loading**: The current Producer loads the entire dataset into memory at startup. We must evolve it to stream data from a file or database cursor to support terabyte-scale processing.

### Conclusion

By shifting from a passive, reactive model to an active, centralized one, we can build concurrent systems that are vastly more resilient and efficient. The combination of an "always-watching" Controller, the flawless accounting of a Timestamped Ledger, and the self-correcting intelligence of Adaptive Estimation creates a powerful engine. It allows the system to push performance exactly to the redline, and intelligently recover when the environment changes.`,__viteBrowserExternal={},__viteBrowserExternal$1=Object.freeze(Object.defineProperty({__proto__:null,default:__viteBrowserExternal},Symbol.toStringTag,{value:"Module"})),require$$0=getAugmentedNamespace(__viteBrowserExternal$1);var kindOf,hasRequiredKindOf;function requireKindOf(){if(hasRequiredKindOf)return kindOf;hasRequiredKindOf=1;var t=Object.prototype.toString;kindOf=function(m){if(m===void 0)return"undefined";if(m===null)return"null";var w=typeof m;if(w==="boolean")return"boolean";if(w==="string")return"string";if(w==="number")return"number";if(w==="symbol")return"symbol";if(w==="function")return f(m)?"generatorfunction":"function";if(p(m))return"array";if(l(m))return"buffer";if(a(m))return"arguments";if(c(m))return"date";if(o(m))return"error";if(h(m))return"regexp";switch(i(m)){case"Symbol":return"symbol";case"Promise":return"promise";case"WeakMap":return"weakmap";case"WeakSet":return"weakset";case"Map":return"map";case"Set":return"set";case"Int8Array":return"int8array";case"Uint8Array":return"uint8array";case"Uint8ClampedArray":return"uint8clampedarray";case"Int16Array":return"int16array";case"Uint16Array":return"uint16array";case"Int32Array":return"int32array";case"Uint32Array":return"uint32array";case"Float32Array":return"float32array";case"Float64Array":return"float64array"}if(y(m))return"generator";switch(w=t.call(m),w){case"[object Object]":return"object";case"[object Map Iterator]":return"mapiterator";case"[object Set Iterator]":return"setiterator";case"[object String Iterator]":return"stringiterator";case"[object Array Iterator]":return"arrayiterator"}return w.slice(8,-1).toLowerCase().replace(/\s/g,"")};function i(s){return typeof s.constructor=="function"?s.constructor.name:null}function p(s){return Array.isArray?Array.isArray(s):s instanceof Array}function o(s){return s instanceof Error||typeof s.message=="string"&&s.constructor&&typeof s.constructor.stackTraceLimit=="number"}function c(s){return s instanceof Date?!0:typeof s.toDateString=="function"&&typeof s.getDate=="function"&&typeof s.setDate=="function"}function h(s){return s instanceof RegExp?!0:typeof s.flags=="string"&&typeof s.ignoreCase=="boolean"&&typeof s.multiline=="boolean"&&typeof s.global=="boolean"}function f(s,m){return i(s)==="GeneratorFunction"}function y(s){return typeof s.throw=="function"&&typeof s.return=="function"&&typeof s.next=="function"}function a(s){try{if(typeof s.length=="number"&&typeof s.callee=="function")return!0}catch(m){if(m.message.indexOf("callee")!==-1)return!0}return!1}function l(s){return s.constructor&&typeof s.constructor.isBuffer=="function"?s.constructor.isBuffer(s):!1}return kindOf}var isExtendable,hasRequiredIsExtendable;function requireIsExtendable(){return hasRequiredIsExtendable||(hasRequiredIsExtendable=1,isExtendable=function(i){return typeof i<"u"&&i!==null&&(typeof i=="object"||typeof i=="function")}),isExtendable}var extendShallow,hasRequiredExtendShallow;function requireExtendShallow(){if(hasRequiredExtendShallow)return extendShallow;hasRequiredExtendShallow=1;var t=requireIsExtendable();extendShallow=function(c){t(c)||(c={});for(var h=arguments.length,f=1;f<h;f++){var y=arguments[f];t(y)&&i(c,y)}return c};function i(o,c){for(var h in c)p(c,h)&&(o[h]=c[h])}function p(o,c){return Object.prototype.hasOwnProperty.call(o,c)}return extendShallow}var sectionMatter,hasRequiredSectionMatter;function requireSectionMatter(){if(hasRequiredSectionMatter)return sectionMatter;hasRequiredSectionMatter=1;var t=requireKindOf(),i=requireExtendShallow();sectionMatter=function(a,l){typeof l=="function"&&(l={parse:l});var s=o(a),m={section_delimiter:"---",parse:f},w=i({},m,l),k=w.section_delimiter,E=s.content.split(/\r?\n/),I=null,D=h(),M=[],j=[];function N(z){s.content=z,I=[],M=[]}function H(z){j.length&&(D.key=c(j[0],k),D.content=z,w.parse(D,I),I.push(D),D=h(),M=[],j=[])}for(var L=0;L<E.length;L++){var W=E[L],U=j.length,$=W.trim();if(p($,k)){if($.length===3&&L!==0){if(U===0||U===2){M.push(W);continue}j.push($),D.data=M.join(`
`),M=[];continue}I===null&&N(M.join(`
`)),U===2&&H(M.join(`
`)),j.push($);continue}M.push(W)}return I===null?N(M.join(`
`)):H(M.join(`
`)),s.sections=I,s};function p(a,l){return!(a.slice(0,l.length)!==l||a.charAt(l.length+1)===l.slice(-1))}function o(a){if(t(a)!=="object"&&(a={content:a}),typeof a.content!="string"&&!y(a.content))throw new TypeError("expected a buffer or string");return a.content=a.content.toString(),a.sections=[],a}function c(a,l){return a?a.slice(l.length).trim():""}function h(){return{key:"",data:"",content:""}}function f(a){return a}function y(a){return a&&a.constructor&&typeof a.constructor.isBuffer=="function"?a.constructor.isBuffer(a):!1}return sectionMatter}var engines={exports:{}},jsYaml$1={},loader={},common={},hasRequiredCommon;function requireCommon(){if(hasRequiredCommon)return common;hasRequiredCommon=1;function t(f){return typeof f>"u"||f===null}function i(f){return typeof f=="object"&&f!==null}function p(f){return Array.isArray(f)?f:t(f)?[]:[f]}function o(f,y){var a,l,s,m;if(y)for(m=Object.keys(y),a=0,l=m.length;a<l;a+=1)s=m[a],f[s]=y[s];return f}function c(f,y){var a="",l;for(l=0;l<y;l+=1)a+=f;return a}function h(f){return f===0&&Number.NEGATIVE_INFINITY===1/f}return common.isNothing=t,common.isObject=i,common.toArray=p,common.repeat=c,common.isNegativeZero=h,common.extend=o,common}var exception,hasRequiredException;function requireException(){if(hasRequiredException)return exception;hasRequiredException=1;function t(i,p){Error.call(this),this.name="YAMLException",this.reason=i,this.mark=p,this.message=(this.reason||"(unknown reason)")+(this.mark?" "+this.mark.toString():""),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t.prototype.toString=function(p){var o=this.name+": ";return o+=this.reason||"(unknown reason)",!p&&this.mark&&(o+=" "+this.mark.toString()),o},exception=t,exception}var mark,hasRequiredMark;function requireMark(){if(hasRequiredMark)return mark;hasRequiredMark=1;var t=requireCommon();function i(p,o,c,h,f){this.name=p,this.buffer=o,this.position=c,this.line=h,this.column=f}return i.prototype.getSnippet=function(o,c){var h,f,y,a,l;if(!this.buffer)return null;for(o=o||4,c=c||75,h="",f=this.position;f>0&&`\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(f-1))===-1;)if(f-=1,this.position-f>c/2-1){h=" ... ",f+=5;break}for(y="",a=this.position;a<this.buffer.length&&`\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(a))===-1;)if(a+=1,a-this.position>c/2-1){y=" ... ",a-=5;break}return l=this.buffer.slice(f,a),t.repeat(" ",o)+h+l+y+`
`+t.repeat(" ",o+this.position-f+h.length)+"^"},i.prototype.toString=function(o){var c,h="";return this.name&&(h+='in "'+this.name+'" '),h+="at line "+(this.line+1)+", column "+(this.column+1),o||(c=this.getSnippet(),c&&(h+=`:
`+c)),h},mark=i,mark}var type,hasRequiredType;function requireType(){if(hasRequiredType)return type;hasRequiredType=1;var t=requireException(),i=["kind","resolve","construct","instanceOf","predicate","represent","defaultStyle","styleAliases"],p=["scalar","sequence","mapping"];function o(h){var f={};return h!==null&&Object.keys(h).forEach(function(y){h[y].forEach(function(a){f[String(a)]=y})}),f}function c(h,f){if(f=f||{},Object.keys(f).forEach(function(y){if(i.indexOf(y)===-1)throw new t('Unknown option "'+y+'" is met in definition of "'+h+'" YAML type.')}),this.tag=h,this.kind=f.kind||null,this.resolve=f.resolve||function(){return!0},this.construct=f.construct||function(y){return y},this.instanceOf=f.instanceOf||null,this.predicate=f.predicate||null,this.represent=f.represent||null,this.defaultStyle=f.defaultStyle||null,this.styleAliases=o(f.styleAliases||null),p.indexOf(this.kind)===-1)throw new t('Unknown kind "'+this.kind+'" is specified for "'+h+'" YAML type.')}return type=c,type}var schema,hasRequiredSchema;function requireSchema(){if(hasRequiredSchema)return schema;hasRequiredSchema=1;var t=requireCommon(),i=requireException(),p=requireType();function o(f,y,a){var l=[];return f.include.forEach(function(s){a=o(s,y,a)}),f[y].forEach(function(s){a.forEach(function(m,w){m.tag===s.tag&&m.kind===s.kind&&l.push(w)}),a.push(s)}),a.filter(function(s,m){return l.indexOf(m)===-1})}function c(){var f={scalar:{},sequence:{},mapping:{},fallback:{}},y,a;function l(s){f[s.kind][s.tag]=f.fallback[s.tag]=s}for(y=0,a=arguments.length;y<a;y+=1)arguments[y].forEach(l);return f}function h(f){this.include=f.include||[],this.implicit=f.implicit||[],this.explicit=f.explicit||[],this.implicit.forEach(function(y){if(y.loadKind&&y.loadKind!=="scalar")throw new i("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")}),this.compiledImplicit=o(this,"implicit",[]),this.compiledExplicit=o(this,"explicit",[]),this.compiledTypeMap=c(this.compiledImplicit,this.compiledExplicit)}return h.DEFAULT=null,h.create=function(){var y,a;switch(arguments.length){case 1:y=h.DEFAULT,a=arguments[0];break;case 2:y=arguments[0],a=arguments[1];break;default:throw new i("Wrong number of arguments for Schema.create function")}if(y=t.toArray(y),a=t.toArray(a),!y.every(function(l){return l instanceof h}))throw new i("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");if(!a.every(function(l){return l instanceof p}))throw new i("Specified list of YAML types (or a single Type object) contains a non-Type object.");return new h({include:y,explicit:a})},schema=h,schema}var str,hasRequiredStr;function requireStr(){if(hasRequiredStr)return str;hasRequiredStr=1;var t=requireType();return str=new t("tag:yaml.org,2002:str",{kind:"scalar",construct:function(i){return i!==null?i:""}}),str}var seq,hasRequiredSeq;function requireSeq(){if(hasRequiredSeq)return seq;hasRequiredSeq=1;var t=requireType();return seq=new t("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(i){return i!==null?i:[]}}),seq}var map,hasRequiredMap;function requireMap(){if(hasRequiredMap)return map;hasRequiredMap=1;var t=requireType();return map=new t("tag:yaml.org,2002:map",{kind:"mapping",construct:function(i){return i!==null?i:{}}}),map}var failsafe,hasRequiredFailsafe;function requireFailsafe(){if(hasRequiredFailsafe)return failsafe;hasRequiredFailsafe=1;var t=requireSchema();return failsafe=new t({explicit:[requireStr(),requireSeq(),requireMap()]}),failsafe}var _null,hasRequired_null;function require_null(){if(hasRequired_null)return _null;hasRequired_null=1;var t=requireType();function i(c){if(c===null)return!0;var h=c.length;return h===1&&c==="~"||h===4&&(c==="null"||c==="Null"||c==="NULL")}function p(){return null}function o(c){return c===null}return _null=new t("tag:yaml.org,2002:null",{kind:"scalar",resolve:i,construct:p,predicate:o,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"}},defaultStyle:"lowercase"}),_null}var bool,hasRequiredBool;function requireBool(){if(hasRequiredBool)return bool;hasRequiredBool=1;var t=requireType();function i(c){if(c===null)return!1;var h=c.length;return h===4&&(c==="true"||c==="True"||c==="TRUE")||h===5&&(c==="false"||c==="False"||c==="FALSE")}function p(c){return c==="true"||c==="True"||c==="TRUE"}function o(c){return Object.prototype.toString.call(c)==="[object Boolean]"}return bool=new t("tag:yaml.org,2002:bool",{kind:"scalar",resolve:i,construct:p,predicate:o,represent:{lowercase:function(c){return c?"true":"false"},uppercase:function(c){return c?"TRUE":"FALSE"},camelcase:function(c){return c?"True":"False"}},defaultStyle:"lowercase"}),bool}var int,hasRequiredInt;function requireInt(){if(hasRequiredInt)return int;hasRequiredInt=1;var t=requireCommon(),i=requireType();function p(a){return 48<=a&&a<=57||65<=a&&a<=70||97<=a&&a<=102}function o(a){return 48<=a&&a<=55}function c(a){return 48<=a&&a<=57}function h(a){if(a===null)return!1;var l=a.length,s=0,m=!1,w;if(!l)return!1;if(w=a[s],(w==="-"||w==="+")&&(w=a[++s]),w==="0"){if(s+1===l)return!0;if(w=a[++s],w==="b"){for(s++;s<l;s++)if(w=a[s],w!=="_"){if(w!=="0"&&w!=="1")return!1;m=!0}return m&&w!=="_"}if(w==="x"){for(s++;s<l;s++)if(w=a[s],w!=="_"){if(!p(a.charCodeAt(s)))return!1;m=!0}return m&&w!=="_"}for(;s<l;s++)if(w=a[s],w!=="_"){if(!o(a.charCodeAt(s)))return!1;m=!0}return m&&w!=="_"}if(w==="_")return!1;for(;s<l;s++)if(w=a[s],w!=="_"){if(w===":")break;if(!c(a.charCodeAt(s)))return!1;m=!0}return!m||w==="_"?!1:w!==":"?!0:/^(:[0-5]?[0-9])+$/.test(a.slice(s))}function f(a){var l=a,s=1,m,w,k=[];return l.indexOf("_")!==-1&&(l=l.replace(/_/g,"")),m=l[0],(m==="-"||m==="+")&&(m==="-"&&(s=-1),l=l.slice(1),m=l[0]),l==="0"?0:m==="0"?l[1]==="b"?s*parseInt(l.slice(2),2):l[1]==="x"?s*parseInt(l,16):s*parseInt(l,8):l.indexOf(":")!==-1?(l.split(":").forEach(function(E){k.unshift(parseInt(E,10))}),l=0,w=1,k.forEach(function(E){l+=E*w,w*=60}),s*l):s*parseInt(l,10)}function y(a){return Object.prototype.toString.call(a)==="[object Number]"&&a%1===0&&!t.isNegativeZero(a)}return int=new i("tag:yaml.org,2002:int",{kind:"scalar",resolve:h,construct:f,predicate:y,represent:{binary:function(a){return a>=0?"0b"+a.toString(2):"-0b"+a.toString(2).slice(1)},octal:function(a){return a>=0?"0"+a.toString(8):"-0"+a.toString(8).slice(1)},decimal:function(a){return a.toString(10)},hexadecimal:function(a){return a>=0?"0x"+a.toString(16).toUpperCase():"-0x"+a.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),int}var float,hasRequiredFloat;function requireFloat(){if(hasRequiredFloat)return float;hasRequiredFloat=1;var t=requireCommon(),i=requireType(),p=new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function o(a){return!(a===null||!p.test(a)||a[a.length-1]==="_")}function c(a){var l,s,m,w;return l=a.replace(/_/g,"").toLowerCase(),s=l[0]==="-"?-1:1,w=[],"+-".indexOf(l[0])>=0&&(l=l.slice(1)),l===".inf"?s===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:l===".nan"?NaN:l.indexOf(":")>=0?(l.split(":").forEach(function(k){w.unshift(parseFloat(k,10))}),l=0,m=1,w.forEach(function(k){l+=k*m,m*=60}),s*l):s*parseFloat(l,10)}var h=/^[-+]?[0-9]+e/;function f(a,l){var s;if(isNaN(a))switch(l){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===a)switch(l){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===a)switch(l){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(t.isNegativeZero(a))return"-0.0";return s=a.toString(10),h.test(s)?s.replace("e",".e"):s}function y(a){return Object.prototype.toString.call(a)==="[object Number]"&&(a%1!==0||t.isNegativeZero(a))}return float=new i("tag:yaml.org,2002:float",{kind:"scalar",resolve:o,construct:c,predicate:y,represent:f,defaultStyle:"lowercase"}),float}var json,hasRequiredJson;function requireJson(){if(hasRequiredJson)return json;hasRequiredJson=1;var t=requireSchema();return json=new t({include:[requireFailsafe()],implicit:[require_null(),requireBool(),requireInt(),requireFloat()]}),json}var core,hasRequiredCore;function requireCore(){if(hasRequiredCore)return core;hasRequiredCore=1;var t=requireSchema();return core=new t({include:[requireJson()]}),core}var timestamp,hasRequiredTimestamp;function requireTimestamp(){if(hasRequiredTimestamp)return timestamp;hasRequiredTimestamp=1;var t=requireType(),i=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),p=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function o(f){return f===null?!1:i.exec(f)!==null||p.exec(f)!==null}function c(f){var y,a,l,s,m,w,k,E=0,I=null,D,M,j;if(y=i.exec(f),y===null&&(y=p.exec(f)),y===null)throw new Error("Date resolve error");if(a=+y[1],l=+y[2]-1,s=+y[3],!y[4])return new Date(Date.UTC(a,l,s));if(m=+y[4],w=+y[5],k=+y[6],y[7]){for(E=y[7].slice(0,3);E.length<3;)E+="0";E=+E}return y[9]&&(D=+y[10],M=+(y[11]||0),I=(D*60+M)*6e4,y[9]==="-"&&(I=-I)),j=new Date(Date.UTC(a,l,s,m,w,k,E)),I&&j.setTime(j.getTime()-I),j}function h(f){return f.toISOString()}return timestamp=new t("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:o,construct:c,instanceOf:Date,represent:h}),timestamp}var merge,hasRequiredMerge;function requireMerge(){if(hasRequiredMerge)return merge;hasRequiredMerge=1;var t=requireType();function i(p){return p==="<<"||p===null}return merge=new t("tag:yaml.org,2002:merge",{kind:"scalar",resolve:i}),merge}function commonjsRequire(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var binary,hasRequiredBinary;function requireBinary(){if(hasRequiredBinary)return binary;hasRequiredBinary=1;var t;try{var i=commonjsRequire;t=i("buffer").Buffer}catch{}var p=requireType(),o=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function c(a){if(a===null)return!1;var l,s,m=0,w=a.length,k=o;for(s=0;s<w;s++)if(l=k.indexOf(a.charAt(s)),!(l>64)){if(l<0)return!1;m+=6}return m%8===0}function h(a){var l,s,m=a.replace(/[\r\n=]/g,""),w=m.length,k=o,E=0,I=[];for(l=0;l<w;l++)l%4===0&&l&&(I.push(E>>16&255),I.push(E>>8&255),I.push(E&255)),E=E<<6|k.indexOf(m.charAt(l));return s=w%4*6,s===0?(I.push(E>>16&255),I.push(E>>8&255),I.push(E&255)):s===18?(I.push(E>>10&255),I.push(E>>2&255)):s===12&&I.push(E>>4&255),t?t.from?t.from(I):new t(I):I}function f(a){var l="",s=0,m,w,k=a.length,E=o;for(m=0;m<k;m++)m%3===0&&m&&(l+=E[s>>18&63],l+=E[s>>12&63],l+=E[s>>6&63],l+=E[s&63]),s=(s<<8)+a[m];return w=k%3,w===0?(l+=E[s>>18&63],l+=E[s>>12&63],l+=E[s>>6&63],l+=E[s&63]):w===2?(l+=E[s>>10&63],l+=E[s>>4&63],l+=E[s<<2&63],l+=E[64]):w===1&&(l+=E[s>>2&63],l+=E[s<<4&63],l+=E[64],l+=E[64]),l}function y(a){return t&&t.isBuffer(a)}return binary=new p("tag:yaml.org,2002:binary",{kind:"scalar",resolve:c,construct:h,predicate:y,represent:f}),binary}var omap,hasRequiredOmap;function requireOmap(){if(hasRequiredOmap)return omap;hasRequiredOmap=1;var t=requireType(),i=Object.prototype.hasOwnProperty,p=Object.prototype.toString;function o(h){if(h===null)return!0;var f=[],y,a,l,s,m,w=h;for(y=0,a=w.length;y<a;y+=1){if(l=w[y],m=!1,p.call(l)!=="[object Object]")return!1;for(s in l)if(i.call(l,s))if(!m)m=!0;else return!1;if(!m)return!1;if(f.indexOf(s)===-1)f.push(s);else return!1}return!0}function c(h){return h!==null?h:[]}return omap=new t("tag:yaml.org,2002:omap",{kind:"sequence",resolve:o,construct:c}),omap}var pairs,hasRequiredPairs;function requirePairs(){if(hasRequiredPairs)return pairs;hasRequiredPairs=1;var t=requireType(),i=Object.prototype.toString;function p(c){if(c===null)return!0;var h,f,y,a,l,s=c;for(l=new Array(s.length),h=0,f=s.length;h<f;h+=1){if(y=s[h],i.call(y)!=="[object Object]"||(a=Object.keys(y),a.length!==1))return!1;l[h]=[a[0],y[a[0]]]}return!0}function o(c){if(c===null)return[];var h,f,y,a,l,s=c;for(l=new Array(s.length),h=0,f=s.length;h<f;h+=1)y=s[h],a=Object.keys(y),l[h]=[a[0],y[a[0]]];return l}return pairs=new t("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:p,construct:o}),pairs}var set,hasRequiredSet;function requireSet(){if(hasRequiredSet)return set;hasRequiredSet=1;var t=requireType(),i=Object.prototype.hasOwnProperty;function p(c){if(c===null)return!0;var h,f=c;for(h in f)if(i.call(f,h)&&f[h]!==null)return!1;return!0}function o(c){return c!==null?c:{}}return set=new t("tag:yaml.org,2002:set",{kind:"mapping",resolve:p,construct:o}),set}var default_safe,hasRequiredDefault_safe;function requireDefault_safe(){if(hasRequiredDefault_safe)return default_safe;hasRequiredDefault_safe=1;var t=requireSchema();return default_safe=new t({include:[requireCore()],implicit:[requireTimestamp(),requireMerge()],explicit:[requireBinary(),requireOmap(),requirePairs(),requireSet()]}),default_safe}var _undefined,hasRequired_undefined;function require_undefined(){if(hasRequired_undefined)return _undefined;hasRequired_undefined=1;var t=requireType();function i(){return!0}function p(){}function o(){return""}function c(h){return typeof h>"u"}return _undefined=new t("tag:yaml.org,2002:js/undefined",{kind:"scalar",resolve:i,construct:p,predicate:c,represent:o}),_undefined}var regexp,hasRequiredRegexp;function requireRegexp(){if(hasRequiredRegexp)return regexp;hasRequiredRegexp=1;var t=requireType();function i(h){if(h===null||h.length===0)return!1;var f=h,y=/\/([gim]*)$/.exec(h),a="";return!(f[0]==="/"&&(y&&(a=y[1]),a.length>3||f[f.length-a.length-1]!=="/"))}function p(h){var f=h,y=/\/([gim]*)$/.exec(h),a="";return f[0]==="/"&&(y&&(a=y[1]),f=f.slice(1,f.length-a.length-1)),new RegExp(f,a)}function o(h){var f="/"+h.source+"/";return h.global&&(f+="g"),h.multiline&&(f+="m"),h.ignoreCase&&(f+="i"),f}function c(h){return Object.prototype.toString.call(h)==="[object RegExp]"}return regexp=new t("tag:yaml.org,2002:js/regexp",{kind:"scalar",resolve:i,construct:p,predicate:c,represent:o}),regexp}var _function,hasRequired_function;function require_function(){if(hasRequired_function)return _function;hasRequired_function=1;var t;try{var i=commonjsRequire;t=i("esprima")}catch{typeof window<"u"&&(t=window.esprima)}var p=requireType();function o(y){if(y===null)return!1;try{var a="("+y+")",l=t.parse(a,{range:!0});return!(l.type!=="Program"||l.body.length!==1||l.body[0].type!=="ExpressionStatement"||l.body[0].expression.type!=="ArrowFunctionExpression"&&l.body[0].expression.type!=="FunctionExpression")}catch{return!1}}function c(y){var a="("+y+")",l=t.parse(a,{range:!0}),s=[],m;if(l.type!=="Program"||l.body.length!==1||l.body[0].type!=="ExpressionStatement"||l.body[0].expression.type!=="ArrowFunctionExpression"&&l.body[0].expression.type!=="FunctionExpression")throw new Error("Failed to resolve function");return l.body[0].expression.params.forEach(function(w){s.push(w.name)}),m=l.body[0].expression.body.range,l.body[0].expression.body.type==="BlockStatement"?new Function(s,a.slice(m[0]+1,m[1]-1)):new Function(s,"return "+a.slice(m[0],m[1]))}function h(y){return y.toString()}function f(y){return Object.prototype.toString.call(y)==="[object Function]"}return _function=new p("tag:yaml.org,2002:js/function",{kind:"scalar",resolve:o,construct:c,predicate:f,represent:h}),_function}var default_full,hasRequiredDefault_full;function requireDefault_full(){if(hasRequiredDefault_full)return default_full;hasRequiredDefault_full=1;var t=requireSchema();return default_full=t.DEFAULT=new t({include:[requireDefault_safe()],explicit:[require_undefined(),requireRegexp(),require_function()]}),default_full}var hasRequiredLoader;function requireLoader(){if(hasRequiredLoader)return loader;hasRequiredLoader=1;var t=requireCommon(),i=requireException(),p=requireMark(),o=requireDefault_safe(),c=requireDefault_full(),h=Object.prototype.hasOwnProperty,f=1,y=2,a=3,l=4,s=1,m=2,w=3,k=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,E=/[\x85\u2028\u2029]/,I=/[,\[\]\{\}]/,D=/^(?:!|!!|![a-z\-]+!)$/i,M=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function j(e){return Object.prototype.toString.call(e)}function N(e){return e===10||e===13}function H(e){return e===9||e===32}function L(e){return e===9||e===32||e===10||e===13}function W(e){return e===44||e===91||e===93||e===123||e===125}function U(e){var d;return 48<=e&&e<=57?e-48:(d=e|32,97<=d&&d<=102?d-97+10:-1)}function $(e){return e===120?2:e===117?4:e===85?8:0}function z(e){return 48<=e&&e<=57?e-48:-1}function J(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"":e===95?" ":e===76?"\u2028":e===80?"\u2029":""}function ne(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function V(e,d,v){d==="__proto__"?Object.defineProperty(e,d,{configurable:!0,enumerable:!0,writable:!0,value:v}):e[d]=v}for(var X=new Array(256),Y=new Array(256),ee=0;ee<256;ee++)X[ee]=J(ee)?1:0,Y[ee]=J(ee);function we(e,d){this.input=e,this.filename=d.filename||null,this.schema=d.schema||c,this.onWarning=d.onWarning||null,this.legacy=d.legacy||!1,this.json=d.json||!1,this.listener=d.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.documents=[]}function le(e,d){return new i(d,new p(e.filename,e.input,e.position,e.line,e.position-e.lineStart))}function q(e,d){throw le(e,d)}function re(e,d){e.onWarning&&e.onWarning.call(null,le(e,d))}var te={YAML:function(d,v,T){var x,n,u;d.version!==null&&q(d,"duplication of %YAML directive"),T.length!==1&&q(d,"YAML directive accepts exactly one argument"),x=/^([0-9]+)\.([0-9]+)$/.exec(T[0]),x===null&&q(d,"ill-formed argument of the YAML directive"),n=parseInt(x[1],10),u=parseInt(x[2],10),n!==1&&q(d,"unacceptable YAML version of the document"),d.version=T[0],d.checkLineBreaks=u<2,u!==1&&u!==2&&re(d,"unsupported YAML version of the document")},TAG:function(d,v,T){var x,n;T.length!==2&&q(d,"TAG directive accepts exactly two arguments"),x=T[0],n=T[1],D.test(x)||q(d,"ill-formed tag handle (first argument) of the TAG directive"),h.call(d.tagMap,x)&&q(d,'there is a previously declared suffix for "'+x+'" tag handle'),M.test(n)||q(d,"ill-formed tag prefix (second argument) of the TAG directive"),d.tagMap[x]=n}};function K(e,d,v,T){var x,n,u,g;if(d<v){if(g=e.input.slice(d,v),T)for(x=0,n=g.length;x<n;x+=1)u=g.charCodeAt(x),u===9||32<=u&&u<=1114111||q(e,"expected valid JSON character");else k.test(g)&&q(e,"the stream contains non-printable characters");e.result+=g}}function ie(e,d,v,T){var x,n,u,g;for(t.isObject(v)||q(e,"cannot merge mappings; the provided source object is unacceptable"),x=Object.keys(v),u=0,g=x.length;u<g;u+=1)n=x[u],h.call(d,n)||(V(d,n,v[n]),T[n]=!0)}function Q(e,d,v,T,x,n,u,g){var _,A;if(Array.isArray(x))for(x=Array.prototype.slice.call(x),_=0,A=x.length;_<A;_+=1)Array.isArray(x[_])&&q(e,"nested arrays are not supported inside keys"),typeof x=="object"&&j(x[_])==="[object Object]"&&(x[_]="[object Object]");if(typeof x=="object"&&j(x)==="[object Object]"&&(x="[object Object]"),x=String(x),d===null&&(d={}),T==="tag:yaml.org,2002:merge")if(Array.isArray(n))for(_=0,A=n.length;_<A;_+=1)ie(e,d,n[_],v);else ie(e,d,n,v);else!e.json&&!h.call(v,x)&&h.call(d,x)&&(e.line=u||e.line,e.position=g||e.position,q(e,"duplicated mapping key")),V(d,x,n),delete v[x];return d}function ue(e){var d;d=e.input.charCodeAt(e.position),d===10?e.position++:d===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):q(e,"a line break is expected"),e.line+=1,e.lineStart=e.position}function B(e,d,v){for(var T=0,x=e.input.charCodeAt(e.position);x!==0;){for(;H(x);)x=e.input.charCodeAt(++e.position);if(d&&x===35)do x=e.input.charCodeAt(++e.position);while(x!==10&&x!==13&&x!==0);if(N(x))for(ue(e),x=e.input.charCodeAt(e.position),T++,e.lineIndent=0;x===32;)e.lineIndent++,x=e.input.charCodeAt(++e.position);else break}return v!==-1&&T!==0&&e.lineIndent<v&&re(e,"deficient indentation"),T}function oe(e){var d=e.position,v;return v=e.input.charCodeAt(d),!!((v===45||v===46)&&v===e.input.charCodeAt(d+1)&&v===e.input.charCodeAt(d+2)&&(d+=3,v=e.input.charCodeAt(d),v===0||L(v)))}function ae(e,d){d===1?e.result+=" ":d>1&&(e.result+=t.repeat(`
`,d-1))}function ce(e,d,v){var T,x,n,u,g,_,A,R,b=e.kind,C=e.result,S;if(S=e.input.charCodeAt(e.position),L(S)||W(S)||S===35||S===38||S===42||S===33||S===124||S===62||S===39||S===34||S===37||S===64||S===96||(S===63||S===45)&&(x=e.input.charCodeAt(e.position+1),L(x)||v&&W(x)))return!1;for(e.kind="scalar",e.result="",n=u=e.position,g=!1;S!==0;){if(S===58){if(x=e.input.charCodeAt(e.position+1),L(x)||v&&W(x))break}else if(S===35){if(T=e.input.charCodeAt(e.position-1),L(T))break}else{if(e.position===e.lineStart&&oe(e)||v&&W(S))break;if(N(S))if(_=e.line,A=e.lineStart,R=e.lineIndent,B(e,!1,-1),e.lineIndent>=d){g=!0,S=e.input.charCodeAt(e.position);continue}else{e.position=u,e.line=_,e.lineStart=A,e.lineIndent=R;break}}g&&(K(e,n,u,!1),ae(e,e.line-_),n=u=e.position,g=!1),H(S)||(u=e.position+1),S=e.input.charCodeAt(++e.position)}return K(e,n,u,!1),e.result?!0:(e.kind=b,e.result=C,!1)}function he(e,d){var v,T,x;if(v=e.input.charCodeAt(e.position),v!==39)return!1;for(e.kind="scalar",e.result="",e.position++,T=x=e.position;(v=e.input.charCodeAt(e.position))!==0;)if(v===39)if(K(e,T,e.position,!0),v=e.input.charCodeAt(++e.position),v===39)T=e.position,e.position++,x=e.position;else return!0;else N(v)?(K(e,T,x,!0),ae(e,B(e,!1,d)),T=x=e.position):e.position===e.lineStart&&oe(e)?q(e,"unexpected end of the document within a single quoted scalar"):(e.position++,x=e.position);q(e,"unexpected end of the stream within a single quoted scalar")}function fe(e,d){var v,T,x,n,u,g;if(g=e.input.charCodeAt(e.position),g!==34)return!1;for(e.kind="scalar",e.result="",e.position++,v=T=e.position;(g=e.input.charCodeAt(e.position))!==0;){if(g===34)return K(e,v,e.position,!0),e.position++,!0;if(g===92){if(K(e,v,e.position,!0),g=e.input.charCodeAt(++e.position),N(g))B(e,!1,d);else if(g<256&&X[g])e.result+=Y[g],e.position++;else if((u=$(g))>0){for(x=u,n=0;x>0;x--)g=e.input.charCodeAt(++e.position),(u=U(g))>=0?n=(n<<4)+u:q(e,"expected hexadecimal character");e.result+=ne(n),e.position++}else q(e,"unknown escape sequence");v=T=e.position}else N(g)?(K(e,v,T,!0),ae(e,B(e,!1,d)),v=T=e.position):e.position===e.lineStart&&oe(e)?q(e,"unexpected end of the document within a double quoted scalar"):(e.position++,T=e.position)}q(e,"unexpected end of the stream within a double quoted scalar")}function de(e,d){var v=!0,T,x=e.tag,n,u=e.anchor,g,_,A,R,b,C={},S,O,F,P;if(P=e.input.charCodeAt(e.position),P===91)_=93,b=!1,n=[];else if(P===123)_=125,b=!0,n={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=n),P=e.input.charCodeAt(++e.position);P!==0;){if(B(e,!0,d),P=e.input.charCodeAt(e.position),P===_)return e.position++,e.tag=x,e.anchor=u,e.kind=b?"mapping":"sequence",e.result=n,!0;v||q(e,"missed comma between flow collection entries"),O=S=F=null,A=R=!1,P===63&&(g=e.input.charCodeAt(e.position+1),L(g)&&(A=R=!0,e.position++,B(e,!0,d))),T=e.line,Z(e,d,f,!1,!0),O=e.tag,S=e.result,B(e,!0,d),P=e.input.charCodeAt(e.position),(R||e.line===T)&&P===58&&(A=!0,P=e.input.charCodeAt(++e.position),B(e,!0,d),Z(e,d,f,!1,!0),F=e.result),b?Q(e,n,C,O,S,F):A?n.push(Q(e,null,C,O,S,F)):n.push(S),B(e,!0,d),P=e.input.charCodeAt(e.position),P===44?(v=!0,P=e.input.charCodeAt(++e.position)):v=!1}q(e,"unexpected end of the stream within a flow collection")}function se(e,d){var v,T,x=s,n=!1,u=!1,g=d,_=0,A=!1,R,b;if(b=e.input.charCodeAt(e.position),b===124)T=!1;else if(b===62)T=!0;else return!1;for(e.kind="scalar",e.result="";b!==0;)if(b=e.input.charCodeAt(++e.position),b===43||b===45)s===x?x=b===43?w:m:q(e,"repeat of a chomping mode identifier");else if((R=z(b))>=0)R===0?q(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):u?q(e,"repeat of an indentation width identifier"):(g=d+R-1,u=!0);else break;if(H(b)){do b=e.input.charCodeAt(++e.position);while(H(b));if(b===35)do b=e.input.charCodeAt(++e.position);while(!N(b)&&b!==0)}for(;b!==0;){for(ue(e),e.lineIndent=0,b=e.input.charCodeAt(e.position);(!u||e.lineIndent<g)&&b===32;)e.lineIndent++,b=e.input.charCodeAt(++e.position);if(!u&&e.lineIndent>g&&(g=e.lineIndent),N(b)){_++;continue}if(e.lineIndent<g){x===w?e.result+=t.repeat(`
`,n?1+_:_):x===s&&n&&(e.result+=`
`);break}for(T?H(b)?(A=!0,e.result+=t.repeat(`
`,n?1+_:_)):A?(A=!1,e.result+=t.repeat(`
`,_+1)):_===0?n&&(e.result+=" "):e.result+=t.repeat(`
`,_):e.result+=t.repeat(`
`,n?1+_:_),n=!0,u=!0,_=0,v=e.position;!N(b)&&b!==0;)b=e.input.charCodeAt(++e.position);K(e,v,e.position,!1)}return!0}function pe(e,d){var v,T=e.tag,x=e.anchor,n=[],u,g=!1,_;for(e.anchor!==null&&(e.anchorMap[e.anchor]=n),_=e.input.charCodeAt(e.position);_!==0&&!(_!==45||(u=e.input.charCodeAt(e.position+1),!L(u)));){if(g=!0,e.position++,B(e,!0,-1)&&e.lineIndent<=d){n.push(null),_=e.input.charCodeAt(e.position);continue}if(v=e.line,Z(e,d,a,!1,!0),n.push(e.result),B(e,!0,-1),_=e.input.charCodeAt(e.position),(e.line===v||e.lineIndent>d)&&_!==0)q(e,"bad indentation of a sequence entry");else if(e.lineIndent<d)break}return g?(e.tag=T,e.anchor=x,e.kind="sequence",e.result=n,!0):!1}function xe(e,d,v){var T,x,n,u,g=e.tag,_=e.anchor,A={},R={},b=null,C=null,S=null,O=!1,F=!1,P;for(e.anchor!==null&&(e.anchorMap[e.anchor]=A),P=e.input.charCodeAt(e.position);P!==0;){if(T=e.input.charCodeAt(e.position+1),n=e.line,u=e.position,(P===63||P===58)&&L(T))P===63?(O&&(Q(e,A,R,b,C,null),b=C=S=null),F=!0,O=!0,x=!0):O?(O=!1,x=!0):q(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,P=T;else if(Z(e,v,y,!1,!0))if(e.line===n){for(P=e.input.charCodeAt(e.position);H(P);)P=e.input.charCodeAt(++e.position);if(P===58)P=e.input.charCodeAt(++e.position),L(P)||q(e,"a whitespace character is expected after the key-value separator within a block mapping"),O&&(Q(e,A,R,b,C,null),b=C=S=null),F=!0,O=!1,x=!1,b=e.tag,C=e.result;else if(F)q(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=g,e.anchor=_,!0}else if(F)q(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=g,e.anchor=_,!0;else break;if((e.line===n||e.lineIndent>d)&&(Z(e,d,l,!0,x)&&(O?C=e.result:S=e.result),O||(Q(e,A,R,b,C,S,n,u),b=C=S=null),B(e,!0,-1),P=e.input.charCodeAt(e.position)),e.lineIndent>d&&P!==0)q(e,"bad indentation of a mapping entry");else if(e.lineIndent<d)break}return O&&Q(e,A,R,b,C,null),F&&(e.tag=g,e.anchor=_,e.kind="mapping",e.result=A),F}function me(e){var d,v=!1,T=!1,x,n,u;if(u=e.input.charCodeAt(e.position),u!==33)return!1;if(e.tag!==null&&q(e,"duplication of a tag property"),u=e.input.charCodeAt(++e.position),u===60?(v=!0,u=e.input.charCodeAt(++e.position)):u===33?(T=!0,x="!!",u=e.input.charCodeAt(++e.position)):x="!",d=e.position,v){do u=e.input.charCodeAt(++e.position);while(u!==0&&u!==62);e.position<e.length?(n=e.input.slice(d,e.position),u=e.input.charCodeAt(++e.position)):q(e,"unexpected end of the stream within a verbatim tag")}else{for(;u!==0&&!L(u);)u===33&&(T?q(e,"tag suffix cannot contain exclamation marks"):(x=e.input.slice(d-1,e.position+1),D.test(x)||q(e,"named tag handle cannot contain such characters"),T=!0,d=e.position+1)),u=e.input.charCodeAt(++e.position);n=e.input.slice(d,e.position),I.test(n)&&q(e,"tag suffix cannot contain flow indicator characters")}return n&&!M.test(n)&&q(e,"tag name cannot contain such characters: "+n),v?e.tag=n:h.call(e.tagMap,x)?e.tag=e.tagMap[x]+n:x==="!"?e.tag="!"+n:x==="!!"?e.tag="tag:yaml.org,2002:"+n:q(e,'undeclared tag handle "'+x+'"'),!0}function ge(e){var d,v;if(v=e.input.charCodeAt(e.position),v!==38)return!1;for(e.anchor!==null&&q(e,"duplication of an anchor property"),v=e.input.charCodeAt(++e.position),d=e.position;v!==0&&!L(v)&&!W(v);)v=e.input.charCodeAt(++e.position);return e.position===d&&q(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(d,e.position),!0}function Ae(e){var d,v,T;if(T=e.input.charCodeAt(e.position),T!==42)return!1;for(T=e.input.charCodeAt(++e.position),d=e.position;T!==0&&!L(T)&&!W(T);)T=e.input.charCodeAt(++e.position);return e.position===d&&q(e,"name of an alias node must contain at least one character"),v=e.input.slice(d,e.position),h.call(e.anchorMap,v)||q(e,'unidentified alias "'+v+'"'),e.result=e.anchorMap[v],B(e,!0,-1),!0}function Z(e,d,v,T,x){var n,u,g,_=1,A=!1,R=!1,b,C,S,O,F;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,n=u=g=l===v||a===v,T&&B(e,!0,-1)&&(A=!0,e.lineIndent>d?_=1:e.lineIndent===d?_=0:e.lineIndent<d&&(_=-1)),_===1)for(;me(e)||ge(e);)B(e,!0,-1)?(A=!0,g=n,e.lineIndent>d?_=1:e.lineIndent===d?_=0:e.lineIndent<d&&(_=-1)):g=!1;if(g&&(g=A||x),(_===1||l===v)&&(f===v||y===v?O=d:O=d+1,F=e.position-e.lineStart,_===1?g&&(pe(e,F)||xe(e,F,O))||de(e,O)?R=!0:(u&&se(e,O)||he(e,O)||fe(e,O)?R=!0:Ae(e)?(R=!0,(e.tag!==null||e.anchor!==null)&&q(e,"alias node should not have any properties")):ce(e,O,f===v)&&(R=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):_===0&&(R=g&&pe(e,F))),e.tag!==null&&e.tag!=="!")if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&q(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),b=0,C=e.implicitTypes.length;b<C;b+=1)if(S=e.implicitTypes[b],S.resolve(e.result)){e.result=S.construct(e.result),e.tag=S.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else h.call(e.typeMap[e.kind||"fallback"],e.tag)?(S=e.typeMap[e.kind||"fallback"][e.tag],e.result!==null&&S.kind!==e.kind&&q(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+S.kind+'", not "'+e.kind+'"'),S.resolve(e.result)?(e.result=S.construct(e.result),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):q(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")):q(e,"unknown tag !<"+e.tag+">");return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||R}function Re(e){var d=e.position,v,T,x,n=!1,u;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap={},e.anchorMap={};(u=e.input.charCodeAt(e.position))!==0&&(B(e,!0,-1),u=e.input.charCodeAt(e.position),!(e.lineIndent>0||u!==37));){for(n=!0,u=e.input.charCodeAt(++e.position),v=e.position;u!==0&&!L(u);)u=e.input.charCodeAt(++e.position);for(T=e.input.slice(v,e.position),x=[],T.length<1&&q(e,"directive name must not be less than one character in length");u!==0;){for(;H(u);)u=e.input.charCodeAt(++e.position);if(u===35){do u=e.input.charCodeAt(++e.position);while(u!==0&&!N(u));break}if(N(u))break;for(v=e.position;u!==0&&!L(u);)u=e.input.charCodeAt(++e.position);x.push(e.input.slice(v,e.position))}u!==0&&ue(e),h.call(te,T)?te[T](e,T,x):re(e,'unknown document directive "'+T+'"')}if(B(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,B(e,!0,-1)):n&&q(e,"directives end mark is expected"),Z(e,e.lineIndent-1,l,!1,!0),B(e,!0,-1),e.checkLineBreaks&&E.test(e.input.slice(d,e.position))&&re(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&oe(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,B(e,!0,-1));return}if(e.position<e.length-1)q(e,"end of the stream or a document separator is expected");else return}function ye(e,d){e=String(e),d=d||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var v=new we(e,d),T=e.indexOf("\0");for(T!==-1&&(v.position=T,q(v,"null byte is not allowed in input")),v.input+="\0";v.input.charCodeAt(v.position)===32;)v.lineIndent+=1,v.position+=1;for(;v.position<v.length-1;)Re(v);return v.documents}function _e(e,d,v){d!==null&&typeof d=="object"&&typeof v>"u"&&(v=d,d=null);var T=ye(e,v);if(typeof d!="function")return T;for(var x=0,n=T.length;x<n;x+=1)d(T[x])}function ve(e,d){var v=ye(e,d);if(v.length!==0){if(v.length===1)return v[0];throw new i("expected a single document in the stream, but found more")}}function Se(e,d,v){return typeof d=="object"&&d!==null&&typeof v>"u"&&(v=d,d=null),_e(e,d,t.extend({schema:o},v))}function be(e,d){return ve(e,t.extend({schema:o},d))}return loader.loadAll=_e,loader.load=ve,loader.safeLoadAll=Se,loader.safeLoad=be,loader}var dumper={},hasRequiredDumper;function requireDumper(){if(hasRequiredDumper)return dumper;hasRequiredDumper=1;var t=requireCommon(),i=requireException(),p=requireDefault_full(),o=requireDefault_safe(),c=Object.prototype.toString,h=Object.prototype.hasOwnProperty,f=9,y=10,a=13,l=32,s=33,m=34,w=35,k=37,E=38,I=39,D=42,M=44,j=45,N=58,H=61,L=62,W=63,U=64,$=91,z=93,J=96,ne=123,V=124,X=125,Y={};Y[0]="\\0",Y[7]="\\a",Y[8]="\\b",Y[9]="\\t",Y[10]="\\n",Y[11]="\\v",Y[12]="\\f",Y[13]="\\r",Y[27]="\\e",Y[34]='\\"',Y[92]="\\\\",Y[133]="\\N",Y[160]="\\_",Y[8232]="\\L",Y[8233]="\\P";var ee=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"];function we(n,u){var g,_,A,R,b,C,S;if(u===null)return{};for(g={},_=Object.keys(u),A=0,R=_.length;A<R;A+=1)b=_[A],C=String(u[b]),b.slice(0,2)==="!!"&&(b="tag:yaml.org,2002:"+b.slice(2)),S=n.compiledTypeMap.fallback[b],S&&h.call(S.styleAliases,C)&&(C=S.styleAliases[C]),g[b]=C;return g}function le(n){var u,g,_;if(u=n.toString(16).toUpperCase(),n<=255)g="x",_=2;else if(n<=65535)g="u",_=4;else if(n<=4294967295)g="U",_=8;else throw new i("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+g+t.repeat("0",_-u.length)+u}function q(n){this.schema=n.schema||p,this.indent=Math.max(1,n.indent||2),this.noArrayIndent=n.noArrayIndent||!1,this.skipInvalid=n.skipInvalid||!1,this.flowLevel=t.isNothing(n.flowLevel)?-1:n.flowLevel,this.styleMap=we(this.schema,n.styles||null),this.sortKeys=n.sortKeys||!1,this.lineWidth=n.lineWidth||80,this.noRefs=n.noRefs||!1,this.noCompatMode=n.noCompatMode||!1,this.condenseFlow=n.condenseFlow||!1,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function re(n,u){for(var g=t.repeat(" ",u),_=0,A=-1,R="",b,C=n.length;_<C;)A=n.indexOf(`
`,_),A===-1?(b=n.slice(_),_=C):(b=n.slice(_,A+1),_=A+1),b.length&&b!==`
`&&(R+=g),R+=b;return R}function te(n,u){return`
`+t.repeat(" ",n.indent*u)}function K(n,u){var g,_,A;for(g=0,_=n.implicitTypes.length;g<_;g+=1)if(A=n.implicitTypes[g],A.resolve(u))return!0;return!1}function ie(n){return n===l||n===f}function Q(n){return 32<=n&&n<=126||161<=n&&n<=55295&&n!==8232&&n!==8233||57344<=n&&n<=65533&&n!==65279||65536<=n&&n<=1114111}function ue(n){return Q(n)&&!ie(n)&&n!==65279&&n!==a&&n!==y}function B(n,u){return Q(n)&&n!==65279&&n!==M&&n!==$&&n!==z&&n!==ne&&n!==X&&n!==N&&(n!==w||u&&ue(u))}function oe(n){return Q(n)&&n!==65279&&!ie(n)&&n!==j&&n!==W&&n!==N&&n!==M&&n!==$&&n!==z&&n!==ne&&n!==X&&n!==w&&n!==E&&n!==D&&n!==s&&n!==V&&n!==H&&n!==L&&n!==I&&n!==m&&n!==k&&n!==U&&n!==J}function ae(n){var u=/^\n* /;return u.test(n)}var ce=1,he=2,fe=3,de=4,se=5;function pe(n,u,g,_,A){var R,b,C,S=!1,O=!1,F=_!==-1,P=-1,G=oe(n.charCodeAt(0))&&!ie(n.charCodeAt(n.length-1));if(u)for(R=0;R<n.length;R++){if(b=n.charCodeAt(R),!Q(b))return se;C=R>0?n.charCodeAt(R-1):null,G=G&&B(b,C)}else{for(R=0;R<n.length;R++){if(b=n.charCodeAt(R),b===y)S=!0,F&&(O=O||R-P-1>_&&n[P+1]!==" ",P=R);else if(!Q(b))return se;C=R>0?n.charCodeAt(R-1):null,G=G&&B(b,C)}O=O||F&&R-P-1>_&&n[P+1]!==" "}return!S&&!O?G&&!A(n)?ce:he:g>9&&ae(n)?se:O?de:fe}function xe(n,u,g,_){n.dump=(function(){if(u.length===0)return"''";if(!n.noCompatMode&&ee.indexOf(u)!==-1)return"'"+u+"'";var A=n.indent*Math.max(1,g),R=n.lineWidth===-1?-1:Math.max(Math.min(n.lineWidth,40),n.lineWidth-A),b=_||n.flowLevel>-1&&g>=n.flowLevel;function C(S){return K(n,S)}switch(pe(u,b,n.indent,R,C)){case ce:return u;case he:return"'"+u.replace(/'/g,"''")+"'";case fe:return"|"+me(u,n.indent)+ge(re(u,A));case de:return">"+me(u,n.indent)+ge(re(Ae(u,R),A));case se:return'"'+Re(u)+'"';default:throw new i("impossible error: invalid scalar style")}})()}function me(n,u){var g=ae(n)?String(u):"",_=n[n.length-1]===`
`,A=_&&(n[n.length-2]===`
`||n===`
`),R=A?"+":_?"":"-";return g+R+`
`}function ge(n){return n[n.length-1]===`
`?n.slice(0,-1):n}function Ae(n,u){for(var g=/(\n+)([^\n]*)/g,_=(function(){var O=n.indexOf(`
`);return O=O!==-1?O:n.length,g.lastIndex=O,Z(n.slice(0,O),u)})(),A=n[0]===`
`||n[0]===" ",R,b;b=g.exec(n);){var C=b[1],S=b[2];R=S[0]===" ",_+=C+(!A&&!R&&S!==""?`
`:"")+Z(S,u),A=R}return _}function Z(n,u){if(n===""||n[0]===" ")return n;for(var g=/ [^ ]/g,_,A=0,R,b=0,C=0,S="";_=g.exec(n);)C=_.index,C-A>u&&(R=b>A?b:C,S+=`
`+n.slice(A,R),A=R+1),b=C;return S+=`
`,n.length-A>u&&b>A?S+=n.slice(A,b)+`
`+n.slice(b+1):S+=n.slice(A),S.slice(1)}function Re(n){for(var u="",g,_,A,R=0;R<n.length;R++){if(g=n.charCodeAt(R),g>=55296&&g<=56319&&(_=n.charCodeAt(R+1),_>=56320&&_<=57343)){u+=le((g-55296)*1024+_-56320+65536),R++;continue}A=Y[g],u+=!A&&Q(g)?n[R]:A||le(g)}return u}function ye(n,u,g){var _="",A=n.tag,R,b;for(R=0,b=g.length;R<b;R+=1)e(n,u,g[R],!1,!1)&&(R!==0&&(_+=","+(n.condenseFlow?"":" ")),_+=n.dump);n.tag=A,n.dump="["+_+"]"}function _e(n,u,g,_){var A="",R=n.tag,b,C;for(b=0,C=g.length;b<C;b+=1)e(n,u+1,g[b],!0,!0)&&((!_||b!==0)&&(A+=te(n,u)),n.dump&&y===n.dump.charCodeAt(0)?A+="-":A+="- ",A+=n.dump);n.tag=R,n.dump=A||"[]"}function ve(n,u,g){var _="",A=n.tag,R=Object.keys(g),b,C,S,O,F;for(b=0,C=R.length;b<C;b+=1)F="",b!==0&&(F+=", "),n.condenseFlow&&(F+='"'),S=R[b],O=g[S],e(n,u,S,!1,!1)&&(n.dump.length>1024&&(F+="? "),F+=n.dump+(n.condenseFlow?'"':"")+":"+(n.condenseFlow?"":" "),e(n,u,O,!1,!1)&&(F+=n.dump,_+=F));n.tag=A,n.dump="{"+_+"}"}function Se(n,u,g,_){var A="",R=n.tag,b=Object.keys(g),C,S,O,F,P,G;if(n.sortKeys===!0)b.sort();else if(typeof n.sortKeys=="function")b.sort(n.sortKeys);else if(n.sortKeys)throw new i("sortKeys must be a boolean or a function");for(C=0,S=b.length;C<S;C+=1)G="",(!_||C!==0)&&(G+=te(n,u)),O=b[C],F=g[O],e(n,u+1,O,!0,!0,!0)&&(P=n.tag!==null&&n.tag!=="?"||n.dump&&n.dump.length>1024,P&&(n.dump&&y===n.dump.charCodeAt(0)?G+="?":G+="? "),G+=n.dump,P&&(G+=te(n,u)),e(n,u+1,F,!0,P)&&(n.dump&&y===n.dump.charCodeAt(0)?G+=":":G+=": ",G+=n.dump,A+=G));n.tag=R,n.dump=A||"{}"}function be(n,u,g){var _,A,R,b,C,S;for(A=g?n.explicitTypes:n.implicitTypes,R=0,b=A.length;R<b;R+=1)if(C=A[R],(C.instanceOf||C.predicate)&&(!C.instanceOf||typeof u=="object"&&u instanceof C.instanceOf)&&(!C.predicate||C.predicate(u))){if(n.tag=g?C.tag:"?",C.represent){if(S=n.styleMap[C.tag]||C.defaultStyle,c.call(C.represent)==="[object Function]")_=C.represent(u,S);else if(h.call(C.represent,S))_=C.represent[S](u,S);else throw new i("!<"+C.tag+'> tag resolver accepts not "'+S+'" style');n.dump=_}return!0}return!1}function e(n,u,g,_,A,R){n.tag=null,n.dump=g,be(n,g,!1)||be(n,g,!0);var b=c.call(n.dump);_&&(_=n.flowLevel<0||n.flowLevel>u);var C=b==="[object Object]"||b==="[object Array]",S,O;if(C&&(S=n.duplicates.indexOf(g),O=S!==-1),(n.tag!==null&&n.tag!=="?"||O||n.indent!==2&&u>0)&&(A=!1),O&&n.usedDuplicates[S])n.dump="*ref_"+S;else{if(C&&O&&!n.usedDuplicates[S]&&(n.usedDuplicates[S]=!0),b==="[object Object]")_&&Object.keys(n.dump).length!==0?(Se(n,u,n.dump,A),O&&(n.dump="&ref_"+S+n.dump)):(ve(n,u,n.dump),O&&(n.dump="&ref_"+S+" "+n.dump));else if(b==="[object Array]"){var F=n.noArrayIndent&&u>0?u-1:u;_&&n.dump.length!==0?(_e(n,F,n.dump,A),O&&(n.dump="&ref_"+S+n.dump)):(ye(n,F,n.dump),O&&(n.dump="&ref_"+S+" "+n.dump))}else if(b==="[object String]")n.tag!=="?"&&xe(n,n.dump,u,R);else{if(n.skipInvalid)return!1;throw new i("unacceptable kind of an object to dump "+b)}n.tag!==null&&n.tag!=="?"&&(n.dump="!<"+n.tag+"> "+n.dump)}return!0}function d(n,u){var g=[],_=[],A,R;for(v(n,g,_),A=0,R=_.length;A<R;A+=1)u.duplicates.push(g[_[A]]);u.usedDuplicates=new Array(R)}function v(n,u,g){var _,A,R;if(n!==null&&typeof n=="object")if(A=u.indexOf(n),A!==-1)g.indexOf(A)===-1&&g.push(A);else if(u.push(n),Array.isArray(n))for(A=0,R=n.length;A<R;A+=1)v(n[A],u,g);else for(_=Object.keys(n),A=0,R=_.length;A<R;A+=1)v(n[_[A]],u,g)}function T(n,u){u=u||{};var g=new q(u);return g.noRefs||d(n,g),e(g,0,n,!0,!0)?g.dump+`
`:""}function x(n,u){return T(n,t.extend({schema:o},u))}return dumper.dump=T,dumper.safeDump=x,dumper}var hasRequiredJsYaml$1;function requireJsYaml$1(){if(hasRequiredJsYaml$1)return jsYaml$1;hasRequiredJsYaml$1=1;var t=requireLoader(),i=requireDumper();function p(o){return function(){throw new Error("Function "+o+" is deprecated and cannot be used.")}}return jsYaml$1.Type=requireType(),jsYaml$1.Schema=requireSchema(),jsYaml$1.FAILSAFE_SCHEMA=requireFailsafe(),jsYaml$1.JSON_SCHEMA=requireJson(),jsYaml$1.CORE_SCHEMA=requireCore(),jsYaml$1.DEFAULT_SAFE_SCHEMA=requireDefault_safe(),jsYaml$1.DEFAULT_FULL_SCHEMA=requireDefault_full(),jsYaml$1.load=t.load,jsYaml$1.loadAll=t.loadAll,jsYaml$1.safeLoad=t.safeLoad,jsYaml$1.safeLoadAll=t.safeLoadAll,jsYaml$1.dump=i.dump,jsYaml$1.safeDump=i.safeDump,jsYaml$1.YAMLException=requireException(),jsYaml$1.MINIMAL_SCHEMA=requireFailsafe(),jsYaml$1.SAFE_SCHEMA=requireDefault_safe(),jsYaml$1.DEFAULT_SCHEMA=requireDefault_full(),jsYaml$1.scan=p("scan"),jsYaml$1.parse=p("parse"),jsYaml$1.compose=p("compose"),jsYaml$1.addConstructor=p("addConstructor"),jsYaml$1}var jsYaml,hasRequiredJsYaml;function requireJsYaml(){if(hasRequiredJsYaml)return jsYaml;hasRequiredJsYaml=1;var t=requireJsYaml$1();return jsYaml=t,jsYaml}var hasRequiredEngines;function requireEngines(){return hasRequiredEngines||(hasRequiredEngines=1,(function(module,exports$1){const yaml=requireJsYaml(),engines=module.exports;engines.yaml={parse:yaml.safeLoad.bind(yaml),stringify:yaml.safeDump.bind(yaml)},engines.json={parse:JSON.parse.bind(JSON),stringify:function(t,i){const p=Object.assign({replacer:null,space:2},i);return JSON.stringify(t,p.replacer,p.space)}},engines.javascript={parse:function parse(str,options,wrap){try{return wrap!==!1&&(str=`(function() {
return `+str.trim()+`;
}());`),eval(str)||{}}catch(t){if(wrap!==!1&&/(unexpected|identifier)/i.test(t.message))return parse(str,options,!1);throw new SyntaxError(t)}},stringify:function(){throw new Error("stringifying JavaScript is not supported")}}})(engines)),engines.exports}var utils={};var stripBomString,hasRequiredStripBomString;function requireStripBomString(){return hasRequiredStripBomString||(hasRequiredStripBomString=1,stripBomString=function(t){return typeof t=="string"&&t.charAt(0)==="\uFEFF"?t.slice(1):t}),stripBomString}var hasRequiredUtils;function requireUtils(){return hasRequiredUtils||(hasRequiredUtils=1,(function(t){const i=requireStripBomString(),p=requireKindOf();t.define=function(o,c,h){Reflect.defineProperty(o,c,{enumerable:!1,configurable:!0,writable:!0,value:h})},t.isBuffer=function(o){return p(o)==="buffer"},t.isObject=function(o){return p(o)==="object"},t.toBuffer=function(o){return typeof o=="string"?Buffer.from(o):o},t.toString=function(o){if(t.isBuffer(o))return i(String(o));if(typeof o!="string")throw new TypeError("expected input to be a string or buffer");return i(o)},t.arrayify=function(o){return o?Array.isArray(o)?o:[o]:[]},t.startsWith=function(o,c,h){return typeof h!="number"&&(h=c.length),o.slice(0,h)===c}})(utils)),utils}var defaults,hasRequiredDefaults;function requireDefaults(){if(hasRequiredDefaults)return defaults;hasRequiredDefaults=1;const t=requireEngines(),i=requireUtils();return defaults=function(p){const o=Object.assign({},p);return o.delimiters=i.arrayify(o.delims||o.delimiters||"---"),o.delimiters.length===1&&o.delimiters.push(o.delimiters[0]),o.language=(o.language||o.lang||"yaml").toLowerCase(),o.engines=Object.assign({},t,o.parsers,o.engines),o},defaults}var engine,hasRequiredEngine;function requireEngine(){if(hasRequiredEngine)return engine;hasRequiredEngine=1,engine=function(i,p){let o=p.engines[i]||p.engines[t(i)];if(typeof o>"u")throw new Error('gray-matter engine "'+i+'" is not registered');return typeof o=="function"&&(o={parse:o}),o};function t(i){switch(i.toLowerCase()){case"js":case"javascript":return"javascript";case"coffee":case"coffeescript":case"cson":return"coffee";case"yaml":case"yml":return"yaml";default:return i}}return engine}var stringify,hasRequiredStringify;function requireStringify(){if(hasRequiredStringify)return stringify;hasRequiredStringify=1;const t=requireKindOf(),i=requireEngine(),p=requireDefaults();stringify=function(c,h,f){if(h==null&&f==null)switch(t(c)){case"object":h=c.data,f={};break;case"string":return c;default:throw new TypeError("expected file to be a string or object")}const y=c.content,a=p(f);if(h==null){if(!a.data)return c;h=a.data}const l=c.language||a.language,s=i(l,a);if(typeof s.stringify!="function")throw new TypeError('expected "'+l+'.stringify" to be a function');h=Object.assign({},c.data,h);const m=a.delimiters[0],w=a.delimiters[1],k=s.stringify(h,f).trim();let E="";return k!=="{}"&&(E=o(m)+o(k)+o(w)),typeof c.excerpt=="string"&&c.excerpt!==""&&y.indexOf(c.excerpt.trim())===-1&&(E+=o(c.excerpt)+o(w)),E+o(y)};function o(c){return c.slice(-1)!==`
`?c+`
`:c}return stringify}var excerpt,hasRequiredExcerpt;function requireExcerpt(){if(hasRequiredExcerpt)return excerpt;hasRequiredExcerpt=1;const t=requireDefaults();return excerpt=function(i,p){const o=t(p);if(i.data==null&&(i.data={}),typeof o.excerpt=="function")return o.excerpt(i,o);const c=i.data.excerpt_separator||o.excerpt_separator;if(c==null&&(o.excerpt===!1||o.excerpt==null))return i;const h=typeof o.excerpt=="string"?o.excerpt:c||o.delimiters[0],f=i.content.indexOf(h);return f!==-1&&(i.excerpt=i.content.slice(0,f)),i},excerpt}var toFile,hasRequiredToFile;function requireToFile(){if(hasRequiredToFile)return toFile;hasRequiredToFile=1;const t=requireKindOf(),i=requireStringify(),p=requireUtils();return toFile=function(o){return t(o)!=="object"&&(o={content:o}),t(o.data)!=="object"&&(o.data={}),o.contents&&o.content==null&&(o.content=o.contents),p.define(o,"orig",p.toBuffer(o.content)),p.define(o,"language",o.language||""),p.define(o,"matter",o.matter||""),p.define(o,"stringify",function(c,h){return h&&h.language&&(o.language=h.language),i(o,c,h)}),o.content=p.toString(o.content),o.isEmpty=!1,o.excerpt="",o},toFile}var parse,hasRequiredParse;function requireParse(){if(hasRequiredParse)return parse;hasRequiredParse=1;const t=requireEngine(),i=requireDefaults();return parse=function(p,o,c){const h=i(c),f=t(p,h);if(typeof f.parse!="function")throw new TypeError('expected "'+p+'.parse" to be a function');return f.parse(o,h)},parse}var grayMatter,hasRequiredGrayMatter;function requireGrayMatter(){if(hasRequiredGrayMatter)return grayMatter;hasRequiredGrayMatter=1;const t=require$$0,i=requireSectionMatter(),p=requireDefaults(),o=requireStringify(),c=requireExcerpt(),h=requireEngines(),f=requireToFile(),y=requireParse(),a=requireUtils();function l(m,w){if(m==="")return{data:{},content:m,excerpt:"",orig:m};let k=f(m);const E=l.cache[k.content];if(!w){if(E)return k=Object.assign({},E),k.orig=E.orig,k;l.cache[k.content]=k}return s(k,w)}function s(m,w){const k=p(w),E=k.delimiters[0],I=`
`+k.delimiters[1];let D=m.content;k.language&&(m.language=k.language);const M=E.length;if(!a.startsWith(D,E,M))return c(m,k),m;if(D.charAt(M)===E.slice(-1))return m;D=D.slice(M);const j=D.length,N=l.language(D,k);N.name&&(m.language=N.name,D=D.slice(N.raw.length));let H=D.indexOf(I);return H===-1&&(H=j),m.matter=D.slice(0,H),m.matter.replace(/^\s*#[^\n]+/gm,"").trim()===""?(m.isEmpty=!0,m.empty=m.content,m.data={}):m.data=y(m.language,m.matter,k),H===j?m.content="":(m.content=D.slice(H+I.length),m.content[0]==="\r"&&(m.content=m.content.slice(1)),m.content[0]===`
`&&(m.content=m.content.slice(1))),c(m,k),(k.sections===!0||typeof k.section=="function")&&i(m,k.section),m}return l.engines=h,l.stringify=function(m,w,k){return typeof m=="string"&&(m=l(m,k)),o(m,w,k)},l.read=function(m,w){const k=t.readFileSync(m,"utf8"),E=l(k,w);return E.path=m,E},l.test=function(m,w){return a.startsWith(m,p(w).delimiters[0])},l.language=function(m,w){const E=p(w).delimiters[0];l.test(m)&&(m=m.slice(E.length));const I=m.slice(0,m.search(/\r?\n/));return{raw:I,name:I?I.trim():""}},l.cache={},l.clearCache=function(){l.cache={}},grayMatter=l,grayMatter}var grayMatterExports=requireGrayMatter();const matter=getDefaultExportFromCjs(grayMatterExports),postFiles=Object.assign({"/src/content/posts/cuda-basics.md":__vite_glob_0_0,"/src/content/posts/dpo-grpo-numpy.md":__vite_glob_0_1,"/src/content/posts/flash-attention.md":__vite_glob_0_2,"/src/content/posts/intro-to-quantization.md":__vite_glob_0_3,"/src/content/posts/meta-dr-zero.md":__vite_glob_0_4,"/src/content/posts/prod-cons-rate-limit.md":__vite_glob_0_5}),usePosts=()=>useQuery({queryKey:["posts"],queryFn:async()=>Object.entries(postFiles).map(([i,p])=>{const o=i.split("/").pop()?.replace(".md","")||"",{data:c}=matter(p),h=c;return{id:o,slug:o,title:h.title||"Untitled",excerpt:h.excerpt||"",date:h.date||"",tags:h.tags||[],readTime:h.readTime||"",content:""}}).sort((i,p)=>new Date(p.date).getTime()-new Date(i.date).getTime()),staleTime:1/0}),usePost=t=>useQuery({queryKey:["post",t],queryFn:async()=>{const i=`/src/content/posts/${t}.md`,p=postFiles[i];if(!p)throw new Error(`Post not found: ${t}`);const{data:o,content:c}=matter(p),h=o;return{id:t,slug:t,title:h.title,excerpt:h.excerpt,date:h.date,tags:h.tags,readTime:h.readTime,content:c}},enabled:!!t});export{Calendar as C,Clock as a,usePost as b,clsx as c,usePosts as u};
