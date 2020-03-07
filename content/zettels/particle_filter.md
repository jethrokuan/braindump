+++
title = "Particle Filter"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:27:04+08:00
draft = false
+++

Particle filters approximate the posterior by a finite number of
parameters. The posterior \\(\text{bel}(x\_t)\\) is represented by a set of
random state samples drawn from this posterior. This representation
can represent a much broader space of distributions, but is
approximate.

The samples of a posterior distribution are called particles, denoted
by:

\begin{equation}
  X\_t := x\_t^{[1]}, x\_t^{[2]}, \dots
\end{equation}

Each particle \\(x\_t^{[m]}\\) is a concrete instantiation of the state at
time \\(t\\): a hypothesis as to what the true world state may be at time
\\(t\\). \\(M\\) denotes the number of particles in the particle set \\(X\_t\\).
The number of particles is often large, and sometimes a function of
\\(t\\) or other quantities related to the belief.


## Key Idea {#key-idea}

The likelihood for a state hypothesis \\(x\_t\\) to be included in the
particle set \\(X\_t\\) should be proportional to its Bayes filter
posterior \\(\text{bel}(x\_t)\\):

\begin{equation}
  x\_t^{[m]} \sim p(x\_t : z\_{1:t}, u\_{1:t})
\end{equation}

Hence, the denser the subregion of the state space populated by
samples, the more likely it is that the true state falls into this
region. This property holds asymptotically for \\(m \rightarrow \infty\\).


## Algorithm {#algorithm}

The algorithm first constructs a temporary particle set \\(\overline{X}\\)
which is reminiscent to the belief \\(\overline{\text{bel}}(x\_t)\\). It
does this by systematically processing each particle \\(x\_{t-1}^{[m]}\\)
in the input particle set \\(X\_{t-1}\\).

\begin{algorithm}
  \caption{Particle Filter}
  \label{particle\_filter}
  \begin{algorithmic}[1]
    \Procedure{ParticleFilter}{$X\_{t-1}, u\_t, z\_t$}
    \State $\overline{X}\_t = X\_t = \phi$
    \For {$m = 1 \text{ to } M$}
    \State sample $x\_t^{[m]} \sim p(x\_t | u\_t, x\_{t-1}^{[m]})$
    \State $w\_t^{[m]} = p(z\_t | x\_t^{[m]})$
    \State $\overline{X}\_t = \overline{X}\_t + \langle x\_t^{[m]} , w\_t^{[m]} \rangle$
    \EndFor
    \For {$m = 1 \text{ to } M$}
    \State draw $i$ with probability $\proportional w\_t^{[i]}$
    \State add $x\_t^{[i]} to X\_t$
    \EndFor
    \State \Return $X\_t$
    \EndProcedure
  \end{algorithmic}
\end{algorithm}

\\(w\_t^{[m]}\\) is the importance factor for the particle \\(x\_t^{[m]}\\): the
probability of measurement \\(z\_t\\) under the particle \\(x\_t^{[m]}\\).

The second for-loop implements importance re-sampling. The algorithm
draws with replacement \\(M\\) particles from \\(\overline{X}\_t\\). Whereas
\\(\overline{X}\_t\\) is distributed according to
\\(\overline{\text{bel}}(x\_t)\\), the resampling causes them to be
distributed according to the posterior \\(\text{bel}(x\_t) = \eta p(z\_t |
x\_t^{[m]})\overline{\text{bel}}(x\_t)\\). (see [§importance\_sampling]({{< relref "importance_sampling" >}}))


## Properties {#properties}

There are four complimentary sources of approximation error:

1.  There are finitely many particles. Non-normalized values \\(w\_t^{m}\\)
    are drawn from an M-dimensional space, but after normalization they
    reside in a space of dimension \\(M-1\\). The effect of loss of
    dimensionality becomes less pronounced with larger \\(M\\).
2.  The resampling process induces a loss of diversity in the particle
    population, manifesting as an approximation error. This is the
    variance of the estimator. This is countered with several variance
    reduction techniques:
    1.  Reducing the frequency of resampling
    2.  low variance sampling
3.  Divergence of proposal and target distribution. Particles are
    generated from a proposal distribution that does not consider the
    measurement. If at one extreme, the sensors of the robot are highly
    inaccurate, but its motion is accurate, the target distribution
    will be similar to the proposal distribution and the particle
    filter will be efficient. However, the opposite configuration can
    cause the distributions to diverge substantially.
4.  Particle deprivation problem: in high dimensional spaces, there may
    be no particles in the vicinity to the correct state. That is,
    the number of particles might be too small to cover all relevant
    regions of high likelihood.


## Backlinks {#backlinks}

-   [Non-parametric Filters]({{< relref "nonparametric_filter" >}})
-   [Grid & Monte Carlo Localization]({{< relref "grid_mc_localization" >}})
-   [Histogram Filter]({{< relref "histogram_filter" >}})
