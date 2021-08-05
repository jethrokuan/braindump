+++
title = "LARS Optimizer"
author = ["Jethro Kuan"]
draft = false
+++

Layer-wise Adaptive Rate Scaling (LARS) is a [Neural Network Optimizer]({{<relref "nn_optimizer.md#" >}}). The
technique allows [Large Batch Training]({{<relref "large_batch_training.md#" >}}) without significant decrease in accuracy
([You, Gitman, and Ginsburg, n.d.](#orgfbb7fa2)). One of the secondary goals is
[Fast Neural Network Training]({{<relref "fast_nn_training.md#" >}}).


## Implementations {#implementations}

-   [pytorch-lars](https://github.com/noahgolmant/pytorch-lars)


## Bibliography {#bibliography}

<a id="orgfbb7fa2"></a>You, Yang, Igor Gitman, and Boris Ginsburg. n.d. “Large Batch Training of Convolutional Networks.” <http://arxiv.org/abs/1708.03888v3>.