+++
title = "Evolving Connectionist Systems"
author = ["Jethro Kuan"]
lastmod = 2020-01-06T18:19:27+08:00
draft = false
math = true
+++

Evolving Connectionist Systems (ECoS) learn local models from data
through clustering the data and associating a local output function
for each cluster represented in a connectionist structure
<a id="2517787d2e251f350f5882e3a5702fc7" href="#schliebs13_evolv_spikin_neural_networ_survey">(Stefan Schliebs \& Nikola Kasabov, 2013)</a>. These clusters are
created based on similarity between data samples either in the input
space, or both in the input space and output space. These functions
are represented in their connection weights.

ECoS traditionally uses the simple sigmoid model of a neuron. Evolving
Spiking Neural Networks ([§evolving\_snn]({{< relref "evolving_snn" >}})) architectures use a spiking neuron
model.

# Bibliography
<a id="schliebs13_evolv_spikin_neural_networ_survey" target="_blank">Schliebs, S., & Kasabov, N., *Evolving Spiking Neural Network-A Survey*, Evolving Systems, *4(2)*, 87–98 (2013).  http://dx.doi.org/10.1007/s12530-013-9074-9</a> [↩](#2517787d2e251f350f5882e3a5702fc7)
