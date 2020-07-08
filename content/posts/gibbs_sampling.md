+++
title = "Gibbs Sampling"
author = ["Jethro Kuan"]
lastmod = 2020-07-08T14:55:26+08:00
draft = false
+++

### Backlinks {#backlinks}

- [Slice Sampling]({{< relref "slice_sampling" >}})

Gibbs sampling is a special case of the [Metropolis-Hastings method]({{< relref "metropolis_hastings" >}}),
where a sequence of proposal distributions \\(q\\) is defined in terms of
the conditional distributions of the joint distribution
\\(p(\mathbf{x})\\), and proposals are always accepted.

In the general case of a system with \\(K\\) variables, a single iteration
involves sampling one parameter at a time:

\begin{equation}
\begin{array}{l}{x\_{1}^{(t+1)} \sim P\left(x\_{1} | x\_{2}^{(t)}, x\_{3}^{(t)}, \ldots, x\_{K}^{(t)}\right)} \\ {x\_{2}^{(t+1)} \sim P\left(x\_{2} | x\_{1}^{(t+1)}, x\_{3}^{(t)}, \ldots, x\_{K}^{(t)}\right)} \\ {x\_{3}^{(t+1)} \sim P\left(x\_{3} | x\_{1}^{(t+1)}, x\_{2}^{(t+1)}, \ldots, x\_{K}^{(t)}\right), \text { etc. }}\end{array}
\end{equation}

## Pros and Cons {#pros-and-cons}

1.  Suffers the same defects as [Metropolis-Hastings methods]({{< relref "metropolis_hastings" >}})
2.  No adjustable parameters, so it's easy to start with
