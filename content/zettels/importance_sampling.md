+++
title = "Importance Sampling"
author = ["Jethro Kuan"]
lastmod = 2020-01-04T18:08:45+08:00
draft = false
math = true
+++

Importance sampling does not allow us to generate samples from \\(p(x)\\),
but allows us to estimate the expectation of a function \\(f(x)\\).

Suppose we cannot sample from \\(p(x)\\), but we have a simpler density
\\(q(x)\\) that we can sample from and evaluate to within a multiplicative
constant \\(q^\star(x) = q(x) Z\_q\\).

\begin{aligned}
  E\_{x \sim p(x)}[f(x)] &=\int p(x) f(x) d x \\ &=\int
  \frac{q(x)}{q(x)} p(x) f(x) d x \\ &=\int q(x) \frac{p(x)}{q(x)}
  f(x) d x \\ &=E\_{x \sim q(x)}\left[\frac{p(x)}{q(x)} f(x)\right]
\end{aligned}

\\(R\\) samples are generated from \\(q(x)\\). Values of \\(x\\) where \\(q(x)\\) is
greater than that of \\(p(x)\\) are over-represented, and vice-versa.
Hence, importance weights are introduced:

\begin{equation}
  w\_r \equiv \frac{p^\star(x^{( r)})}{q^\star(x^{( r)})}
\end{equation}

which adjust the importance of each point in the estimator:

\begin{equation}
  \hat{\Phi} = \frac{\sum\_{r} w\_r f(x^{( r)})}{\sum\_r w\_r}
\end{equation}


## Difficulties {#difficulties}

1.  It difficult to estimate how reliable the estimator \\(\hat{\phi}\\) is.
2.  In the case where the proposal density \\(q(x)\\) is small in a region
    where \\(|f(x)p^\star(x)|\\) is large, the estimate would be greatly
    wrong, and it is possible that even after many samples are
    generated, none fall into this region.
