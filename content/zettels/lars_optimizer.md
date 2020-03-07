+++
title = "LARS Optimizer"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:26:04+08:00
draft = false
+++

Layer-wise Adaptive Rate Scaling (LARS) is a [§nn\_optimizer]({{< relref "nn_optimizer" >}}). The
technique allows [§large\_batch\_training]({{< relref "large_batch_training" >}}) without significant
decrease in accuracy <a id="a9a05fbe9d6d58498d2551579ed08490" href="#you17_large_batch_train_convol_networ">(You et al., 2017)</a>. One
of the secondary goals is [§fast\_nn\_training]({{< relref "fast_nn_training" >}}).


## Implementations {#implementations}

-   [pytorch-lars](https://github.com/noahgolmant/pytorch-lars)

# Bibliography
<a id="you17_large_batch_train_convol_networ" target="_blank">You, Y., Gitman, I., & Ginsburg, B., *Large batch training of convolutional networks*, CoRR, *()*,  (2017). </a> [↩](#a9a05fbe9d6d58498d2551579ed08490)
