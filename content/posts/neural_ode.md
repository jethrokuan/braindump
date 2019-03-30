+++
title = "Neural Ordinary Differential Equations"
author = ["Jethro Kuan"]
lastmod = 2019-03-29T19:49:06+08:00
tags = ["machine-learning", "deep-learning"]
draft = false
math = true
+++

This is a paper review of the NIPS 2018 best paper award-winning paper
[Neural Ordinary Differential Equations](https://arxiv.org/abs/1806.07366).


## Motivation {#motivation}

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
discretize the time steps. Expressing time as a discrete variable can
be unnatural, for example, in processes where events occur at irregular
intervals.

In addition, every layer introduces error that compounds through the neural
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


## Adjoint Sensitivity Analysis {#adjoint-sensitivity-analysis}

Sensitivity analysis defines a new ODE whose solution gives the
gradients to the cost function w.r.t. the parameters, and solves this
secondary ODE. <sup id="a8ae69ab153941fb09916913f187ba63"><a href="#rackauckas19_diffeq" title="Rackauckas, Innes, Ma, , Bettencourt, White, Dixit \&amp; Vaibhav, Diffeqflux.jl - a Julia Library for Neural  Differential Equations, {CoRR}, v(), (2019).">(Rackauckas {\it et al.}, 2019)</a></sup>

# Bibliography
<a id="he15_deep_resid_learn_image_recog"></a>He, K., Zhang, X., Ren, S., & Sun, J., *Deep residual learning for image recognition*, CoRR, *()*,  (2015).  [↩](#8554cd7e8a313143abfac851fd6bbfd2)

<a id="lu17_beyon_finit_layer_neural_networ"></a>Lu, Y., Zhong, A., Li, Q., & Dong, B., *Beyond finite layer neural networks: bridging deep architectures and numerical differential equations*, CoRR, *()*,  (2017).  [↩](#f767e533e2e76ca630e0e8cdac86c399)

<a id="haber17_stabl_archit_deep_neural_networ"></a>Haber, E., & Ruthotto, L., *Stable architectures for deep neural networks*, CoRR, *()*,  (2017).  [↩](#9b9433cdb51d57b66e0e48760365e5e2)

<a id="rackauckas19_diffeq"></a>Rackauckas, C., Innes, M., Ma, Y., Bettencourt, J., White, L., & Dixit, V., *Diffeqflux.jl - a julia library for neural differential equations*, CoRR, *()*,  (2019).  [↩](#a8ae69ab153941fb09916913f187ba63)
