+++
title = "Neural Ordinary Differential Equations"
author = ["Jethro Kuan"]
lastmod = 2019-03-13T17:44:00+08:00
tags = ["machine-learning", "deep-learning"]
draft = false
math = true
+++

## Introduction {#introduction}

A traditional neural network is composed of stacked layers of simple
computational nodes, that work together to find patterns in data.
Every layer introduces error that compounds through the neural
network, hindering overall performance. The only way to bypass this is
to add more layers, and limit the complexity of each step. This means
that the highest performing neural networks would have infinite
layers, and infinitesimal step-changes, an infeasible task.

This problem was addressed by Deep Residual Learning
<sup id="8554cd7e8a313143abfac851fd6bbfd2"><a href="#he15_deep_resid_learn_image_recog" title="He, Zhang, Ren, \&amp; Sun, Deep Residual Learning for Image Recognition, {CoRR}, v(), (2015).">(He {\it et al.}, 2015)</a></sup>. Instead of learning \\(h\_{n+1} =
F(h\_n)\\), we now learn the difference between the layers: \\(h\_{n+1} =
h\_n + F(h\_n)\\).

Feed-forward residual neural networks have a composition that looks like these:

\begin{align\*}
  z\_1 &= z\_0 + f(z\_0, \theta\_0) \\\\\\
  z\_2 &= z\_1 + f(z\_1, \theta\_1) \\\\\\
  z\_3 &= z\_2 + f(z\_2, \theta\_2) \\\\\\
  \dots \\\\\\
  z\_{t+1} &= z\_t + f(z\_t, \theta\_t) \\\\\\
\end{align\*}

In the limit of infinitesimal change, Neural ODEs can replace these
layers entirely with ODEs.

Neural ODEs scrap the need for layers entirely, by replacing them with
equations.

Traditional deep learning methods require clear stages of observation,
while a continuous ODE solver eliminates this problem.

In the limit (of infinitesimal change), we can parameterize the
continuous dynamics of hidden units using an ordinary differential
equation (ODE) specified by a neural network:

\begin{equation}
  \frac{dz(t)}{dt} = f(z(t), t, \theta)
\end{equation}

That is, the equivalent of having T layers in the network, is finding
the solution to this ODE at time T.


## Adjoint Sensitivity Analysis {#adjoint-sensitivity-analysis}

Sensitivity analysis defines a new ODE whose solution gives the
gradients to the cost function w.r.t. the parameters, and solves this
secondary ODE. <sup id="a8ae69ab153941fb09916913f187ba63"><a href="#rackauckas19_diffeq" title="Rackauckas, Innes, Ma, , Bettencourt, White, Dixit \&amp; Vaibhav, Diffeqflux.jl - a Julia Library for Neural  Differential Equations, {CoRR}, v(), (2019).">(Rackauckas {\it et al.}, 2019)</a></sup>

# Bibliography
<a id="he15_deep_resid_learn_image_recog"></a>He, K., Zhang, X., Ren, S., & Sun, J., *Deep residual learning for image recognition*, CoRR, *()*,  (2015).  [↩](#8554cd7e8a313143abfac851fd6bbfd2)

<a id="rackauckas19_diffeq"></a>Rackauckas, C., Innes, M., Ma, Y., Bettencourt, J., White, L., & Dixit, V., *Diffeqflux.jl - a julia library for neural differential equations*, CoRR, *()*,  (2019).  [↩](#a8ae69ab153941fb09916913f187ba63)
