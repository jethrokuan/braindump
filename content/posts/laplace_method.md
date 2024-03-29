+++
title = "Laplace's Method"
author = ["Jethro Kuan"]
draft = false
+++

Suppose we have an unnormalized probability density \\(P^\star(x)\\),
whose normalizing constant:

\begin{equation}
  Z\_P \equiv \int P^\star(x) dx
\end{equation}

is of interest, and has a peak at point \\(x\_0\\).

We perform a Taylor expansion of \\(\ln P^\star(x)\\) at this peak:

\begin{equation}
  \ln P^\star(x) \approxeq \ln P^\star(x\_0) - \frac{c}{2}(x - x\_0)^2 + \dots
\end{equation}

where \\(c = - \frac{\partial^2}{\partial x^2} \ln P^\star(x) \text{
where } {x = x\_0}\\).

\\(P^\star(x)\\) can be approximated by an unnormalized Gaussian:

\begin{equation}
  Q^\star(x) \equiv P^\star(x\_0) \textrm{exp}\left[- \frac{c}{2} (x-x\_0)^2\right]
\end{equation}

and the normalizing constant is approximated with:

\begin{equation}
  Z\_Q \equiv P^\star(x\_0) \sqrt{\frac{2\pi}{c}}
\end{equation}

This is easily generalizable to a K-dimensional space \\(\mathbf{x}\\).