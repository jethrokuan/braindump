+++
title = "Are We Really Making Much Progress? A Worrying Analysis of Recent Neural Recommendation Approaches"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T01:08:41+08:00
draft = false
+++

title
: Are We Really Making Much Progress? A Worrying Analysis of
Recent Neural Recommendation Approaches

paper
: <a id="d3cb4e95df75aa1a78534232726eadd6" href="#dacrema19_are_we_reall_makin_much_progr">(Dacrema et al., 2019)</a>

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

# Bibliography

<a id="dacrema19_are_we_reall_makin_much_progr" target="_blank">Dacrema, M. F., Cremonesi, P., & Jannach, D., _Are we really making much progress? A worrying analysis of recent neural recommendation approaches_, CoRR, _()_, (2019). </a> [↩](#d3cb4e95df75aa1a78534232726eadd6)
