+++
title = "Markov Decision Process"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T20:19:39+08:00
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

## Learning Performance <a id="fa8338b83ce7e1fef54aa80740d33fc3" href="#kaelbling1996reinforcement">(Kaelbling et al., 1996)</a> {#learning-performance}

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

unifies notion of PAC and regret <a id="b921dd1021cc889ee3e2cec8ef08a5a9" href="#dann2017unifying">(Dann et al., 2017)</a>

# Bibliography

<a id="kaelbling1996reinforcement" target="_blank">Kaelbling, L. P., Littman, M. L., & Moore, A. W., _Reinforcement learning: A survey_, Journal of artificial intelligence research, _4()_, 237–285 (1996). </a> [↩](#fa8338b83ce7e1fef54aa80740d33fc3)

<a id="dann2017unifying" target="_blank">Dann, C., Lattimore, T., & Brunskill, E., _Unifying PAC and regret: Uniform PAC bounds for episodic reinforcement learning_, In , Advances in Neural Information Processing Systems (pp. 5713–5723) (2017). : .</a> [↩](#b921dd1021cc889ee3e2cec8ef08a5a9)

### Backlinks {#backlinks}

- [Reinforcement Learning ⭐]({{< relref "reinforcement_learning" >}})
