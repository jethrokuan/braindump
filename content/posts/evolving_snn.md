+++
title = "Evolving Spiking Neural Networks"
author = ["Jethro Kuan"]
draft = false
+++

Early evolving [Spiking Neural Networks]({{<relref "spiking_neural_networks.md" >}}) architectures use the [Leaky
Integrate-And-Fire]({{<relref "leaky_integrate_and_fire.md" >}}) model, and rank-order encoding. eSNNs can be used for
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

See ([Schliebs and Kasabov, n.d.](#org71db767)) for a
comprehensive review.

## Bibliography {#bibliography}

<a id="org71db767"></a>Schliebs, Stefan, and Nikola Kasabov. n.d. “Evolving Spiking Neural Network-a Survey” 4 (2):87–98. <https://doi.org/10.1007/s12530-013-9074-9>.
