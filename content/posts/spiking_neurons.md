+++
title = "Spiking Neurons"
author = ["Jethro Kuan"]
lastmod = 2019-10-30T13:03:38+08:00
draft = false
math = true
+++

## The Spiking Neuron {#the-spiking-neuron}

dendrites
: input device

soma
: central processing unit (non-linear processing step). If the
    total input exceeds a certain threshold, an output signal is generated

axon
: output device, delivering signal to other neurons

synapse
: junction between two neurons

post/presynaptic cells
: If a neuron is sending a signal across a
    synapse, the sending neuron is the presynaptic cell, and the
    receiving neuron is the postsynaptic cell

{{< figure src="/ox-hugo/screenshot_2019-08-19_09-49-28.png" >}}

action potentials/spikes
: short electrical pulses, typically of
    amplitude about 100mV and a duration of 1-2ms

spike train
: a chain of action potentials (sequence of stereotyped
    events) that occur at intervals. Since all spikes of
    a given neuron look the same, the form of the spike
    does not matter: the number and timing of the spikes
    encode the information.

absolute refractory period
: minimal distance between two spikes.
    Spike are well separated, and it is impossible to excite a second
    spike within this refractory period.

relative refractory period
: follows the absolute refractory
    period -- a period where it is difficult to excite an action
    potential

We define for presynaptic neuron \\(j\\), \\(\epsilon\_{ij}(t) = u\_{i}(t) -
u\_{rest}\\). For a few input spikes, the membrane potential responds
roughly linearly to the input spikes:

\begin{equation}
  u\_i{t} = \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t\_j^{(f)}) + u\_{rest}
\end{equation}

If \\(u\_i(t)\\) reaches threshold \\(\vartheta\\) from below, neuron \\(i\\) fires
a spike.

From the above, we can define the Spike Response Model describing the momentary
value of the membrane potential of neuron \\(i\\):

\begin{equation}
  u\_i{t} = \eta (t - \hat{t\_i}) + \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t\_j^{(f)}) + u\_{rest}
\end{equation}

where \\(\hat{t\_i}\\) is the last firing time of neuron \\(i\\).

We refer to moment when a given neuron emits an action potential as
the firing time of that neuron. We denote the firing times of neuron
\\(i\\) by \\(t\_i^{(f)}\\) where \\(f = 1,2,\dots\\) is the label of the spike.
Then we formally denote the spike train of a neuron \\(i\\) as the
sequence of firing times:

\begin{equation}
  S\_i(t) = \sum\_{f} \delta\left( t - t\_i^{(f)} \right)
\end{equation}

where \\(\delta(x)\\) is the Dirac \\(\delta\\) function with \\(\delta(x) = 0\\)
for \\(x \ne 0\\) and \\(\int\_{-\infty}^{\infty} \delta(x)dx = 1\\). Spikes
are thus reduced to points in time.

SRM only takes into account the most recent spike, and cannot capture
adaptation.


### Neuronal Coding {#neuronal-coding}

How do spike trains encode information? At present, a definite answer
to this question is not known.

-    Temporal Coding

    Traditionally, it had been thought that information was contained in
    the mean firing rate of a neuron:

    \begin{equation}
      v = \frac{n\_{sp}(T)}{T}
    \end{equation}

    measured over some time window \\(T\\), counting the number of the spikes
    \\(n\\). The primary objection to this is that if we need to compute a
    temporal average to transfer information, then our reaction times
    would be a lot slower.

    From the point of view of rate coding, spikes are a convenient wa of
    transmitting the analog output variable \\(v\\) over long spikes. The
    optimal scheme is to transmit the value of rate \\(v\\) by a regular spike
    train at intervals \\(\frac{1}{v}\\), allowing the rate to be reliably
    measured after 2 spikes. Therefore, irregularities in real spike
    trains must be considered as noise.

-    Rate as spike density (average over several runs)

    this definition works for both stationary and time-dependent stimuli.
    The same stimulation sequence is repeated several times, and the
    neuronal response is reported in a peri-stimulus-time histogram
    (PSTH). We can obtain the spike density of the PSTH by:

    \begin{equation}
      \rho(t) =  \frac{1}{\Delta t} \frac{n\_K(t; t + \Delta t)}{K}
    \end{equation}

    where \\(K\\) is the number of repetitions of the experiment. We can
    smooth the results to get a continuous rate.

    The problem with this scheme is that it cannot be the decoding scheme
    of the brain. This measure makes sense if there is always a population
    of neurons with the same stimulus. This leads to population coding.

-    Rate as population activity (average over several neurons)

    This is a simple extension of the spike density measure, but adding
    activity across a population of neurons. Population activity varies
    rapidly and can reflect changes in the stimulus nearly
    instantaneously, an advantage over temporal coding. However, it
    requires a homogeneous population of neurons, which is hardly
    realistic.


### Spike Codes {#spike-codes}

These are coding strategies based on spike timing.

-    Time-to-first-spike

    A neuron which fires shortly after the reference signal (an abrupt
    input, for example) may signal a strong stimulation, and vice-versa.
    This estimate has been successfully used in an interpretation of
    neuronal activity in primate motor cortex.

    The argument is that the brain does not have time to evaluate more
    than one spike per neuron per processing step, and hence the first
    spike should contain most of the relevant information.

-    Phase

    Oscillations are common in the olfactory system, and other areas of
    the brain. Neuronal spike trains could then encode information in the
    phase of a pulse, with respect to the background oscillation.

-    Correlations and Synchrony

    Synchrony between any pairs of neurons could signify special events
    and convey information not contained in the firing rate of the
    neurons.


### Spikes or Rates? {#spikes-or-rates}

A code based on time-to-first-spike is consistent with a rate code: if
the mean firing rate of a neuron is high, then the time to first spike
is expected to occur early. Stimulus reconstruction with a linear
kernel can be seen as a special instance of a rate code. It is
difficult to draw a clear borderline between pulse and rate codes. The
key consideration in using any code is the ability for the system to
react quickly to changes in the input. If pulse coding is relevant,
information processing in the brain must be based on spiking neuron
models. For stationary input, spiking neuron models can be reduced to
rate models, but in other cases, this reduction is not possible.


## What are Spiking Neural Networks? {#what-are-spiking-neural-networks}

1.  Generally naturally recurrent
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
    spikes, and the neuronal firing patterns

Identity of synapses used
: which neurons are connected, whether
    the synapse is inhibitory or excitatory, synaptic strength etc.


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


## Graphical Representation {#graphical-representation}

A SNN consists of a network of \\(N\\) spiking neurons. At any time \\(t =
0,1,2, \dots\\) each neouron \\(i\\) outputs a binary signal \\(s\_{i,t} =
\\{0,1\\}\\), with value \\(s\_{i,t} = 1\\) corresponding to a spike emitted at
time \\(t\\). We collect in vector \\(s\_{t} = \left( s\_{i,t}: i \in V \right)\\)
the binary signals emitted by all neurons at time \\(t\\), where \\(V\\) is
the set of all neurons. Each neuron \\(i \in V\\) receives the signals
emitted by a subset \\(P\_i\\) of neurons through directed links, known as
synapses. Neurons in a set \\(P\_i\\) are referred to as _pre-synaptic_ for
_post-synaptic_ neuron \\(i\\).

The internal, analog state of each spiking neuron \\(i \in V\\) at time
\\(t\\) is defined by its membrane potential \\(u\_{i,t}\\).


## Long short-term memory and learning-to-learn in networks of spiking neurons <a id="4917683f67ccf52378654f00a9c9a141" href="#bellec18_long_short_term_memor_learn" title="Bellec, Salaj, Subramoney, Anand, Legenstein \&amp; Maass, Long Short-Term Memory and Learning-To-Learn in  Networks of Spiking Neurons, {CoRR}, v(), (2018).">(Bellec et al., 2018)</a> {#long-short-term-memory-and-learning-to-learn-in-networks-of-spiking-neurons}

**Key contribution**: Inclusion of adapting neurons into recurrent SNN
models (RSNNs) increases computing and learning capability. By using a
learning algorithm that combines BPTT with a rewiring algorithm that
optimizes the network architecture, performance comes close to LSTM
ANNs.

**Model composition**: LSNNs consist of a populaction \\(R\\) of
integrate-and-fire (LIF) neurons (excitatory and inhibitory), and a
second population \\(A\\) of LIF excitatory neurons whose excitability is
temporarily reduced through preceding firing activity. \\(R\\) and \\(A\\)
receive spike trains from a population \\(X\\) of external input neurons.
Results of computations are read out by a population \\(Y\\) of external
linear readout neurons.

{{< figure src="/ox-hugo/screenshot_2019-08-20_09-44-11.png" >}}

BPTT is done by replacing the non-continuous membrane potential  with
a pseudo derivative that smoothly increases from 0 to 1.


### Learning to Learn LSNNs {#learning-to-learn-lsnns}

> LSTM networks are especially suited for L2L since they can
> accommodate two levelsof learning and representation of learned
> insight: Synaptic connections and weights can encode,on a higher
> level, a learning algorithm and prior knowledge on a large time-scale.
> The short-termmemory of an LSTM network can accumulate, on a lower
> level of learning, knowledge during thecurrent learning task


## Gradient Descent for Spiking Neural Networks <a id="7cd889cc568ca0abd92ccb282abe3ae7" href="#huh17_gradien_descen_spikin_neural_networ" title="Huh \&amp; Sejnowski, Gradient Descent for Spiking Neural Networks, {CoRR}, v(), (2017).">(Huh \& Sejnowski, 2017)</a> {#gradient-descent-for-spiking-neural-networks}

key idea: Replacing the non-differentiable model for membrane
potential:

\begin{equation}
  \tau \dot{s} = -s + \sum\_{k} \delta (t - t\_k)
\end{equation}

with

\begin{equation}
\tau \dot{s} = -s + g \dot{v}
\end{equation}

for some gate function \\(g\\), and \\(\dot{v}\\) is the time derivative of
the pre-synaptic membrane voltage.

Exact gradient calculations can be done with BPTT, or real-time
recurrent learning. The resultant gradients are similar to
reward-modulated spike-time dependent plasticity.


## <span class="org-todo todo TODO">TODO</span> Surrogate Gradient Learning in Spiking Neural Networks <a id="6c46e273de1ecbecce7f8f1ac7329a57" href="#neftci19_surrog_gradien_learn_spikin_neural_networ" title="Neftci, Mostafa, Zenke \&amp; Friedemann, Surrogate Gradient Learning in Spiking Neural  Networks, {CoRR}, v(), (2019).">(Neftci et al., 2019)</a> {#surrogate-gradient-learning-in-spiking-neural-networks}


## <span class="org-todo todo TODO">TODO</span> Theories of Error Back-Propagation in the Brain <a id="87673c771a23a8ad0a1301cb565d0484" href="#whittington19_theor_error_back_propag_brain" title="James Whittington \&amp; Rafal Bogacz, Theories of Error Back-Propagation in the Brain, {Trends in Cognitive Sciences}, v(3), 235-250 (2019).">(James Whittington \& Rafal Bogacz, 2019)</a> {#theories-of-error-back-propagation-in-the-brain}


## [Temporal coding in spiking neural networks with alpha synaptic function]({{< relref "temporal-coding-comsa" >}}) {#temporal-coding-in-spiking-neural-networks-with-alpha-synaptic-function--presentations-temporal-coding-comsa-dot-md}


## STDP {#stdp}

STDP is a biologically inspired long-term plasticity model, in which
each synapse is given a weight \\(0 \le w \le w\_{maxx}\\) , characterizing its
strength, and its change depends on the exact moments \\(t\_{pre}\\) of
presynaptic spikes and \\(t\_{post}\\) of postsynaptic spikes:

\begin{equation}
  \Delta w=\left\\{\begin{array}{l}{-\alpha \lambda \cdot \exp
                    \left(-\frac{t\_{\mathrm{pre}}-t\_{\mathrm{post}}}{\tau\_{-}}\right),
                    \text {if } t\_{\mathrm{pre}}-t\_{\mathrm{post}}>0}
                    \\ {\lambda \cdot \exp
                    \left(-\frac{t\_{\mathrm{post}}-t\_{\mathrm{pre}}}{\tau\_{+}}\right),
                    \text {if }
                    t\_{\mathrm{pre}}-t\_{\mathrm{post}}<0}\end{array}\right.
\end{equation}

This additive STDP rule requires also an additional constraint that
explicitly prevents the weight from falling below 0 or exceeding the
maximum value of 1.

<a id="5c8bcfe50f375b189e564db4d78fe1a3" href="#sboev18_spikin_neural_networ_reinf_learn" title="Alexander Sboev, Danila Vlasov, Roman Rybka, \&amp; Alexey Serenko, Spiking Neural Network Reinforcement Learning Method  Based on Temporal Coding and Stdp, {Procedia Computer Science}, v(nil), 458-463 (2018).">(Alexander Sboev et al., 2018)</a>


## Loihi {#loihi}

-   Describes SNNs as a weighted, directed graph \\( G(V, E)\\) where the
    vertices \\(V\\) represent compartments, and the weighted edges \\(E\\)
    represent synapses.
-   Both compartments and synapses maintain internal state and
    communicate only via discrete spike impulses.
-   Uses a variant of the CUBA model for the neuron model, which is
    defined as a set of first-order differential equation using traces,
    evaluated at discrete algorithmic time steps.

Learning must follow the sum-of-products form:

\begin{equation}
  Z(t) = Z(t-1) + \sum\_m S\_m \prod\_n F\_n
\end{equation}

where \\(Z\\) is the synaptic state variable defined for the source
destination neuron pair being updated, and \\(F-N\\) may be a synaptic
state variable, a pre-synaptic trace or a post-synaptic trace defined
for the neuron pair.


## Generating Spike Trains {#generating-spike-trains}


### Poisson Model <a id="15fef7332c23705120f84cb94df313f0" href="#heeger2000poisson" title="Heeger, Poisson model of spike generation, {Handout, University of Standford}, v(), 1--13 (2000).">(Heeger, 2000)</a> {#poisson-model}

Independent spike hypothesis: the generation of each spike is
independent of all other spikes. If the underlying instantaneous
firing rate \\(r\\) is constant over time, it is a homogeneous Poisson
process.

We can write:

\begin{equation}
  P(\textrm{1 spike during } \delta t) \approx r \delta t
\end{equation}

We divide time into short, discrete intervals \\(\delta t\\). Then, we
generate a sequence of random numbers \\(x[i]\\) uniformly between 0
and 1. For each interval, if \\(x[i] \le r \delta t\\), generate a spike.


##  {#}

# Bibliography
<a id="pfeiffer18_deep_learn_with_spikin_neuron"></a>Pfeiffer, M., & Pfeil, T., *Deep learning with spiking neurons: opportunities and challenges*, Frontiers in Neuroscience, *12(nil)*,  (2018).  http://dx.doi.org/10.3389/fnins.2018.00774 [↩](#4980de9e86c6598545afbb2a4bdd8cb8)

<a id="bellec18_long_short_term_memor_learn"></a>Bellec, G., Salaj, D., Subramoney, A., Legenstein, R., & Maass, W., *Long short-term memory and learning-to-learn in networks of spiking neurons*, CoRR, *()*,  (2018).  [↩](#4917683f67ccf52378654f00a9c9a141)

<a id="huh17_gradien_descen_spikin_neural_networ"></a>Huh, D., & Sejnowski, T. J., *Gradient descent for spiking neural networks*, CoRR, *()*,  (2017).  [↩](#7cd889cc568ca0abd92ccb282abe3ae7)

<a id="neftci19_surrog_gradien_learn_spikin_neural_networ"></a>Neftci, E. O., Mostafa, H., & Zenke, F., *Surrogate gradient learning in spiking neural networks*, CoRR, *()*,  (2019).  [↩](#6c46e273de1ecbecce7f8f1ac7329a57)

<a id="whittington19_theor_error_back_propag_brain"></a>Whittington, J. C., & Bogacz, R., *Theories of error back-propagation in the brain*, Trends in Cognitive Sciences, *23(3)*, 235–250 (2019).  http://dx.doi.org/10.1016/j.tics.2018.12.005 [↩](#87673c771a23a8ad0a1301cb565d0484)

<a id="sboev18_spikin_neural_networ_reinf_learn"></a>Sboev, A., Vlasov, D., Rybka, R., & Serenko, A., *Spiking neural network reinforcement learning method based on temporal coding and stdp*, Procedia Computer Science, *145(nil)*, 458–463 (2018).  http://dx.doi.org/10.1016/j.procs.2018.11.107 [↩](#5c8bcfe50f375b189e564db4d78fe1a3)

<a id="heeger2000poisson"></a>Heeger, D., *Poisson model of spike generation*, Handout, University of Standford, *5()*, 1–13 (2000).  [↩](#15fef7332c23705120f84cb94df313f0)
