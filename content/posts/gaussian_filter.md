+++
title = "Gaussian Filter"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:09:10+08:00
draft = false
+++

### Backlinks {#backlinks}

- [Bayes Filter]({{< relref "bayes_filter" >}})
- [Kalman Filter]({{< relref "kalman_filter" >}})
- [Information Filter]({{< relref "information_filter" >}})

Gaussian Filters is a tractable implementation of the Bayes filter
([Bayes Filter]({{< relref "bayes_filter" >}})) for continuous spaces.

## Key Idea {#key-idea}

Beliefs are represented by a multi-variate normal distribution.

\begin{equation}
p(x) = \text{det}(2 \pi \Sigma)^{-\frac{1}{2}} \text{exp} \left( -
\frac{1}{2} (x -\mu)^T \Sigma^{-1} (x- \mu) \right)
\end{equation}

The density of variable \\(x\\) is characterized by mean \\(\mu\\) and
covariance \\(\Sigma\\).

## Ramifications {#ramifications}

Since beliefs are represented by a multi-variate normal distribution,
this means that beliefs are **uni-modal**. This is suitable for many
tracking problems. However, this is a poor match for many global
estimation problems with multiple hypotheses that should give rise to
their own modes in the posterior.

## Representations {#representations}

moments representation
: The Gaussian is represented by its mean
and covariance (first and second moments)

canonical representation
:

These representations have a bijective mapping, and are functionally
equivalent, but give rise to different algorithms.

Using the moments representation gives rise to the [Kalman Filter]({{< relref "kalman_filter" >}}).
