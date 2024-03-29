+++
title = "Parameter Servers"
author = ["Jethro Kuan"]
draft = false
+++

Parameter servers are used in the distributed training of neural networks. Both
GPUs and CPUs can be used to compute gradients independently, which are sent to
a central parameter server. The parameter server then uses an optimizer such as
SGD or Adam, computing the gradient updates.

Parameter servers offer better performance over all-reduce because of its
ability to utilize CPUs (unlike [All-reduce]({{<relref "all_reduce.md#" >}})), but in practice the performance
leaves much to be desired.