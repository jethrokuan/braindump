+++
title = "Free-Energy Reinforcement Learning"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Reinforcement Learning ⭐]({{<relref "reinforcement_learning.md#" >}})

This is a framework proposed by Sallans and Hinton in 2004
Sallans and Hinton, n.d.. The key insight is that a product of experts
allows for model parameters to be learnt efficiently, because values
and derivatives for the product of experts can be efficiently computed.

{{< figure src="/ox-hugo/screenshot2020-01-16_23-15-12_.png" caption="Figure 1: Free-energy RL" >}}

The weights of the RBM are tweaked such that the free energy of a
network configuration equals to the reward signal for the given
state-action pair.

An action is selected by performing Gibbs sampling, holding the state
variables fixed. The action with the lowest free energy is produced,
corresponding to the highest expected reward for the given state.

Spiking neural networks can be used to implement RBMs, hence used for
FERL Nakano and Otsuka, n.d..