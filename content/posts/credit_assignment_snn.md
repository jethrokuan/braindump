+++
title = "Credit Assignment in Spiking Neural Networks"
author = ["Jethro Kuan"]
draft = false
+++

The problem of spatial and temporal credit assignment in RNNs are
solved through backpropagating errors in the unrolled RNN.

Algorithmic solutions to RNNs have 2 challenges in [Spiking Neural Networks]({{<relref "spiking_neurons_lit_review.md#" >}}).
First, spiking neurons have $S(U(t)) = \\(\Theta(U(t) - \theta)\\). Their derivative
is zero everywhere except at \\(U = \theta\\), where it is ill-defined. This binary
spiking non-linearity stops gradients from flowing, and makes gradient-based
optimization unsuitable. The same issues occur in binary neurons.

Second, BP is expensive in terms of computation and memory. These
restrictions may be poorly suited to the hardware that implements it.
For example, non-von Neumann architectures have specific locality
requirements. The forward propagation approach may be more favourable.