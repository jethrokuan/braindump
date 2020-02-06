+++
title = "Free-Energy Reinforcement Learning"
author = ["Jethro Kuan"]
lastmod = 2020-02-06T12:26:51+08:00
draft = false
+++

tags
: [§reinforcement\_learning]({{< relref "reinforcement_learning" >}})

This is a framework proposed by Sallans and Hinton in 2004
<a id="bcefc9142eabe05927aeae8f8d450cbe" href="#sallans04a_ferl">(Sallans \& Hinton, 2004)</a>. The key insight is that a product of experts
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
FERL <a id="b05ffcb18862cf0b95a226a7afa8d36b" href="#nakano11_spikin_neural_networ_model_free">(Takashi Nakano \& Makoto Otsuka, 2011)</a>.

# Bibliography
<a id="sallans04a_ferl" target="_blank">Sallans, B., & Hinton, G., *Reinforcement learning with factored states and actions.*, Journal of Machine Learning Research, *5()*, 1063–1088 (2004). </a> [↩](#bcefc9142eabe05927aeae8f8d450cbe)

<a id="nakano11_spikin_neural_networ_model_free" target="_blank">Nakano, T., & Otsuka, M., *Spiking neural network model of free-energy-based reinforcement learning*, BMC Neuroscience, *12(S1)*, 244 (2011).  http://dx.doi.org/10.1186/1471-2202-12-s1-p244</a> [↩](#b05ffcb18862cf0b95a226a7afa8d36b)
