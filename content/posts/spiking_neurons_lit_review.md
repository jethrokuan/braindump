+++
title = "Spiking Neurons (Literature Review)"
author = ["Jethro Kuan"]
lastmod = 2019-12-02T12:53:33+08:00
draft = false
math = true
+++

## Introduction to Spiking Neural Networks <a name="sec:snn"></a> {#introduction-to-spiking-neural-networks}

While the project is equal part reinforcement learning and spiking
neural networks, reinforcement learning is a popular field and has
been extensively covered by researchers worldwide
<sup id="e4502bc8449685a4d2f3de467131d52b"><a href="#ivanov19_moder_deep_reinf_learn_algor" title="Ivanov \&amp; D'yakonov, Modern Deep Reinforcement Learning Algorithms, {CoRR}, v(), (2019).">(Ivanov \& D'yakonov, 2019)</a></sup><sup>,</sup><sup id="d2a106a2198bf39695c45979d9300abc"><a href="#li18_deep_reinf_learn" title="Li, Deep Reinforcement Learning, {CoRR}, v(), (2018).">(Li, 2018)</a></sup>.
Hence, I have chosen instead to review the literature around spiking
neural networks.


### The Generations of Neural Networks {#the-generations-of-neural-networks}

Neural network models can be classified into three generations,
according to their computational units: perceptrons, non-linear
units, and spiking neurons <sup id="622a28118bfc276eace4e2997e32387a"><a href="#MAASS19971659" title="Wolfgang Maass, Networks of spiking neurons: The third generation of  neural network models, Neural Networks, v(9), 1659 - 1671 (1997).">("Wolfgang Maass", 1997)</a></sup>.

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
domain and range <sup id="6e22be1723df8ebb3d0e65e120ff8b92"><a href="#Cybenko1989" title="Cybenko, Approximation by superpositions of a sigmoidal  function, Mathematics of Control, Signals and Systems, v(4), 303--314 (1989).">("Cybenko, 1989)</a></sup>. Second, networks built with these
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
u\_i{t} = \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t\_j^{(f)}) + u\_{\text{rest}}
\end{equation}

SRM describes the membrane potential of neuron \\(i\\) as:

\begin{equation}
u\_i{t} = \eta (t - \hat{t\_i}) + \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t\_j^{(f)}) + u\_{\text{rest}}
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


### Motivating Spiking Neural Networks {#motivating-spiking-neural-networks}

Since second-generation neural networks have excellent performance,
why bother with spiking neural networks? In this section, we motivate
spiking neural networks from various perspectives.

-    Information Encoding

    To directly compare ANNs and SNNs, one can consider the real-valued
    outputs of ANNs to be the firing rate of a spiking neuron in steady
    state. In fact, such rate coding has been used to explain
    computational processes in the brain <sup id="ffec32504761d0b966ab6c36eee992a6"><a href="#pfeiffer2018deep" title="Pfeiffer \&amp; Pfeil, Deep learning with spiking neurons: opportunities and challenges, {Frontiers in neuroscience}, v(), (2018).">(Pfeiffer \& Pfeil, 2018)</a></sup>. Spiking
    neuron models encode information beyond the average firing rate: these
    models also utilize the relative timing between spikes
    <sup id="b77caeaea9e23a2bc9c87b5f10a91487"><a href="#guetig14_to_spike_or_when_to_spike" title="Robert G\utig, To Spike, Or When To Spike?, {Current Opinion in Neurobiology}, v(nil), 134-139 (2014).">(Robert G\"utig, 2014)</a></sup>, or spike phases (in-phase or
    out-of-phase). These time-dependent codes are termed temporal codes,
    and play an important role in biology. First, research has shown that
    different actions are taken based on single spikes
    <sup id="b7885fc5161a6ad3286ee312ffcc0c0b"><a href="#stemmler96_singl_spike_suffic" title="Martin Stemmler, A Single Spike Suffices: the Simplest Form of  Stochastic Resonance in Model Neurons, {Network: Computation in Neural Systems}, v(4), 687-716 (1996).">(Martin Stemmler, 1996)</a></sup>. Second, relying on the average firing rate
    would greatly increase the latency of the brain, and our brain often
    requires decision-making long before several spikes are accumulated.
    It has also been successfully demonstrated that temporal coding
    achieves competitive empirical performance on classification tasks for
    both generated datasets, as well as image datasets like MNIST and
    CIFAR <sup id="caaddec51f6948e5fea79b6d41c79676"><a href="#comsa19_tempor_codin_spikin_neural_networ" title="Comsa, Potempa, Versari, Luca, Fischbacher, Gesmundo, \&amp; Alakuijala, Temporal Coding in Spiking Neural Networks With  Alpha Synaptic Function, {CoRR}, v(), (2019).">(Comsa {\it et al.}, 2019)</a></sup>.

-    Biological Plausibility <a name="bioplausible"></a>

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
    incompatibilities with the biological brain <sup id="cf477ffda17db950a7fd58c9d833182b"><a href="#TAVANAEI201947" title="Amirhossein Tavanaei, Masoud Ghodrati, Saeed, Reza Kheradpisheh, Timoth&#233;e Masquelier, \&amp; Anthony Maida, Deep learning in spiking neural networks, Neural Networks, v(), 47 - 63 (2019).">("Amirhossein Tavanaei {\it et al.}, 2019)</a></sup>.
    Consider the chain rule in backpropagation:

    \begin{equation} \label{chainrule}
      \delta\_{j}^{\mu}=g^{\prime}\left(a\_{j}^{\mu}\right) \sum\_{k} w\_{k j} \delta\_{k}^{\mu}
    \end{equation}

    \\(\delta\_{j}^{\mu}\\) and \\(\delta\_{k}^{\mu}\\) denote the partial
    derivatives of the cost function for input pattern \\(\mu\\) with respect
    to the net input to some arbitrary unit \\(j\\) or \\(k\\). Unit \\(j\\) projects
    feed-forward connections to the set of units indexed by \\(k\\).
    \\(g(\cdot)\\) is the activation function applied to the net input of unit
    \\(j\\), denoted \\(a\_j^{\mu}\\), \\(w\_{kj}\\) are the feedforward weights
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

-    Neuromorphic Hardware <a name="neuromorphic"></a>

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
    <sup id="ff5e58b063893165385318f053dc98c9"><a href="#Merolla668" title="Merolla, Arthur, , Alvarez-Icaza, Cassidy, , Sawada, Akopyan, Jackson, , Imam, Guo, Nakamura, Yutaka, Brezzo, Vo, Esser, Steven, Appuswamy, Taba, Brian, Amir, Flickner, , Risk, Manohar, Modha \&amp; Dharmendra, A million spiking-neuron integrated circuit with a  scalable communication network and interface, {Science}, v(6197), 668--673 (2014).">(Merolla {\it et al.}, 2014)</a></sup> and Intel's Loihi <sup id="8146155533911feae2a67ddf637b1e29"><a href="#davies2018loihi" title="Davies, Srinivasa, Lin, Tsung-Han, Chinya, Cao, , Choday, Dimou, Joshi, Prasad, Imam, Jain \&amp; others, Loihi: A neuromorphic manycore processor with  on-chip learning, {IEEE Micro}, v(1), 82--99 (2018).">(Davies {\it et al.}, 2018)</a></sup>. Because
    spiking neural networks have not yet been successfully trained on many
    tasks, neuromorphic chips has seen little practical use. These chips
    have only recently been successfully used in robotic navigation
    <sup id="162706e1b73312c94623c3c6304f9856"><a href="#SnnSlam" title="Tang, Shah, Michmizos \&amp; Konstantinos , Spiking Neural Network on Neuromorphic Hardware for  Energy-Efficient Unidimensional Slam, CoRR, v(), (2019).">("Tang {\it et al.}, 2019)</a></sup>, and solving graph problems by manual construction of the
    network graph <sup id="022dd7a783479dfb761bf88b30399ee3"><a href="#Severa2016SpikingNA" title="William Severa, Ojas Parekh, Kristofor, Carlson, Conrad James \&amp; James Aimone, Spiking network algorithms for scientific computing, 2016 IEEE International Conference on Rebooting
                      Computing (ICRC), v(), 1-8 (2016).">("William Severa {\it et al.}, 2016)</a></sup>.


### Training Spiking Neural Networks {#training-spiking-neural-networks}

As explained in <neuromorphic>, it is desirable to train spiking
neural networks to perform arbitrary tasks, utilizing power-efficient
neuromorphic chips that break the Von Neumann bottleneck. We classify
the training strategies by their usage of gradients, and discuss
certain optimization techniques.

-    Non-gradient based methods

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
    <sup id="5c8bcfe50f375b189e564db4d78fe1a3"><a href="#sboev18_spikin_neural_networ_reinf_learn" title="Alexander Sboev, Danila Vlasov, Roman Rybka, \&amp; Alexey Serenko, Spiking Neural Network Reinforcement Learning Method  Based on Temporal Coding and Stdp, {Procedia Computer Science}, v(nil), 458-463 (2018).">(Alexander Sboev {\it et al.}, 2018)</a></sup>:

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
    <sup id="b266899abe9f6133f1e6d55ad24513db"><a href="#10.3389/fninf.2018.00089" title="Hazan, Saunders, Khan, Hassaan, Patel, Sanghavi, , Siegelmann \&amp; Kozma, BindsNET: A Machine Learning-Oriented Spiking Neural  Networks Library in Python, {Frontiers in Neuroinformatics}, v(), 89 (2018).">(Hazan {\it et al.}, 2018)</a></sup> that simulate SNNs on Von Neumann
    computers implementing these rules. Recent attempts have been made to
    combine Reinforcement Learning and STDP: both in solving RL problems
    <sup id="b266899abe9f6133f1e6d55ad24513db"><a href="#10.3389/fninf.2018.00089" title="Hazan, Saunders, Khan, Hassaan, Patel, Sanghavi, , Siegelmann \&amp; Kozma, BindsNET: A Machine Learning-Oriented Spiking Neural  Networks Library in Python, {Frontiers in Neuroinformatics}, v(), 89 (2018).">(Hazan {\it et al.}, 2018)</a></sup>, and using the reinforcement learning
    framework to train SNN
    <sup id="54e69da24e936643028e5c2591a092e6"><a href="#10.3389/fnbot.2019.00018" title="Bing, Baumann, Jiang, , Huang, Cai \&amp; Knoll, Supervised Learning in SNN via Reward-Modulated  Spike-Timing-Dependent Plasticity for a Target  Reaching Vehicle, {Frontiers in Neurorobotics}, v(), 18 (2019).">(Bing {\it et al.}, 2019)</a></sup><sup>,</sup><sup id="cb84873c6f16a361dfb01de00ae1425a"><a href="#10.3389/fnins.2018.00435" title="Lee, Panda, , Srinivasan \&amp; Roy, Training Deep Spiking Convolutional Neural Networks  With STDP-Based Unsupervised Pre-training Followed  by Supervised Fine-Tuning, {Frontiers in Neuroscience}, v(), 435 (2018).">(Lee {\it et al.}, 2018)</a></sup>. However, SNNs
    trained using the STDP learning rule have yet to achieve comparable
    performance compared to ANNs on relatively simple datasets like MNIST
    <sup id="cf477ffda17db950a7fd58c9d833182b"><a href="#TAVANAEI201947" title="Amirhossein Tavanaei, Masoud Ghodrati, Saeed, Reza Kheradpisheh, Timoth&#233;e Masquelier, \&amp; Anthony Maida, Deep learning in spiking neural networks, Neural Networks, v(), 47 - 63 (2019).">("Amirhossein Tavanaei {\it et al.}, 2019)</a></sup>.

-    Gradient-based methods

    Performance is important for practical applications, and
    gradient-based training methods such as backpropagation has shown
    competitive performance. It is thus desirable to train spiking neural
    networks with these gradient-based methods.

    There are several problems with spike-compatible gradient-based
    methods. First, most of these methods cannot train neurons in the
    hidden layers: they can only train neurons at the final layer, that
    receive the desired target output pattern
    <sup id="78cca07dd56a8c50ebd16d663c3b095d"><a href="#urbanczik09_gradien_learn_rule_tempot" title="Robert Urbanczik \&amp; Walter Senn, A Gradient Learning Rule for the Tempotron, {Neural Computation}, v(2), 340-352 (2009).">(Robert Urbanczik \& Walter Senn, 2009)</a></sup><sup>,</sup><sup id="9a5e9b63107e695a46943df33a811909"><a href="#training_deep_snn_bpp_lee" title="Lee, Delbruck \&amp; Pfeiffer, Training Deep Spiking Neural Networks Using Backpropagation, {Frontiers in Neuroscience}, v(), (2016).">(Lee {\it et al.}, 2016)</a></sup>.
    Second, the discontinuous, binary nature of spiking output needs to be
    addressed. For example, SpikeProp approximates the membrane
    threshold function at a local area with a linear function, introducing
    gradients and computing the exact formulae for error backpropagation
    for synaptic weights and spike times <sup id="41ed49a4572e3909921301127000035c"><a href="#spikeprop" title="Bohte, Kok \&amp; Poutr&#233;, SpikeProp: backpropagation for networks of spiking neurons., 419-424, in edited by (2000)">(Bohte {\it et al.}, 2000)</a></sup>. Others have
    modified the threshold function with a gate function
    <sup id="2b991fd4ef5412f89154985cec53e4e8"><a href="#NIPS2018_7417" title="@incollection{NIPS2018_7417,
      title =        {Gradient Descent for Spiking Neural Networks},
      author =       {Huh, Dongsung and Sejnowski, Terrence J},
      booktitle =    {Advances in Neural Information Processing Systems
                      31},
      editor =       {S. Bengio and H. Wallach and H. Larochelle and K.
                      Grauman and N. Cesa-Bianchi and R. Garnett},
      pages =        {1433--1443},
      year =         2018,
      publisher =    {Curran Associates, Inc.},
      url =
                      {http://papers.nips.cc/paper/7417-gradient-descent-for-spiking-neural-networks.pdf}
    }">@incollection{NIPS2018_7417,
      title =        {Gradient Descent for Spiking Neural Networks},
      author =       {Huh, Dongsung and Sejnowski, Terrence J},
      booktitle =    {Advances in Neural Information Processing Systems
                      31},
      editor =       {S. Bengio and H. Wallach and H. Larochelle and K.
                      Grauman and N. Cesa-Bianchi and R. Garnett},
      pages =        {1433--1443},
      year =         2018,
      publisher =    {Curran Associates, Inc.},
      url =
                      {http://papers.nips.cc/paper/7417-gradient-descent-for-spiking-neural-networks.pdf}
    }</a></sup>, used the alpha transfer function to derive
    gradient update rules <sup id="caaddec51f6948e5fea79b6d41c79676"><a href="#comsa19_tempor_codin_spikin_neural_networ" title="Comsa, Potempa, Versari, Luca, Fischbacher, Gesmundo, \&amp; Alakuijala, Temporal Coding in Spiking Neural Networks With  Alpha Synaptic Function, {CoRR}, v(), (2019).">(Comsa {\it et al.}, 2019)</a></sup>,
    and approximate the dirac-delta spikes with a probability density
    function <sup id="123af3c690cf296b196d898878568449"><a href="#NIPS2018_7415" title="@incollection{NIPS2018_7415,
      title =        {SLAYER: Spike Layer Error Reassignment in Time},
      author =       {Shrestha, Sumit Bam and Orchard, Garrick},
      booktitle =    {Advances in Neural Information Processing Systems
                      31},
      editor =       {S. Bengio and H. Wallach and H. Larochelle and K.
                      Grauman and N. Cesa-Bianchi and R. Garnett},
      pages =        {1412--1421},
      year =         2018,
      publisher =    {Curran Associates, Inc.},
      url =
                      {http://papers.nips.cc/paper/7415-slayer-spike-layer-error-reassignment-in-time.pdf}
    }">@incollection{NIPS2018_7415,
      title =        {SLAYER: Spike Layer Error Reassignment in Time},
      author =       {Shrestha, Sumit Bam and Orchard, Garrick},
      booktitle =    {Advances in Neural Information Processing Systems
                      31},
      editor =       {S. Bengio and H. Wallach and H. Larochelle and K.
                      Grauman and N. Cesa-Bianchi and R. Garnett},
      pages =        {1412--1421},
      year =         2018,
      publisher =    {Curran Associates, Inc.},
      url =
                      {http://papers.nips.cc/paper/7415-slayer-spike-layer-error-reassignment-in-time.pdf}
    }</a></sup>.

    Another approach is converting trained ANN models into SNNs
    <sup id="f842b3cf76d4cc279ae01a4cf75c48ba"><a href="#rueckauer16_theor_tools_conver_analog_to" title="Rueckauer, Lungu, Hu, Yuhuang \&amp; Pfeiffer, Theory and Tools for the Conversion of Analog To  Spiking Convolutional Neural Networks, {CoRR}, v(), (2016).">(Rueckauer {\it et al.}, 2016)</a></sup>. Common ANN layers such
    as softmax, batch normalization and max-pooling layers have their
    corresponding spiking counterparts.

    Equilibrium Propagation was recently proposed to solve the
    neurobiological incompatibilities of backpropagation
    <sup id="38c93c265031c562bcf3ab3a89b9d896"><a href="#10.3389/fncom.2017.00024" title="Scellier \&amp; Bengio, Equilibrium Propagation: Bridging the Gap between  Energy-Based Models and Backpropagation, {Frontiers in Computational Neuroscience}, v(), 24 (2017).">(Scellier \& Bengio, 2017)</a></sup>. Because the gradients are defined only
    in terms of local perturbations, the synaptic updates correspond to
    the standard form of STDP. The propagated signal encodes the gradients
    of a well-defined objective function on energy-based models, where the
    goal is to minimize the energy of the model. To resolve the issue of
    communication using binary-valued signals, step-size annealing was
    used to train spiking neural networks with Equilibrium Propagation
    <sup id="d1886fb7b4cde1636a730b6072eb45c5"><a href="#pmlr-v89-o-connor19a" title="O'Connor, Gavves \&amp; Welling, Training a Spiking Neural Network with Equilibrium Propagation, 1516--1523, in in: {Proceedings of Machine Learning Research}, edited by Chaudhuri \&amp; Sugiyama, PMLR (2019)">(O'Connor {\it et al.}, 2019)</a></sup>.

-    Future Research Areas

    A nascent area is local learning on neuromorphic chips. Thus far
    spiking neural networks are simulated and trained before deployment on
    a neuromorphic chip. In Intel's Loihi chip, each core contains a
    learning engine that can update synaptic weights using the 4-bit
    microcode-programmed learning rules that are associated with that
    synapse. This opens up areas for online learning.

    Neural network models can be classified into three generations,
    according to their computational units: perceptrons, non-linear
    units, and spiking neurons <sup id="622a28118bfc276eace4e2997e32387a"><a href="#MAASS19971659" title="Wolfgang Maass, Networks of spiking neurons: The third generation of  neural network models, Neural Networks, v(9), 1659 - 1671 (1997).">("Wolfgang Maass", 1997)</a></sup>.

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
    domain and range <sup id="6e22be1723df8ebb3d0e65e120ff8b92"><a href="#Cybenko1989" title="Cybenko, Approximation by superpositions of a sigmoidal  function, Mathematics of Control, Signals and Systems, v(4), 303--314 (1989).">("Cybenko, 1989)</a></sup>. Second, networks built with these
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
u\_i{t} = \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t\_j^{(f)}) + u\_{\text{rest}}
\end{equation}

SRM describes the membrane potential of neuron \\(i\\) as:

\begin{equation}
u\_i{t} = \eta (t - \hat{t\_i}) + \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t\_j^{(f)}) + u\_{\text{rest}}
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

where \\(\delta(x)\\) is the Dirac-delta function with \\(\delta(x) = 0\\)
for \\(x \ne 0\\) and \\(\int\_{-\infty}^{\infty} \delta(x)dx = 1\\). Spikes
are thus reduced to points in time.


### Motivating Spiking Neural Networks {#motivating-spiking-neural-networks}

Since second-generation neural networks have excellent performance,
why bother with spiking neural networks? In this section, we motivate
spiking neural networks from various perspectives.

-    Information Encoding

    To directly compare ANNs and SNNs, one can consider the real-valued
    outputs of ANNs to be the firing rate of a spiking neuron in steady
    state. In fact, such rate coding has been used to explain
    computational processes in the brain <sup id="ffec32504761d0b966ab6c36eee992a6"><a href="#pfeiffer2018deep" title="Pfeiffer \&amp; Pfeil, Deep learning with spiking neurons: opportunities and challenges, {Frontiers in neuroscience}, v(), (2018).">(Pfeiffer \& Pfeil, 2018)</a></sup>. Spiking
    neuron models encode information beyond the average firing rate: these
    models also utilize the relative timing between spikes
    <sup id="b77caeaea9e23a2bc9c87b5f10a91487"><a href="#guetig14_to_spike_or_when_to_spike" title="Robert G\utig, To Spike, Or When To Spike?, {Current Opinion in Neurobiology}, v(nil), 134-139 (2014).">(Robert G\"utig, 2014)</a></sup>, or spike phases (in-phase or
    out-of-phase). These time-dependent codes are termed temporal codes,
    and play an important role in biology. First, research has shown that
    different actions are taken based on single spikes
    <sup id="b7885fc5161a6ad3286ee312ffcc0c0b"><a href="#stemmler96_singl_spike_suffic" title="Martin Stemmler, A Single Spike Suffices: the Simplest Form of  Stochastic Resonance in Model Neurons, {Network: Computation in Neural Systems}, v(4), 687-716 (1996).">(Martin Stemmler, 1996)</a></sup>. Second, relying on the average firing rate
    would greatly increase the latency of the brain, and our brain often
    requires decision-making long before several spikes are accumulated.
    It has also been successfully demonstrated that temporal coding
    achieves competitive empirical performance on classification tasks for
    both generated datasets, as well as image datasets like MNIST and
    CIFAR <sup id="caaddec51f6948e5fea79b6d41c79676"><a href="#comsa19_tempor_codin_spikin_neural_networ" title="Comsa, Potempa, Versari, Luca, Fischbacher, Gesmundo, \&amp; Alakuijala, Temporal Coding in Spiking Neural Networks With  Alpha Synaptic Function, {CoRR}, v(), (2019).">(Comsa {\it et al.}, 2019)</a></sup>.

-    Biological Plausibility <a name="bioplausible"></a>

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
    incompatibilities with the biological brain <sup id="cf477ffda17db950a7fd58c9d833182b"><a href="#TAVANAEI201947" title="Amirhossein Tavanaei, Masoud Ghodrati, Saeed, Reza Kheradpisheh, Timoth&#233;e Masquelier, \&amp; Anthony Maida, Deep learning in spiking neural networks, Neural Networks, v(), 47 - 63 (2019).">("Amirhossein Tavanaei {\it et al.}, 2019)</a></sup>.
    Consider the chain rule in backpropagation:

    \begin{equation} \label{chainrule}
      \delta\_{j}^{\mu}=g^{\prime}\left(a\_{j}^{\mu}\right) \sum\_{k} w\_{k j} \delta\_{k}^{\mu}
    \end{equation}

    \\(\delta\_{j}^{\mu}\\) and \\(\delta\_{k}^{\mu}\\) denote the partial
    derivatives of the cost function for input pattern \\(\mu\\) with respect
    to the net input to some arbitrary unit \\(j\\) or \\(k\\). Unit \\(j\\) projects
    feed-forward connections to the set of units indexed by \\(k\\).
    \\(g(\cdot)\\) is the activation function applied to the net input of unit
    \\(j\\), denoted \\(a\_j^{\mu}\\), \\(w\_{kj}\\) are the feedforward weights
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

-    Neuromorphic Hardware <a name="neuromorphic"></a>

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
    <sup id="ff5e58b063893165385318f053dc98c9"><a href="#Merolla668" title="Merolla, Arthur, , Alvarez-Icaza, Cassidy, , Sawada, Akopyan, Jackson, , Imam, Guo, Nakamura, Yutaka, Brezzo, Vo, Esser, Steven, Appuswamy, Taba, Brian, Amir, Flickner, , Risk, Manohar, Modha \&amp; Dharmendra, A million spiking-neuron integrated circuit with a  scalable communication network and interface, {Science}, v(6197), 668--673 (2014).">(Merolla {\it et al.}, 2014)</a></sup> and Intel's Loihi <sup id="8146155533911feae2a67ddf637b1e29"><a href="#davies2018loihi" title="Davies, Srinivasa, Lin, Tsung-Han, Chinya, Cao, , Choday, Dimou, Joshi, Prasad, Imam, Jain \&amp; others, Loihi: A neuromorphic manycore processor with  on-chip learning, {IEEE Micro}, v(1), 82--99 (2018).">(Davies {\it et al.}, 2018)</a></sup>. Because
    spiking neural networks have not yet been successfully trained on many
    tasks, neuromorphic chips has seen little practical use. These chips
    have only recently been successfully used in robotic navigation
    <sup id="162706e1b73312c94623c3c6304f9856"><a href="#SnnSlam" title="Tang, Shah, Michmizos \&amp; Konstantinos , Spiking Neural Network on Neuromorphic Hardware for  Energy-Efficient Unidimensional Slam, CoRR, v(), (2019).">("Tang {\it et al.}, 2019)</a></sup>, and solving graph problems by manual construction of the
    network graph <sup id="022dd7a783479dfb761bf88b30399ee3"><a href="#Severa2016SpikingNA" title="William Severa, Ojas Parekh, Kristofor, Carlson, Conrad James \&amp; James Aimone, Spiking network algorithms for scientific computing, 2016 IEEE International Conference on Rebooting
                      Computing (ICRC), v(), 1-8 (2016).">("William Severa {\it et al.}, 2016)</a></sup>.


### Training Spiking Neural Networks {#training-spiking-neural-networks}

As explained in <neuromorphic>, it is desirable to train spiking
neural networks to perform arbitrary tasks, utilizing power-efficient
neuromorphic chips that break the Von Neumann bottleneck. We classify
the training strategies by their usage of gradients, and discuss
certain optimization techniques.

-    Non-gradient based methods

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
    <sup id="5c8bcfe50f375b189e564db4d78fe1a3"><a href="#sboev18_spikin_neural_networ_reinf_learn" title="Alexander Sboev, Danila Vlasov, Roman Rybka, \&amp; Alexey Serenko, Spiking Neural Network Reinforcement Learning Method  Based on Temporal Coding and Stdp, {Procedia Computer Science}, v(nil), 458-463 (2018).">(Alexander Sboev {\it et al.}, 2018)</a></sup>:

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
    <sup id="b266899abe9f6133f1e6d55ad24513db"><a href="#10.3389/fninf.2018.00089" title="Hazan, Saunders, Khan, Hassaan, Patel, Sanghavi, , Siegelmann \&amp; Kozma, BindsNET: A Machine Learning-Oriented Spiking Neural  Networks Library in Python, {Frontiers in Neuroinformatics}, v(), 89 (2018).">(Hazan {\it et al.}, 2018)</a></sup> that simulate SNNs on Von Neumann
    computers implementing these rules. Recent attempts have been made to
    combine Reinforcement Learning and STDP: both in solving RL problems
    <sup id="b266899abe9f6133f1e6d55ad24513db"><a href="#10.3389/fninf.2018.00089" title="Hazan, Saunders, Khan, Hassaan, Patel, Sanghavi, , Siegelmann \&amp; Kozma, BindsNET: A Machine Learning-Oriented Spiking Neural  Networks Library in Python, {Frontiers in Neuroinformatics}, v(), 89 (2018).">(Hazan {\it et al.}, 2018)</a></sup>, and using the reinforcement learning
    framework to train SNN
    <sup id="54e69da24e936643028e5c2591a092e6"><a href="#10.3389/fnbot.2019.00018" title="Bing, Baumann, Jiang, , Huang, Cai \&amp; Knoll, Supervised Learning in SNN via Reward-Modulated  Spike-Timing-Dependent Plasticity for a Target  Reaching Vehicle, {Frontiers in Neurorobotics}, v(), 18 (2019).">(Bing {\it et al.}, 2019)</a></sup><sup>,</sup><sup id="cb84873c6f16a361dfb01de00ae1425a"><a href="#10.3389/fnins.2018.00435" title="Lee, Panda, , Srinivasan \&amp; Roy, Training Deep Spiking Convolutional Neural Networks  With STDP-Based Unsupervised Pre-training Followed  by Supervised Fine-Tuning, {Frontiers in Neuroscience}, v(), 435 (2018).">(Lee {\it et al.}, 2018)</a></sup>. However, SNNs
    trained using the STDP learning rule have yet to achieve comparable
    performance compared to ANNs on relatively simple datasets like MNIST
    <sup id="cf477ffda17db950a7fd58c9d833182b"><a href="#TAVANAEI201947" title="Amirhossein Tavanaei, Masoud Ghodrati, Saeed, Reza Kheradpisheh, Timoth&#233;e Masquelier, \&amp; Anthony Maida, Deep learning in spiking neural networks, Neural Networks, v(), 47 - 63 (2019).">("Amirhossein Tavanaei {\it et al.}, 2019)</a></sup>.

-    Gradient-based methods

    Performance is important for practical applications, and
    gradient-based training methods such as backpropagation has shown
    competitive performance. It is thus desirable to train spiking neural
    networks with these gradient-based methods.

    There are several problems with spike-compatible gradient-based
    methods. First, most of these methods cannot train neurons in the
    hidden layers: they can only train neurons at the final layer, that
    receive the desired target output pattern
    <sup id="78cca07dd56a8c50ebd16d663c3b095d"><a href="#urbanczik09_gradien_learn_rule_tempot" title="Robert Urbanczik \&amp; Walter Senn, A Gradient Learning Rule for the Tempotron, {Neural Computation}, v(2), 340-352 (2009).">(Robert Urbanczik \& Walter Senn, 2009)</a></sup><sup>,</sup><sup id="9a5e9b63107e695a46943df33a811909"><a href="#training_deep_snn_bpp_lee" title="Lee, Delbruck \&amp; Pfeiffer, Training Deep Spiking Neural Networks Using Backpropagation, {Frontiers in Neuroscience}, v(), (2016).">(Lee {\it et al.}, 2016)</a></sup>.
    Second, the discontinuous, binary nature of spiking output needs to be
    addressed. For example, SpikeProp approximates the membrane
    threshold function at a local area with a linear function, introducing
    gradients and computing the exact formulae for error backpropagation
    for synaptic weights and spike times <sup id="41ed49a4572e3909921301127000035c"><a href="#spikeprop" title="Bohte, Kok \&amp; Poutr&#233;, SpikeProp: backpropagation for networks of spiking neurons., 419-424, in edited by (2000)">(Bohte {\it et al.}, 2000)</a></sup>. Others have
    modified the threshold function with a gate function
    <sup id="2b991fd4ef5412f89154985cec53e4e8"><a href="#NIPS2018_7417" title="@incollection{NIPS2018_7417,
      title =        {Gradient Descent for Spiking Neural Networks},
      author =       {Huh, Dongsung and Sejnowski, Terrence J},
      booktitle =    {Advances in Neural Information Processing Systems
                      31},
      editor =       {S. Bengio and H. Wallach and H. Larochelle and K.
                      Grauman and N. Cesa-Bianchi and R. Garnett},
      pages =        {1433--1443},
      year =         2018,
      publisher =    {Curran Associates, Inc.},
      url =
                      {http://papers.nips.cc/paper/7417-gradient-descent-for-spiking-neural-networks.pdf}
    }">@incollection{NIPS2018_7417,
      title =        {Gradient Descent for Spiking Neural Networks},
      author =       {Huh, Dongsung and Sejnowski, Terrence J},
      booktitle =    {Advances in Neural Information Processing Systems
                      31},
      editor =       {S. Bengio and H. Wallach and H. Larochelle and K.
                      Grauman and N. Cesa-Bianchi and R. Garnett},
      pages =        {1433--1443},
      year =         2018,
      publisher =    {Curran Associates, Inc.},
      url =
                      {http://papers.nips.cc/paper/7417-gradient-descent-for-spiking-neural-networks.pdf}
    }</a></sup>, used the alpha transfer function to derive
    gradient update rules <sup id="caaddec51f6948e5fea79b6d41c79676"><a href="#comsa19_tempor_codin_spikin_neural_networ" title="Comsa, Potempa, Versari, Luca, Fischbacher, Gesmundo, \&amp; Alakuijala, Temporal Coding in Spiking Neural Networks With  Alpha Synaptic Function, {CoRR}, v(), (2019).">(Comsa {\it et al.}, 2019)</a></sup>,
    and approximate the dirac-delta spikes with a probability density
    function <sup id="123af3c690cf296b196d898878568449"><a href="#NIPS2018_7415" title="@incollection{NIPS2018_7415,
      title =        {SLAYER: Spike Layer Error Reassignment in Time},
      author =       {Shrestha, Sumit Bam and Orchard, Garrick},
      booktitle =    {Advances in Neural Information Processing Systems
                      31},
      editor =       {S. Bengio and H. Wallach and H. Larochelle and K.
                      Grauman and N. Cesa-Bianchi and R. Garnett},
      pages =        {1412--1421},
      year =         2018,
      publisher =    {Curran Associates, Inc.},
      url =
                      {http://papers.nips.cc/paper/7415-slayer-spike-layer-error-reassignment-in-time.pdf}
    }">@incollection{NIPS2018_7415,
      title =        {SLAYER: Spike Layer Error Reassignment in Time},
      author =       {Shrestha, Sumit Bam and Orchard, Garrick},
      booktitle =    {Advances in Neural Information Processing Systems
                      31},
      editor =       {S. Bengio and H. Wallach and H. Larochelle and K.
                      Grauman and N. Cesa-Bianchi and R. Garnett},
      pages =        {1412--1421},
      year =         2018,
      publisher =    {Curran Associates, Inc.},
      url =
                      {http://papers.nips.cc/paper/7415-slayer-spike-layer-error-reassignment-in-time.pdf}
    }</a></sup>.

    Another approach is converting trained ANN models into SNNs
    <sup id="f842b3cf76d4cc279ae01a4cf75c48ba"><a href="#rueckauer16_theor_tools_conver_analog_to" title="Rueckauer, Lungu, Hu, Yuhuang \&amp; Pfeiffer, Theory and Tools for the Conversion of Analog To  Spiking Convolutional Neural Networks, {CoRR}, v(), (2016).">(Rueckauer {\it et al.}, 2016)</a></sup>. Common ANN layers such
    as softmax, batch normalization and max-pooling layers have their
    corresponding spiking counterparts.

    Equilibrium Propagation was recently proposed to solve the
    neurobiological incompatibilities of backpropagation
    <sup id="38c93c265031c562bcf3ab3a89b9d896"><a href="#10.3389/fncom.2017.00024" title="Scellier \&amp; Bengio, Equilibrium Propagation: Bridging the Gap between  Energy-Based Models and Backpropagation, {Frontiers in Computational Neuroscience}, v(), 24 (2017).">(Scellier \& Bengio, 2017)</a></sup>. Because the gradients are defined only
    in terms of local perturbations, the synaptic updates correspond to
    the standard form of STDP. The propagated signal encodes the gradients
    of a well-defined objective function on energy-based models, where the
    goal is to minimize the energy of the model. To resolve the issue of
    communication using binary-valued signals, step-size annealing was
    used to train spiking neural networks with Equilibrium Propagation
    <sup id="d1886fb7b4cde1636a730b6072eb45c5"><a href="#pmlr-v89-o-connor19a" title="O'Connor, Gavves \&amp; Welling, Training a Spiking Neural Network with Equilibrium Propagation, 1516--1523, in in: {Proceedings of Machine Learning Research}, edited by Chaudhuri \&amp; Sugiyama, PMLR (2019)">(O'Connor {\it et al.}, 2019)</a></sup>.

-    Future Research Areas

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
emitted by a subset \\(P\_i\\) of neurons through directed links, known as
synapses. Neurons in a set \\(P\_i\\) are referred to as _pre-synaptic_ for
_post-synaptic_ neuron \\(i\\).

The internal, analog state of each spiking neuron \\(i \in V\\) at time
\\(t\\) is defined by its membrane potential \\(u\_{i,t}\\).


## Long short-term memory and learning-to-learn in networks of spiking neurons <sup id="4917683f67ccf52378654f00a9c9a141"><a href="#bellec18_long_short_term_memor_learn" title="Bellec, Salaj, Subramoney, Anand, Legenstein \&amp; Maass, Long Short-Term Memory and Learning-To-Learn in  Networks of Spiking Neurons, {CoRR}, v(), (2018).">(Bellec {\it et al.}, 2018)</a></sup> {#long-short-term-memory-and-learning-to-learn-in-networks-of-spiking-neurons}

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


## Gradient Descent for Spiking Neural Networks <sup id="7cd889cc568ca0abd92ccb282abe3ae7"><a href="#huh17_gradien_descen_spikin_neural_networ" title="Huh \&amp; Sejnowski, Gradient Descent for Spiking Neural Networks, {CoRR}, v(), (2017).">(Huh \& Sejnowski, 2017)</a></sup> {#gradient-descent-for-spiking-neural-networks}

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


## <span class="org-todo todo TODO">TODO</span> Surrogate Gradient Learning in Spiking Neural Networks <sup id="6c46e273de1ecbecce7f8f1ac7329a57"><a href="#neftci19_surrog_gradien_learn_spikin_neural_networ" title="Neftci, Mostafa, Zenke \&amp; Friedemann, Surrogate Gradient Learning in Spiking Neural  Networks, {CoRR}, v(), (2019).">(Neftci {\it et al.}, 2019)</a></sup> {#surrogate-gradient-learning-in-spiking-neural-networks}


## <span class="org-todo todo TODO">TODO</span> Theories of Error Back-Propagation in the Brain <sup id="87673c771a23a8ad0a1301cb565d0484"><a href="#whittington19_theor_error_back_propag_brain" title="James Whittington \&amp; Rafal Bogacz, Theories of Error Back-Propagation in the Brain, {Trends in Cognitive Sciences}, v(3), 235-250 (2019).">(James Whittington \& Rafal Bogacz, 2019)</a></sup> {#theories-of-error-back-propagation-in-the-brain}


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

<sup id="5c8bcfe50f375b189e564db4d78fe1a3"><a href="#sboev18_spikin_neural_networ_reinf_learn" title="Alexander Sboev, Danila Vlasov, Roman Rybka, \&amp; Alexey Serenko, Spiking Neural Network Reinforcement Learning Method  Based on Temporal Coding and Stdp, {Procedia Computer Science}, v(nil), 458-463 (2018).">(Alexander Sboev {\it et al.}, 2018)</a></sup>


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


### Poisson Model <sup id="15fef7332c23705120f84cb94df313f0"><a href="#heeger2000poisson" title="Heeger, Poisson model of spike generation, {Handout, University of Standford}, v(), 1--13 (2000).">(Heeger, 2000)</a></sup> {#poisson-model}

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
<a id="ivanov19_moder_deep_reinf_learn_algor"></a>Ivanov, S., & D'yakonov, A., *Modern Deep Reinforcement Learning Algorithms*, CoRR, *()*,  (2019).  [↩](#e4502bc8449685a4d2f3de467131d52b)

<a id="li18_deep_reinf_learn"></a>Li, Y., *Deep Reinforcement Learning*, CoRR, *()*,  (2018).  [↩](#d2a106a2198bf39695c45979d9300abc)

<a id="MAASS19971659"></a>Maass, W., *Networks of spiking neurons: the third generation of neural network models*, Neural Networks, *10(9)*, 1659–1671 (1997).  http://dx.doi.org/https://doi.org/10.1016/S0893-6080(97)00011-7 [↩](#622a28118bfc276eace4e2997e32387a)

<a id="Cybenko1989"></a>Cybenko, G., *Approximation by superpositions of a sigmoidal function*, Mathematics of Control, Signals and Systems, *2(4)*, 303–314 (1989).  http://dx.doi.org/10.1007/BF02551274 [↩](#6e22be1723df8ebb3d0e65e120ff8b92)

<a id="pfeiffer2018deep"></a>Pfeiffer, M., & Pfeil, T., *Deep learning with spiking neurons: opportunities and challenges*, Frontiers in neuroscience, *12()*,  (2018).  [↩](#ffec32504761d0b966ab6c36eee992a6)

<a id="guetig14_to_spike_or_when_to_spike"></a>Robert G\"utig, *To spike, or when to spike?*, Current Opinion in Neurobiology, *25(nil)*, 134–139 (2014).  http://dx.doi.org/10.1016/j.conb.2014.01.004 [↩](#b77caeaea9e23a2bc9c87b5f10a91487)

<a id="stemmler96_singl_spike_suffic"></a>Stemmler, M., *A single spike suffices: the simplest form of stochastic resonance in model neurons*, Network: Computation in Neural Systems, *7(4)*, 687–716 (1996).  http://dx.doi.org/10.1088/0954-898x_7_4_005 [↩](#b7885fc5161a6ad3286ee312ffcc0c0b)

<a id="comsa19_tempor_codin_spikin_neural_networ"></a>Comsa, I. M., Potempa, K., Versari, L., Fischbacher, T., Gesmundo, A., & Alakuijala, J., *Temporal coding in spiking neural networks with alpha synaptic function*, CoRR, *()*,  (2019).  [↩](#caaddec51f6948e5fea79b6d41c79676)

<a id="TAVANAEI201947"></a>Tavanaei, A., Ghodrati, M., Kheradpisheh, S. R., Masquelier, T., & Maida, A., *Deep learning in spiking neural networks*, Neural Networks, *111()*, 47–63 (2019).  http://dx.doi.org/https://doi.org/10.1016/j.neunet.2018.12.002 [↩](#cf477ffda17db950a7fd58c9d833182b)

<a id="Merolla668"></a>Merolla, P. A., Arthur, J. V., Alvarez-Icaza, R., Cassidy, A. S., Sawada, J., Akopyan, F., Jackson, B. L., …, *A million spiking-neuron integrated circuit with a scalable communication network and interface*, Science, *345(6197)*, 668–673 (2014).  http://dx.doi.org/10.1126/science.1254642 [↩](#ff5e58b063893165385318f053dc98c9)

<a id="davies2018loihi"></a>Davies, M., Srinivasa, N., Lin, T., Chinya, G., Cao, Y., Choday, S. H., Dimou, G., …, *Loihi: a neuromorphic manycore processor with on-chip learning*, IEEE Micro, *38(1)*, 82–99 (2018).  [↩](#8146155533911feae2a67ddf637b1e29)

<a id="SnnSlam"></a>Tang, G., Shah, A., & Michmizos, K. P., *Spiking neural network on neuromorphic hardware for energy-efficient unidimensional slam*, CoRR, *()*,  (2019).  [↩](#162706e1b73312c94623c3c6304f9856)

<a id="Severa2016SpikingNA"></a>Severa, W., Parekh, O., Carlson, K. D., James, C. D., & Aimone, J. B., *Spiking network algorithms for scientific computing*, 2016 IEEE International Conference on Rebooting Computing (ICRC), *()*, 1–8 (2016).  [↩](#022dd7a783479dfb761bf88b30399ee3)

<a id="sboev18_spikin_neural_networ_reinf_learn"></a>Sboev, A., Vlasov, D., Rybka, R., & Serenko, A., *Spiking neural network reinforcement learning method based on temporal coding and stdp*, Procedia Computer Science, *145(nil)*, 458–463 (2018).  http://dx.doi.org/10.1016/j.procs.2018.11.107 [↩](#5c8bcfe50f375b189e564db4d78fe1a3)

<a id="10.3389/fninf.2018.00089"></a>Hazan, H., Saunders, D. J., Khan, H., Patel, D., Sanghavi, D. T., Siegelmann, H. T., & Kozma, R., *Bindsnet: a machine learning-oriented spiking neural networks library in python*, Frontiers in Neuroinformatics, *12()*, 89 (2018).  http://dx.doi.org/10.3389/fninf.2018.00089 [↩](#b266899abe9f6133f1e6d55ad24513db)

<a id="10.3389/fnbot.2019.00018"></a>Bing, Z., Baumann, I., Jiang, Z., Huang, K., Cai, C., & Knoll, A., *Supervised learning in snn via reward-modulated spike-timing-dependent plasticity for a target reaching vehicle*, Frontiers in Neurorobotics, *13()*, 18 (2019).  http://dx.doi.org/10.3389/fnbot.2019.00018 [↩](#54e69da24e936643028e5c2591a092e6)

<a id="10.3389/fnins.2018.00435"></a>Lee, C., Panda, P., Srinivasan, G., & Roy, K., *Training deep spiking convolutional neural networks with stdp-based unsupervised pre-training followed by supervised fine-tuning*, Frontiers in Neuroscience, *12()*, 435 (2018).  http://dx.doi.org/10.3389/fnins.2018.00435 [↩](#cb84873c6f16a361dfb01de00ae1425a)

<a id="urbanczik09_gradien_learn_rule_tempot"></a>Urbanczik, R., & Senn, W., *A gradient learning rule for the tempotron*, Neural Computation, *21(2)*, 340–352 (2009).  http://dx.doi.org/10.1162/neco.2008.09-07-605 [↩](#78cca07dd56a8c50ebd16d663c3b095d)

<a id="training_deep_snn_bpp_lee"></a>Lee, J., Delbruck, T., & Pfeiffer, M., *Training Deep Spiking Neural Networks Using Backpropagation*, Frontiers in Neuroscience, *10()*,  (2016).  http://dx.doi.org/10.3389/fnins.2016.00508 [↩](#9a5e9b63107e695a46943df33a811909)

<a id="spikeprop"></a>Bohte, S., Kok, J., & Poutré, J., *Spikeprop: backpropagation for networks of spiking neurons.*, In ,  (pp. 419–424) (2000). : . [↩](#41ed49a4572e3909921301127000035c)

<a id="NIPS2018_7417"></a>Huh, D., & Sejnowski, T. J., *Gradient descent for spiking neural networks*, In S. Bengio, H. Wallach, H. Larochelle, K. Grauman, N. Cesa-Bianchi, & R. Garnett (Eds.), Advances in Neural Information Processing Systems 31 (pp. 1433–1443) (2018). : Curran Associates, Inc. [↩](#2b991fd4ef5412f89154985cec53e4e8)

<a id="NIPS2018_7415"></a>Shrestha, S. B., & Orchard, G., *Slayer: spike layer error reassignment in time*, In S. Bengio, H. Wallach, H. Larochelle, K. Grauman, N. Cesa-Bianchi, & R. Garnett (Eds.), Advances in Neural Information Processing Systems 31 (pp. 1412–1421) (2018). : Curran Associates, Inc. [↩](#123af3c690cf296b196d898878568449)

<a id="rueckauer16_theor_tools_conver_analog_to"></a>Rueckauer, B., Lungu, I., Hu, Y., & Pfeiffer, M., *Theory and tools for the conversion of analog to spiking convolutional neural networks*, CoRR, *()*,  (2016).  [↩](#f842b3cf76d4cc279ae01a4cf75c48ba)

<a id="10.3389/fncom.2017.00024"></a>Scellier, B., & Bengio, Y., *Equilibrium propagation: bridging the gap between energy-based models and backpropagation*, Frontiers in Computational Neuroscience, *11()*, 24 (2017).  http://dx.doi.org/10.3389/fncom.2017.00024 [↩](#38c93c265031c562bcf3ab3a89b9d896)

<a id="pmlr-v89-o-connor19a"></a>O'Connor, P., Gavves, E., & Welling, M., *Training a spiking neural network with equilibrium propagation*, In K. Chaudhuri, & M. Sugiyama, Proceedings of Machine Learning Research (pp. 1516–1523) (2019). : PMLR. [↩](#d1886fb7b4cde1636a730b6072eb45c5)

<a id="bellec18_long_short_term_memor_learn"></a>Bellec, G., Salaj, D., Subramoney, A., Legenstein, R., & Maass, W., *Long short-term memory and learning-to-learn in networks of spiking neurons*, CoRR, *()*,  (2018).  [↩](#4917683f67ccf52378654f00a9c9a141)

<a id="huh17_gradien_descen_spikin_neural_networ"></a>Huh, D., & Sejnowski, T. J., *Gradient descent for spiking neural networks*, CoRR, *()*,  (2017).  [↩](#7cd889cc568ca0abd92ccb282abe3ae7)

<a id="neftci19_surrog_gradien_learn_spikin_neural_networ"></a>Neftci, E. O., Mostafa, H., & Zenke, F., *Surrogate gradient learning in spiking neural networks*, CoRR, *()*,  (2019).  [↩](#6c46e273de1ecbecce7f8f1ac7329a57)

<a id="whittington19_theor_error_back_propag_brain"></a>Whittington, J. C., & Bogacz, R., *Theories of error back-propagation in the brain*, Trends in Cognitive Sciences, *23(3)*, 235–250 (2019).  http://dx.doi.org/10.1016/j.tics.2018.12.005 [↩](#87673c771a23a8ad0a1301cb565d0484)

<a id="heeger2000poisson"></a>Heeger, D., *Poisson model of spike generation*, Handout, University of Standford, *5()*, 1–13 (2000).  [↩](#15fef7332c23705120f84cb94df313f0)
