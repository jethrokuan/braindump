+++
title = "LARS Optimizer"
author = ["Jethro Kuan"]
draft = false
+++

Layer-wise Adaptive Rate Scaling (LARS) is a [Neural Network Optimizer]({{<relref "nn_optimizer.md#" >}}). The
technique allows [Large Batch Training]({{<relref "large_batch_training.md#" >}}) without significant decrease in accuracy
You, Gitman, and Ginsburg, n.d.. One of the secondary goals is
[Fast Neural Network Training]({{<relref "fast_nn_training.md#" >}}).


## Implementations {#implementations}

-   [pytorch-lars](https://github.com/noahgolmant/pytorch-lars)