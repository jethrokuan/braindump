+++
title = "Options Framework"
author = ["Jethro Kuan"]
lastmod = 2020-05-29T21:02:20+08:00
draft = false
+++

An option is defined as a tuple containing:

1.  An initiation function (precondition)
2.  An internal policy (behaviour)
3.  A termination function (post-condition)

This helps put learning and planning algorithms at the same level of
abstraction. <a id="bfaaf890a52310df11783efa26352d6f" href="#stolle2002learning">(Stolle \& Precup, 2002)</a>

## Models vs Actions {#models-vs-actions}

- models of actions consist of immediate reward and transition
  probability to next state
- models of options consist of reward until termination, and
  (discounted) transition to termination state

They look a lot like value functions, and can use the TD error to
train the model [§td\_learning]({{< relref "td_learning" >}}).

## Related {#related}

- [§generalized\_value\_functions]({{< relref "generalized_value_functions" >}})

# Bibliography

<a id="stolle2002learning" target="_blank">Stolle, M., & Precup, D., _Learning options in reinforcement learning_, In , International Symposium on abstraction, reformulation, and approximation (pp. 212–223) (2002). : .</a> [↩](#bfaaf890a52310df11783efa26352d6f)
