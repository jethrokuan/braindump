+++
title = "Bayes Filter"
author = ["Jethro Kuan"]
lastmod = 2019-11-29T17:35:50+08:00
draft = false
math = true
+++

## Notation {#notation}

\\(\eta\\)
: normalizing constant, to make probability distribution sum
    to 1.

\\(\text{bel}(t) = p(x\_t | z\_{1:t}, u\_{1:t})\\)
: posterior
    probabilities over state variables conditioned on available data

\\(\overline{\text{bel}}(t) = p(x\_t | z\_{1:t-1}, u\_{1:t})\\)
: belief
    taken _before_ incorporating the measurement \\(z\_t\\)

\\(\overline{\text{bel}}(t)\\) often called the prediction in Bayes
filtering. Computing \\(\text{bel}(t)\\) from
\\(\overline{\text{bel}}(t)\\) is called _correction_ or the _measurement
update_.

\begin{algorithm}
  \caption{Bayes Filtering}
  \label{bayes\_filter}
  \begin{algorithmic}[1]
    \Procedure{BayesFilter}{$\text{bel}(x\_{t-1}), u\_t, z\_t$}
    \ForAll{$x\_t$}
    \State $\overline{\text{bel}}(t) = \int p(x\_t | u\_t, x\_{t-1})
    \text{bel}(x\_{t-1}) dx$
    \State $\text{bel}(t) = \eta p(z\_t | x\_t)\overline{\text{bel}}(t) (x\_t)$
    \EndFor
    \State \Return $bel(x\_t)$
    \EndProcedure
  \end{algorithmic}
\end{algorithm}

Mathematical Derivation makes the [§markovian\_assumption]({{< relref "markovian_assumption" >}}).

Exact techniques for belief calculation are reserved for specialized
cases. In most scenarios, these beliefs have to be approximated, and
these approximations have important ramifications on the complexity of
the algorithm.

Approximations requires trading off:

Computational Efficiency
: Linear Gaussian approximations can
    calculate beliefs in time polynomial to the state space. Other
    approximations may be exponential. Particle filter techniques have
    the any-time characteristic, allowing them to trade off accuracy
    with computational efficiency.

Accuracy
: Linear Gaussian approximations are limited to unimodal
    distributions, whereas histogram approximations are multi-modal, but
    have limited accuracy. Particle representations can approximate
    a wide array of distributions, but large number of particles may be
    required for high accuracy.

Ease of implementation
: Difficulty in implementation typically
    arises from the form of the transition and measurement probabilities
    (see [§robotics\_probabilistic\_generative\_laws]({{< relref "robotics_probabilistic_generative_laws" >}})). Particle
    representations lend themselves to simple implementations for
    complex non-linear systems.


## Related {#related}

-   [§gaussian\_filter]({{< relref "gaussian_filter" >}})
