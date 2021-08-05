+++
title = "Lottery Ticket Hypothesis"
author = ["Jethro Kuan"]
draft = false
+++

The Lottery Ticket hypothesis states that:

> A randomly-initialized, dense neural network contains a subnetwork that is
> initialized such that -- when trained in isolation -- it can match the test
> accuracy of the original network after training for at most the same number of
> iterations.

Traditional literature has shown that a fully trained dense network can be
pruned to fewer parameters without much performance degradation, but it has
impossible to train such a sparse sub-network from scratch. The paper provides
one explanation to this phenomenon:

After pruning, the resultant sub-networks are randomly initialized, resulting in
different training dynamics. If one instead initializes the weights of the
sub-network to the original masked weights, performance can be maintained.

How do we find such a sub-network?


## Iterative Magnitude Pruning (IMP) {#iterative-magnitude-pruning--imp}

1.  Start with dense initialization \\(W\_0\\), and train to convergence to obtain \\(W\_{T\_\*}^{(1)}\\)
2.  Determine the \\(s\\) percent smallest magnitude weights to create a binary mask \\(m^{(1)}\\)
3.  Initialize the network with weights \\(m^{(1)} \cdot W\_0\\), and repeat the pruning process
4.  Halt when the desired sparsity is reached, or when performance drops significantly

IMP was only restricted to small-scale tasks. A more robust pruning method was
required for larger models (e.g. tuning learning rate schedules, LTH with
rewinding).


## Resources {#resources}

Robert Lange provides a great survey and visualization on LTH in [his blog post](https://roberttlange.github.io/posts/2020/06/lottery-ticket-hypothesis/).