+++
title = "Recommender Systems"
author = ["Jethro Kuan"]
draft = false
+++

## Are We Really Making Much Progress? ([Dacrema, Cremonesi, and Jannach, n.d.](#orgb46aaac)) {#are-we-really-making-much-progress--dacrema-cremonesi-and-jannach-n-dot-d-dot--orgb46aaac}

The authors analyzed various recent publications on recommendation
systems techniques, and found that these have:

1.  Weak baselines
2.  Establish weak methods as baselines
3.  Are outperformed by simple, sometimes non-neural approaches

The simple approaches that work well include ItemKNN, a
collaborative-filtering approach that uses k-nearest neighbours and
item-item similarities:

\begin{equation}
  s\_{ij} = \frac{r\_i \dot r\_j}{\lvert r\_i \rvert \lvert r\_j \rvert + h}
\end{equation}

To alleviate these issues:

1.  Use appropriate evaluation methods
2.  Evaluate on appropriate datasets (size is important)
3.  Release reproducible code


## Bibliography {#bibliography}

<a id="orgb46aaac"></a>Dacrema, Maurizio Ferrari, Paolo Cremonesi, and Dietmar Jannach. n.d. “Are We Really Making Much Progress? a Worrying Analysis of Recent Neural Recommendation Approaches.” <http://arxiv.org/abs/1907.06902v1>.