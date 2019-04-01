+++
title = "Neural Ordinary Differential Equations"
author = ["Jethro Kuan"]
lastmod = 2019-04-01T19:45:50+08:00
tags = ["machine-learning", "deep-learning"]
draft = false
math = true
+++

This is a paper review of the NIPS 2018 best paper award-winning paper
[Neural Ordinary Differential Equations](https://arxiv.org/abs/1806.07366).


## Motivation {#motivation}

In this section, I motivate the benefits of Neural Ordinary
Differential Equations (ODEs). Many physical phenomena can be modeled
naturally with the language of differential equations. These include
populations of predator and prey, or in physics with regards to motion
between bodies. Differential equations shine where it is easier to
model changes in the systems over time rather than the value
themselves.

Consider a simple pendulum, with the dampening effect of air
resistance. One can model the dynamic system using a second-order ODE,
as such:

\begin{equation}
  \ddot{\theta}(t) = - \mu \dot{\theta}(t) - \frac{g}{L}\sin\left( \theta(t) \right)
\end{equation}

There are infinitely many solutions to this ODE, but generally only
one that satisfies the initial conditions at \\(t = 0\\). We'd like to
find \\(\theta(t)\\) for some any \\(t\\). It turns out finding the solutions
to these problems are hard, and numerical methods are required to find
the solutions. These numerical methods range from simplest Euler's
method, to Runge-Kutta methods.

Suppose now that we have some dynamic system (for example, the
pendulum), and we have measured some data from the system
\\(\hat{\theta}(t)\\) (the pendulum's position, at time \\(t\\)). **Can a neural
network learn the dynamics of the system from data?**

Regular neural networks states are transformed by a series of discrete
transformations:

\begin{equation}
\mathbf{h}\_{t+1} = f(\mathbf{h}\_t)
\end{equation}

where \\(f\\) could be of different kinds of layers, including convolutional
and dense layers. \\(t\\) can be interpreted as a time index, transforming
some input data at \\(t=0\\) to an output in a different space at \\(t=N\\),
where there are \\(N\\) layers.

Because neural networks apply discrete transformations, to learn
dynamical systems with (recurrent) neural networks, one must
discretize the time steps, for example through binning the
observations into fixed time intervals. Expressing time as a discrete
variable can be unnatural, for example, in processes where events
occur at irregular intervals. This means that the current
state-of-the-art neural networks are still unable to model continuous
sequential data.


## The Analogy to Residual Neural Networks {#the-analogy-to-residual-neural-networks}

In neural networks, every layer introduces error that compounds through the neural
network, hindering overall performance. The only way to bypass this is
to add more layers, and limit the complexity of each step. This means
that the highest performing neural networks would have infinite
layers, and infinitesimal step-changes, an infeasible task.

To address this problem, deep residual neural networks were presented
<sup id="8554cd7e8a313143abfac851fd6bbfd2"><a href="#he15_deep_resid_learn_image_recog" title="He, Zhang, Ren, \&amp; Sun, Deep Residual Learning for Image Recognition, {CoRR}, v(), (2015).">(He {\it et al.}, 2015)</a></sup>.

Instead of learning \\(h\_{t+1} = f(h\_t, \theta\_t)\\), deep residual neural
networks now learn the difference between the layers: \\(h\_{t+1} = h\_t +
f(h\_t, \theta\_t)\\). For example, feed-forward residual neural networks
have a composition that looks like these:

\begin{align\*}
  h\_1 &= h\_0 + f(h\_0, \theta\_0) \\\\\\
  h\_2 &= h\_1 + f(h\_1, \theta\_1) \\\\\\
  h\_3 &= h\_2 + f(h\_2, \theta\_2) \\\\\\
  \dots \\\\\\
  h\_{t+1} &= h\_t + f(h\_t, \theta\_t) \\\\\\
\end{align\*}

These iterative updates correspond to the infinitesimal step-changes
described earlier, and can be seen to be analogous to an Euler
discretization of a continuous transformation
<sup id="f767e533e2e76ca630e0e8cdac86c399"><a href="#lu17_beyon_finit_layer_neural_networ" title="Lu, Zhong, Li, \&amp; Dong, Beyond Finite Layer Neural Networks: Bridging Deep  Architectures and Numerical Differential Equations, {CoRR}, v(), (2017).">(Lu {\it et al.}, 2017)</a></sup>. In the limit, one can
instead represent the continuous dynamics between the hidden units
using an ordinary differential equation (ODE) specified by some neural
network:

\begin{equation}
  \frac{d\mathbf{h}(t)}{dt} = f(\mathbf{h}(t), t, \theta)
\end{equation}

where the neural network has parameters \\(\theta\\). The equivalent of
having \\(T\\) layers in the network, is finding the solution to this ODE at
time \\(T\\).

The analogy between ODEs and neural networks is not new, and has been
discussed in previous papers
<sup id="f767e533e2e76ca630e0e8cdac86c399"><a href="#lu17_beyon_finit_layer_neural_networ" title="Lu, Zhong, Li, \&amp; Dong, Beyond Finite Layer Neural Networks: Bridging Deep  Architectures and Numerical Differential Equations, {CoRR}, v(), (2017).">(Lu {\it et al.}, 2017)</a></sup><sup>,</sup><sup id="9b9433cdb51d57b66e0e48760365e5e2"><a href="#haber17_stabl_archit_deep_neural_networ" title="Haber \&amp; Ruthotto, Stable Architectures for Deep Neural Networks, {CoRR}, v(), (2017).">(Haber \& Ruthotto, 2017)</a></sup>.
This paper popularized this idea, by proposing a new method for
scalable backpropagation through ODE solvers, allowing end-to-end
training within larger models.


## The NeuralODE Model {#the-neuralode-model}

The Neural ODE model introduces a new type of block the authors term the
ODE block. This block replaces the ResNet-like skip connections, with
an ODE that models the neural network's dynamics:

\begin{equation}
  \frac{d\mathbf{h}(t)}{dt} = f(\mathbf{h}(t), t, \theta)
\end{equation}

This ODE can then be solved using a black box solver, with the output
state being used to compute the loss:

\begin{equation}
  L(\mathbf{z}(t\_1)) = L\left( \mathbf{z}(t\_0) + \int\_{t\_0}^{t\_1}
    f(\mathbf{z}(t), t, \theta)dt \right) =
  L(\textrm{ODESolve}(\mathbf{z}(t\_0), f, t\_0, t\_1, \theta))
\end{equation}

The loss is used to compute gradients, but, as mentioned in the paper,
performing backpropagation through the ODE solver incurs too high a
memory cost. Here, I illustrate why, with a simple example.

Suppose we use the Euler method to solve the ODE. The Euler solver update
step is similar to a ResNet block:

\begin{equation}
  h\_{t+1} =  h\_t + NN(h\_{t})
\end{equation}

Continuous-depth networks will have large \\(t\\). Despite the ODE solvers
being easily differentiable, backpropagating through the neural
network in this case is equivalent to computing and storing the
gradients in a $t$-depth ResNet. With higher-order ODE
solvers, the memory requirements are also higher.

The paper proposes a method of computing gradients by solving a
second, augmented ODE backwards in time, that is applicable to all ODE
solvers.


## Gradient Computation via Adjoint Sensitivity Analysis {#gradient-computation-via-adjoint-sensitivity-analysis}

Sensitivity analysis defines a new ODE whose solution gives the
gradients to the cost function w.r.t. the parameters, and solves this
secondary ODE. <sup id="a8ae69ab153941fb09916913f187ba63"><a href="#rackauckas19_diffeq" title="Rackauckas, Innes, Ma, , Bettencourt, White, Dixit \&amp; Vaibhav, Diffeqflux.jl - a Julia Library for Neural  Differential Equations, {CoRR}, v(), (2019).">(Rackauckas {\it et al.}, 2019)</a></sup>

# Bibliography
<a id="he15_deep_resid_learn_image_recog"></a>He, K., Zhang, X., Ren, S., & Sun, J., *Deep residual learning for image recognition*, CoRR, *()*,  (2015).  [↩](#8554cd7e8a313143abfac851fd6bbfd2)

<a id="lu17_beyon_finit_layer_neural_networ"></a>Lu, Y., Zhong, A., Li, Q., & Dong, B., *Beyond finite layer neural networks: bridging deep architectures and numerical differential equations*, CoRR, *()*,  (2017).  [↩](#f767e533e2e76ca630e0e8cdac86c399)

<a id="haber17_stabl_archit_deep_neural_networ"></a>Haber, E., & Ruthotto, L., *Stable architectures for deep neural networks*, CoRR, *()*,  (2017).  [↩](#9b9433cdb51d57b66e0e48760365e5e2)

<a id="rackauckas19_diffeq"></a>Rackauckas, C., Innes, M., Ma, Y., Bettencourt, J., White, L., & Dixit, V., *Diffeqflux.jl - a julia library for neural differential equations*, CoRR, *()*,  (2019).  [↩](#a8ae69ab153941fb09916913f187ba63)
