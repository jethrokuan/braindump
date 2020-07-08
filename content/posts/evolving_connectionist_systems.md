+++
title = "Evolving Connectionist Systems"
author = ["Jethro Kuan"]
lastmod = 2020-07-08T14:55:03+08:00
draft = false
+++

Evolving Connectionist Systems (ECoS) learn local models from data
through clustering the data and associating a local output function
for each cluster represented in a connectionist structure
([Schliebs and Kasabov, n.d.](#org00c44ef)). These clusters are
created based on similarity between data samples either in the input
space, or both in the input space and output space. These functions
are represented in their connection weights.

ECoS traditionally uses the simple sigmoid model of a neuron. [Evolving Spiking
Neural Networks]({{< relref "evolving_snn" >}}) architectures use a spiking neuron model.

## Bibliography {#bibliography}

<a id="org00c44ef"></a>Schliebs, Stefan, and Nikola Kasabov. n.d. “Evolving Spiking Neural Network-a Survey” 4 (2):87–98. <https://doi.org/10.1007/s12530-013-9074-9>.
