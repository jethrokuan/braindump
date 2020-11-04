+++
title = "Quantization"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Model Compression]({{<relref "model_compression.md" >}}), [Machine Learning]({{<relref "machine_learning.md" >}})

Quantization refers to techniques for performing computations and
storing tensors at lower bitwidths than floating point precision.

Quantization is useful in reducing model size, and memory
requirements.

Pytorch supports two libraries for quantization:

- [FBGEMM](https://github.com/pytorch/FBGEMM)
- [QNNPACK](https://github.com/pytorch/QNNPACK)

## Questions {#questions}

- Can we quantize [Spiking Neural Networks]({{<relref "spiking_neural_networks.md" >}})? They already do binary
  precision computation, what about the weights?
