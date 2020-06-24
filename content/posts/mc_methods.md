+++
title = "Monte Carlo Methods"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:09:24+08:00
draft = false
+++

tags
: [Machine Learning Algorithms]({{< relref "machine_learning_algorithms" >}}), [Probabilistic Graph Models]({{< relref "pgm" >}})

Monte Carlo methods make use of random numbers to solve the following
problems:

1.  Generating samples \\(\left\\{x^{( r)}\right\\}^{R}\_{r=1}\\) from a given
    probability distribution \\(P(x)\\).
2.  Estimate expectation of functions under this distribution:

\begin{equation}
\Phi = \langle \phi(x) \rangle = \int d^N P(x) \phi(x)
\end{equation}

This probability distribution is called the _target density_. The
target density is often the posterior of a model's parameters, given
observed data.

If we solve the first problem of sampling, then these samples can be
used to solve the second problem via the Monte Carlo estimator:

\begin{equation}
\hat{\phi} = \frac{1}{R}\sum\_{r} \phi(\mathbf{x}^{( r)})
\end{equation}

If the samples are generated from \\(P(x)\\), then the expectation of
\\(\hat{\phi}\\) is the same as the expectation of \\(\phi\\). The variance of
\\(\hat{\phi}\\) decreases as \\(\sigma^2/R\\), where \\(\sigma^2\\) is the
variance of \\(\phi\\). This is so important that it is restated here:

> The accuracy of the Monte Carlo estimate is dependent only on the
> variance of \\(\phi\\), and not on the dimensionality of the space sampled.

## Why is sampling hard? {#why-is-sampling-hard}

Suppose we can evaluate \\(P(x)\\) up to a multiplicative constant \\(Z\\):
\$P^\*(x) = \\(P(x) Z\\). To generate samples from \\(P(x)\\), we need to
know the normalizing constant \\(Z\\). Even if we knew \\(Z\\), there is no
obvious way to sample without enumerating most or all of the possible
states.
