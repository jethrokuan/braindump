+++
title = "Importance Sampling"
author = ["Jethro Kuan"]
draft = false
+++

Importance sampling does not allow us to generate samples from \\(p(x)\\),
but allows us to estimate the expectation of a function \\(f(x)\\).

Suppose we cannot sample from \\(p(x)\\)

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
3.  In high-dimensional problems:
    1.  It will take a long time to acquire samples that lie in the
        typical set of \\(p\\), unless \\(q\\) is a good approximation of \\(p\\).
    2.  Even if able to obtain samples in the typical set, the weights
        associated with these samples are likely to vary by large
        factors because probabilities of points, despite being in the
        typical set, still differ by factors of order
        \\(\mathrm{exp}(\sqrt{N})\\), where \\(N\\) is the number of dimensions.