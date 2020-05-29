+++
title = "Kalman Filter"
author = ["Jethro Kuan"]
lastmod = 2020-05-29T21:03:10+08:00
draft = false
+++

tags
: [Extended Kalman Filter]({{< relref "extended_kalman_filter" >}}), [Gaussian Filter]({{< relref "gaussian_filter" >}})

The Kalman filter is a technique for belief computation in linear
systems. It implements belief computation over continuous states, and
is not suitable for discrete or hybrid state spaces.

It uses the moments representation. At time \\(t\\), the belief is
represented by mean \\(\mu_t\\) and covariance \\(\Sigma_t\\). It makes the
following assumptions:

1.  The Markovian Assumption ([Markovian Assumption]({{< relref "markovian_assumption" >}}))
2.  The next state probability \\(p(x_t | u_t, x\_{t-1})\\) is a linear
    function in its arguments with added Gaussian noise:

\begin{equation}
x_t = A_t x\_{t-1} + B_t u_t + \epsilon_t
\end{equation}

\\(x_t\\) and \\(\u_t\\) are column vectors. This assumption defines the state
transition probability \\(p(x_t | u_t, x\_{t-1})\\) by substituting the
mean \\(A_t x\_{t-1} + B_t u_t\\) and covariance \\(R_t\\) in the multi-variate
normal distribution formula.

1.  The measurement probability \\(p(z_t | x_t)\\) is linear in its
    arguments:

\begin{equation}
z_t = C_t x_t + \delta_t
\end{equation}

for some multivariate Gaussian noise \\(\delta_t\\) with 0 mean and
co-variance \\(Q_t\\).

1.  The initial belief \\(\text{bel}(x_0)\\) is normally distributed, with
    initial belief \\(\mu_0\\) and covariance \\(\Sigma_0\\)

These 4 assumptions give rise to the Kalman Filter algorithm.

\begin{algorithm}
\caption{Kalman Filter}
\label{kalman_filter}
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
Kalman Filter]({{< relref "extended_kalman_filter" >}}).
