+++
title = "Empirical Risk Minimization"
author = ["Jethro Kuan"]
draft = false
+++

In [Machine Learning]({{<relref "machine_learning.md" >}}), the training set error is often called the
_empirical error_ or _empirical risk_, and this is the error the
classifier incurs over the sample:

\begin{equation}
L_S(h) = \frac{|\\{i \in [m] : h(x_i) \ne y_i\\}}{m}
\end{equation}

Given a hypothesis class \\(H\\), finding the hypothesis \\(h \in H\\) that
minimizes the empirical risk is a simple learning strategy.
