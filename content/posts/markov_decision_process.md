+++
title = "Markov Decision Process"
author = ["Jethro Kuan"]
lastmod = 2020-07-08T14:54:36+08:00
draft = false
+++

### Backlinks {#backlinks}

- [Reinforcement Learning ⭐]({{< relref "reinforcement_learning" >}})

A sequential decision problem for a fully observable, stochastic
environment with a Markovian transition model and additive rewards is
called a Markov decision process. It consists of a set of states, with
initial state \\(s_0\\), a set \\(ACTIONS(s)\\) of actions in each state, a
transition model \\(P(s'|s, a)\\), and a reward function \\(R(s)\\).

A policy, denoted \\(\pi\\), specifies what the agent should do in any state
\\(s\\). This action is denoted by \\(\pi(s)\\). The optimal policy \\(\pi^\*\\) yields the
highest expected utility.

The careful balancing of risk and reward is a characteristic of MDPs
that does not arise in deterministic search problems.

## Optimality in Markov Decision Processes {#optimality-in-markov-decision-processes}

### Finite Horizon {#finite-horizon}

\begin{equation}
E\left( \sum\_{t=0}^{h} r_t \right)
\end{equation}

### Infinite Horizon {#infinite-horizon}

\begin{equation}
E\left( \sum\_{t=0}^{\infty} \gamma^t r_t \right)
\end{equation}

### Average-reward {#average-reward}

\begin{equation}
\lim\_{h \rightarrow \infty} E\left( \sum\_{t=0}^{h} \frac{1}{h} r_t \right)
\end{equation}

## Learning Performance ([Kaelbling, Littman, and Moore, n.d.](#orgc26f091)) {#learning-performance--kaelbling-littman-and-moore-n-dot-d-dot--orgc26f091}

1.  Asymptotic convergence:

\begin{equation}
\pi_n \rightarrow \pi^\* \text { as } n \rightarrow \infty
\end{equation}

1.  PAC:

\begin{equation}
P(N\_{errors} > F(\cdot, \epsilon, \delta)) \le \delta
\end{equation}

Does not give any guarantee about the policy while it is learning

1.  Regret (e.g. bound \\(B\\) on total regret):

\begin{equation}
\mathrm{max} \sum\_{t=0}^{T} r\_{tj} - r_t < B
\end{equation}

No notion of "many small mistakes", or "few major mistakes".

1.  Uniform-PAC

unifies notion of PAC and regret ([Dann, Lattimore, and Brunskill, n.d.](#org4d7e869))

## Bibliography {#bibliography}

<a id="org4d7e869"></a>Dann, Christoph, Tor Lattimore, and Emma Brunskill. n.d. “Unifying PAC and Regret: Uniform PAC Bounds for Episodic Reinforcement Learning.” In _Advances in Neural Information Processing Systems_, 5713–23.

<a id="orgc26f091"></a>Kaelbling, Leslie Pack, Michael L Littman, and Andrew W Moore. n.d. “Reinforcement Learning: A Survey” 4:237–85.
