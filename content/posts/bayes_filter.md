+++
title = "Bayes Filter"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Gaussian Filter]({{<relref "gaussian_filter.md" >}})

## Notation {#notation}

\\(\eta\\)
: normalizing constant, to make probability distribution sum
to 1.

\\(\text{bel}(t) = p(x_t | z\_{1:t}, u\_{1:t})\\)
: posterior
probabilities over state variables conditioned on available data

\\(\overline{\text{bel}}(t) = p(x_t | z\_{1:t-1}, u\_{1:t})\\)
: belief
taken _before_ incorporating the measurement \\(z_t\\)

\\(\overline{\text{bel}}(t)\\) often called the prediction in Bayes
filtering. Computing \\(\text{bel}(t)\\) from
\\(\overline{\text{bel}}(t)\\) is called _correction_ or the _measurement
update_.

## Algorithm {#algorithm}

\begin{algorithm}
\caption{Bayes Filtering}
\label{bayes_filter}
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

## Details {#details}

Mathematical derivation makes the [Markovian Assumption]({{<relref "markovian_assumption.md" >}}).

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
(see [Robotics Probabilistic Generative Laws]({{<relref "robotics_probabilistic_generative_laws.md" >}})). Particle
representations lend themselves to simple implementations for
complex non-linear systems.
