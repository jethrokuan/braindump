+++
title = "Pruning Neural Networks"
author = ["Jethro Kuan"]
draft = false
+++

Pruning is the process of compressing neural networks. This typically involves
setting a particular weight to 0, and freezing it for subsequent training. This
can be easily achieved by multiplying the weights with a pruning mask.


## Why prune neural networks? {#why-prune-neural-networks}

-   Pruning can support generalization, by regularizing over-parameterized functions
-   Pruning reduces memory constraints during inference time, when the resultant
    networks are smaller
-   Pruning reduces energy costs and computations, supporting fast inference and
    deployment on mobile devices


## Considerations of Pruning Algorithms {#considerations-of-pruning-algorithms}

Every pruning algorithm needs to consider 4 fundamental considerations:

1.  **What connectivity structures to prune.** Unstructured pruning does not
    consider the relationship between the pruned weights, while structured
    pruning considers removing weights in groups (e.g. entire neurons). While
    unstructured pruning allows cutting down the number of parameters more
    drastically, it does not provide computational speed up on standard hardware.
2.  **How to rank weights to prune.** What heuristics do we use to decide which
    weights to prune? One common technique is to prune weights that are small, as
    they have smaller contributions to the function fit. More involved techniques
    include learning the pruning masks using gradient-based methods (e.g.
    second-order derivatives).
3.  **When to prune, and how often**. The frequency and part of training to conduct
    pruning is a crucial part of the specification of a pruning algorithm.