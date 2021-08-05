+++
title = "Options Framework"
author = ["Jethro Kuan"]
draft = false
+++

An option is defined as a tuple containing:

1.  An initiation function (precondition)
2.  An internal policy (behaviour)
3.  A termination function (post-condition)

This helps put learning and planning algorithms at the same level of
abstraction. ([Stolle and Precup, n.d.](#org5a5b303))


## Models vs Actions {#models-vs-actions}

-   models of actions consist of immediate reward and transition
    probability to next state
-   models of options consist of reward until termination, and
    (discounted) transition to termination state

They look a lot like value functions, and can use the TD error to train the
model ([Temporal Difference Learning]({{<relref "td_learning.md#" >}})).


## Related {#related}

-   [Generalized Value Functions]({{<relref "generalized_value_functions.md#" >}})


## Bibliography {#bibliography}

<a id="org5a5b303"></a>Stolle, Martin, and Doina Precup. n.d. “Learning Options in Reinforcement Learning.” In _International Symposium on Abstraction, Reformulation, and Approximation_, 212–23. Springer.