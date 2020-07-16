+++
title = "And the Bit Goes Down: Revisiting the Quantization of Neural Networks"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:55:14+08:00
draft = false
+++

tags
: [Model Compression]({{< relref "model_compression" >}})

paper
: ([Stock et al., n.d.](#orgc719935))

This method minimizes the loss reconstruction error for in-domain
inputs, and does not require any labelled data.

{{< figure src="/ox-hugo/screenshot_2019-08-02_13-07-02.png" >}}

This method exploits the high correlation in the convolutions in
ResNet-like architectures by the use of product quantization (PQ). The
approach here focuses on reconstructing the activations, and not the
weights. This results in better in-domain reconstruction, and does not
require any supervision.

Vector Quantization (VQ) and Product Quantization (PQ) decompose the
high-dimensional space into a cartesian product of subspaces that are
quantized separately. These are typically studied under the context of
nearest neighbour search.

## {#}

## Bibliography {#bibliography}

<a id="orgc719935"></a>Stock, Pierre, Armand Joulin, Rémi Gribonval, Benjamin Graham, and Hervé Jégou. n.d. “And the Bit Goes down: Revisiting the Quantization of Neural Networks.” <http://arxiv.org/abs/1907.05686v2>.
