+++
title = "Evolving Connectionist Systems"
author = ["Jethro Kuan"]
draft = false
+++

Evolving Connectionist Systems (ECoS) learn local models from data
through clustering the data and associating a local output function
for each cluster represented in a connectionist structure
Schliebs and Kasabov, n.d.. These clusters are
created based on similarity between data samples either in the input
space, or both in the input space and output space. These functions
are represented in their connection weights.

ECoS traditionally uses the simple sigmoid model of a neuron. [Evolving Spiking
Neural Networks]({{<relref "evolving_snn.md#" >}}) architectures use a spiking neuron model.