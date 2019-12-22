+++
title = "Model-Based Reinforcement Learning"
author = ["Jethro Kuan"]
lastmod = 2019-12-22T17:59:28+08:00
draft = false
math = true
+++

In model-free RL, we assumed that \\(p(s\_{t+1} | s\_t, a\_t)\\) is unknown,
and no attempt is made to learn it. However, we often know the
dynamics. For example, in games such as chess, and easily modeled
systems, like car navigation.

Model-based Reinforcement learning is about learning system dynamics,
and using the learnt system to make decisions.

In the stochastic _open-loop_ case,

\begin{equation}
  p\_{\theta}(s\_1, \dots, s\_T | a\_1, \dots, a\_T) = p(s\_1)
  \prod\_{t=1}^{T} p(s\_{t+1} | s\_t, a\_t)
\end{equation}

and we'd want to choose:

\begin{equation}
  a\_1, \dots, a\_T = \mathrm{argmax}\_{a\_1, \dots, a\_T} E \left[
    \sum\_{t} r(s\_t, a\_t) | a\_1, \dots, a\_T \right]
\end{equation}

In a **closed-loop** setting, the process by which the agent performs
actions receives feedback. Planning in the open-loop case can go
extremely awry.

In the stochastic _closed-loop_ case,

\begin{equation}
  p(s\_1, a\_1, \dots, s\_T, a\_T) = p(s\_1) \prod\_{t=1}^{T} \pi(a\_t | s\_t)
  p(s\_{t+1} | s\_t, a\_t)
\end{equation}

where \\(\pi = \mathrm{argmax}\_{\pi}E\_{\tau \sim p(\tau)} \left[ \sum\_t
r(s\_t, a\_t)\right]\\)
