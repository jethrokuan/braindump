+++
title = "Free-Energy Reinforcement Learning"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:55:05+08:00
draft = false
+++

tags
: [Reinforcement Learning ⭐]({{< relref "reinforcement_learning" >}})

This is a framework proposed by Sallans and Hinton in 2004
([Sallans and Hinton, n.d.](#org3a91b95)). The key insight is that a product of experts
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
FERL ([Nakano and Otsuka, n.d.](#org9495b3e)).

## Bibliography {#bibliography}

<a id="org9495b3e"></a>Nakano, Takashi, and Makoto Otsuka. n.d. “Spiking Neural Network Model of Free-Energy-Based Reinforcement Learning” 12 (S1):P244. <https://doi.org/10.1186/1471-2202-12-s1-p244>.

<a id="org3a91b95"></a>Sallans, Brian, and Geoffrey Hinton. n.d. “Reinforcement Learning with Factored States and Actions.” 5:1063–88.
