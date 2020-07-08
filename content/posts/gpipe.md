+++
title = "Gpipe"
author = ["Jethro Kuan"]
lastmod = 2020-07-08T14:55:00+08:00
draft = false
+++

Gpipe is a scalable pipeline parallelism library published by Google
Brain, which allows for efficient training of large, memory-consuming
models ([Huang et al., n.d.](#orgd9f7ca5)). Pipeline parallelism allows for
[Fast Neural Network Training]({{< relref "fast_nn_training" >}}).

In Gpipe, neural networks with sequential layers are partitioned
across accelerators. The pipeline parallelism divides each input
mini-batch into smaller micro-batches, enabling different accelerators
to work on different micro-batches simultaneously. This is especially
useful in [Large Batch Training]({{< relref "large_batch_training" >}}).

{{< figure src="/ox-hugo/screenshot2020-02-05_23-05-00_.png" >}}

## Bibliography {#bibliography}

<a id="orgd9f7ca5"></a>Huang, Yanping, Youlong Cheng, Ankur Bapna, Orhan Firat, Mia Xu Chen, Dehao Chen, HyoukJoong Lee, et al. n.d. “Gpipe: Efficient Training of Giant Neural Networks Using Pipeline Parallelism.” <http://arxiv.org/abs/1811.06965v5>.
