+++
title = "Spiking Neurons (Literature Review)"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:09:39+08:00
draft = false
+++

### Backlinks {#backlinks}

- [Spiking Neurons (Literature Review)]({{< relref "spiking_neurons_lit_review" >}})

tags
: [Spiking Neurons (Literature Review)]({{< relref "spiking_neurons_lit_review" >}})

## Introduction to Spiking Neural Networks <a name="sec:snn"></a> {#introduction-to-spiking-neural-networks}

While the project is equal part reinforcement learning and spiking
neural networks, reinforcement learning is a popular field and has
been extensively covered by researchers worldwide
([Ivanov and D’yakonov 2019](#org8003fa8); [Li 2018](#orgf866c55)).
Hence, I have chosen instead to review the literature around spiking
neural networks.

### The Generations of Neural Networks {#the-generations-of-neural-networks}

Neural network models can be classified into three generations,
according to their computational units: perceptrons, non-linear
units, and spiking neurons ([Maass 1997](#org2816710)).

Perceptrons can be composed to produce a variety of models, including
Boltzmann machines and Hopfield networks. Non-linear units are
currently the most widely used computational unit, responsible for the
explosion of progress in machine learning research, in particular, the
success of deep learning. These units traditionally apply
differentiable, non-linear activation functions such across a weighted
sum of input values.

There are two reasons second-generation computational units have seen
so much success. First, the computational power of these units is
greater than that of first-generation neural networks. Networks built
with second-generation computational units with one hidden layer are
universal approximators for any continuous function with a compact
domain and range ([Cybenko 1989](#org5febac1)). Second, networks built with these
units are trainable with well-researched gradient-based methods, such
as backpropagation.

The third generation of neural networks use computational units called
spiking neurons. Much like our biological neurons, spiking neurons are
connected to each other at synapses, receiving incoming signals at the
dendrites and sending spikes to other neurons via the axon. Each
computational unit stores some state: in particular, it stores its
membrane potential at any point in time. Rather than fire at each
propagation cycle, these computational units fire only when their
individual membrane potentials crosses its firing threshold. A simple
spiking neuron model is given in <spike_model>.

From this section onwards, we shall term second-generation neural
networks Artificial Neural Networks (ANNs), and third-generation
neural networks Spiking Neural Networks (SNNs).

### A Spiking Neuron Model <a name="spike_model"></a> {#a-spiking-neuron-model}

In spiking neural networks, neurons exchange information via spikes,
and the information received depends on:

Firing frequencies
: The relative timing of pre and post-synaptic
spikes, and neuronal firing patterns

Identity of synapses used
: Which neurons are connected, whether their
synapses are inhibitory or excitatory, and synaptic strength

Each neuron has a corresponding model that encapsulates its state: the
current membrane potential. As with the mammalian brain, incoming
spikes increase the value of membrane potential. The membrane
potential eventually decays to resting potential in the absence of
spikes. These dynamics are often captured via first-order differential
equations. Here we define the Spike Response Model (SRM), a simple but
widely-used model describing the momentary value of a neuron \\(i\\).

We define for presynaptic neuron \\(j\\), \\(\epsilon\_{ij}(t) = u\_{i}(t) -
u\_{\text{rest}}\\). For a few input spikes, the membrane potential responds
roughly linearly to the input spikes:

\begin{equation}
u_i{t} = \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t_j^{(f)}) + u\_{\text{rest}}
\end{equation}

SRM describes the membrane potential of neuron \\(i\\) as:

\begin{equation}
u_i{t} = \eta (t - \hat{t_i}) + \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t_j^{(f)}) + u\_{\text{rest}}
\end{equation}

where \\(\hat{t_i}\\) is the last firing time of neuron \\(i\\).

We refer to moment when a given neuron emits an action potential as
the firing time of that neuron. We denote the firing times of neuron
\\(i\\) by \\(t_i^{(f)}\\) where \\(f = 1,2,\dots\\) is the label of the spike.
Then we formally denote the spike train of a neuron \\(i\\) as the
sequence of firing times:

\begin{equation}
S_i(t) = \sum\_{f} \delta\left( t - t_i^{(f)} \right)
\end{equation}

where \\(\delta(x)\\) is the Dirac-delta function with \\(\delta(x) = 0\\)
for \\(x \ne 0\\) and \\(\int\_{-\infty}^{\infty} \delta(x)dx = 1\\). Spikes
are thus reduced to points in time.

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
u_i{t} = \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t_j^{(f)}) + u\_{rest}
\end{equation}

If \\(u_i(t)\\) reaches threshold \\(\vartheta\\) from below, neuron \\(i\\) fires
a spike.

From the above, we can define the Spike Response Model describing the momentary
value of the membrane potential of neuron \\(i\\):

\begin{equation}
u_i{t} = \eta (t - \hat{t_i}) + \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t_j^{(f)}) + u\_{rest}
\end{equation}

where \\(\hat{t_i}\\) is the last firing time of neuron \\(i\\).

We refer to moment when a given neuron emits an action potential as
the firing time of that neuron. We denote the firing times of neuron
\\(i\\) by \\(t_i^{(f)}\\) where \\(f = 1,2,\dots\\) is the label of the spike.
Then we formally denote the spike train of a neuron \\(i\\) as the
sequence of firing times:

\begin{equation}
S_i(t) = \sum\_{f} \delta\left( t - t_i^{(f)} \right)
\end{equation}

where \\(\delta(x)\\) is the Dirac \\(\delta\\) function with \\(\delta(x) = 0\\)
for \\(x \ne 0\\) and \\(\int\_{-\infty}^{\infty} \delta(x)dx = 1\\). Spikes
are thus reduced to points in time.

SRM only takes into account the most recent spike, and cannot capture
adaptation.

### Neuronal Coding {#neuronal-coding}

How do spike trains encode information? At present, a definite answer
to this question is not known.

<!--list-separator-->

- Temporal Coding

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

<!--list-separator-->

- Rate as spike density (average over several runs)

  this definition works for both stationary and time-dependent stimuli.
  The same stimulation sequence is repeated several times, and the
  neuronal response is reported in a peri-stimulus-time histogram
  (PSTH). We can obtain the spike density of the PSTH by:

  \begin{equation}
  \rho(t) = \frac{1}{\Delta t} \frac{n_K(t; t + \Delta t)}{K}
  \end{equation}

  where \\(K\\) is the number of repetitions of the experiment. We can
  smooth the results to get a continuous rate.

  The problem with this scheme is that it cannot be the decoding scheme
  of the brain. This measure makes sense if there is always a population
  of neurons with the same stimulus. This leads to population coding.

<!--list-separator-->

- Rate as population activity (average over several neurons)

  This is a simple extension of the spike density measure, but adding
  activity across a population of neurons. Population activity varies
  rapidly and can reflect changes in the stimulus nearly
  instantaneously, an advantage over temporal coding. However, it
  requires a homogeneous population of neurons, which is hardly
  realistic.

### Spike Codes {#spike-codes}

These are coding strategies based on spike timing.

<!--list-separator-->

- Time-to-first-spike

  A neuron which fires shortly after the reference signal (an abrupt
  input, for example) may signal a strong stimulation, and vice-versa.
  This estimate has been successfully used in an interpretation of
  neuronal activity in primate motor cortex.

  The argument is that the brain does not have time to evaluate more
  than one spike per neuron per processing step, and hence the first
  spike should contain most of the relevant information.

<!--list-separator-->

- Phase

  Oscillations are common in the olfactory system, and other areas of
  the brain. Neuronal spike trains could then encode information in the
  phase of a pulse, with respect to the background oscillation.

<!--list-separator-->

- Correlations and Synchrony

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

### Motivating Spiking Neural Networks {#motivating-spiking-neural-networks}

Since second-generation neural networks have excellent performance,
why bother with spiking neural networks? In this section, we motivate
spiking neural networks from various perspectives.

<!--list-separator-->

- Information Encoding

  To directly compare ANNs and SNNs, one can consider the real-valued
  outputs of ANNs to be the firing rate of a spiking neuron in steady
  state. In fact, such rate coding has been used to explain
  computational processes in the brain ([Pfeiffer and Pfeil 2018](#org5c6c7f7)). Spiking
  neuron models encode information beyond the average firing rate: these
  models also utilize the relative timing between spikes
  ([Gütig 2014](#orgba3147d)), or spike phases (in-phase or
  out-of-phase). These time-dependent codes are termed temporal codes,
  and play an important role in biology. First, research has shown that
  different actions are taken based on single spikes
  ([Stemmler 1996](#org8475ef3)). Second, relying on the average firing rate
  would greatly increase the latency of the brain, and our brain often
  requires decision-making long before several spikes are accumulated.
  It has also been successfully demonstrated that temporal coding
  achieves competitive empirical performance on classification tasks for
  both generated datasets, as well as image datasets like MNIST and
  CIFAR ([Comsa et al. 2019](#org685fad5)).

<!--list-separator-->

- Biological Plausibility <a name="bioplausible"></a>

  A faction of the machine learning and neurobiology community strives
  for emulation of the biological brain. There are several
  incompatibilities between ANNs and the current state of neurobiology
  that are not easily reconciliated.

  First, neurons in ANNs communicate via continuous-valued activations.
  This is contrary to neurobiological research, which shows that
  communication between biological neurons communicate by broadcasting
  spike trains: trains of action potentials to downstream neurons. The
  spikes are to a first-order approximation of uniform amplitude, unlike
  the continuous-valued activations of ANNs.

  Second, backpropagation as a learning procedure also presents
  incompatibilities with the biological brain ([Tavanaei et al. 2019](#org6b2242c)).
  Consider the chain rule in backpropagation:

  \begin{equation} \label{chainrule}
  \delta\_{j}^{\mu}=g^{\prime}\left(a\_{j}^{\mu}\right) \sum\_{k} w\_{k j} \delta\_{k}^{\mu}
  \end{equation}

  \\(\delta\_{j}^{\mu}\\) and \\(\delta\_{k}^{\mu}\\) denote the partial
  derivatives of the cost function for input pattern \\(\mu\\) with respect
  to the net input to some arbitrary unit \\(j\\) or \\(k\\). Unit \\(j\\) projects
  feed-forward connections to the set of units indexed by \\(k\\).
  \\(g(\cdot)\\) is the activation function applied to the net input of unit
  \\(j\\), denoted \\(a_j^{\mu}\\), \\(w\_{kj}\\) are the feedforward weights
  projecting from unit \\(j\\) to the set of units indexed by \\(k\\).

  The chain rule formulation presents two problems. First, the
  gradients \\(g'(\cdot)\\) requires derivatives, but \\(g(\cdot)\\) in spiking
  neurons is represented by sum of Dirac delta functions, for which
  derivatives do not exist. Second, the expression \\(\sum\_{k} w\_{k j}
  \delta\_{k}^{\mu}\\) uses feedforward weights in a feedback fashion. This
  mean that backpropagation is only possible in the presence of
  symmetric feedback weights, but these do not exist in the brain. In
  addition, during backpropagation the error assignment for each neuron
  is computed using non-local information.

<!--list-separator-->

- Neuromorphic Hardware <a name="neuromorphic"></a>

  In a traditional Von Neumann architecture, the logic core operates on
  data fetched sequentially from memory. In contrast, in neuromorphic
  chips both computation and memory are distributed across computational
  units that are connected via synapses. The neuronal architecture and
  parameters hence play a key role in information representation and
  define the computations that are performed.

  It has also been observed that spike-trains in the mammalian brain are
  often sparse in time, suggesting that timing and relative timings of
  spikes encode large amounts of information. Neuromorphic chips
  implement this same sparse, low-precision communication protocol
  between neurons on the chip, and by offering the same asynchronous,
  event-based parallelism paradigm that the brain uses, are able to
  perform certain workloads with much less power than Von Neumann chips.

  These integrated circuits are typically programmed with spiking neural
  networks. Examples of such chips include IBM's TrueNorth
  ([Merolla et al. 2014](#orgf2f6a16)) and Intel's Loihi ([Davies et al. 2018](#org03b3fef)). Because
  spiking neural networks have not yet been successfully trained on many
  tasks, neuromorphic chips has seen little practical use. These chips
  have only recently been successfully used in robotic navigation
  ([Tang, Shah, and Michmizos 2019](#orga656e22)), and solving graph problems by manual construction of the
  network graph ([Severa et al. 2016](#org2fe14ce)).

### Training Spiking Neural Networks {#training-spiking-neural-networks}

As explained in <neuromorphic>, it is desirable to train spiking
neural networks to perform arbitrary tasks, utilizing power-efficient
neuromorphic chips that break the Von Neumann bottleneck. We classify
the training strategies by their usage of gradients, and discuss
certain optimization techniques.

<!--list-separator-->

- Non-gradient based methods

  Spiking neurons communicate via spikes, hence, unlike ANNs, gradients
  are non-existent. In addition, backpropagation is not biologically
  plausible (see <bioplausible>). This motivates the use of
  plasticity-based methods and evolutionary strategies for training
  SNNs.

  One category of learning rules used in SNNs are local learning rules.
  These rules include Hebbian learning (neurons that fire together wire
  together), and its extension: the spike-timing-dependent-plasticity
  rule (STDP). Inspired by experiments in neuroscience, central to these
  learning rules is the theme that neuron spike ordering and their
  relative timings encode information. STDP adjusts the strength of
  connections between neurons using the relative timing of a neuron's
  output and its input potentials (hence, spike-timing dependent).

  In machine learning terminology, the weights of the synapses are
  adjusted according to fixed rules for each training example. Each
  synapse is given a weight \\(0 \le w \le w\_{max}\\) , characterizing its
  strength, and its change depends on the exact moments \\(t\_{pre}\\) of
  pre-synaptic spikes and \\(t\_{post}\\) of post-synaptic spikes
  ([Sboev et al. 2018](#org41a4d68)):

  \begin{equation}
  \Delta w=\left\\{\begin{array}{l}{-\alpha \lambda \cdot \exp
  \left(-\frac{t\_{\mathrm{pre}}-t\_{\mathrm{post}}}{\tau\_{-}}\right),
  \text {if } t\_{\mathrm{pre}}-t\_{\mathrm{post}}>0}
  \\ {\lambda \cdot \exp
  \left(-\frac{t\_{\mathrm{post}}-t\_{\mathrm{pre}}}{\tau\_{+}}\right),
  \text {if }
  t\_{\mathrm{pre}}-t\_{\mathrm{post}}<0}\end{array}\right.
  \end{equation}

  where \\(\tau\_{+}\\) and \\(\tau\_{-}\\) are time constants. \\(\tau\_{+} = 16.8ms\\)
  and \\(\tau\_{-} = 33.7ms\\) are reasonable approximations obtained
  experimentally.

  There are several libraries like BindsNET
  ([Hazan et al. 2018](#orgc48b52f)) that simulate SNNs on Von Neumann
  computers implementing these rules. Recent attempts have been made to
  combine Reinforcement Learning and STDP: both in solving RL problems
  ([Hazan et al. 2018](#orgc48b52f)), and using the reinforcement learning
  framework to train SNN
  ([Bing et al. 2019](#orgd283c70); [Lee et al. 2018](#orgb14d605)). However, SNNs
  trained using the STDP learning rule have yet to achieve comparable
  performance compared to ANNs on relatively simple datasets like MNIST
  ([Tavanaei et al. 2019](#org6b2242c)).

<!--list-separator-->

- Gradient-based methods

  Performance is important for practical applications, and
  gradient-based training methods such as backpropagation has shown
  competitive performance. It is thus desirable to train spiking neural
  networks with these gradient-based methods.

  There are several problems with spike-compatible gradient-based methods. First,
  most of these methods cannot train neurons in the hidden layers: they can only
  train neurons at the final layer, that receive the desired target output pattern
  ([Urbanczik and Senn 2009](#org509403d)). Second, the discontinuous, binary
  nature of spiking output needs to be addressed. For example, SpikeProp
  approximates the membrane threshold function at a local area with a linear
  function, introducing gradients and computing the exact formulae for error
  backpropagation for synaptic weights and spike times ([Bohte, Kok, and Poutré 2000](#orgf7f5932)). Others have
  modified the threshold function with a gate function ([Huh and Sejnowski 2018](#org1185e92)),
  used the alpha transfer function to derive gradient update rules
  ([Comsa et al. 2019](#org685fad5)), and approximate the dirac-delta
  spikes with a probability density function ([Shrestha and Orchard 2018](#org07300a3)).

  Another approach is converting trained ANN models into SNNs
  ([Rueckauer et al. 2016](#org6f4dfe8)). Common ANN layers such as
  softmax, batch normalization and max-pooling layers have their corresponding
  spiking counterparts.

  Equilibrium Propagation was recently proposed to solve the
  neurobiological incompatibilities of backpropagation
  ([Scellier and Bengio 2017](#orgaf2a9c1)). Because the gradients are defined only
  in terms of local perturbations, the synaptic updates correspond to
  the standard form of STDP. The propagated signal encodes the gradients
  of a well-defined objective function on energy-based models, where the
  goal is to minimize the energy of the model. To resolve the issue of
  communication using binary-valued signals, step-size annealing was
  used to train spiking neural networks with Equilibrium Propagation
  ([O’Connor, Gavves, and Welling 2019](#org2d5538b)).

<!--list-separator-->

- Future Research Areas

  A nascent area is local learning on neuromorphic chips. Thus far
  spiking neural networks are simulated and trained before deployment on
  a neuromorphic chip. In Intel's Loihi chip, each core contains a
  learning engine that can update synaptic weights using the 4-bit
  microcode-programmed learning rules that are associated with that
  synapse. This opens up areas for online learning.

  Neural network models can be classified into three generations,
  according to their computational units: perceptrons, non-linear
  units, and spiking neurons ([Maass 1997](#org2816710)).

  Perceptrons can be composed to produce a variety of models, including
  Boltzmann machines and Hopfield networks. Non-linear units are
  currently the most widely used computational unit, responsible for the
  explosion of progress in machine learning research, in particular, the
  success of deep learning. These units traditionally apply
  differentiable, non-linear activation functions such across a weighted
  sum of input values.

  There are two reasons second-generation computational units have seen
  so much success. First, the computational power of these units is
  greater than that of first-generation neural networks. Networks built
  with second-generation computational units with one hidden layer are
  universal approximators for any continuous function with a compact
  domain and range ([Cybenko 1989](#org5febac1)). Second, networks built with these
  units are trainable with well-researched gradient-based methods, such
  as backpropagation.

  The third generation of neural networks use computational units called
  spiking neurons. Much like our biological neurons, spiking neurons are
  connected to each other at synapses, receiving incoming signals at the
  dendrites and sending spikes to other neurons via the axon. Each
  computational unit stores some state: in particular, it stores its
  membrane potential at any point in time. Rather than fire at each
  propagation cycle, these computational units fire only when their
  individual membrane potentials crosses its firing threshold. A simple
  spiking neuron model is given in <spike_model>.

  From this section onwards, we shall term second-generation neural
  networks Artificial Neural Networks (ANNs), and third-generation
  neural networks Spiking Neural Networks (SNNs).

### A Spiking Neuron Model <a name="spike_model"></a> {#a-spiking-neuron-model}

In spiking neural networks, neurons exchange information via spikes,
and the information received depends on:

Firing frequencies
: The relative timing of pre and post-synaptic
spikes, and neuronal firing patterns

Identity of synapses used
: Which neurons are connected, whether their
synapses are inhibitory or excitatory, and synaptic strength

Each neuron has a corresponding model that encapsulates its state: the
current membrane potential. As with the mammalian brain, incoming
spikes increase the value of membrane potential. The membrane
potential eventually decays to resting potential in the absence of
spikes. These dynamics are often captured via first-order differential
equations. Here we define the Spike Response Model (SRM), a simple but
widely-used model describing the momentary value of a neuron \\(i\\).

We define for presynaptic neuron \\(j\\), \\(\epsilon\_{ij}(t) = u\_{i}(t) -
u\_{\text{rest}}\\). For a few input spikes, the membrane potential responds
roughly linearly to the input spikes:

\begin{equation}
u_i{t} = \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t_j^{(f)}) + u\_{\text{rest}}
\end{equation}

SRM describes the membrane potential of neuron \\(i\\) as:

\begin{equation}
u_i{t} = \eta (t - \hat{t_i}) + \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t_j^{(f)}) + u\_{\text{rest}}
\end{equation}

where \\(\hat{t_i}\\) is the last firing time of neuron \\(i\\).

We refer to moment when a given neuron emits an action potential as
the firing time of that neuron. We denote the firing times of neuron
\\(i\\) by \\(t_i^{(f)}\\) where \\(f = 1,2,\dots\\) is the label of the spike.
Then we formally denote the spike train of a neuron \\(i\\) as the
sequence of firing times:

\begin{equation}
S_i(t) = \sum\_{f} \delta\left( t - t_i^{(f)} \right)
\end{equation}

where \\(\delta(x)\\) is the Dirac-delta function with \\(\delta(x) = 0\\)
for \\(x \ne 0\\) and \\(\int\_{-\infty}^{\infty} \delta(x)dx = 1\\). Spikes
are thus reduced to points in time.

### Motivating Spiking Neural Networks {#motivating-spiking-neural-networks}

Since second-generation neural networks have excellent performance,
why bother with spiking neural networks? In this section, we motivate
spiking neural networks from various perspectives.

<!--list-separator-->

- Information Encoding

  To directly compare ANNs and SNNs, one can consider the real-valued
  outputs of ANNs to be the firing rate of a spiking neuron in steady
  state. In fact, such rate coding has been used to explain
  computational processes in the brain ([Pfeiffer and Pfeil 2018](#org5c6c7f7)). Spiking
  neuron models encode information beyond the average firing rate: these
  models also utilize the relative timing between spikes
  ([Gütig 2014](#orgba3147d)), or spike phases (in-phase or
  out-of-phase). These time-dependent codes are termed temporal codes,
  and play an important role in biology. First, research has shown that
  different actions are taken based on single spikes
  ([Stemmler 1996](#org8475ef3)). Second, relying on the average firing rate
  would greatly increase the latency of the brain, and our brain often
  requires decision-making long before several spikes are accumulated.
  It has also been successfully demonstrated that temporal coding
  achieves competitive empirical performance on classification tasks for
  both generated datasets, as well as image datasets like MNIST and
  CIFAR ([Comsa et al. 2019](#org685fad5)).

<!--list-separator-->

- Biological Plausibility <a name="bioplausible"></a>

  A faction of the machine learning and neurobiology community strives
  for emulation of the biological brain. There are several
  incompatibilities between ANNs and the current state of neurobiology
  that are not easily reconciliated.

  First, neurons in ANNs communicate via continuous-valued activations.
  This is contrary to neurobiological research, which shows that
  communication between biological neurons communicate by broadcasting
  spike trains: trains of action potentials to downstream neurons. The
  spikes are to a first-order approximation of uniform amplitude, unlike
  the continuous-valued activations of ANNs.

  Second, backpropagation as a learning procedure also presents
  incompatibilities with the biological brain ([Tavanaei et al. 2019](#org6b2242c)).
  Consider the chain rule in backpropagation:

  \begin{equation} \label{chainrule}
  \delta\_{j}^{\mu}=g^{\prime}\left(a\_{j}^{\mu}\right) \sum\_{k} w\_{k j} \delta\_{k}^{\mu}
  \end{equation}

  \\(\delta\_{j}^{\mu}\\) and \\(\delta\_{k}^{\mu}\\) denote the partial
  derivatives of the cost function for input pattern \\(\mu\\) with respect
  to the net input to some arbitrary unit \\(j\\) or \\(k\\). Unit \\(j\\) projects
  feed-forward connections to the set of units indexed by \\(k\\).
  \\(g(\cdot)\\) is the activation function applied to the net input of unit
  \\(j\\), denoted \\(a_j^{\mu}\\), \\(w\_{kj}\\) are the feedforward weights
  projecting from unit \\(j\\) to the set of units indexed by \\(k\\).

  The chain rule formulation presents two problems. First, the
  gradients \\(g'(\cdot)\\) requires derivatives, but \\(g(\cdot)\\) in spiking
  neurons is represented by sum of Dirac delta functions, for which
  derivatives do not exist. Second, the expression \\(\sum\_{k} w\_{k j}
  \delta\_{k}^{\mu}\\) uses feedforward weights in a feedback fashion. This
  mean that backpropagation is only possible in the presence of
  symmetric feedback weights, but these do not exist in the brain. In
  addition, during backpropagation the error assignment for each neuron
  is computed using non-local information.

<!--list-separator-->

- Neuromorphic Hardware <a name="neuromorphic"></a>

  In a traditional Von Neumann architecture, the logic core operates on
  data fetched sequentially from memory. In contrast, in neuromorphic
  chips both computation and memory are distributed across computational
  units that are connected via synapses. The neuronal architecture and
  parameters hence play a key role in information representation and
  define the computations that are performed.

  It has also been observed that spike-trains in the mammalian brain are
  often sparse in time, suggesting that timing and relative timings of
  spikes encode large amounts of information. Neuromorphic chips
  implement this same sparse, low-precision communication protocol
  between neurons on the chip, and by offering the same asynchronous,
  event-based parallelism paradigm that the brain uses, are able to
  perform certain workloads with much less power than Von Neumann chips.

  These integrated circuits are typically programmed with spiking neural
  networks. Examples of such chips include IBM's TrueNorth
  ([Merolla et al. 2014](#orgf2f6a16)) and Intel's Loihi ([Davies et al. 2018](#org03b3fef)). Because
  spiking neural networks have not yet been successfully trained on many
  tasks, neuromorphic chips has seen little practical use. These chips
  have only recently been successfully used in robotic navigation
  ([Tang, Shah, and Michmizos 2019](#orga656e22)), and solving graph problems by manual construction of the
  network graph ([Severa et al. 2016](#org2fe14ce)).

### Training Spiking Neural Networks {#training-spiking-neural-networks}

As explained in <neuromorphic>, it is desirable to train spiking
neural networks to perform arbitrary tasks, utilizing power-efficient
neuromorphic chips that break the Von Neumann bottleneck. We classify
the training strategies by their usage of gradients, and discuss
certain optimization techniques.

<!--list-separator-->

- Non-gradient based methods

  Spiking neurons communicate via spikes, hence, unlike ANNs, gradients
  are non-existent. In addition, backpropagation is not biologically
  plausible (see <bioplausible>). This motivates the use of
  plasticity-based methods and evolutionary strategies for training
  SNNs.

  One category of learning rules used in SNNs are local learning rules.
  These rules include Hebbian learning (neurons that fire together wire
  together), and its extension: the spike-timing-dependent-plasticity
  rule (STDP). Inspired by experiments in neuroscience, central to these
  learning rules is the theme that neuron spike ordering and their
  relative timings encode information. STDP adjusts the strength of
  connections between neurons using the relative timing of a neuron's
  output and its input potentials (hence, spike-timing dependent).

  In machine learning terminology, the weights of the synapses are
  adjusted according to fixed rules for each training example. Each
  synapse is given a weight \\(0 \le w \le w\_{max}\\) , characterizing its
  strength, and its change depends on the exact moments \\(t\_{pre}\\) of
  pre-synaptic spikes and \\(t\_{post}\\) of post-synaptic spikes
  ([Sboev et al. 2018](#org41a4d68)):

  \begin{equation}
  \Delta w=\left\\{\begin{array}{l}{-\alpha \lambda \cdot \exp
  \left(-\frac{t\_{\mathrm{pre}}-t\_{\mathrm{post}}}{\tau\_{-}}\right),
  \text {if } t\_{\mathrm{pre}}-t\_{\mathrm{post}}>0}
  \\ {\lambda \cdot \exp
  \left(-\frac{t\_{\mathrm{post}}-t\_{\mathrm{pre}}}{\tau\_{+}}\right),
  \text {if }
  t\_{\mathrm{pre}}-t\_{\mathrm{post}}<0}\end{array}\right.
  \end{equation}

  where \\(\tau\_{+}\\) and \\(\tau\_{-}\\) are time constants. \\(\tau\_{+} = 16.8ms\\)
  and \\(\tau\_{-} = 33.7ms\\) are reasonable approximations obtained
  experimentally.

  There are several libraries like BindsNET
  ([Hazan et al. 2018](#orgc48b52f)) that simulate SNNs on Von Neumann
  computers implementing these rules. Recent attempts have been made to
  combine Reinforcement Learning and STDP: both in solving RL problems
  ([Hazan et al. 2018](#orgc48b52f)), and using the reinforcement learning
  framework to train SNN
  ([Bing et al. 2019](#orgd283c70); [Lee et al. 2018](#orgb14d605)). However, SNNs
  trained using the STDP learning rule have yet to achieve comparable
  performance compared to ANNs on relatively simple datasets like MNIST
  ([Tavanaei et al. 2019](#org6b2242c)).

<!--list-separator-->

- Gradient-based methods

  Performance is important for practical applications, and
  gradient-based training methods such as backpropagation has shown
  competitive performance. It is thus desirable to train spiking neural
  networks with these gradient-based methods.

  There are several problems with spike-compatible gradient-based
  methods. First, most of these methods cannot train neurons in the
  hidden layers: they can only train neurons at the final layer, that
  receive the desired target output pattern
  ([Urbanczik and Senn 2009](#org509403d); [Lee, Delbruck, and Pfeiffer 2016](#org1089a23)).
  Second, the discontinuous, binary nature of spiking output needs to be
  addressed. For example, SpikeProp approximates the membrane
  threshold function at a local area with a linear function, introducing
  gradients and computing the exact formulae for error backpropagation
  for synaptic weights and spike times ([Bohte, Kok, and Poutré 2000](#orgf7f5932)). Others have
  modified the threshold function with a gate function
  ([Huh and Sejnowski 2018](#org1185e92)), used the alpha transfer function to derive
  gradient update rules ([Comsa et al. 2019](#org685fad5)),
  and approximate the dirac-delta spikes with a probability density
  function ([Shrestha and Orchard 2018](#org07300a3)).

  Another approach is converting trained ANN models into SNNs
  ([Rueckauer et al. 2016](#org6f4dfe8)). Common ANN layers such
  as softmax, batch normalization and max-pooling layers have their
  corresponding spiking counterparts.

  Equilibrium Propagation was recently proposed to solve the
  neurobiological incompatibilities of backpropagation
  ([Scellier and Bengio 2017](#orgaf2a9c1)). Because the gradients are defined only
  in terms of local perturbations, the synaptic updates correspond to
  the standard form of STDP. The propagated signal encodes the gradients
  of a well-defined objective function on energy-based models, where the
  goal is to minimize the energy of the model. To resolve the issue of
  communication using binary-valued signals, step-size annealing was
  used to train spiking neural networks with Equilibrium Propagation
  ([O’Connor, Gavves, and Welling 2019](#org2d5538b)).

<!--list-separator-->

- Future Research Areas

  A nascent area is local learning on neuromorphic chips. Thus far
  spiking neural networks are simulated and trained before deployment on
  a neuromorphic chip. In Intel's Loihi chip, each core contains a
  learning engine that can update synaptic weights using the 4-bit
  microcode-programmed learning rules that are associated with that
  synapse. This opens up areas for online learning.

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
emitted by a subset \\(P_i\\) of neurons through directed links, known as
synapses. Neurons in a set \\(P_i\\) are referred to as _pre-synaptic_ for
_post-synaptic_ neuron \\(i\\).

The internal, analog state of each spiking neuron \\(i \in V\\) at time
\\(t\\) is defined by its membrane potential \\(u\_{i,t}\\).

## Long short-term memory and learning-to-learn in networks of spiking neurons ([Bellec et al. 2018](#org9725f66)) {#long-short-term-memory-and-learning-to-learn-in-networks-of-spiking-neurons--bellec-et-al-dot-2018--org9725f66}

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

BPTT is done by replacing the non-continuous membrane potential with
a pseudo derivative that smoothly increases from 0 to 1.

### Learning to Learn LSNNs {#learning-to-learn-lsnns}

> LSTM networks are especially suited for L2L since they can
> accommodate two levelsof learning and representation of learned
> insight: Synaptic connections and weights can encode,on a higher
> level, a learning algorithm and prior knowledge on a large time-scale.
> The short-termmemory of an LSTM network can accumulate, on a lower
> level of learning, knowledge during thecurrent learning task

## Gradient Descent for Spiking Neural Networks {#gradient-descent-for-spiking-neural-networks}

([Huh and Sejnowski 2018](#org1185e92))
key idea: Replacing the non-differentiable model for membrane
potential:

\begin{equation}
\tau \dot{s} = -s + \sum\_{k} \delta (t - t_k)
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

## <span class="org-todo todo TODO">TODO</span> Surrogate Gradient Learning in Spiking Neural Networks ([Neftci, Mostafa, and Zenke 2019](#org8cf5468)) {#surrogate-gradient-learning-in-spiking-neural-networks--neftci-mostafa-and-zenke-2019--org8cf5468}

## <span class="org-todo todo TODO">TODO</span> Theories of Error Back-Propagation in the Brain ([Whittington and Bogacz 2019](#orgc6654c4)) {#theories-of-error-back-propagation-in-the-brain--whittington-and-bogacz-2019--orgc6654c4}

## [Temp Coding with Alpha Synaptic Function]({{< relref "comsa2019_temp_coding" >}}) {#temp-coding-with-alpha-synaptic-function--comsa2019-temp-coding-dot-md}

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

([Sboev et al. 2018](#org41a4d68))

## Loihi {#loihi}

- Describes SNNs as a weighted, directed graph \\( G(V, E)\\) where the
  vertices \\(V\\) represent compartments, and the weighted edges \\(E\\)
  represent synapses.
- Both compartments and synapses maintain internal state and
  communicate only via discrete spike impulses.
- Uses a variant of the CUBA model for the neuron model, which is
  defined as a set of first-order differential equation using traces,
  evaluated at discrete algorithmic time steps.

Learning must follow the sum-of-products form:

\begin{equation}
Z(t) = Z(t-1) + \sum_m S_m \prod_n F_n
\end{equation}

where \\(Z\\) is the synaptic state variable defined for the source
destination neuron pair being updated, and \\(F-N\\) may be a synaptic
state variable, a pre-synaptic trace or a post-synaptic trace defined
for the neuron pair.

## Generating Spike Trains {#generating-spike-trains}

### Poisson Model ([Heeger 2000](#org57be6b7)) {#poisson-model--heeger-2000--org57be6b7}

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

## Bibliography {#bibliography}

<a id="org9725f66"></a>Bellec, Guillaume, Darjan Salaj, Anand Subramoney, Robert Legenstein, and Wolfgang Maass. 2018. “Long Short-Term Memory and Learning-to-Learn in Networks of Spiking Neurons.” _CoRR_.

<a id="orgd283c70"></a>Bing, Zhenshan, Ivan Baumann, Zhuangyi Jiang, Kai Huang, Caixia Cai, and Alois Knoll. 2019. “Supervised Learning in SNN via Reward-Modulated Spike-Timing-Dependent Plasticity for a Target Reaching Vehicle.” _Frontiers in Neurorobotics_ 13:18.

<a id="orgf7f5932"></a>Bohte, Sander, Joost Kok, and Johannes Poutré. 2000. “SpikeProp: Backpropagation for Networks of Spiking Neurons.,” 48:419–24. ESANN.

<a id="org685fad5"></a>Comsa, Iulia M., Krzysztof Potempa, Luca Versari, Thomas Fischbacher, Andrea Gesmundo, and Jyrki Alakuijala. 2019. “Temporal Coding in Spiking Neural Networks with Alpha Synaptic Function.” _CoRR_.

<a id="org5febac1"></a>Cybenko, G. 1989. “Approximation by Superpositions of a Sigmoidal Function.” _Mathematics of Control, Signals and Systems_ 2 (4):303–14.

<a id="org03b3fef"></a>Davies, Mike, Narayan Srinivasa, Tsung-Han Lin, Gautham Chinya, Yongqiang Cao, Sri Harsha Choday, Georgios Dimou, et al. 2018. “Loihi: A Neuromorphic Manycore Processor with on-Chip Learning.” _IEEE Micro_ 38 (1). IEEE:82–99.

<a id="orgba3147d"></a>Gütig, Robert. 2014. “To Spike, or When to Spike?” _Current Opinion in Neurobiology_ 25 (nil):134–39.

<a id="orgc48b52f"></a>Hazan, Hananel, Daniel J. Saunders, Hassaan Khan, Devdhar Patel, Darpan T. Sanghavi, Hava T. Siegelmann, and Robert Kozma. 2018. “BindsNET: A Machine Learning-Oriented Spiking Neural Networks Library in Python.” _Frontiers in Neuroinformatics_ 12:89.

<a id="org57be6b7"></a>Heeger, David. 2000. “Poisson Model of Spike Generation.” _Handout, University of Standford_ 5:1–13.

<a id="org1185e92"></a>Huh, Dongsung, and Terrence J Sejnowski. 2018. “Gradient Descent for Spiking Neural Networks.” In _Advances in Neural Information Processing Systems 31_, edited by S. Bengio, H. Wallach, H. Larochelle, K. Grauman, N. Cesa-Bianchi, and R. Garnett, 1433–43. Curran Associates, Inc.

<a id="org8003fa8"></a>Ivanov, Sergey, and Alexander D’yakonov. 2019. “Modern Deep Reinforcement Learning Algorithms.” _CoRR_.

<a id="orgb14d605"></a>Lee, Chankyu, Priyadarshini Panda, Gopalakrishnan Srinivasan, and Kaushik Roy. 2018. “Training Deep Spiking Convolutional Neural Networks with STDP-Based Unsupervised Pre-Training Followed by Supervised Fine-Tuning.” _Frontiers in Neuroscience_ 12:435.

<a id="org1089a23"></a>Lee, Jun Haeng, Tobi Delbruck, and Michael Pfeiffer. 2016. “Training Deep Spiking Neural Networks Using Backpropagation.” _Frontiers in Neuroscience_ 10:508.

<a id="orgf866c55"></a>Li, Yuxi. 2018. “Deep Reinforcement Learning.” _CoRR_.

<a id="org2816710"></a>Maass, Wolfgang. 1997. “Networks of Spiking Neurons: The Third Generation of Neural Network Models.” _Neural Networks_ 10 (9):1659–71.

<a id="orgf2f6a16"></a>Merolla, Paul A., John V. Arthur, Rodrigo Alvarez-Icaza, Andrew S. Cassidy, Jun Sawada, Filipp Akopyan, Bryan L. Jackson, et al. 2014. “A Million Spiking-Neuron Integrated Circuit with a Scalable Communication Network and Interface.” _Science_ 345 (6197). American Association for the Advancement of Science:668–73.

<a id="org8cf5468"></a>Neftci, Emre O., Hesham Mostafa, and Friedemann Zenke. 2019. “Surrogate Gradient Learning in Spiking Neural Networks.” _CoRR_.

<a id="org2d5538b"></a>O’Connor, Peter, Efstratios Gavves, and Max Welling. 2019. “Training a Spiking Neural Network with Equilibrium Propagation.” In _Proceedings of Machine Learning Research_, edited by Kamalika Chaudhuri and Masashi Sugiyama, 89:1516–23. Proceedings of Machine Learning Research. PMLR.

<a id="org5c6c7f7"></a>Pfeiffer, Michael, and Thomas Pfeil. 2018. “Deep Learning with Spiking Neurons: Opportunities and Challenges.” _Frontiers in Neuroscience_ 12. Frontiers Media SA.

<a id="org6f4dfe8"></a>Rueckauer, Bodo, Iulia-Alexandra Lungu, Yuhuang Hu, and Michael Pfeiffer. 2016. “Theory and Tools for the Conversion of Analog to Spiking Convolutional Neural Networks.” _CoRR_.

<a id="org41a4d68"></a>Sboev, Alexander, Danila Vlasov, Roman Rybka, and Alexey Serenko. 2018. “Spiking Neural Network Reinforcement Learning Method Based on Temporal Coding and Stdp.” _Procedia Computer Science_ 145 (nil):458–63.

<a id="orgaf2a9c1"></a>Scellier, Benjamin, and Yoshua Bengio. 2017. “Equilibrium Propagation: Bridging the Gap Between Energy-Based Models and Backpropagation.” _Frontiers in Computational Neuroscience_ 11:24.

<a id="org2fe14ce"></a>Severa, William, Ojas Parekh, Kristofor D. Carlson, Conrad D. James, and James B. Aimone. 2016. “Spiking Network Algorithms for Scientific Computing.” _2016 IEEE International Conference on Rebooting Computing (ICRC)_, 1–8.

<a id="org07300a3"></a>Shrestha, Sumit Bam, and Garrick Orchard. 2018. “SLAYER: Spike Layer Error Reassignment in Time.” In _Advances in Neural Information Processing Systems 31_, edited by S. Bengio, H. Wallach, H. Larochelle, K. Grauman, N. Cesa-Bianchi, and R. Garnett, 1412–21. Curran Associates, Inc.

<a id="org8475ef3"></a>Stemmler, Martin. 1996. “A Single Spike Suffices: The Simplest Form of Stochastic Resonance in Model Neurons.” _Network: Computation in Neural Systems_ 7 (4):687–716.

<a id="orga656e22"></a>Tang, Guangzhi, Arpit Shah, and Konstantinos P. Michmizos. 2019. “Spiking Neural Network on Neuromorphic Hardware for Energy-Efficient Unidimensional Slam.” _CoRR_.

<a id="org6b2242c"></a>Tavanaei, Amirhossein, Masoud Ghodrati, Saeed Reza Kheradpisheh, Timothée Masquelier, and Anthony Maida. 2019. “Deep Learning in Spiking Neural Networks.” _Neural Networks_ 111:47–63.

<a id="org509403d"></a>Urbanczik, Robert, and Walter Senn. 2009. “A Gradient Learning Rule for the Tempotron.” _Neural Computation_ 21 (2):340–52.

<a id="orgc6654c4"></a>Whittington, James C.R., and Rafal Bogacz. 2019. “Theories of Error Back-Propagation in the Brain.” _Trends in Cognitive Sciences_ 23 (3):235–50.
