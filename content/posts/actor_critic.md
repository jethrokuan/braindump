+++
title = "Actor-Critic"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:55:27+08:00
draft = false
+++

Actor-Critic improves on [Policy Gradients]({{< relref "policy_gradients" >}}) methods by introducing a
critic.

Recall the objective:

\begin{equation}
\nabla\_{\theta} J(\theta) \approx \frac{1}{N} \sum\_{i=1}^{N} \sum\_{t=1}^{T} \nabla\_{\theta} \log \pi\_{\theta}\left(\mathbf{a}\_{i, t} | \mathbf{s}\_{i, t}\right) \hat{Q}\_{i, t}
\end{equation}

The question we want to address is: **can we get a better estimate of
the reward-to-go?**

Originally, we were using the single-trajectory estimate of the
reward-to-go. If we knew the true expected reward-to-go, then we would
have a lower variance version of the policy gradient.

We define the advantage function as \\(A^\pi(s_t,a_t) = Q^\pi(s_t,
a_t) - V^\pi(s_t)\\). \\(V^\pi(s_t)\\) can be used as baseline \\(b\\), and we
obtain the objective:

\begin{equation}
\nabla\_{\theta} J(\theta) \approx \frac{1}{N} \sum\_{i=1}^{N} \sum\_{t=1}^{T} \nabla\_{\theta} \log \pi\_{\theta}\left(\mathbf{a}\_{i, t} | \mathbf{s}\_{i, t}\right) A^\pi(s\_{i,t}, a\_{i,t})
\end{equation}

## Value Function Fitting {#value-function-fitting}

Recall:

\begin{array}{l}
{Q^{\pi}\left(\mathbf{s}\_{t},
\mathbf{a}\_{t}\right)=\sum\_{t^{\prime}=t}^{T}
E\_{\pi\_{\theta}}\left[r\left(\mathbf{s}\_{t^{\prime}},
\mathbf{a}\_{t^{\prime}}\right) | \mathbf{s}\_{t},
\mathbf{a}\_{t}\right]} \\\\\\
{V^{\pi}\left(\mathbf{s}\_{t}\right)=E\_{\mathbf{a}\_{t} \sim
\pi\_{\theta}\left(\mathbf{a}\_{t} |
\mathbf{s}\_{t}\right)}\left[Q^{\pi}\left(\mathbf{s}\_{t},
\mathbf{a}\_{t}\right)\right]} \\\\\\
{A^{\pi}\left(\mathbf{s}\_{t},
\mathbf{a}\_{t}\right)=Q^{\pi}\left(\mathbf{s}\_{t},
\mathbf{a}\_{t}\right)-V^{\pi}\left(\mathbf{s}\_{t}\right)} \\\\\\
{\nabla\_{\theta} J(\theta) \approx \frac{1}{N} \sum\_{i=1}^{N}
\sum\_{t=1}^{T} \nabla\_{\theta} \log \pi\_{\theta}\left(\mathbf{a}\_{i,
t} | \mathbf{s}\_{i, t}\right) A^{\pi}\left(\mathbf{s}\_{i, t},
\mathbf{a}\_{i, t}\right)}
\end{array}

We can choose to fit \\(Q^{\pi}\\), \\(V^{\pi}\\) or \\(A^{\pi}\\), each have
their pros and cons.

We can write:

\begin{equation}
Q^\pi (s_t, a_t) \approx r(s_t, a_t) + V^{\pi}(s\_{t+1})
\end{equation}

\begin{equation}
A^{\pi}(s_t, a_t) \approx r(s_t, a_t) + V^{\pi}(s\_{t+1}) - V^{\pi}(s_t)
\end{equation}

Classic actor-critic algorithms fit \\(V^\pi\\), and pay the cost of 1
time-step to get \\(Q^\pi\\).

We do Monte Carlo evaluation with function approximation, estimating
\\(V^\pi (s_t)\\) as:

\begin{equation}
V^\pi (s_t) \approx \sum\_{t'=t}^{T}r(s\_{t'}, a\_{t'})
\end{equation}

Our training data consists of \\(\left\\{\left(s\_{i,t}, \sum\_{t'=t}^T r
(s\_{i,t'}, a\_{i,t'})\right)\right\\}\\), and we can just fit a neural
network with regression.

Alternatively, we can decompose the ideal target, and use the old
\\(V^\pi\\):

\begin{equation}
y\_{i,t} = \sum\_{t'=t}^{T} E\_{\pi\_{\theta}} [r(s\_{t'}, a\_t') |
s\_{i,t}] \approx r(s\_{i,t}, a\_{i,t}) + \hat{V}\_{\phi}^\pi(s\_{i,t+1})
\end{equation}

This is a biased estimate, but might have much lower variance. This
works when the policy does not change much and the previous value
function is a decent estimate. Since it is using a the previous value
function, it is also called a bootstrapped estimate.

## Discount Factors {#discount-factors}

The problem with the bootstrapped estimate is that with long horizon
problems, \\(\hat{V}\_\phi^\pi\\) can get infinitely large. A simple trick
is to use a discount factor:

\begin{equation}
y\_{i,t} \approx r(s\_{i,t}, a\_{i,t}) + \gamma \hat{V}\_\phi^\pi(s\_{i,t+1})
\end{equation}

where \\(\gamma \in [0,1]\\).

We can think of \\(\gamma\\) as changing the MDP, introducing a death
state with reward 0, and the probability of transitioning to this
death state is \\(1 - \gamma\\). This causes the agent to prefer better
rewards now than later.

{{< figure src="/ox-hugo/screenshot2019-12-16_17-50-22_.png" caption="Figure 1: \\(\gamma\\) modified MDP" >}}

We can then modify \\(\hat{A}^\pi\\):

\begin{equation}
\hat{A}^{\pi}(s_t, a_t) \approx r(s_t, a_t) + \gamma \hat{V}^{\pi}(s\_{t+1}) - \hat{V}^{\pi}(s_t)
\end{equation}

{{< figure src="/ox-hugo/screenshot2019-12-16_17-56-52_.png" >}}

\\(\gamma\\) can be interpreted as a way to limit variance, and prevent
the infinite sum (think about what happens when \\(\gamma\\) gets bigger).

## Algorithm {#algorithm}

1.  sample \\(\left\\{s_i, a_i\right\\}\\) from \\(\pi\_{\theta}(a\s)\\)
2.  Fit \\(\hat{V}\_\phi^{\pi}(s)\\) to the sampled reward sums
3.  Evaluate \\(\hat{A}^\pi(s_i, a_i) = r(s_i a_i) + \hat{V}\_\phi^\pi(s_i')-\hat{V}\_\phi^\pi(s_i)\\)
4.  \\(\nabla\_{\theta} J(\theta) \approx \sum_i \nabla\_{\theta} \log \pi\_{\theta}\left(\mathbf{a}\_{i} | \mathbf{s}\_{i}\right) \hat{A}^{\pi}\left(\mathbf{s}\_{i},
    \mathbf{a}\_{i}\right)\\)
5.  \\(\theta \leftarrow \theta + \alpha \nabla\_{\theta}J(\theta)\\)

## Online Actor-critic {#online-actor-critic}

![](/ox-hugo/screenshot2019-12-16_18-02-09_.png)
online actor-critic uses a single sample batch, which is a bad idea in
large neural networks. We need to use multiple samples to perform
updates.

The purpose of multiple workers here is not to make the algorithm
faster, but to make it work by increasing the batch size.

{{< figure src="/ox-hugo/screenshot2019-12-16_18-02-03_.png" >}}

{{< figure src="/ox-hugo/screenshot2019-12-16_18-02-53_.png" >}}

## Generalized Advantage Estimation {#generalized-advantage-estimation}

\begin{equation}
\hat{A}\_{n}^\pi (s_t, a_t) = \sum\_{t'=t}^{t+n}\gamma^{t'-t}
r(s\_{t'}, a\_{t'}) - \hat{V}\_{\phi}^\pi (s_t) + \gamma^n \hat{V}\_\phi^\pi(s\_{t+n})
\end{equation}

\begin{equation}
\hat{A}\_{GAE}^\pi (s_t, a_t) = \sum\_{n=1}^{\infty} w_n \hat{A}\_n^\pi
(s_t, a_t)
\end{equation}

is some weighted combination of n-step returns. If we choose \\(w_n
\propto \lambda^{n-1}\\), we can show that:

\begin{equation}
\hat{A}\_{GAE}^\pi (s_t, a_t) = \sum\_{n=1}^{\infty} (\gamma
\lambda)^{t'-t} \delta\_{t'}
\end{equation}

where

\begin{equation}
\delta\_{t'} = r(s\_{t'}, a\_{t'}) + \gamma \hat{V}\_\phi^\pi (s\_{t'+1}) - \hat{V}\_\phi^\pi(s\_{t'})
\end{equation}

**the role of \\(\gamma\\) and the role of \\(\lambda\\) turns out to b
similar, trading off bias and variance!**

Need to balance between learning speed, stability.

- Conservative Policy Iteration (CPI)
  - propose surrogate objective, guarantee monotonic improvement under
    specific state distribution
- Trust Region Policy Optimization (TRPO)
  - approximates CPI with trust region constraint
- Proximal Policy Optimization (PPO)
  - replaces TRPO constraint with RL penalty + clipping
    (computationally efficient)
- Soft Actor-Critic (SAC)
  - stabilize learning by jointly maximizing expected reward and
    policy entropy (based on maximum entropy RL)
- Optimistic Actor Critic (OAC)
  - Focus on exploration in deep Actor critic approaches.
  - **Key insight**: existing approaches tend to explore conservatively
  - **Key result**: Optimistic exploration leads to efficient, stable
    learning in modern Actor Critic methods

## Resources {#resources}

- [CS285 Fa19 9/18/19 - YouTube](https://www.youtube.com/watch?v=EKqxumCuAAY&list=PLkFD6%5F40KJIwhWJpGazJ9VSj9CFMkb79A&index=7&t=0s)
