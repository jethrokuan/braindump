+++
title = "Evolving Spiking Neural Networks"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T20:21:12+08:00
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

See <a id="2517787d2e251f350f5882e3a5702fc7" href="#schliebs13_evolv_spikin_neural_networ_survey">(Schliebs \& Kasabov, 2013)</a> for a
comprehensive review.

# Bibliography

<a id="schliebs13_evolv_spikin_neural_networ_survey" target="_blank">Schliebs, S., & Kasabov, N., _Evolving spiking neural network-a survey_, Evolving Systems, _4(2)_, 87–98 (2013). http://dx.doi.org/10.1007/s12530-013-9074-9</a> [↩](#2517787d2e251f350f5882e3a5702fc7)

### Backlinks {#backlinks}

- [Evolving Connectionist Systems]({{< relref "evolving_connectionist_systems" >}})
