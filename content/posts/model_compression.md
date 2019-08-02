+++
title = "Model Compression"
author = ["Jethro Kuan"]
lastmod = 2019-08-02T13:25:59+08:00
draft = false
math = true
+++

## And the Bit Goes Down: Revisiting the Quantization of Neural Networks <a id="56497b51cc79dfdb43c364d93a9978c3" href="#stock19_and_bit_goes_down" title="Stock, Joulin, Gribonval, R\'emi, Graham, J\'egou \&amp; Herv\'e, And the Bit Goes Down: Revisiting the Quantization  of Neural Networks, {CoRR}, v(), (2019).">(Stock et al., 2019)</a> {#and-the-bit-goes-down-revisiting-the-quantization-of-neural-networks}

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


##  {#}

# Bibliography
<a id="stock19_and_bit_goes_down"></a>Stock, P., Joulin, A., Gribonval, R\'emi, Graham, B., & J\'egou, Herv\'e, *And the bit goes down: revisiting the quantization of neural networks*, CoRR, *()*,  (2019).  [↩](#56497b51cc79dfdb43c364d93a9978c3)
