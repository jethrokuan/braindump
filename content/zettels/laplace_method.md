+++
title = "Laplace's Method"
author = ["Jethro Kuan"]
lastmod = 2020-01-02T16:57:54+08:00
draft = false
math = true
+++

Suppose we have an unnormalized probability density \\(P^\star(x)\\),
whose normalizing constant:

\begin{equation}
  Z\_P \equiv \int P^\star(x) dx
\end{equation}

is of interest, and has a peak at point \\(x\_0\\).

We perform a Taylor expansion of \\(\l P^\star(x)\\) at this peak:

\begin{equation}
  \ln P^\star(x) \approxeq \ln P^\star(x\_0) - \frac{c}{2}(x - x\_0)^2 + \dots
\end{equation}

where \\(c = - \frac{\partial^2}{\partial x^2} \ln P^\star(x) \text{
where } {x = x\_0}\\).
