+++
title = "Markov Decision Process"
author = ["Jethro Kuan"]
lastmod = 2019-12-11T15:47:26+08:00
draft = false
math = true
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


## Learning Performance <sup id="fa8338b83ce7e1fef54aa80740d33fc3"><a href="#kaelbling1996reinforcement" title="Kaelbling, Littman \&amp; Moore, Reinforcement learning: A survey, {Journal of artificial intelligence research}, v(), 237--285 (1996).">(Kaelbling {\it et al.}, 1996)</a></sup> {#learning-performance}

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

unifies notion of PAC and regret <sup id="b921dd1021cc889ee3e2cec8ef08a5a9"><a href="#dann2017unifying" title="Dann, Lattimore \&amp; Brunskill, Unifying PAC and regret: Uniform PAC bounds for episodic reinforcement learning, 5713--5723, in in: {Advances in Neural Information Processing Systems}, edited by (2017)">(Dann {\it et al.}, 2017)</a></sup>

# Bibliography
<a id="kaelbling1996reinforcement"></a>Kaelbling, L. P., Littman, M. L., & Moore, A. W., *Reinforcement learning: a survey*, Journal of artificial intelligence research, *4()*, 237–285 (1996).  [↩](#fa8338b83ce7e1fef54aa80740d33fc3)

<a id="dann2017unifying"></a>Dann, C., Lattimore, T., & Brunskill, E., *Unifying pac and regret: uniform pac bounds for episodic reinforcement learning*, In , Advances in Neural Information Processing Systems (pp. 5713–5723) (2017). : . [↩](#b921dd1021cc889ee3e2cec8ef08a5a9)
