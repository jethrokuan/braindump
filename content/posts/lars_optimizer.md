+++
title = "LARS Optimizer"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:57:13+08:00
draft = false
+++

Layer-wise Adaptive Rate Scaling (LARS) is a [Neural Network Optimizer]({{< relref "nn_optimizer" >}}). The
technique allows [Large Batch Training]({{< relref "large_batch_training" >}}) without significant decrease in accuracy
([You, Gitman, and Ginsburg, n.d.](#org18cafa6)). One of the secondary goals is
[Fast Neural Network Training]({{< relref "fast_nn_training" >}}).

## Implementations {#implementations}

- [pytorch-lars](https://github.com/noahgolmant/pytorch-lars)

## Bibliography {#bibliography}

<a id="org18cafa6"></a>You, Yang, Igor Gitman, and Boris Ginsburg. n.d. “Large Batch Training of Convolutional Networks.” <http://arxiv.org/abs/1708.03888v3>.
