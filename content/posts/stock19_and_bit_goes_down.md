+++
title = "And the Bit Goes Down: Revisiting the Quantization of Neural Networks"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T20:19:01+08:00
draft = false
+++

tags
: [Model Compression]({{< relref "model_compression" >}})

paper
: <a id="56497b51cc79dfdb43c364d93a9978c3" href="#stock19_and_bit_goes_down">(Stock et al., 2019)</a>

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

# Bibliography

<a id="stock19_and_bit_goes_down" target="_blank">Stock, P., Joulin, A., Gribonval, R\'emi, Graham, B., & J\'egou, Herv\'e, _And the bit goes down: Revisiting the quantization of neural networks_, CoRR, _()_, (2019). </a> [↩](#56497b51cc79dfdb43c364d93a9978c3)
