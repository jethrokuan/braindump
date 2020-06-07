+++
title = "Markovian Assumption"
author = ["Jethro Kuan"]
lastmod = 2020-06-07T17:27:01+08:00
draft = false
+++

## Backlinks {#backlinks}

- [Reinforcement Learning ⭐]({{< relref "reinforcement_learning" >}})
- [Kalman Filter]({{< relref "kalman_filter" >}})
- [Policy Gradients]({{< relref "policy_gradients" >}})
- [Bayes Filter]({{< relref "bayes_filter" >}})

**Key idea**: the past and future data are independent, conditioned on the
present.

The Markovian assumption can be violated in many ways:

1.  Unmodelled dynamics in the environment
2.  Inaccuracies in probabilistic models
3.  Approximation errors when using approximate representations of
    belief functions
