+++
title = "Information Filter"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:57:48+08:00
draft = false
+++

tags
: [Gaussian Filter]({{< relref "gaussian_filter" >}}), [Bayes Filter]({{< relref "bayes_filter" >}})

## Key Idea {#key-idea}

The multi-variate Gaussians are represented in their canonical
representation, by precision/information matrix \\(\Omega\\) and the
information vector \\(\xi\\), where \\(\Omega = \Sigma^{-1}\\), and \\(\xi =
\Sigma^{-1} \mu\\).

The Gaussian can be redefined as follows:

\begin{equation}
p(x) = \eta \text{exp} \left\\{ - \frac{1}{2} x^T \Omega x + x^T \xi \right\\}
\end{equation}

where \\(\eta\\) has been redefined to subsume a constant. The reason they
are called information matrix and vectors is because \\(- \log p(x)\\) is
quadratic in \\(\Omega\\) and \\(\xi\\).

For Gaussians, \\(\Omega\\) is positive semi-definite, so \\(- \log p(x)\\) is
a quadratic distance function with mean \\(\mu = \Omega^{-1} \xi\\). The
matrix \\(\Omega\\) determines the rate at which the distance function
inccreases is different dimensions of the variable \\(x\\). A quadratic
distance that is weighted by a matrix \\(\Omega\\) is called Mahalanobis
distance.

## Algorithm {#algorithm}

\begin{algorithm}
\caption{Information Filter}
\label{information_filter}
\begin{algorithmic}[1]
\Procedure{InformationFilter}{$\xi\_{t-1}, \Omega\_{t-1}, \mu\_t, \z\_t$}
\State $\overline{\Omega}\_t = (A\_t \Omega\_{t-1}^{-1} A\_t^T + R\_t)^{-1}$
\State $\overline{\xi}\_t = \overline{\Omega\_t}\left( A\_t
      \Omega\_{t-1}^{-1} \xi\_{t-1} + B\_t u\_t  \right)$
\State $\Omega\_t = C\_t^T Q\_t^{-1} C\_t + \overline{\Omega}\_t$
\State $\xi\_t = C\_t^T Q\_t^{-1}z\_t + \overline{\xi}\_t$
\State \Return $\xi\_t, \Omega\_t$
\EndProcedure
\end{algorithmic}
\end{algorithm}

## Pros {#pros}

1.  Representing global uncertainty is simple: \\(\Omega = 0\\). With
    moments, global uncertainty amounts to covariance of infinite magnitude.
2.  More numerically stable for many applications.
3.  Natural fit for multi-robot problems, where sensor data is
    collected decentrally. Information integration is additive and
    achieved by summing information from multiple robots. This is
    because the canonical parameters represent a probability in log
    form.
4.  Information matrix may be sparse, lending itself to algorithms that
    are computationally efficient.

## Cons {#cons}

1.  The update step requires the recovery of a state estimate,
    inverting the information matrix. Matrix inversion is
    computationally expensive.
