+++
title = "Bayesian Deep Learning"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:09:28+08:00
tags = ["bayes", "deep-learning"]
draft = false
+++

### Backlinks {#backlinks}

- [Deep Learning With Bayesian Principles - Emtiyaz Khan]({{< relref "emti_dl_with_bayesian_principles" >}})

## The Case For Bayesian Learning ([Wilson 2019](#org102f9dd)) {#the-case-for-bayesian-learning--wilson-2019--org102f9dd}

- Vague parameter prior + structured model (e.g. CNN) = structured
  function prior!
- The success of ensembles encourages Bayesians, since ensembles
  approximate the Bayesian Model Average

## Bayesian Perspective on Generalization ([Smith and Le 2018](#org02ca4a8)) {#bayesian-perspective-on-generalization--smith-and-le-2018--org02ca4a8}

Bayesian model comparisons were first made on Neural Networks by
Mackay. Consider a classification model \\(M\\) with a single parameter
\\(w\\), training inputs \\(x\\) and training labels \\(y\\). We can infer a
posterior probability distribution over the parameter by applying
Bayes theorem:

\begin{equation}
P(w|y,x;M) = \frac{P(y|w,x;M)P(w;M)}{P(y|x;M)}
\end{equation}

The assumption of a Gaussian prior for \\(P(w;M)\\) leads to a posterior
density of the parameter given the new training data \\(P(w|y;x;M)
\propto \sqrt{\lambda/2\pi}e^{-C(w;M)}\\), where \\(C(w;M) = H(w;M) +
\lambda w^2 / 2\\), which is the L2 regularized cross-entropy.

We can evaluate the normalizing constant, \\(P(y|x;M) =
\sqrt{\frac{\lambda}{2\pi}} \int dw e^{-C(w;M)}\\). Assuming that the
integral is dominated by the region near the minimum \\(w_0\\), we can
estimate the evidence by Taylor expanding \\(C(w;M) \approx C(w_0) +
C''(w_0)(w-w_0)^2\\).

\begin{equation}
P(y|x;M) = \mathrm{exp} \left\\{ -\left( C(w_0) +
\frac{1}{2}ln(C''(w_0)/\lambda) \right) \right\\}
\end{equation}

In models with many parameters, \\(P(y|x;M) \approx
\frac{\lambda^{p/2}f^{-C(w_0)}} {| \nabla \nabla C(w) |\_{w_0}^{1 / 2}}\\),
where the denominator can be thought of as an "Occam factor", causing
the network to prefer broad minima.

## Bibliography {#bibliography}

<a id="org02ca4a8"></a>Smith, Sam, and Quoc V. Le. 2018. “A Bayesian Perspective on Generalization and Stochastic Gradient Descent.”

<a id="org102f9dd"></a>Wilson, Andrew Gordon. 2019. “The Case for Bayesian Deep Learning.” _NYU Courant Technical Report_.
