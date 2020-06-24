+++
title = "Are We Really Making Much Progress? A Worrying Analysis of Recent Neural Recommendation Approaches"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:09:09+08:00
draft = false
+++

title
: Are We Really Making Much Progress? A Worrying Analysis of
Recent Neural Recommendation Approaches

paper
: ([Dacrema, Cremonesi, and Jannach 2019](#org284c9f0))

tags
: [Recommender Systems]({{< relref "recommender_systems" >}}), [Machine Learning Papers]({{< relref "ml_papers" >}})

The authors analyzed various recent publications on recommendation
systems techniques, and found that these have:

1.  Weak baselines
2.  Establish weak methods as baselines
3.  Are outperformed by simple, sometimes non-neural approaches

The simple approaches that work well include ItemKNN, a
collaborative-filtering approach that uses k-nearest neighbours and
item-item similarities:

\begin{equation}
s\_{ij} = \frac{r_i \dot r_j}{\lvert r_i \rvert \lvert r_j \rvert + h}
\end{equation}

To alleviate these issues:

1.  Use appropriate evaluation methods
2.  Evaluate on appropriate datasets (size is important)
3.  Release reproducible code

## Bibliography {#bibliography}

<a id="org284c9f0"></a>Dacrema, Maurizio Ferrari, Paolo Cremonesi, and Dietmar Jannach. 2019. “Are We Really Making Much Progress? a Worrying Analysis of Recent Neural Recommendation Approaches.” _CoRR_.
