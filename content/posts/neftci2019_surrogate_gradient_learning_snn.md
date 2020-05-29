+++
title = "Surrogate Gradient Learning In Spiking Neural Networks"
author = ["Jethro Kuan"]
lastmod = 2020-05-29T21:02:41+08:00
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
<a id="6c46e273de1ecbecce7f8f1ac7329a57" href="#neftci19_surrog_gradien_learn_spikin_neural_networ">(Neftci et al., 2019)</a>. All of the
functions used are non-linear and monotonically increasing towards the
firing threshold. This suggests that the details of the surrogate are
not crucial in ensuring success of the method.

# Bibliography

<a id="neftci19_surrog_gradien_learn_spikin_neural_networ" target="_blank">Neftci, E. O., Mostafa, H., & Zenke, F., _Surrogate gradient learning in spiking neural networks_, CoRR, _()_, (2019). </a> [↩](#6c46e273de1ecbecce7f8f1ac7329a57)
