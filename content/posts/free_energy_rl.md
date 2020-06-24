+++
title = "Free-Energy Reinforcement Learning"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:08:18+08:00
draft = false
+++

tags
: [Reinforcement Learning ⭐]({{< relref "reinforcement_learning" >}})

This is a framework proposed by Sallans and Hinton in 2004
([Sallans and Hinton 2004](#org7c2b1d7)). The key insight is that a product of experts
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
FERL ([Nakano and Otsuka 2011](#orgc8ab679)).

## Bibliography {#bibliography}

<a id="orgc8ab679"></a>Nakano, Takashi, and Makoto Otsuka. 2011. “Spiking Neural Network Model of Free-Energy-Based Reinforcement Learning.” _BMC Neuroscience_ 12 (S1):P244.

<a id="org7c2b1d7"></a>Sallans, Brian, and Geoffrey Hinton. 2004. “Reinforcement Learning with Factored States and Actions.” _Journal of Machine Learning Research_ 5 (August):1063–88.
