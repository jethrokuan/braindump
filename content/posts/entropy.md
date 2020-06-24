+++
title = "Entropy"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:10:05+08:00
draft = false
+++

tags
: [Information Theory]({{< relref "information_theory" >}}), [Gibbs' Inequality]({{< relref "gibbs_inequality" >}})

## Definitions {#definitions}

The Shannon information content of an outcome \\(x\\), measured in bits,
is defined to be:

\begin{equation}
h(x) = \log_2 \frac{1}{P(x)}
\end{equation}

The entropy of an ensemble \\(X\\) is defined to be the average Shannon
information content of an outcome:

\begin{equation}
H(X)\equiv \sum\_{x \in \mathcal{A}\_X} P(x) \log \frac{1}{P(x)}
\end{equation}

Entropy is 0 when the outcome is deterministic, and maximized with
value \\(\log(|\mathcal{A}\_X|)\\) when the outcomes are uniformly
distributed.

The _joint entropy_ of two ensembles \\(X, Y\\) is:

\begin{equation}
H(X,Y) \equiv \sum\_{x,y \in \mathcal{A}\_x \mathcal{A}\_y} P(x,y) \log \frac{1}{P(x,y)}
\end{equation}

Entropy is additive if the ensembles are independent:

\begin{equation}
H(X,Y) = H(X) + H(Y)
\end{equation}

Entropy is _decomposable_.
