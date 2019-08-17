+++
title = "Spiking Neurons"
author = ["Jethro Kuan"]
lastmod = 2019-08-17T11:55:49+08:00
draft = false
math = true
+++

## What are Spiking Neural Networks? {#what-are-spiking-neural-networks}

1.  Generally natural recurrent
2.  Inspired by biological information processing: mimics how the brain
    functions

Models of cortical hierarchies have inspired the architectural
principles of deep neural networks, but at the implementation level
there is only marginally similar to brain-like computation and analog
neural networks.


## What's different between DNNs and SNNs? {#what-s-different-between-dnns-and-snns}

1.  Artificial neural networks are mostly non-linear but continuous

function approximators that operate on a common clock cycle, while
SNNs compute with asynchronous spikes that signal the occurrence of
some characteristic event.


## In what areas are SNN better? {#in-what-areas-are-snn-better}

They exhibit favourable properties similar to brain circuits:

1.  low power consumption
2.  analog computation
3.  fast inference
4.  event-driven processing
5.  online learning
6.  parallelism

Deep SNNs are also most capable of making use of event-based sensors,
that are slowly becoming mature enough for production use. They can
utilize efficient temporal codes in their computations. Typically
sensory information from the outside world is sparse: this leads to
power efficiency.

SNNs also enable pseudo-simultaneous information processing. Even for
multi-layer neural networks, spikes begin to propagate immediately to
higher layers as soon as the lower layer provides sufficient activity.
Initial output spikes are typically composed from incomplete
information.


## How does a SNN work? <a id="4980de9e86c6598545afbb2a4bdd8cb8" href="#pfeiffer18_deep_learn_with_spikin_neuron" title="Michael Pfeiffer \&amp; Thomas Pfeil, Deep Learning With Spiking Neurons: Opportunities  and Challenges, {Frontiers in Neuroscience}, v(nil), nil (2018).">(Michael Pfeiffer \& Thomas Pfeil, 2018)</a> {#how-does-a-snn-work}

Neurons exchange information via spikes, and the information received
depends on:

Firing frequencies
: relative timing of pre and post-synaptic
    spikes, firing patterns

Identity of synapses used
: which neurons are connected, whether
    synapse is inhibitory or excitatory, synaptic strength etc.


## Difficulties on training SNNs {#difficulties-on-training-snns}

Conventional deep learning relies on gradient methods, such as
stochastic gradient descent. These require differentiable activation
functions.

Integrating the timing of spikes requires additional effort.

1.  Binarization of ANNs: Conventional DNNs are trained with binary
    activations, and maintain their synchronous mode of information processing
2.  Conversion from ANNs: Conventional DNNs are trained with
    backpropagation, and then all analog neurons are converted into
    spiking neurons
3.  Training of constrained networks: Before conversion, conventional
    DNN training methods are used together with constraints that model
    the properties of SNNs
4.  Supervised learning with spikes: Direct training of SNNs using
    variations of error backpropagation
5.  Local learning rules at synapses, such as STDP


### Binarization of ANNs {#binarization-of-anns}

Binary networks offer efficient inference, at the cost of slight
performance degradation. The performance benefits come from efficient
multiply-add operations (using XNOR, bit-counting etc.), and low
precision computation.

Non-differentiability of the output of the SNN makes it difficult to
train SNNs with conventional backpropagation methods. Some learning
rules approximate the derivative by smoothing out the membrane
potential as a function of the weights.


### Conversion from ANNs {#conversion-from-anns}

The initial approach was to convert activations of analog neurons into
firing rates of spiking ones. The Neural Engineering Framework also
allows conversion of RBMs into SNNs. Conversion from ANNs provide the
full toolkit of deep learning for training.

However, some ANNs are difficult to convert to SNNs. For example,
negative activations are difficult to convert to firing rates, since
firing rates are always positive. ReLUs are easier to convert, having
activations being only zero or positive.


### Training under SNN constraints {#training-under-snn-constraints}

Constrain-then-train includes constraints from the properties of
spiking neurons during the training process. Conventional ANN learning
methods such as backpropagation are then used to learn the optimal
weights under these constraints.


### Supervised Learning with Spikes {#supervised-learning-with-spikes}

The key for many spike-based learning rules for multi-layer SNNs is to
find a real-valued and almost-everywhere differentiable proxy, on
which backpropagation can be performed. SpikeProp derives a
backpropagation rule for spike times in the output layer. Spike-based
backpropagation methods exist, such as performing gradient descent on
real-valued membrane potentials.


### Local Learning Rules {#local-learning-rules}

From a practical perspective, local learning is desirable as it allows
for hardware-efficient learning. However, supervised error signals are
typically only available in the output layer, and it is unclear how to
propagate the errors to lower layers. Hence, recurrent feedback
connections are introduced to modulate training in these lower layers.

Local learning rules such as Hebbian learning and
Spike-timing-dependent-plasticity (STDP) are have been used to train
competitive networks that are able to do clustering.


## Probabilistic SNNs {#probabilistic-snns}

A probabilistic model defines the outputs of all spiking neurons as
jointly distributed binary random processes. The joint distribution is
differentiable in the synaptic weights, and principled learning
criteria from statistics and information theory such as likelihood and
mutual information apply. The maximization of such criteria do not
require the implementation of the backpropagation mechanism, and often
recover as special cases known biologically plausible algorithms.


## Converting Natural Signals {#converting-natural-signals}

Natural signals can be converted into spiking signals in a few ways:

rate encoding
: amplitudes are converted into the instantaneous
    spiking rate of a neuron

time encoding
: amplitudes are encoded into spike timings

population coding
: amplitudes are encoded into the instantaneous
    firing rates or relative firing times of a subset of neurons


## Graphical Representation {#graphical-representation}

A SNN consists of a network of \\(N\\) spiking neurons. At any time \\(t =
0,1,2, \dots\\) each neouron \\(i\\) outputs a binary signal \\(s\_{i,t} =
\\{0,1\\}\\), with value \\(s\_{i,t} = 1\\) corresponding to a spike emitted at
time \\(t\\). We collect in vector \\(s\_{t} = \left\\( s\_{i,t}: i \in V\\)\\)
the binary signals emitted by all neurons at time \\(t\\), where \\(V\\) is
the set of all neurons. Each neuron \\(i \in V\\) receives the signals
emitted by a subset \\(P\_i\\) of neurons through directed links, known as
synapses. Neurons in a set \\(P\_i\\) are referred to as _pre-synaptic_ for
_post-synaptic_ neuron \\(i\\).

The internal, analog state of each spiking neuron \\(i \in V\\) at time
\\(t\\) is defined by its membrane potential \\(u\_{i,t}\\).


##  {#}

# Bibliography
<a id="pfeiffer18_deep_learn_with_spikin_neuron"></a>Pfeiffer, M., & Pfeil, T., *Deep learning with spiking neurons: opportunities and challenges*, Frontiers in Neuroscience, *12(nil)*,  (2018).  http://dx.doi.org/10.3389/fnins.2018.00774 [↩](#4980de9e86c6598545afbb2a4bdd8cb8)
