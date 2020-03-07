+++
title = "Empirical Risk Minimization"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:27:01+08:00
draft = false
+++

In [Machine Learning]({{< relref "machine_learning" >}}), the training set error is often called the
_empirical error_ or _empirical risk_, andn this is the error the
classifier incurs over the sample:

\begin{equation}
L\_S(h) = \frac{|\\{i \in [m] : h(x\_i) \ne y\_i\\}}{m}
\end{equation}

Given a hypothesis class \\(H\\), finding the hypothesis \\(h \in H\\) that
minimizes the empirical risk is a simple learning strategy.


## Backlinks {#backlinks}

-   [Machine Learning]({{< relref "machine_learning" >}})
-   [PAC Learning]({{< relref "pac_learning" >}})
