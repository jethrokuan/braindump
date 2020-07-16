+++
title = "Surrogate Gradient Learning In Spiking Neural Networks"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:57:00+08:00
draft = false
+++

paper
: <https://arxiv.org/pdf/1901.09948v2.pdf>

[Spiking Neural Networks]({{< relref "spiking_neural_networks" >}}) enable power-efficient network models, which
have become of increasing importance in embedded and auto-motive
applications. The power efficiency stems from dispensing of expensive
floating-point computations.

Surrogate gradient methods overcome the difficulties associated with
the discontinuous non-linearity. Rather than changing the neuronal
model ([Smoothed Spiking Neural Networks]({{< relref "smoothed_snn" >}})), surrogate gradients are
introduced to allow for numerical optimisation.

Surrogate gradients can also improve the memory access overhead of the
learning process. For example, a global loss can be replaced by a
number of local loss functions. Surrogate gradient methods also allow
for end-to-end training without specifying a coding scheme in the
hidden layers.

There are many different available surrogate functions used, and all
have reportedly some success
([Neftci, Mostafa, and Zenke, n.d.](#orgdcd4528)). All of the
functions used are non-linear and monotonically increasing towards the
firing threshold. This suggests that the details of the surrogate are
not crucial in ensuring success of the method.

## Bibliography {#bibliography}

<a id="orgdcd4528"></a>Neftci, Emre O., Hesham Mostafa, and Friedemann Zenke. n.d. “Surrogate Gradient Learning in Spiking Neural Networks.” <http://arxiv.org/abs/1901.09948v2>.
