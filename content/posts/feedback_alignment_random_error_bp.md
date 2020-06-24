+++
title = "Feedback Alignment and Random Error Backpropagation"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:09:57+08:00
draft = false
+++

Backpropagation is not biologically plausible because it the error
signals to update the weights of the hidden layers need to be
propagated back from the top layer.

Feedback alignment side-steps this problem by replacing the weights in
the backpropagation rule with random ones:

\begin{equation}
\delta\_{i}^{(l)}=\sigma^{\prime}\left(a\_{i}^{(l)}\right) \sum\_{k} \delta\_{k}^{(l+1)} G\_{k i}^{(l)}
\end{equation}

where \\(G^{(l)}\\) is a fixed, random matrix with the same dimensions as
\\(W\\). The replacement of \\(W^{T,(l)}\\) with \\(G^{(l)}\\) breaks the
dependency of the backward phase on \\(W\\), enabling the rule to be more
local. Another variation is to replace the backpropagation of the
errors in each layer with a random propagation of errors to each
layer:

\begin{equation}
\delta\_{i}^{(l)}=\sigma^{\prime}\left(a\_{i}^{(l)}\right) \sum\_{k} \delta\_{k}^{(L)} H\_{k i}^{(l)}
\end{equation}

Random BP applied to [Spiking Neural Networks]({{< relref "spiking_neural_networks" >}}) do not account for the temporal
dynamics of neurons and synapses. SuperSpike solves this problem.
