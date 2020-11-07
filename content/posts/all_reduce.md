+++
title = "All-reduce"
author = ["Jethro Kuan"]
draft = false
+++

All-reduce is a architecture for the distributed machine learning training.

In a single iteration of all-reduce, gradients are computed by GPUs
independently across different machines, and the gradients are aggregated by the
all-reduce primitive.

The all-reduce architecture is bandwidth-optimal in the absence of CPUs, but
with additional CPU and bandwidth, this optimality no longer holds.

## How it Works {#how-it-works}

Here we describe the operation of _Ring_, the most popular all-reduce algorithm.

An all-reduce operation can be split into 2 phases. First, the _all-scatter_
operation splits \\(M\\) bytes into \\(n\\) parts, and uses \\(n\\) rings with different
starting and ending point to reduce the \\(n\\) parts\$. Each node sends
\\(\frac{(n-1)M}{n}\\) traffic. While each of the other \\(n-1\\) rings sends \\(M/n\\)
bytes.

In the _all-gather_ phase, each node broadcasts its reduced part to the other
\\(n-1\\) nodes using a ring.
