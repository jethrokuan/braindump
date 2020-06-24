+++
title = "LARS Optimizer"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:09:55+08:00
draft = false
+++

Layer-wise Adaptive Rate Scaling (LARS) is a [Neural Network Optimizer]({{< relref "nn_optimizer" >}}). The
technique allows [Large Batch Training]({{< relref "large_batch_training" >}}) without significant decrease in accuracy
([You, Gitman, and Ginsburg 2017](#org8ec6c87)). One of the secondary goals is
[Fast Neural Network Training]({{< relref "fast_nn_training" >}}).

## Implementations {#implementations}

- [pytorch-lars](https://github.com/noahgolmant/pytorch-lars)

## Bibliography {#bibliography}

<a id="org8ec6c87"></a>You, Yang, Igor Gitman, and Boris Ginsburg. 2017. “Large Batch Training of Convolutional Networks.” _CoRR_.
