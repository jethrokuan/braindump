+++
title = "Optimal Control and Planning"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:26:30+08:00
draft = false
+++

How can we make decisions if we know the dynamics of the environment?


## Stochastic optimization {#stochastic-optimization}

Stochastic optimization for open-loop planning:

We wish to choose \\(a\_1, \dots a\_T = \mathrm{argmax}\_{a\_1, \dots a\_T}
J(a\_1, \dots, a\_T)\\) for some objective \\(J\\).


### Guess and Check {#guess-and-check}

An extremely simple method, that's parallelizable:

1.  pick \\(A\_1, \dots A\_N\\) from some distribution
2.  choose \\(A\_i\\) based on \\(\mathrm{argmax} J(A\_i)\\).


### Cross-entropy Method (CEM) {#cross-entropy-method--cem}

1.  pick \\(A\_1, \dots A\_N\\) from some initial distribution \\(p(A)\\)
2.  Evaluate \\(J(A\_1), \dots J(A\_N)\\)
3.  pick the elites \\(A\_{i1}, \dots A\_{im}\\) with the highest value
4.  fit distribution $P(A) to the elites

With continuous inputs, a multi-variate normal distribution is a
common choice for \\(p(A)\\). In the discrete Case, Monte-Carlo tree
search ([§mcts]({{< relref "mcts" >}})) is typically used.


## Using Derivatives {#using-derivatives}

-   Differentiable Dynamic Programming (DDP)
-   LQR


## Backlinks {#backlinks}

-   [Human Behaviour As Optimal Control]({{< relref "human_behaviour_as_optimal_control" >}})
-   [Control As Inference]({{< relref "control_as_inference" >}})
