+++
title = "Markov Decision Process"
author = ["Jethro Kuan"]
draft = false
+++

A sequential decision problem for a fully observable, stochastic
environment with a Markovian transition model and additive rewards is
called a Markov decision process. It consists of a set of states, with
initial state \\(s\_0\\), a set \\(ACTIONS(s)\\) of actions in each state, a
transition model \\(P(s'|s, a)\\), and a reward function \\(R(s)\\).

A policy, denoted \\(\pi\\), specifies what the agent should do in any state
\\(s\\). This action is denoted by \\(\pi(s)\\). The optimal policy \\(\pi^\*\\) yields the
highest expected utility.

The careful balancing of risk and reward is a characteristic of MDPs
that does not arise in deterministic search problems.


## Optimality in Markov Decision Processes {#optimality-in-markov-decision-processes}


### Finite Horizon {#finite-horizon}

\begin{equation}
  E\left( \sum\_{t=0}^{h} r\_t \right)
\end{equation}


### Infinite Horizon {#infinite-horizon}

\begin{equation}
  E\left( \sum\_{t=0}^{\infty} \gamma^t r\_t \right)
\end{equation}


### Average-reward {#average-reward}

\begin{equation}
\lim\_{h \rightarrow \infty} E\left( \sum\_{t=0}^{h} \frac{1}{h} r\_t \right)
\end{equation}


## Learning Performance Kaelbling, Littman, and Moore, n.d. {#learning-performance-kaelbling-littman-and-moore-n-dot-d-dot}

1.  Asymptotic convergence:

\begin{equation}
\pi\_n \rightarrow \pi^\* \text { as } n \rightarrow \infty
\end{equation}

1.  PAC:

\begin{equation}
  P(N\_{errors} > F(\cdot, \epsilon, \delta)) \le \delta
\end{equation}

Does not give any guarantee about the policy while it is learning

1.  Regret (e.g. bound \\(B\\) on total regret):

\begin{equation}
  \mathrm{max} \sum\_{t=0}^{T} r\_{tj} - r\_t < B
\end{equation}

No notion of "many small mistakes", or "few major mistakes".

1.  Uniform-PAC

unifies notion of PAC and regret Dann, Lattimore, and Brunskill, n.d.