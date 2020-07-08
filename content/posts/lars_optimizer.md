+++
title = "LARS Optimizer"
author = ["Jethro Kuan"]
lastmod = 2020-07-08T14:55:41+08:00
draft = false
+++

### Backlinks {#backlinks}

- [chen20\_simpl\_framew\_contr\_learn\_visual\_repres: A simple framework for contrastive learning of visual representations]({{< relref "chen20_simpl_framew_contr_learn_visual_repres" >}})

Layer-wise Adaptive Rate Scaling (LARS) is a [Neural Network Optimizer]({{< relref "nn_optimizer" >}}). The
technique allows [Large Batch Training]({{< relref "large_batch_training" >}}) without significant decrease in accuracy
([You, Gitman, and Ginsburg, n.d.](#org108a3d8)). One of the secondary goals is
[Fast Neural Network Training]({{< relref "fast_nn_training" >}}).

## Implementations {#implementations}

- [pytorch-lars](https://github.com/noahgolmant/pytorch-lars)

## Bibliography {#bibliography}

<a id="org108a3d8"></a>You, Yang, Igor Gitman, and Boris Ginsburg. n.d. “Large Batch Training of Convolutional Networks.” <http://arxiv.org/abs/1708.03888v3>.
