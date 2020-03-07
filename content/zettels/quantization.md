+++
title = "Quantization"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:26:22+08:00
draft = false
+++

tags
: [Model Compression]({{< relref "model_compression" >}}), [Machine Learning]({{< relref "machine_learning" >}})

Quantization refers to techniques for performing computations and
storing tensors at lower bitwidths than floating point precision.

Quantization is useful in reducing model size, and memory
requirements.

Pytorch supports two libraries for quantization:

-   [FBGEMM](https://github.com/pytorch/FBGEMM)
-   [QNNPACK](https://github.com/pytorch/QNNPACK)


## Questions {#questions}

-   Can we quantize [§spiking\_neural\_networks]({{< relref "spiking_neural_networks" >}})? They already do binary
    precision computation, what about the weights?
