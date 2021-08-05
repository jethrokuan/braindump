+++
title = "Kalman Filter"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Extended Kalman Filter]({{<relref "extended_kalman_filter.md#" >}}), [Gaussian Filter]({{<relref "gaussian_filter.md#" >}})

The Kalman filter is a technique for belief computation in linear
systems. It implements belief computation over continuous states, and
is not suitable for discrete or hybrid state spaces.

It uses the moments representation. At time \\(t\\), the belief is
represented by mean \\(\mu\_t\\) and covariance \\(\Sigma\_t\\). It makes the
following assumptions:

1.  The Markovian Assumption ([Markovian Assumption]({{<relref "markovian_assumption.md#" >}}))
2.  The next state probability \\(p(x\_t | u\_t, x\_{t-1})\\) is a linear
    function in its arguments with added Gaussian noise:

\begin{equation}
  x\_t = A\_t x\_{t-1} + B\_t u\_t + \epsilon\_t
\end{equation}

\\(x\_t\\) and \\(\u\_t\\) are column vectors. This assumption defines the state
transition probability \\(p(x\_t | u\_t, x\_{t-1})\\) by substituting the
mean \\(A\_t x\_{t-1} + B\_t u\_t\\) and covariance \\(R\_t\\) in the multi-variate
normal distribution formula.

1.  The measurement probability \\(p(z\_t | x\_t)\\) is linear in its
    arguments:

\begin{equation}
  z\_t  = C\_t x\_t + \delta\_t
\end{equation}

for some multivariate Gaussian noise \\(\delta\_t\\) with 0 mean and
co-variance \\(Q\_t\\).

1.  The initial belief \\(\text{bel}(x\_0)\\) is normally distributed, with
    initial belief \\(\mu\_0\\) and covariance \\(\Sigma\_0\\)

These 4 assumptions give rise to the Kalman Filter algorithm.

\begin{algorithm}
  \caption{Kalman Filter}
  \label{kalman\_filter}
  \begin{algorithmic}[1]
    \Procedure{KalmanFilter}{$\mu\_{t-1}, \Sigma\_{t-1}, \mu\_t, \z\_t$}
    \State $\overline{\mu}\_t = A\_t \mu\_{t-1} + B\_t \mu\_t$
    \State $\overline{\Sigma}\_t = A\_t \Sigma\_{t-1} A\_t^T + R\_t$
    \State ${K}\_t = \overline{\Sigma}\_t C\_t^T (C\_t \overline{\Sigma}\_t C\_t^T + Q\_t)^{-1}$
    \State $\mu\_t = \overline{\mu}\_t + K\_t(z\_t - C\_t\overline{\mu}\_t)$
    \State $\Sigma\_t = (I - K\_t C\_t) \overline{\Sigma}\_t$
    \State \Return $\mu\_t, \Sigma\_t$
    \EndProcedure
  \end{algorithmic}
\end{algorithm}


## Cons {#cons}

The linearity assumptions are often unfulfilled in practice. For
example, circular trajectories cannot be described with linear state
transitions. To overcome this difficulty, people use the [Extended
Kalman Filter]({{<relref "extended_kalman_filter.md#" >}}).