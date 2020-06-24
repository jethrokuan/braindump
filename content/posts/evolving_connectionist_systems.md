+++
title = "Evolving Connectionist Systems"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:09:24+08:00
draft = false
+++

Evolving Connectionist Systems (ECoS) learn local models from data
through clustering the data and associating a local output function
for each cluster represented in a connectionist structure
([Schliebs and Kasabov 2013](#org469b9ea)). These clusters are
created based on similarity between data samples either in the input
space, or both in the input space and output space. These functions
are represented in their connection weights.

ECoS traditionally uses the simple sigmoid model of a neuron. [Evolving Spiking
Neural Networks]({{< relref "evolving_snn" >}}) architectures use a spiking neuron model.

## Bibliography {#bibliography}

<a id="org469b9ea"></a>Schliebs, Stefan, and Nikola Kasabov. 2013. “Evolving Spiking Neural Network-a Survey.” _Evolving Systems_ 4 (2):87–98.
