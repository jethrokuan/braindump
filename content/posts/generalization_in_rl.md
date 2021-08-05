+++
title = "Generalization In Reinforcement Learning"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Reinforcement Learning ⭐]({{<relref "reinforcement_learning.md#" >}})


Generalization using successor features (Dayan 1993).

Adapt to new reward structure (Barreto 2018)

How many tasks are needed before modern approaches generalize?
    (Cobbe 2019)

Generalization with selective noise injection and information
bottleneck

Insights:

1.  Selective noise injection for gradient update but not behaviour
    (rollout) policy speeds learning
2.  Regularization with Information bottleneck is particularly
    effective

\begin{equation}
  \nabla\_{\theta} J\left(\pi\_{\theta}\right)=\widehat{\mathbb{E}}\_{\pi\_{\theta}^{r}\left(a\_{t} | x\_{t}\right)}\left[\sum\_{t}^{T} \frac{\pi\_{\theta}\left(a\_{t} | x\_{t}\right)}{\pi\_{\theta}^{r}\left(a\_{t} | x\_{t}\right)} \nabla\_{\theta} \log \pi\_{\theta}\left(a\_{t} | x\_{t}\right) \hat{A}\_{t}\right]
\end{equation}


## Benchmarks {#benchmarks}

-   Multi-Room (Chevalier 2018)
    -   No room is seen twice
-   CoinRun (Cobbe 2019)
-   [openai/procgen](https://github.com/openai/procgen)