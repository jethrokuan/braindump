+++
title = "Hopfield Network"
author = ["Jethro Kuan"]
tags = ["machine-learning"]
draft = false
+++

A Hopfield network is a fully connected [Ising model]({{<relref "ising_models.md" >}}) with a symmetric
weight matrix, \\(\mathbf{W} = \mathbf{W^T}\\). These weights plus the
bias term \\(\mathbf{b}\\), can be learned from training data, using
(approximate) maximum likelihood.

Hopfield networks can be used as an associative memory, or content
addressable memory.

Suppose we train on a set of fully observed bit vectors, corresponding
to patterns we want to memorize. At test time, we present a partial
pattern to the network. We would like to estimate the missing
variables; this is called _pattern completion_.

Since exact inference is intractable in this model, it is standard to
use a coordinate descent algorithm known as iterative conditional
modes (ICM), which just sets each node to its most likely (lowest
energy) state, given all its neighbours. The full conditional can be
shown to be:

\begin{equation}
p(y_s = 1 | \mathbf{y\_{-s}}, \mathbf{\theta}) =
\textrm{sigm}(\mathbf{w\_{s,:}}^T y\_{-s} + b_s)
\end{equation}

Picking the most probable state amounts to using the rule \\(y_s^\* = 1\\)
if \\(\sum\_{t} w\_{st}y_t > b_s\\) and \\(y_s^ = 0\\) otherwise.

Boltzmann machines generalize the Hopfield/Ising model by including
some hidden nodes, which makes the model representationally more
powerful. Inference in such models often uses Gibbs sampling, which is
a stochastic version of ICM.

## Binary Hopfield network {#binary-hopfield-network}

Our convention in general will be that \\(w\_{ij}\\) denotes the connection
from neuron \\(j\\) to neuron \\(i\\).

A Hopfield network consists of \\(I\\) neurons. They are fully connected
through symmetric, bidirectional connections with weights \\(w\_{ij} =
w\_{ji}\\). \\(w\_{ii} = 0\\) for all \\(i\\). The activity of neuron \\(i\\) is
denoted by \\(x_i\\).

a Hopfield network's activity rule is for each neuron to update its
state as if it were a single neuron with the threshold activation
function:

\begin{equation}
x(a) = \Theta(a) = \begin{cases}
1 & a \ge 0 \\\\\\
-1 & a < 0
\end{cases}
\end{equation}

Since there is feedback in a Hopfield network (every neurons' output
is an input to all other neurons), we will have to specify an order
for the updates to occur. These updates may be synchronous or
asynchronous.

For synchronous updates, all neurons compute their activations:

\begin{equation}
a_i = \sum\_{j} w\_{ij} x_j
\end{equation}

and update their states simultaneously to \\(x_i = \Theta(a_i)\\).

For asynchronous updates, one neuron at a time computes its
activations and updates its state. The sequence of updates may be a
fixed or random sequence.

The learning rule is intended to make a set of desired memories \\(\\{
\mathbf{x^{(n)}}\\}\\) be stabel states of the Hopfield network's
activity rule. Each memory is a binary pattern, with \\(x_i \in \\{ -1,
+1\\}\\).

The Hebb's rule of learning corresponds to the sum of outer products:

\begin{equation}
w\_{ij} = \eta \sum\_{n} x_i^{(n)}x_j^{(n)}
\end{equation}

where \\(\eta\\) is a constant, commonly chosen to be \\(\frac{1}{n}\\).
