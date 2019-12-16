+++
title = "Policy Gradients"
author = ["Jethro Kuan"]
lastmod = 2019-12-16T13:00:46+08:00
draft = false
math = true
+++

## Key Idea {#key-idea}

The objective is:

\begin{equation}
  \theta^{\star}=\arg \max \_{\theta} E\_{\tau \sim p\_{\theta}(\tau)}\left[\sum\_{t} r\left(\mathbf{s}\_{t}, \mathbf{a}\_{t}\right)\right]
\end{equation}

To evaluate the objective, we need to estimate this expectation, often
through sampling by generating multiple samples from the distribution:

\begin{equation}
  J(\theta)=E\_{\tau \sim p\_{\theta}(\tau)}\left[\sum\_{t} r\left(\mathbf{s}\_{t}, \mathbf{a}\_{t}\right)\right] \approx \frac{1}{N} \sum\_{i} \sum\_{t} r\left(\mathbf{s}\_{i, t}, \mathbf{a}\_{i, t}\right)
\end{equation}

Recall that:

\begin{equation}
  \nabla\_{\theta} J(\theta) \approx \frac{1}{N} \sum\_{i=1}^{N} \underbrace{\nabla\_{\theta} \log \pi\_{\theta}\left(\tau\_{i}\right)}\_{\sum\_{t=1}^{T} \nabla\_{\theta} \log \_{\theta} \pi\_{\theta}\left(\mathbf{a}\_{i, t} | \mathbf{s}\_{i, t}\right)}r\left(\tau\_{i}\right)
\end{equation}

This makes the good stuff more likely, and bad stuff less likely, but
scaled by the rewards.


### Comparison to Maximum Likelihood {#comparison-to-maximum-likelihood}

policy gradient
: \\(\nabla\_{\theta} J(\theta) \approx \frac{1}{N}
      \sum\_{i=1}^{N}\left(\sum\_{t=1}^{T} \nabla\_{\theta} \log
      \pi\_{\theta}\left(\mathbf{a}\_{i, t} | \mathbf{s}\_{i,
      t}\right)\right)\left(\sum\_{t=1}^{T} r\left(\mathbf{s}\_{i, t},
      \mathbf{a}\_{i, t}\right)\right)\\)

maximum likelihood
: \\(\nabla\_{\theta} J\_{\mathrm{ML}}(\theta) \approx \frac{1}{N} \sum\_{i=1}^{N}\left(\sum\_{t=1}^{T} \nabla\_{\theta} \log \pi\_{\theta}\left(\mathbf{a}\_{i, t} | \mathbf{s}\_{i, t}\right)\right)\\)


### Partial Observability {#partial-observability}

The policy gradient method does not assume that the system follows the
[§markovian\_assumption]({{< relref "markovian_assumption" >}})! The algorithm only requires the ability to
generate samples, and a function approximator for
\\(\pi\_{\theta}(a\_t |o\_t)\\).


## REINFORCE {#reinforce}

1.  For each episode,
    1.  generate \\(\tau = s\_0, a\_0, r\_1, \dots, s\_{t-1},
              a\_{t-1}, r\_t\\) by following \\(\pi\_{\theta}(a |s)\\)
    2.  For each step \\(i = 0, \dots, t-1\\):
        1.  \\(R\_i = \sum\_{k=i}^{t} \gamma^{t-k} r\_k\\) (Unbiased estimate of
            remaining episode return under \\(\pi\_{\theta}\\) starting from \\(i\\))
        2.  \\(\hat{A\_i} = R\_i - b\\) (Advantage function: subtract base line \\(b\\) to lower variance)
            1.  Advantage function tells you how relatively good this
                action is
        3.  $&theta; = \\(\theta + \alpha \nabla\_\theta \log \pi\_{\theta}
                     (a| s\_i) \hat{A}\_i\\)

Objective: \\(J(\theta) = \sum\_{\tau} P\_{\theta}(\tau)R(\tau)\\)

\begin{align}
  \nabla\_\theta J(\theta) &=  \nabla\_\theta \sum\_{\tau} P\_\theta(\tau)
                            R(\tau) \\\\\\
                          &= \sum\_{\tau} \nabla\_\theta P\_\theta(\tau)R(\tau)
\end{align}

Actor critics use learned estimate (e.g. $\hat{A}(s, a) = \hat{Q}(s,
a) - \hat{V}(s).)


## Actor-Critic {#actor-critic}

Need to balance between learning speed, stability.

-   Conservative Policy Iteration (CPI)
    -   propose surrogate objective, guarantee monotonic improvement under
        specific state distribution
-   Trust Region Policy Optimization (TRPO)
    -   approximates CPI with trust region constraint
-   Proximal Policy Optimization (PPO)
    -   replaces TRPO constraint with RL penalty + clipping
        (computationally efficient)
-   Soft Actor-Critic (SAC)
    -   stabilize learning by jointly maximizing expected reward and
        policy entropy (based on maximum entropy RL)
-   Optimistic Actor Critic (OAC)
    -   Focus on exploration in deep Actor critic approaches.
    -   **Key insight**: existing approaches tend to explore conservatively
    -   **Key result**: Optimistic exploration leads to efficient, stable
        learning in modern Actor Critic methods


## Resources {#resources}

-   [Deep Reinforcement Learning Through Policy Optimization - NIPS 2016 Tutorial](https://nips.cc/Conferences/2016/Schedule?showEvent=6198)
