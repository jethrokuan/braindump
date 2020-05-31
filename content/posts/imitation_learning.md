+++
title = "Imitation Learning"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T20:19:12+08:00
draft = false
+++

### Backlinks {#backlinks}

- [Inverse Reinforcement Learning]({{< relref "inverse_rl" >}})

## Behavioural Cloning {#behavioural-cloning}

Behavioural cloning is a fancy name for supervised learning. We
collect tuples of actions and observations from demonstrations, and
used supervised learning to learn a policy \\(\pi\_{\theta}(a_t | o_t)\\).

The problem with behavioural cloning is that the errors accumulate,
and the state trajectory will change dramatically. When we evaluate
the algorithm, can we make \\(p\_{data}(o_t) = p\_{\pi\_\theta}(o_t)\\)?

### DAgger: Dataset Aggregation {#dagger-dataset-aggregation}

- **Goal:** collect training data from \\(p\_{\theta\_\pi}(o_t)\\) instead of \\(p\_{data}(o_t)\\)
- how? run \\(\pi\_\theta (a_t | o_t)\\), but need labels \\(a_t\\)!

<!--listend-->

1.  train \\(\pi\_\theta(a_t | o_t)\\) from human data \\(\mathcal{D}\\)
2.  run \\(\pi\_\theta(a_t|o_t)\\) to get dataset \\(\mathcal{D\_\pi}\\)
3.  Ask human to label \\(D\_\pi\\) with actions \\(a_t\\)
4.  Aggregate: \\(\mathcal{D} \leftarrow \mathcal{D} \cup \mathcal{D}\_\pi\\)

<!--listend-->

- **Problem:** have to ask humans to label large datasets iteratively, and
  can be unnatural (resulting in bad labels)
- Behavioural cloning may still work when we model the expert very
  accurately (no distributional "drift")

### Why might we fail to fit the expert? {#why-might-we-fail-to-fit-the-expert}

1.  non-Markovian behaviour

    1.  Our policy assumes that the action depends only on the current
        observation.
    2.  Perhaps a better model is to account for all observations.
    3.  Problem: history exacerbates causal confusion
        <a id="97004a1ab6778a90f591ea58fde11d3c" href="#haan19_causal_confus_imitat_learn">(de Haan et al., 2019)</a>

2.  Multimodal behaviour
    1.  Solutions:
        1.  output mixture of Gaussians (easy to implement, works well in
            practice)
        2.  Latent Variable models (additional latent variable as part of
            input)
        3.  Autoregressive discretization

{{< figure src="/ox-hugo/screenshot2019-12-15_14-39-49_.png" caption="Figure 1: Autoregressive Discretization discretizes one dimension of the action space at a time" >}}

### What's the problem with imitation learning? {#what-s-the-problem-with-imitation-learning}

- Humans need to provide data, which is typically finite. Deep models
  typically require large amounts of data.
- Human are not good at providing some kinds of actions
- Humans can learn autonomously (from experience)

### Imitation Learning in the RL context {#imitation-learning-in-the-rl-context}

Reward function:

\begin{equation}
r(\mathbf{s}, \mathbf{a})=\log p\left(\mathbf{a}=\pi^{\star}(\mathbf{s}) | \mathbf{s}\right)
\end{equation}

Cost function:

\begin{equation}
c(\mathbf{s}, \mathbf{a})=\left\\{\begin{array}{l}{0 \text { if } \mathbf{a}=\pi^{\star}(\mathbf{s})} \\ {1 \text { otherwise }}\end{array}\right.
\end{equation}

The number of mistakes go up quadratically in the worst case:

Assuming: \\(\pi\_{\theta}\left(\mathbf{a} \neq \pi^{\star}(\mathbf{s}) | \mathbf{s}\right) \leq \epsilon\\)

{{< figure src="/ox-hugo/screenshot2019-12-15_14-50-49_.png" caption="Figure 2: The tightrope walking problem" >}}

# Bibliography

<a id="haan19_causal_confus_imitat_learn" target="_blank">de Haan, P., Jayaraman, D., & Levine, S., _Causal confusion in imitation learning_, CoRR, _()_, (2019). </a> [↩](#97004a1ab6778a90f591ea58fde11d3c)

### Backlinks {#backlinks}

- [Inverse Reinforcement Learning]({{< relref "inverse_rl" >}})
