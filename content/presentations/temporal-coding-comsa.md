+++
title = "Temporal Coding in Spiking Neural Networks with Alpha Synaptic Function (Review)"
author = ["Jethro Kuan"]
lastmod = 2019-09-03T08:29:02+08:00
draft = false
math = true
+++

<style>
  .ox-hugo-toc ul {
    list-style: none;
  }
</style>
<div class="ox-hugo-toc toc">
<div></div>

<div class="heading">Table of Contents</div>

- <span class="section-num">1</span> [Introduction](#introduction)
    - <span class="section-num">1.1</span> [What are Spiking Neural Networks?](#what-are-spiking-neural-networks)
    - <span class="section-num">1.2</span> [Spike Response Model (SRM) cite:gerstner2002spiking](#spike-response-model--srm)
    - <span class="section-num">1.3</span> [Spiking, illustrated](#spiking-illustrated)
    - <span class="section-num">1.4</span> [Spike Trains](#spike-trains)
    - <span class="section-num">1.5</span> [How Do Neurons Encode Information?](#how-do-neurons-encode-information)
    - <span class="section-num">1.6</span> [What's the landscape for SNNs?](#what-s-the-landscape-for-snns)
- <span class="section-num">2</span> [Temporal Coding using with Alpha Synaptic Function cite:comsa19\_tempor\_codin\_spikin\_neural\_networ](#temporal-coding-using-with-alpha-synaptic-function)
    - <span class="section-num">2.1</span> [Motivation](#motivation)
    - <span class="section-num">2.2</span> [Key Ideas](#key-ideas)
    - <span class="section-num">2.3</span> [The Coding Scheme](#the-coding-scheme)
    - <span class="section-num">2.4</span> [Alpha Synaptic Function](#alpha-synaptic-function)
    - <span class="section-num">2.5</span> [Modelling Membrane Potential](#modelling-membrane-potential)
    - <span class="section-num">2.6</span> [Solving for the Equation label:eqn:threshold](#solving-for-the-equation)
    - <span class="section-num">2.7</span> [The Loss Function](#the-loss-function)
    - <span class="section-num">2.8</span> [Synchronization Pulses](#synchronization-pulses)
    - <span class="section-num">2.9</span> [Hyperparameters](#hyperparameters)
- <span class="section-num">3</span> [Experiments](#experiments)
    - <span class="section-num">3.1</span> [Boolean Logic Problems](#boolean-logic-problems)
    - <span class="section-num">3.2</span> [Non-convolutional MNIST](#non-convolutional-mnist)
- <span class="section-num">4</span> [Running the Code](#running-the-code)
    - <span class="section-num">4.1</span> [Training the Model](#training-the-model)
    - <span class="section-num">4.2</span> [Testing the Models](#testing-the-models)
- <span class="section-num">5</span> [Thoughts](#thoughts)
    - <span class="section-num">5.1</span> [My Thoughts](#my-thoughts)
- <span class="section-num">6</span> [Bibliography](#bibliography)
    - <span class="section-num">6.1</span> [References](#references)

</div>
<!--endtoc-->



## <span class="section-num">1</span> Introduction {#introduction}


### <span class="section-num">1.1</span> What are Spiking Neural Networks? {#what-are-spiking-neural-networks}

-   NN architectures that mimics biological neural networks:
    -   [SNN computes with asynchronous spikes that signal the occurrence
        of a characteristic event](https://www.youtube.com/watch?v=3JQ3hYko51Y&feature=youtu.be)

**Motivation:**

-   low power consumption
-   analog computation
-   fast inference
-   event-driven processing
-   online learning
-   parallelism


### <span class="section-num">1.2</span> Spike Response Model (SRM) <a id="fb7c0ce207bba24abc5543768d7e694d" href="#gerstner2002spiking" title="Gerstner \&amp; Kistler, Spiking neuron models: Single neurons, populations, plasticity, Cambridge university press (2002).">(Gerstner \& Kistler, 2002)</a> {#spike-response-model--srm}

Model for membrane potential:

\begin{equation}
  u\_i(t) = \eta (t - \hat{t\_i}) + \sum\_{j}\sum\_{f} \epsilon\_{ij}(t - t\_j^{(f)}) + u\_{rest}
\end{equation}

-   Spikes come from the dendrites (input neurons), and this voltage accumulates
-   Voltage decays slowly to resting potential
-   Upon exceeding threshold, spike, and enter refractory period


### <span class="section-num">1.3</span> Spiking, illustrated {#spiking-illustrated}

{{< figure src="/ox-hugo/4-Figure3-1_2019-08-29_12-43-41.png" caption="Figure 1: Membrane potential over time. Source: <a id=\"c6103ec10de5867ca179830c28dcf19d\" href=\"#queiroz06_reinf_learn_simpl_contr_task\" title=\"Murilo Saraiva de Queiroz, Roberto Coelho de, Berr&#234;do \&amp; Ant&#244;nio de P\'adua Braga, Reinforcement Learning of a Simple Control Task  Using the Spike Response Model, {Neurocomputing}, v(1-3), 14-20 (2006).\">(Murilo Saraiva de Queiroz et al., 2006)</a>" >}}


### <span class="section-num">1.4</span> Spike Trains {#spike-trains}

-   Sequence of `(spike, timestamp)`

{{< figure src="/ox-hugo/QJQvo_2019-08-29_12-48-37.jpg" caption="Figure 2: Spike Trains for 3 neurons" >}}


### <span class="section-num">1.5</span> How Do Neurons Encode Information? {#how-do-neurons-encode-information}

1.   Rate-coding

    -   Windowed average across:
        -   single neuron
        -   multiple runs
        -   population of neurons

    **Problems:**

    -   Windowed average \\(\rightarrow\\) minimum latency (brain has to wait for average)
    -   Research shows brain can act on single spikes

2.   Temporal-coding

    -   Time to first spike
    -   Phase
    -   Correlations and Synchrony

3.   Which coding scheme is better?

    -   Both codes are consistent: if the mean firing rate of a neuron is
        high, then the time to first spike is expected to occur early
    -   Rate codes discard temporal information
    -   For more information see <a id="fb7c0ce207bba24abc5543768d7e694d" href="#gerstner2002spiking" title="Gerstner \&amp; Kistler, Spiking neuron models: Single neurons, populations, plasticity, Cambridge university press (2002).">(Gerstner \& Kistler, 2002)</a>


### <span class="section-num">1.6</span> What's the landscape for SNNs? {#what-s-the-landscape-for-snns}

-   Pretty bad.
-   Most SNNs cannot be trained with gradient-based methods, because
    there are no gradients
-   The current approach to training SNNs include:
    -   Binarization of ANNs
    -   Conversion from ANNs
    -   Training of constrained networks
    -   Supervised learning with spikes
    -   Local learning rules at synapses
-   Exception: probabilistic SNNs define outputs as jointly distributed
    random binary processes. The joint distributions are differentiable
    in the synaptic weights, and one can use principled learning
    criteria from ML and information theory


## <span class="section-num">2</span> Temporal Coding using with Alpha Synaptic Function <a id="caaddec51f6948e5fea79b6d41c79676" href="#comsa19_tempor_codin_spikin_neural_networ" title="Comsa, Potempa, Versari, Luca, Fischbacher, Gesmundo, \&amp; Alakuijala, Temporal Coding in Spiking Neural Networks With  Alpha Synaptic Function, {CoRR}, v(), (2019).">(Comsa et al., 2019)</a> {#temporal-coding-using-with-alpha-synaptic-function}


### <span class="section-num">2.1</span> Motivation {#motivation}

1.  Atemporal networks (think LSTMs) don't have the benefits of
    encoding information directly in the temporal domain
    1.  They remain sequential (require all previous layers of
        computation to produce answer)
    2.  Information in the real world are typically temporal


### <span class="section-num">2.2</span> Key Ideas {#key-ideas}

1.  **Temporal Coding**: Information is encoded in the relative timing of
    neuron spikes. Using temporal coding allows shift of differentiable
    relationship into the temporal domain.
    1.  Find differentiable relationship of the time of postsynaptic
        spike with respect to the weights and times of the presynaptic
        spikes.

2.  **Alpha synaptic transfer function**: Use the SRM, but with the
    exponential decay of form \\(t e^{-t}\\).

3.  **Synchronization pulses:** input-independent spikes, used to
    facilitate transformations of the class boundaries.


### <span class="section-num">2.3</span> The Coding Scheme {#the-coding-scheme}

More salient information about a feature is encode as an earlier
spike in the corresponding input neuron (think time-to-first-spike).

In a classification problem with \\(m\\) inputs and \\(n\\) possible classes:

input
: spike times of \\(m\\) input neurons

output
: index of output neuron that fires first (among the \\(n\\)
    output neurons)


### <span class="section-num">2.4</span> Alpha Synaptic Function {#alpha-synaptic-function}

Incoming exponential synaptic kernels are of the form \\(\epsilon(t) =
\tau^{-1}e^{-\tau t}\\) for some decay constant \\(\tau\\). Potential of
membrane in response to the spike is then \\(u(t) = t e^{-\tau t}\\). It
has a gradual rise, and slow decay.

{{< figure src="/ox-hugo/screenshot_2019-08-30_13-21-44.png" caption="Figure 3: Plot of \\(y = x e^{-10x}, x \in [0, 1]\\)" >}}


### <span class="section-num">2.5</span> Modelling Membrane Potential {#modelling-membrane-potential}

The membrane potential is a weighted sum of the presynaptic inputs:

\begin{equation}
  V\_{mem}(t) = \sum\_{i} w\_i (t-t\_i)e^{\tau(t\_i - t)}
\end{equation}

We can compute the spike time \\(t\_{out}\\) of a neuron by considering the
minimal subset of presynaptic inputs \\(I\_{t\_{out}}\\) with \\(t\_i \le
t\_{out}\\) such that:

\begin{equation} \label{eqn:threshold}
  \sum\_{i \in {I\_{t\_{out}}}} w\_i \left( t\_{out} - t\_{i} \right)
  e^{\tau (t\_i - t\_{out})} = \theta
\end{equation}

<a name="eqn:threshold"></a> has 2 solutions: 1 on rising part of function and
another on decaying part. The spike time is the earlier solution.


### <span class="section-num">2.6</span> Solving for the Equation <a name="eqn:threshold"></a> {#solving-for-the-equation}

Let \\(A\_{I} = \sum\_{i \in I} w\_i e^{\tau t\_i}\\), and \\(B\_{I} = \sum\_{i
\in I} w\_i e^{\tau t\_i} t\_i\\), we can compute:

\begin{equation}
  t\_{out} = \frac{B\_I}{A\_I} - \frac{1}{\tau}W\left( -\tau
  \frac{\theta}{A\_I}e^{\tau \frac{B\_I}{A\_I}} \right)
\end{equation}

where \\(W\\) is the [Lambert W function](https://en.wikipedia.org/wiki/Lambert%5FW%5Ffunction).


### <span class="section-num">2.7</span> The Loss Function {#the-loss-function}

The loss minimizes the spike time of the target neuron, and maximizes
the spike time of non-target neurons (cross-entropy!)

Softmax on the negative values of the spike times \\(o\_{i}\\) (which
are always positive):

\begin{equation}
  p\_j = \frac{e^{- o\_j}}{\sum\_{i=1}^{n} e^{- o\_i}}
\end{equation}

The cross entropy loss \\(L(y\_i, p\_i) = - \sum\_{i=1}^{n} y\_i \ln p\_i\\) is
used.

Changing the weights of the network alters the spike times. We can
compute the exact derivative of the post synaptic spike time wrt any
presynaptic spike time \\(t\_j\\) and its weight \\(w\_j\\) as:

\begin{equation}
  \frac{\partial t\_{out}}{\partial t\_j} = \frac{w\_j e^{t\_j} \left( t\_j
      - \frac{B\_I}{A\_I} + W\_I + 1\right)}{A\_I (1 + W\_I)}
\end{equation}

\begin{equation}
  \frac{\partial t\_{out}}{\partial w\_j} = \frac{e^{t\_j} \left( t\_j
      - \frac{B\_I}{A\_I} + W\_I + 1\right)}{A\_I (1 + W\_I)}
\end{equation}

where

\begin{equation}
  W\_I = W\left( -\frac{\theta}{A\_I}e^{\frac{B\_I}{A\_I}} \right)
\end{equation}


### <span class="section-num">2.8</span> Synchronization Pulses {#synchronization-pulses}

These act as a temporal form of bias, adjusting class boundaries in
the temporal domain. Per network, or per layer biases are added. Spike
times for each pulse are learned with the rest of the parameters of
the network.


### <span class="section-num">2.9</span> Hyperparameters {#hyperparameters}

{{< figure src="/ox-hugo/screenshot_2019-08-30_13-52-12.png" >}}


## <span class="section-num">3</span> Experiments {#experiments}


### <span class="section-num">3.1</span> Boolean Logic Problems {#boolean-logic-problems}

Inputs encoded as individual spike times of two input neurons. All
spikes occur between 0 and 1. True and False values are drawn from
distributions \\([0.0, 0.45]\\) and \\([0.55, 1.0]\\) respectively.

Trained for maximum of 100 epochs, 1000 training examples. Tested on
150 randomly generated test examples. 100% accuracy on all problems.


### <span class="section-num">3.2</span> Non-convolutional MNIST {#non-convolutional-mnist}

784 neurons of the input layer corresponding to pixels of the image.
Darker pixels encoded as earlier spike times. Output of network is the
index of the earliest neuron to spike.

Trained with evolutionary-neural hybrid agents. Best networks achieved
99.96% and 97.96% accuracy on train and test sets.

The network learns two operating modes: slow-regime and fast-regime.
Operating in the slow regime has higher accuracy, but takes more time.
Fast regime makes quick decisions, with the first spike in the output
layer occurring before the mean spike in the hidden layer.

{{< figure src="/ox-hugo/screenshot_2019-08-30_14-05-59.png" >}}


## <span class="section-num">4</span> Running the [Code](https://github.com/google/ihmehimmeli/) {#running-the-code}


### <span class="section-num">4.1</span> Training the Model {#training-the-model}

```text
Ignoring n_inputs flag for MNIST problem. Using 784 inputs.
Network architecture: [784, 340, 10]
Sync pulses: [0.0909091, 0.181818, 0.272727, 0.363636, 0.454545, 0.545455, 0.636364, 0.727273, 0.818182, 0.909091]
Saving the model that performs best on validation set.
Loading MNIST data...
Done loading MNIST data.
Loading MNIST data...
Done loading MNIST data.
Using ThreadPool with 16 threads.

run 0	epoch 0	train_error 0.97	train_acc.% 68.668519	valid acc.% 82.916664	elapsed 52207ms	Sync pulses: [[8.076, 8.23419, 0.189354, 0.338183, 8.56173, 1.18753, 0.407155, 9.37003, 1.0993, 9.06061], [9.09816, 2.53959, 9.10911, 9.25221, 0.243072, 9.12975, 8.56196, 4.01023, 9.1322, 5.54389], [0.0909091, 0.181818, 0.272727, 0.363636, 0.454545, 0.545455, 0.636364, 0.727273, 0.818182, 0.909091]]	LR: 0.00101864	batch sz: 32

run 0	epoch 1	train_error 0.38	train_acc.% 88.842593	valid acc.% 89.650002	elapsed 52526ms	Sync pulses: [[8.92665, 9.10365, 0, 0, 9.08495, 0, 2.74874, 10.427, 6.27137, 10.0179], [9.87262, 4.53841, 9.00944, 10], [0.0909091, 0.181818, 0.272727, 0.363636, 0.454545, 0.545455, 0.636364, 0.727273, 0.818182, 0.909091]]	LR: 0.00101864	batch sz: 32

run 0	epoch 2	train_error 0.29	train_acc.% 91.561111	valid acc.% 91.733330	elapsed 52074ms	Sync pulses: [[10.1715, 9.89629, 0.0372902, 0.0709029, 10.825, 0.105749, 3.72036, 11.2825, 7.87501, 11.2333], [10.3181, 5.71146, 10.3364, 11.5131, 2.54343, 11.4791, 10.4386, 3.77724, 11.4736, 8.09482], [0.0909091, 0.181818, 0.272727, 0.363636, 0.454545, 0.545455, 0.636364, 0.727273, 0.818182, 0.909091]]	LR: 0.00101864	batch sz: 32
```


### <span class="section-num">4.2</span> Testing the Models {#testing-the-models}

```text
[nix-shell:~/projects/ihmehimmeli/build]$ tempcoding/tempcoding_main -model_to_test=tempcoding/networks/slow_network -problem=mnist -n_test=10000 -n_train=60000 -n_validation=0 -decay_rate=0.181769 -mnist_data_path=../data/mnist
W2019-09-01T21:48:01.040269665+08:00 /home/jethro/projects/ihmehimmeli/tempcoding/spiking_problem.cc:417] Ignoring n_inputs flag for MNIST problem. Using 784 inputs.
                                                                                                          IHM_CHECK(file.Open(path, mode)) failed at /home/jethro/projects/ihmehimmeli/tempcoding/file_passthrough_external.cc:97
                                                                                                          Aborted
```


## <span class="section-num">5</span> Thoughts {#thoughts}


### <span class="section-num">5.1</span> My Thoughts {#my-thoughts}

Little information is lost with the temporal encoding scheme, so I'd
expect the spiking neural network to perform well. Especially so,
since there are gradients and gradient-based methods have already
proven to be reliable.

Will augmenting gradients for a spiking neural network be useful in
this scenario? Can we meta-learn for algorithms like STDP or
equilibrium propagation instead?


## <span class="section-num">6</span> Bibliography {#bibliography}


### <span class="section-num">6.1</span> References {#references}


# Bibliography
<a id="gerstner2002spiking"></a>Gerstner, W., & Kistler, W. M., *Spiking neuron models: single neurons, populations, plasticity* (2002), : Cambridge university press. [↩](#fb7c0ce207bba24abc5543768d7e694d)

<a id="queiroz06_reinf_learn_simpl_contr_task"></a>Queiroz, M. S. d., Berrêdo, R. C. d., & Antônio de P\'adua Braga, *Reinforcement learning of a simple control task using the spike response model*, Neurocomputing, *70(1-3)*, 14–20 (2006).  http://dx.doi.org/10.1016/j.neucom.2006.07.002 [↩](#c6103ec10de5867ca179830c28dcf19d)

<a id="comsa19_tempor_codin_spikin_neural_networ"></a>Comsa, I. M., Potempa, K., Versari, L., Fischbacher, T., Gesmundo, A., & Alakuijala, J., *Temporal coding in spiking neural networks with alpha synaptic function*, CoRR, *()*,  (2019).  [↩](#caaddec51f6948e5fea79b6d41c79676)
