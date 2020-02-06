+++
title = "Leaky Integrate-And-Fire"
author = ["Jethro Kuan"]
lastmod = 2020-02-06T12:17:45+08:00
draft = false
+++

tags
: [§spiking\_neural\_networks]({{< relref "spiking_neural_networks" >}})

A Leaky Integrate-and-Fire neuron at layer \\(l\\) and index \\(i\\) can be
described in differential form as:

\begin{equation} \label{eq:lif}
  \tau\_{\mathrm{mem}} \frac{\mathrm{d} U\_{i}^{(l)}}{\mathrm{d} t}=-\left(U\_{i}^{(l)}-U\_{\mathrm{rest}}\right)+R I\_{i}^{(l)}
\end{equation}

where the terms denote:

\\(U\_{i}(t)\\)
: membrane potential

\\(U\_{\text{rest}}\\)
: resting potential

\\(\tau\_{\text{mem}}\\)
: membrane time constant

\\(R\\)
: input resistance

\\(i\_{i}(t)\\)
: input current

\\(U\_{i}\\) acts as a leaky integrator of the input current \\(I\_{i}\\).
Neurons emit spikes when the membrane voltage reaches firing threshold
\\(\theta\\), and resets to resting potential \\(U\_{\text{\rest}}\\).

Equation [eq:lif](#eq:lif) only describes the dynamics of a LIF neuron
sub-threshold.
