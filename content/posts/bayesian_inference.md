+++
title = "Bayesian Inference"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:56:54+08:00
tags = ["machine-learning"]
draft = false
+++

## Setup {#setup}

We have some unknown quantity \\(\theta\\) (possibly a vector) that we
wish to learn about, and we observe some data \\(y\\). In Bayesian
statistics, we specify:

1.  A _sampling model_, often expressed as a probability density
    function \\(p(y|\theta)\\), which we call the **likelihood function**
2.  A _prior distribution_ \\(p(\theta)\\), which expresses any prior
    knowledge or beliefs that we have about their values before
    observing the data

## [Scalable Bayesian Inference](https://videoken.com/embed/0HXpnG%5FWnlI) {#scalable-bayesian-inference}

There is an increasingly immense literature focused on big data. Most
of the focus has been on optimization methods. Rapidly obtaining a
point estimate even when sample size \\(n\\) & overall "size" of data is
immense. There has been a huge focus on specific settings - e.g.
linear regression, labelling images, etc. This leads to many people
working on similar problems, while critical open problems remain
untouched.

The end goal is having general probabilistic inference algorithms for
complex data, and being able to handle arbitrarily complex probability models.
We want algorithms to be scalable to huge data, and also be able to
accurately quantify uncertainty.

### Classical Posterior Approximations {#classical-posterior-approximations}

- In conjugate models, one can express the posterior in simple form -
  e.g. as a multivariate Gaussian (see [Exponential Family]({{< relref "exponential_family" >}}))
- In more complex settings, one can approximate the posterior using
  some tractable class of distributions
- Large sample Gaussian approximations:

\begin{equation}
\pi_n(\theta|Y^{(n)}) \approx N(\hat{\mu}\_s, \Sigma_n)
\end{equation}

This is also known as the Bayesian central limit theorem (Bernstein
von Mises). This relies on:

- sample size \\(n\\) being large relative to the number of parameters
  \\(p\\)
- Likelihood being smooth and differentiable
- True value of \\(\theta_0\\) in interior of parameter space
- Related class of approximations include the Laplace approximation
  - Do well to approximating first and second moments, whereas
    variational Bayes may have trouble with 2nd moment

### Alternative Analytic approximations {#alternative-analytic-approximations}

- We can define some approximating class \\(q(\theta)\\), which may be
  something like a product of exponential family distributions.
- We could think to define some discrepancy between \\(q(\theta)\\) and
  \\(\pi_n(\theta)\\), e.g. KL divergence.
- This forms the basis of variational Bayes, expectation-propagation
  and related methods.
- Optimize parameters to minimize discrepancy

See [ICML 2018 Tutorial](http://www.tamarabroderick.com/tutorial%5F2018%5Ficml.html) by Tamara Broderick for an overview. In
general, we have no clue how accurate the approximation is. See also
([Pati, Bhattacharya, and Yang, n.d.](#orgb010328)).

### Markov Chain Monte Carlo {#markov-chain-monte-carlo}

Accurate analytic approximations to the posterior have proven elusive
outside of narrow settings. MCMC and other posterior sampling
algorithms provide an alternative.

MCMC: sequential algorithm to obtain correlated draws from the
posterior, and bypasses the need to approximate the marginal
likelihood.

Often, samples are more useful than an analytic form anyway.

We can get MCMC-based summaries of the posterior for any functional
\\(f(\theta)\\). As the number of samples \\(T\\) increases, these summaries
become more accurate. MCMC constructs a Markov chain with stationary
distribution \\(\pi_n(\theta|Y^{(n)})\\). A _transition kernel_ is carefully
chosen and iterative sampling proceeds. Most MCMC algorithms types of
Metropolis-Hastings (MH):

1.  \\(\theta^\* \sim g(\theta^{(t-1)})\\) sample a proposal
    (\\(\theta^{(t)}\\) is a sample at step t)
2.  Accept a proposal by letting \\(\theta^{(t)} = \theta^\*\\) with
    probability

\begin{equation}
\mathrm{min} \left(1, \frac{\pi(\theta^\*)L(Y^{(n)}|\theta)}{\pi(\theta^{(t-1)})L(Y^{(n)}|\theta^{(t-1)})} \frac{g(\theta^{(t-1)})}{g(\theta^\*)} \right)
\end{equation}

We want to design efficient MH algorithms by choosing good proposals
\\(g\\). \\(g(\cdot)\\) can depend on the previous value of \\(\theta\\) and on
the data but not on further back samples - except in adaptive MH.

For example, in Gibbs sampling, let \\(\theta = (\theta_1, \dots,
\theta_p)'\\) we draw subsets of \\(\theta\\) from their exact conditional
posterior distributions fixing the other.

In random walk, \\(g(\theta^{(t-1)})\\) is a distribution centered on
\\(\theta^{(t-1)}\\) with a tunable covariance.

In HMC/Langevin, we exploit gradient information to generate samples
far from \\(\theta^{(t-1)}\\) having high posterior density.

**MCMC & Computational Bottlenecks**

Time per iteration of MCMC increases with the number of parameters and
unknowns, and also the increase with sample size \\(n\\). This is due to
the cost of sampling proposal & calculating acceptance probability.
This is similar to costs that occur in most optimization algorithms.

MCMC does not produce independent samples from the posterior
distribution \\(\pi_n(\theta)\\). These draws are auto-correlated, and as the
level of correlation increases, the information provided by each
sample decreases. "Slow mixing" Markov chains have highly
autocorrelated draws.

A well designed MCMC algorithm with a good proposal should ideally
exhibit rapid convergence and mixing.

Embarrassingly Parallel MCMC e.g. ([Srivastava et al., n.d.](#orgb9faf9c); [Li, Srivastava, and Dunson, n.d.](#orgdf1e270))

We can replace expensive transition kernels with approximations ([Johndrow et al., n.d.](#org0dc4478)). for
example, we approximate a conditional distribution in Gibbs sampler
with a Gaussian or using a subsample of data, vastly speeding up MCMC
sampling in high-dimensional settings.

### Robustness in Big Data {#robustness-in-big-data}

In standard Bayesian inference, it is assumed that the model is
correct. Small violations of this assumption sometimes have a large
impacts, particularly in large datasets. The ability to carefully
modelling assumptions decreases for big/complex data. This appeals to
tweaking the Bayesian paradigm to be inherently more robust.

### High-p problems {#high-p-problems}

- There is a huge literature proposing different penalties: adaptive
  lasso, fused lasso, elastic net, etc.
- In general, these methods only produce a sparse point estimate are
  dangerous scientifically, and there are many errors in interpreting
  the zero vs non-zero elements
- Parallel Bayesian literature on shrinkage priors - horseshoe,
  generalized double Pareto, Dirichlet-Laplace, etc.

What's an appropriate \\(\pi(\beta)\\) for the high dimensional vector of
coefficients? Most commonly used is a local-global scale mixture of
Gaussians. ([Johndrow, Orenstein, and Bhattacharya, n.d.](#org2a558c9))

### {#}

## Bibliography {#bibliography}

<a id="org0dc4478"></a>Johndrow, James E., Jonathan C. Mattingly, Sayan Mukherjee, and David Dunson. n.d. “Optimal Approximating Markov Chains for Bayesian Inference.” <http://arxiv.org/abs/1508.03387v3>.

<a id="org2a558c9"></a>Johndrow, James E., Paulo Orenstein, and Anirban Bhattacharya. n.d. “Bayes Shrinkage at Gwas Scale: Convergence and Approximation Theory of a Scalable Mcmc Algorithm for the Horseshoe Prior.” <http://arxiv.org/abs/1705.00841v3>.

<a id="orgdf1e270"></a>Li, Cheng, Sanvesh Srivastava, and David B. Dunson. n.d. “Simple, Scalable and Accurate Posterior Interval Estimation.” <http://arxiv.org/abs/1605.04029v2>.

<a id="orgb010328"></a>Pati, Debdeep, Anirban Bhattacharya, and Yun Yang. n.d. “On Statistical Optimality of Variational Bayes.” <http://arxiv.org/abs/1712.08983v1>.

<a id="orgb9faf9c"></a>Srivastava, Sanvesh, Volkan Cevher, Quoc Dinh, and David Dunson. n.d. “WASP: Scalable Bayes via Barycenters of Subset Posteriors.” In _Proceedings of the Eighteenth International Conference on Artificial Intelligence and Statistics_, edited by Guy Lebanon and S. V. N. Vishwanathan, 38:912–20. Proceedings of Machine Learning Research. PMLR. <http://proceedings.mlr.press/v38/srivastava15.html>.
