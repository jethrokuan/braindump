+++
title = "Bayesian Deep Learning"
author = ["Jethro Kuan"]
lastmod = 2019-02-09T23:06:11+08:00
tags = ["bayes", "deep-learning"]
draft = false
math = true
+++

## Bayesian Perspective on Generalization <sup id="b9a995db75df332d755d4fb40282c70d"><a href="#smith_quoc_bayes_generalization_sgd" title="Sam Smith \&amp; Quoc Le, A Bayesian Perspective on Generalization and Stochastic Gradient Descent, in edited by (2018)">(Sam Smith \& Quoc Le, 2018)</a></sup> {#bayesian-perspective-on-generalization}

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

# Bibliography
<a id="smith_quoc_bayes_generalization_sgd"></a>Smith, S., & Le, Q. V., *A bayesian perspective on generalization and stochastic gradient descent*, In ,  (pp. ) (2018). : . [↩](#b9a995db75df332d755d4fb40282c70d)
