+++
title = "Bayesian Deep Learning"
author = ["Jethro Kuan"]
tags = ["bayes", "deep-learning"]
draft = false
+++

## The Case For Bayesian Learning ([Wilson, n.d.](#org28e991c)) {#the-case-for-bayesian-learning--wilson-n-dot-d-dot--org28e991c}

-   Vague parameter prior + structured model (e.g. CNN) = structured
    function prior!
-   The success of ensembles encourages Bayesians, since ensembles
    approximate the Bayesian Model Average


## Bayesian Perspective on Generalization ([Smith and Le, n.d.](#org941601c)) {#bayesian-perspective-on-generalization--smith-and-le-n-dot-d-dot--org941601c}

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
integral is dominated by the region near the minimum \\(w\_0\\), we can
estimate the evidence by Taylor expanding \\(C(w;M) \approx C(w\_0) +
C''(w\_0)(w-w\_0)^2\\).

\begin{equation}
  P(y|x;M) = \mathrm{exp} \left\\{ -\left( C(w\_0) +
      \frac{1}{2}ln(C''(w\_0)/\lambda) \right) \right\\}
\end{equation}

In models with many parameters, \\(P(y|x;M) \approx
\frac{\lambda^{p/2}f^{-C(w\_0)}} {| \nabla \nabla C(w) |\_{w\_0}^{1 / 2}}\\),
where the denominator can be thought of as an "Occam factor", causing
the network to prefer broad minima.


## Bibliography {#bibliography}

<a id="org941601c"></a>Smith, Sam, and Quoc V. Le. n.d. “A Bayesian Perspective on Generalization and Stochastic Gradient Descent.” <https://openreview.net/pdf?id=BJij4yg0Z>.

<a id="org28e991c"></a>Wilson, Andrew Gordon. n.d. “The Case for Bayesian Deep Learning.”