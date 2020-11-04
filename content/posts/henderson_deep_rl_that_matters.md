+++
title = "Deep Reinforcement Learning That Matters"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Deep Reinforcement Learning]({{<relref "deep_rl.md" >}}), [Machine Learning Papers]({{<relref "ml_papers.md" >}})

This paper is a comprehensive study of several model-free policy
gradient methods:

1.  Trust Region Policy Optimization (TRPO)
2.  Deep Deterministic Policy Gradients (DDPG)
3.  Proximal Policy Optimization (PPO)
4.  Actor Critic using Kronecker-Factored Trust Region (ACKTR)

## Network Architecture {#network-architecture}

It was shown that network architecture is highly interconnected with
algorithm methodology. For example, using a large network in PPO
required tweaking hyperparameters like trust region clipping. This
suggests the need to design hyperparameter agnostic algorithms.

## Reward Scale {#reward-scale}

Large, and sparse rewards can lead to saturation and inefficiency.
Reward scaling was shown to have large effects, but results were
inconsistent across environments and scaling values. _Is there a more
principled approach?_

## Environments {#environments}

How do the environment properties affect variability in reported RL
algorithm performance? Algorithm performance can vary across
environments, and the best performing algorithm across all
environments is not always clear. It is important to present results
across multiple environments. It is also important to shown the learnt
policy in action. IT is possible that algorithms only optimize local
minima, rather than reaching the desired behaviour.

## Codebases {#codebases}

Small implementation details are not reflected in publications, but
these can have dramatic effect on performance.

## Evaluation Metrics {#evaluation-metrics}

What metrics should an RL algorithm report?

- Average cumulative reward (average returns): misleading, range of
  performance across random seeds and trials unknown
- Maximum reward achieved over a fixed number of timesteps: inadequate
  under high variance

Perhaps one can use bootstrap and significance testing to add
confidence intervals. Some techniques:

### Confidence Bounds {#confidence-bounds}

Obtain a bootstrap estimator by resampling with replacement many times
to generate a statistically relevant mean and confidence bound. TRPO
and PPO are the most stable with small confidence bounds from the bootstrap.

### Power Analysis {#power-analysis}

If we use our sample and give it some uniform lift (e.g. scaling
everything by 1.25), we can run many bootstrap simulations and
determine what percentage of simulations result in statistically
significant values with the lift. If there is a small percentage of
significant values, more trials need to be run.

### Significance {#significance}

In supervised learning, k-folt t-test, and corrected resampling t-test
are some significance metrics used, but these make assumptions about
the underlying data that do not necessarily hold in RL.

## Recomendations {#recomendations}

1.  Find the working hyperparameter set that matches the original
    reported performance
2.  New baseline algorithm implementations should match original
    codebase results if possible
3.  Averaging multiple runs over different random seeds to get better
    insight into algorithm performance
4.  Report _all_ hyperparameters, implementation details, experimental
    setup, and evaluation methods
