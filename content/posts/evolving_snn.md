+++
title = "Evolving Spiking Neural Networks"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:10:22+08:00
draft = false
+++

### Backlinks {#backlinks}

- [Evolving Connectionist Systems]({{< relref "evolving_connectionist_systems" >}})

Early evolving [Spiking Neural Networks]({{< relref "spiking_neural_networks" >}}) architectures use the [Leaky
Integrate-And-Fire]({{< relref "leaky_integrate_and_fire" >}}) model, and rank-order encoding. eSNNs can be used for
classification. Given an input sample, the spike train is propagated through the
SNN, resulting in the firing of output neurons. If no output neuron is
activated, the classification result is undetermined. If one or more output
neurons emit a spike, the label of the neuron with the shortest response time
represents the classification result.

## Training an eSNN {#training-an-esnn}

For each class label an individual repository is evolved. A new output
neuron is created and fully connected to the previous layer of
neurons. Input spikes are propagated through the network, and the
weight vector for the neuron is computed, along with its firing
threshold. This weight vector is compared to existing neurons in the
repository. If neurons are too similar (e.g. small Euclidean distance
between weight vectors), they are merged.

See ([Schliebs and Kasabov 2013](#orge4d941a)) for a
comprehensive review.

## Bibliography {#bibliography}

<a id="orge4d941a"></a>Schliebs, Stefan, and Nikola Kasabov. 2013. “Evolving Spiking Neural Network-a Survey.” _Evolving Systems_ 4 (2):87–98.
