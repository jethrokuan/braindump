+++
title = "Markov Localization"
author = ["Jethro Kuan"]
lastmod = 2020-03-07T23:43:29+08:00
draft = false
+++

## Markov Localization {#markov-localization}

A direct extension of the [§bayes\_filter]({{< relref "bayes_filter" >}}), but using the map \\(m\\) of the
environment:

\begin{algorithm}
  \caption{Markov Localization}
  \label{markov\_localization}
  \begin{algorithmic}[1]
    \Procedure{Markov Localization}{$\text{bel}(x\_{t-1}), u\_t, z\_t, m$}
    \ForAll{$x\_t$}
    \State $\overline{\text{bel}}(t) = \int p(x\_t | u\_t, x\_{t-1}, m)
    \text{bel}(x\_{t-1}) dx$
    \State $\text{bel}(t) = \eta p(z\_t | x\_t, m)\overline{\text{bel}}(t) (x\_t)$
    \EndFor
    \State \Return $bel(x\_t)$
    \EndProcedure
  \end{algorithmic}
\end{algorithm}

The initial belief reflects initial knowledge of the robot pose, and
can be instantiated differently:

If the initial pose is known, \\(\mathrm{bel}(x\_0)\\) is a point-mass
distribution such that:

\begin{equation}
  \operatorname{bel}\left(x\_{0}\right)=\left\\{\begin{array}{ll}{1} & {\text { if } x\_{0}=\bar{x}\_{0}} \\ {0} & {\text { otherwise }}\end{array}\right.
\end{equation}

However, point-mass distributions are discrete and do not have a
density, so in most scenarios, a narrow Gaussian centered around
\\(\overline{x}\_0\\) is used instead.

If the initial pose is unknown, \\(\mathrm{bel}(x\_0)\\) is initialized
with a uniform distribution over the space of all legal poses in the map.
