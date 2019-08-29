+++
title = "Temporal Coding in Spiking Neural Networks with Alpha Synaptic Function (Review)"
author = ["Jethro Kuan"]
lastmod = 2019-08-29T13:03:11+08:00
draft = false
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
- <span class="section-num">2</span> [Bibliography](#bibliography)
    - <span class="section-num">2.1</span> [References](#references)

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


## <span class="section-num">2</span> Bibliography {#bibliography}


### <span class="section-num">2.1</span> References {#references}


# Bibliography
<a id="gerstner2002spiking"></a>Gerstner, W., & Kistler, W. M., *Spiking neuron models: single neurons, populations, plasticity* (2002), : Cambridge university press. [↩](#fb7c0ce207bba24abc5543768d7e694d)

<a id="queiroz06_reinf_learn_simpl_contr_task"></a>Queiroz, M. S. d., Berrêdo, R. C. d., & Antônio de P\'adua Braga, *Reinforcement learning of a simple control task using the spike response model*, Neurocomputing, *70(1-3)*, 14–20 (2006).  http://dx.doi.org/10.1016/j.neucom.2006.07.002 [↩](#c6103ec10de5867ca179830c28dcf19d)
