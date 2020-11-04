+++
title = "Differentiable plasticity: training plastic neural networks with backpropagation"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Machine Learning Papers]({{<relref "ml_papers.md" >}})

paper
: <https://arxiv.org/abs/1804.02464>

## Goal {#goal}

To build networks that are plastic: quick and efficient learning from
experience, inspired by synaptic plasticity. This is to bridge the gap
with biological agents, which are able to learn quickly from prior
experience, mastering environments with changing features.

An alternative to [Meta Learning]({{<relref "meta_learning.md" >}}), synaptic plasticity strengthens and
weakens connections between neurons based on neural activity: whether
they fire together.

Plasticity has traditionally been explored with evolutionary
algorithms, _differential plasticity_ allows for learning such
plasticity updates via backpropagation.

## Key Idea {#key-idea}

We include an additional plastic component for each neuron. The fixed
part contains regular neuronal weights \\(w\_{i,j}\\), while the plastic
part is stored in a _Hebbian trace_ \\(\mathrm{Hebb}\_{i,j}\\).

\begin{equation}
x\_{i,j} = \sigma \left\\{ \sum\_{i \in inputs} w\_{i,j} x_i (t-1) +
\alpha\_{i,j} \mathrm{Hebb}\_{i,j}(t)x\_{i}(t-1) \right\\}
\end{equation}

where \\(\alpha\\) is the plasticity coefficient, governing how much of
the weight is from the plastic component, and \\(\sigma\\) is some
non-linearity.

The Hebbian trace is updated based on Hebbian dynamics:

\begin{equation}
\mathrm{Hebb}\_{i,j}(t+1) = \eta x_i(t-1)x_j(t) + (1 - \eta) \mathrm{Hebb}\_{i,j}(t)
\end{equation}

The Hebbian trace is initialized to zero, at the beginning of each
episode, and is purely a lifetime quantity.

\\(\eta\\) is a weight decay term, to prevent runaway positive feedback on
Hebbian traces. In the absence of input, the Hebbian trace decays to
zero. One can use [Oja's rule](https://en.wikipedia.org/wiki/Oja%27s%5Frule) to prevent such runaway divergences,
while maintaining stable long-term memories in absence of stimulation.
