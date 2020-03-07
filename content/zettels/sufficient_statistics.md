+++
title = "Sufficient Statistics"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:27:15+08:00
draft = false
+++

tags
: [§exponential\_family]({{< relref "exponential_family" >}}), [§statistics]({{< relref "statistics" >}})

A statistic \\(t\\) is called a sufficient statistic for \\(\theta\\) for a
given \\(\boldsymbol{y}\\) if:

\begin{equation}
  p(\boldsymbol{y} | t, \theta)=p(\boldsymbol{y} | t)
\end{equation}

Let \\(Y\_{i} \sim \text { Bernoulli }(\theta)\\) for \\(i = 1, \dots, n\\),
and \\(T=\sum\_{i=1}^{n} Y\_{i}\\). Then it can be shown that
\\(t=\sum\_{i=1}^{n} y\_{i}\\) is a sufficient statistic for \\(\theta\\) given
\\(y=\left(y\_{1}, \ldots, y\_{n}\right)\\).


## Fisher-Neyman Theorem {#fisher-neyman-theorem}

The <span class="underline">Fisher-Neyman theorem</span>, or the factorization theorem, helps us
find sufficient statistics more readily. It states that:

A statistic \\(t\\) is sufficient for \\(\theta\\) if and only if there are
functions \\(f\\) and \\(g\\) such that:

\begin{equation}
  p(\boldsymbol{y} | \theta)=f(t, \theta) g(\boldsymbol{y})
\end{equation}

where \\(t=t(\boldsymbol{y})\\).
