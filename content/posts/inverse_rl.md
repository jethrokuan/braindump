+++
title = "Inverse Reinforcement Learning"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Reinforcement Learning ⭐]({{<relref "reinforcement_learning.md#" >}})

Standard [Imitation Learning]({{<relref "imitation_learning.md#" >}}) copies actions performed by the expert,
and do not reason about the outcomes of the actions. However, humans
copy the _intent_ of the actions, which result in vastly different
actions.

We want to learn the reward function because the reward function is
often hard to specify.

Inverse Reinforcement Learning is about learning reward functions.
This problem is, however, ill-specified: **there are infinitely many
reward functions that can explain the same behaviour**. Formally:

Inverse RL is the setting where we are given:

1.  states \\(s \in S\\), actions \\(a \in A\\)
2.  (sometimes) transitions \\(p(s' | s, a)\\)
3.  samples \\(\\{\tau\_i\\}\\) sampled from \\(\pi^\star (\tau)\\)

and we would like to learn \\(r\_{\psi}(s,a)\\), where \\(\psi\\) are the
parameters of the reward functions. A common choice is a linear reward
function:

\begin{equation}
  r\_\psi (s,a) = \sum\_{i} \psi\_i f\_i(s,a) = \psi^T f(s,a)
\end{equation}


## Feature Matching IRL {#feature-matching-irl}

_Idea:_ if features \\(f\\) are important, what if we match their
expectations? Let \\(\pi^{r\_\psi}\\) be the optimal policy for \\(r\_\psi\\),
then we pick \\(\psi\\) such that \\(E\_\pi r\_\psi [f(s,a)]= E\_{\pi^\star}[f(s,a)]\\)

We can approximate the RHS using expert samples, and the LHS is the
state-action marginal under \\(\pi^{r\_\psi}\\). This is still ambiguous,
and a solution inspired from SVMs is to use the _maximum margin
principle_:

\begin{equation}
  \mathrm{min}\_\psi \frac{1}{2} |\psi|^2 \text{ such that } \psi^T
  E\_{\pi^\star}[f(s,a)] \ge \mathrm{max}\_{\psi \in \Pi} \psi^T
  E\_{\pi}[f(s,a)] + D(\pi, \pi^\star)
\end{equation}

where \\(D\\) could be the difference in expectations.

Issues with the maximum margin principle:

1.  Maximizing margin is an arbitrary choice
2.  No clear model of sub-optimality


## Maximum likelihood learning {#maximum-likelihood-learning}

The IRL partition function is:

\begin{equation}
  \mathrm{max}\_{\psi}\frac{1}{N} \sum\_{i=1}^{N} r\_\psi (\tau\_i) - \log Z
\end{equation}

where \\(Z\\) is the integral over all trajectories: \\(Z = \int p(\tau) \mathrm{exp}(r\_\psi(\tau))d\tau\\)

\begin{equation}
  \nabla\_\psi L = \frac{1}{N}\sum\_{i=1}^{N}\nabla\_\psi r\_\psi(\tau\_i)
  - \frac{1}{Z} \int p(\tau) \mathrm{exp}(r\_\psi(\tau))\nabla\_\psi
  r\_\psi(\tau) d\tau
\end{equation}

\begin{equation}
  \nabla\_\psi L = E\_{\tau \sim \pi^\star (\tau)} [\nabla\_\psi
  r\_\psi(\tau\_i)] - E\_{\tau \sim p(\tau | \mathcal{O}\_{1:T},
    \psi)}[\nabla\_\psi r\_\psi (\tau)]
\end{equation}

first term is estimated with expert samples, and the second with the
soft optimal policy under current reward.


## MaxEntropy Inverse RL ([Ziebart et al., n.d.](#orgbb7955e)) {#maxentropy-inverse-rl--ziebart-et-al-dot-n-dot-d-dot--orgbb7955e}

1.  Given \\(\psi\\), compute [backward message]({{<relref "control_as_inference.md#" >}}) \\(\beta(s\_t, a\_t)\\)
2.  Given \\(\psi\\), compute [forward message]({{<relref "control_as_inference.md#" >}}) \\(\alpha(s\_t)\\)
3.  Compute \\(\mu\_t(s\_t, a\_t) \propto \beta(s\_t, a\_t) \alpha(s\_t)\\)
4.  Evaluate:

\begin{equation}
  \nabla\_\psi L = \frac{1}{N}\sum\_{i=1}^{N}\sum\_{t=1}^{T} \nabla\_\psi
  r\_\psi (s\_{i,t},a\_{i,t}) - \sum\_{t=1}^{T} \int \int
  \mu\_t(s\_t,a\_t)\nabla\_\psi r\_\psi(s\_t, a\_t)ds\_t da\_t
\end{equation}

1.  \\(\psi \leftarrow \psi + \eta \nabla\_\psi L\\)

In the case where the reward function is linear, we can show that it optimizes
to maximize entropy in the policy under the constraint that the
expectations of the rewards for the policy and the expert are equal.

MaxEnt IRL requires:

1.  Solving for soft optimal policy in the inner loop
2.  Enumerating all state-action tuples for visitation frequency and
    gradient


### Sample-based Updates {#sample-based-updates}

This handles unknown dynamics, or large/continuous state-action
spaces. This works under the assumption that we can sample from the
environment.

\begin{equation}
  \nabla\_\psi L \approx \frac{1}{N} \sum\_{i=1}^{N} \nabla\_\psi r\_\psi
  (\tau\_i) - \frac{1}{M} \sum\_{j=1}^{M} \nabla\_\psi r\_\psi(\tau\_j)
\end{equation}

We learn \\(p(a\_t | s\_t, \mathcal{O}\_{1:T}, \psi)\\) using any max-ent RL
algorithm like soft Q-learning, then run this policy to sample
\\(\tau\_j\\). But this is expensive, so make a small improvement to
\\(p(a\_t | s\_t, \mathcal{O}\_{1:T}, \psi)\\) instead, and use importance
sampling to account for the distribution mismatch. Each policy update
w.r.t \\(r\_\psi\\) brings us closer to the target distribution.


## Resources {#resources}

-   [CS285 Fa19 10/21/19 - YouTube](https://www.youtube.com/watch?v=DP0SJrNgV60&list=PLkFD6%5F40KJIwhWJpGazJ9VSj9CFMkb79A&index=15&t=0s)


## Papers {#papers}

-   ([Abbeel and Ng, n.d.](#org4015a60))
-   ([Ratliff, Bagnell, and Zinkevich, n.d.](#org78b9e47))


## Bibliography {#bibliography}

<a id="org4015a60"></a>Abbeel, Pieter, and Andrew Y Ng. n.d. “Apprenticeship Learning via Inverse Reinforcement Learning.” In _Proceedings of the Twenty-First International Conference on Machine Learning_, 1. ACM.

<a id="org78b9e47"></a>Ratliff, Nathan D, J Andrew Bagnell, and Martin A Zinkevich. n.d. “Maximum Margin Planning.” In _Proceedings of the 23rd International Conference on Machine Learning_, 729–36. ACM.

<a id="orgbb7955e"></a>Ziebart, Brian, Andrew Maas, J. Bagnell, and Anind Dey. n.d. “Maximum Entropy Inverse Reinforcement Learning.,” 1433–38.