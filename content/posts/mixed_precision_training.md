+++
title = "Mixed Precision Training"
author = ["Jethro Kuan"]
draft = false
+++

Using numerical formats that have lower precision than the common 32-bit
floating point has several benefits:

1.  They require less memory, lowering the footprint for training and deployment
2.  They require less memory bandwidth, speeding up data transfers
3.  Math operations run faster in reduced precision

Mixed-precision training offers computational speedup by performing operations
in half-precision format, while storing minimal information in single-precision
to retain as much information as possible in critical parts of the network.

The Volta generation of GPUs have Tensor Cores, which provide 8x more throughput
than single-precision math pipelines. Each Tensor Core performs \\(D = A \times
B + C\\), where \\(A\\) and \\(B\\) are half-precision 4x4 matrices, while \\(D\\) and \\(C\\) can
be either half or single-precision matrices.

One caveat is that some networks require their gradient values to be shifted or
scaled to match the accuracy of single-precision training.