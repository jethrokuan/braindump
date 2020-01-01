+++
title = "Gibb's Inequality"
author = ["Jethro Kuan"]
lastmod = 2020-01-01T15:15:17+08:00
draft = false
math = true
+++

The relative entropy or [§kl\_divergence]({{< relref "kl_divergence" >}}) between two probability
distributions \\(P(x)\\) and \\(Q(x)\\) defined over the same alphabet
\\(\mathcal{A}\_X\\) is:

\begin{equation}
  D\_{\textrm{KL}}(P||Q) = \sum\_{x} P(x) \log \frac{P(x)}{Q(x)}
\end{equation}

Gibb's Inequality states that:

\begin{equation}
  D\_{\textrm{KL}}(P||Q) \ge 0
\end{equation}

for any \\(P\\) and \\(Q\\).
