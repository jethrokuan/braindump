+++
title = "Smoothed Spiking Neural Networks"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T20:20:27+08:00
draft = false
+++

### Backlinks {#backlinks}

- [Surrogate Gradient Learning In Spiking Neural Networks]({{< relref "neftci2019_surrogate_gradient_learning_snn" >}})

Smoothed [Spiking Neural Networks]({{< relref "spiking_neural_networks" >}}) ensure well-behaved gradients which are
directly suitable for optimization. They come in 4 categories:

1.  Soft non-linearity models
2.  Probabilistic models, where gradients are well defined in expectation
3.  Models relying on rate or
4.  Single-spike temporal codes

## Soft non-linearity models {#soft-non-linearity-models}

This approach can be applied on all spiking neuron models which
include a smooth spike generating process. These include:

- Hodgkin-Huxley
- Morris-Lecar
- FitzHugh-Nagumo

The resultant network can be optimized using standard methods of BPTT.
These smoothed models compromise on a key feature of SNNs: binary
spike propagation.

## Probabilistic Models {#probabilistic-models}

Stochasticity in the models effectively smooths out the discontinuous
binary nonlinearity, which provides well-defined gradients on
expectation values. These binary probabilistic models are commonly
studied in Restricted Boltzmann machines.

With probabilistic models, the log-likelihood of a spike train is a
smooth quantity, which can be optimized using gradient-descent.

## Gradients in rate-coding networks {#gradients-in-rate-coding-networks}

In rate-coding networks, it is assumed that the spike rate carries the
underlying information. Rate-based approaches offer good performance
in practice, but may be inefficient. Precise estimation of firing
rates require averaging over a number of spikes. These require high
firing rates, or longer averaging times.

Probabilistic network implementations also use rate-coding at the
output level.

## Single-spike-time-coding networks {#single-spike-time-coding-networks}

In the temporal coding setting, individual spikes carry significantly
more information. This was first pioneered by SpikeProp. Firing times
for hidden units were linearized, allowing to analytically compute
approximate hidden layer gradients.

### Backlinks {#backlinks}

- [Surrogate Gradient Learning In Spiking Neural Networks]({{< relref "neftci2019_surrogate_gradient_learning_snn" >}})
