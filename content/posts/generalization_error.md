+++
title = "Generalisation Error"
author = ["Jethro Kuan"]
draft = false
+++

We can define generalisation error as the discrepancy between \\(E\_in\\)
and \\(E\_out\\). The Hoeffding Inequality characterises the generalization
error with a probabilistic bound:

\begin{align}
P[|E\_{in}(g) - E\_{out}(g)| > \epsilon] \le 2Me^{-2\epsilon^2N}
\end{align}

Pick a tolerance level \\(\delta\\), and assert with probability
\\(1-\delta\\) that

\begin{align}
  E\_{out}(g) \le E\_{in}(g) + \sqrt{\frac{1}{2N}\ln \frac{2M}{\delta}}
\end{align}

Notice the error bound depends on \\(M\\), the size of the hypothesis set \\(H\\). Most
learning models have infinite \\(H\\), including the simple perceptron. Hence, to
study generalisation in such models, we need to derive a counterpart that deals
with infinite \\(H\\).

Notice that the \\(M\\) factor was obtained by taking the disjunction of events. Let
\\(B\_m\\) be the bad event that \\(|E\_{in}(h\_m) - E\_{out}(h\_m)| > \epsilon\\). Notice
that these bad events are often strongly overlapping, and the disjunction of
these events form a much smaller area.

The mathematical theory of generalisation hinges on this observation.
Upon accounting for the overlaps of different hypotheses, we will be
able to replace the number of hypotheses \\(M\\) with an effective finite
number, even while \\(M\\) is infinite.