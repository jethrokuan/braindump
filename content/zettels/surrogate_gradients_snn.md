+++
title = "Surrogate Gradients in Spiking Neural Networks"
author = ["Jethro Kuan"]
lastmod = 2020-01-15T15:41:45+08:00
draft = false
math = true
+++

Surrogate gradient methods overcome the difficulties associated with
the discontinuous non-linearity. Rather than changing the neuronal
model ([§smoothed\_snn]({{< relref "smoothed_snn" >}})), surrogate gradients are introduced to allow for
numerical optimisation.

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
<a id="neftci19_surrog_gradien_learn_spikin_neural_networ" target="_blank">Neftci, E. O., Mostafa, H., & Zenke, F., *Surrogate gradient learning in spiking neural networks*, CoRR, *()*,  (2019). </a> [↩](#6c46e273de1ecbecce7f8f1ac7329a57)
