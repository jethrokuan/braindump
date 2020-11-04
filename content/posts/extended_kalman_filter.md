+++
title = "Extended Kalman Filter"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Bayes Filter]({{<relref "bayes_filter.md" >}}), [Kalman Filter]({{<relref "kalman_filter.md" >}}), [Information Filter]({{<relref "information_filter.md" >}})

## Key Idea {#key-idea}

Remove linearity assumption from the [Kalman Filter]({{<relref "kalman_filter.md" >}}):

\begin{align}
x_t &= g(u_t, x\_{t-1}) + \epsilon_t \\\\\\
z_t &= h(x_t) + \gamma_t
\end{align}

Where function \\(g\\) and replaces \\(A_t, B_t\\), and function \\(h\\) replaces
\\(C_t\\) respectively.

The belief remains approximated by a Gaussian, represented by mean
\\(\mu_t\\) and covariance \\(\Sigma_t\\). This belief is approximate, unlike
in Kalman filters.

**Linearization** is key to EKFs. EKFs use first-order Taylor expansion
for \\(g\\) to construct a linear approximation to a function \\(g\\) from its
value and slope. The slope is given by the partial derivative:

\begin{equation}
g' (u_t, x\_{t-1}) := \frac{\partial g(u_t, x\_{t-1})}{\partial x\_{t-1}}
\end{equation}

Both \\(g\\) and the slope depend on the argument of \\(g\\). We choose the
most likely argument: the mean of the posterior \\(\mu\_{t-1}\\), giving:

\begin{align}
g(u_t, x\_{t-1}) \approx g(u_t, \mu\_{t-1}) + g'(u_t, \mu\_{t-1})
(x\_{t-1} - \mu\_{t-1})
\end{align}

Where we can define \\(g'(u_t, \mu\_{t-1}) := G_t\\). \\(G_t\\) is the Jacobian
matrix, with dimensions \\(n \times n\\), where \\(n\\) is the dimensions of
the state.

Similarly, \\(h\\) is linearized as:

\begin{equation}
h(x_t) \approx h(\overline{\mu}\_t) + H_t (x_t - \overline{\mu}\_t)
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
