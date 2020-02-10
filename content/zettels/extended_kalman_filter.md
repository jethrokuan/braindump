+++
title = "Extended Kalman Filter"
author = ["Jethro Kuan"]
lastmod = 2020-02-10T14:31:28+08:00
draft = false
+++

tags
: [Bayes Filter]({{< relref "bayes_filter" >}}), [Kalman Filter]({{< relref "kalman_filter" >}}), [Information Filter]({{< relref "information_filter" >}})


## Key Idea {#key-idea}

Remove linearity assumption from the [Kalman Filter]({{< relref "kalman_filter" >}}):

\begin{align}
  x\_t &= g(u\_t, x\_{t-1}) + \epsilon\_t \\\\\\
  z\_t = h(x\_t) + \gamma\_t
\end{align}

Where function \\(g\\) and replaces \\(A\_t, B\_t\\), and function \\(h\\) replaces
\\(C\_t\\) respectively.

The belief remains approximated by a Gaussian, represented by mean
\\(\mu\_t\\) and covariance \\(\Sigma\_t\\). This belief is approximate, unlike
in Kalman filters.

**Linearization** is key to EKFs. EKFs use first-order Taylor expansion
for \\(g\\) to construct a linear approximation to a function \\(g\\) from its
value and slope. The slope is given by the partial derivative:

\begin{equation}
  g' (u\_t, x\_{t-1}) := \frac{\partial g(u\_t, x\_{t-1})}{\partial x\_{t-1}}}
\end{equation}

Both \\(g\\) and the slope depend on the argument of \\(g\\). We choose the
most likely argument: the mean of the posterior \\(\mu\_{t-1}\\), giving:

\begin{align}
  g(u\_t, x\_{t-1}) \approx g(u\_t, \mu\_{t-1}) + g'(u\_t, \mu\_{t-1})
  (x\_{t-1} - \mu\_{t-1})
\end{align}

Where we can define \\(g'(u\_t, \mu\_{t-1}) := G\_t\\). \\(G\_t\\) is the Jacobian
matrix, with dimensions \\(n \times n\\), where \\(n\\) is the dimensions of
the state.

Similarly, \\(h\\) is linearized as:

\begin{equation}
  h(x\_t) \approx h(\overline{\mu}\_t) + H\_t (x\_t - \overline{\mu}\_t)
\end{equation}


## Algorithm {#algorithm}

\begin{algorithm}
  \caption{Extended Kalman Filter}
  \label{ekf}
  \begin{algorithmic}[1]
    \Procedure{ExtendedKalmanFilter}{$\mu\_{t-1}, \Sigma\_{t-1}, \mu\_t, \z\_t$}
    \State $\overline{\mu}\_t = g(u\_t, \mu\_{t-1})$
    \State $\overline{\Sigma}\_t = G\_t \Sigma\_{t-1} G\_t^T + R\_t$
    \State ${K}\_t = \overline{\Sigma}\_t H\_t^T (H\_t \overline{\Sigma}\_t H\_t^T + Q\_t)^{-1}$
    \State $\mu\_t = \overline{\mu}\_t + K\_t(z\_t - h(\overline{\mu}\_t))$
    \State $\Sigma\_t = (I - K\_t H\_t) \overline{\Sigma}\_t$
    \State \Return $\mu\_t, \Sigma\_t$
    \EndProcedure
  \end{algorithmic}
\end{algorithm}


## Cons {#cons}

Since the belief is modelled as a multi-variate Gaussian, it is
incapable of modelling multimodal beliefs. One extension is to
represent posteriors as a mixture of Gaussians. These are called
multi-hypothesis Kalman filters.


## Extensions {#extensions}

There are multiple ways for linearization. The unscented Kalman filter
probes the function to be linearized at selected points, and
calculates a linearized approximation based on the outcomes of the
probes. Moments matching linearizes while preserving the true mean and
true covariance of the posterior distribution.
