+++
title = "Deep Learning With Bayesian Principles - Emtiyaz Khan"
author = ["Jethro Kuan"]
lastmod = 2020-02-10T22:07:04+08:00
draft = false
+++

Link
: [Mohammad Emtiyaz Khan | Deep Learning with Bayesian Principles · SlidesLive](https://slideslive.com/38921489/deep-learning-with-bayesian-principles)

Speaker
: [Emtiyaz Khan]({{< relref "emtiyaz_khan" >}})


## Goals {#goals}

-   To understand the fundamental principles of learning from data
-   use them to develop learning algorithms

Deep learning assumes that the environment is stationary: e.g. all the
information required to classify images is already available in large
amounts, and these don't change quickly over time.

Wish to design life-long learning systems: Bayesian learning has a
natural update rule to update posterior beliefs given new data.

|                                              | Bayes | DL |
|----------------------------------------------|-------|----|
| Can handle large data and complex models?    | ❌    | ✔️  |
| Scalable training?                           | ❌    | ✔️  |
| Can estimate uncertainty?                    | ✔️     | ❌ |
| Can perform sequential/incremental learning? | ✔️     | ❌ |

We start with the Bayes rule, and derive many existing algorithms
through various approximations.


## Deep Learning {#deep-learning}

Frequentist: Empirical Risk Minimization (ERM) or Maximum Likelihood

\begin{equation}
  \mathrm{min}\_{\theta} l(D, \theta) = \sum\_{i=1}^{N} [y\_i - f\_{\theta}(x\_i)^2]
  + \gamma \theta^T \theta
\end{equation}

Scales well to large data and complex models, good performance in
practice. Does not tell you what the model does not know (uncertainty).


## Bayesian Principles {#bayesian-principles}

1.  Sample \\(\theta \sim p(\theta)\\) : prior
2.  Score \\(p (D| \theta) = \prod\_{i=1}^{N} p(y\_i | f\_{\theta}(x\_i))\\) : likelihood
3.  Normalize:

\begin{equation}
  p(\theta | D) = \frac{p(D|\theta)p(\theta)}{\int p(D|\theta)p(\theta) d \theta}
\end{equation}

This is a global method, integrating over all models, but does not
scale to large problems. **Global properties enable sequential update**.

{{< figure src="/ox-hugo/screenshot2019-12-12_16-18-19_.png" >}}

To scale Bayesian learning, we need to **approximate the posterior
distribution**. Different posterior approximation methods lead to
different learning rules.

{{< figure src="/ox-hugo/screenshot2019-12-12_16-22-00_.png" >}}


## Bayesian Learning Rule {#bayesian-learning-rule}

-   Deep learning rule: \\(\min\_{\theta} l(\theta)\\)
-   Bayesian learning rule: \\(\min\_{q \in Q} E\_{q(\theta)} [l (\theta)] -
      H(q)\\) where \\(H(q)\\) is entropy (regularization)

Bayesian learning rule optimizes over all distributions.

-   Deep learning algo: \\(\theta \leftarrow \theta-\rho H\_{\theta}^{-1} \nabla\_{\theta} \ell(\theta)\\)
-   Bayes learning rule: \\(\lambda \leftarrow \lambda-\rho \nabla\_{\mu}\left(\mathbb{E}\_{q}[\ell(\theta)]-\mathcal{H}(q)\right)\\)
    -   \\(\lambda\\) is the natural parameter, and \\(\mu\\) the expectation
        parameter of an exponential family distribution \\(q\\).

Deep learning algorithms are obtained by choosing an appropriate
approximation \\(q\\), and giving away the global property of the rule.


### Deriving Gradient Descent {#deriving-gradient-descent}

Gradient descent is derived from using a Gaussian with fixed
covariance, and approximating \\(E\_q[l(\theta)] \approx l(m)\\).


## Resources {#resources}

-   <https://emtiyaz.github.io/papers/learning%5Ffrom%5Fbayes.pdf>
