+++
title = "Bayesian Inference"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:27:14+08:00
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

-   In conjugate models, one can express the posterior in simple form -
    e.g. as a multivariate Gaussian (see [§exponential\_family]({{< relref "exponential_family" >}}))
-   In more complex settings, one can approximate the posterior using
    some tractable class of distributions
-   Large sample Gaussian approximations:

\begin{equation}
  \pi\_n(\theta|Y^{(n)}) \approx N(\hat{\mu}\_s, \Sigma\_n)
\end{equation}

This is also known as the Bayesian central limit theorem (Bernstein
von Mises). This relies on:

-   sample size \\(n\\) being large relative to the number of parameters
    \\(p\\)
-   Likelihood being smooth and differentiable
-   True value of \\(\theta\_0\\) in interior of parameter space
-   Related class of approximations include the Laplace approximation
    -   Do well to approximating first and second moments, whereas
        variational Bayes may have trouble with 2nd moment


### Alternative Analytic approximations {#alternative-analytic-approximations}

-   We can define some approximating class \\(q(\theta)\\), which may be
    something like a product of exponential family distributions.
-   We could think to define some discrepancy between \\(q(\theta)\\) and
    \\(\pi\_n(\theta)\\), e.g. KL divergence.
-   This forms the basis of variational Bayes, expectation-propagation
    and related methods.
-   Optimize parameters to minimize discrepancy

See [ICML 2018 Tutorial](http://www.tamarabroderick.com/tutorial%5F2018%5Ficml.html) by Tamara Broderick for an overview. In
general, we have no clue how accurate the approximation is. See also
<a id="2c492bb886c456a5902b643d9a6547e6" href="#pati17_statis_optim_variat_bayes">(Pati et al., 2017)</a>.


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
distribution \\(\pi\_n(\theta|Y^{(n)})\\). A _transition kernel_ is carefully
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

For example, in Gibbs sampling, let \\(\theta = (\theta\_1, \dots,
\theta\_p)'\\) we draw subsets of \\(\theta\\) from their exact conditional
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
distribution \\(\pi\_n(\theta)\\). These draws are auto-correlated, and as the
level of correlation increases, the information provided by each
sample decreases. "Slow mixing" Markov chains have highly
autocorrelated draws.

A well designed MCMC algorithm with a good proposal should ideally
exhibit rapid convergence and mixing.

Embarrassingly Parallel MCMC e.g. <a id="fe703421bbe5a5c7e4c07c7126a629f3" href="#pmlr-v38-srivastava15">(Sanvesh Srivastava et al., 2015)</a><a>, </a><a id="3c24d71d7ae6f354df816d37ea172f1a" href="#li16_simpl_scalab_accur_poster_inter_estim">(Li et al., 2016)</a>

We can replace expensive transition kernels with approximations <a id="ab108353672c4542f6a76b91c9eebcbc" href="#johndrow15_optim_approx_markov_chain_bayes_infer">(Johndrow et al., 2015)</a>. for
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

-   There is a huge literature proposing different penalties: adaptive
    lasso, fused lasso, elastic net, etc.
-   In general, these methods only produce a sparse point estimate are
    dangerous scientifically, and there are many errors in interpreting
    the zero vs non-zero elements
-   Parallel Bayesian literature on shrinkage priors - horseshoe,
    generalized double Pareto, Dirichlet-Laplace, etc.

What's an appropriate \\(\pi(\beta)\\) for the high dimensional vector of
coefficients? Most commonly used is a local-global scale mixture of
Gaussians. <a id="c5f035041f058fd1352e35f072c0a5d4" href="#johndrow17_bayes_shrin_at_gwas_scale">(Johndrow et al., 2017)</a>


###  {#}

# Bibliography
<a id="pati17_statis_optim_variat_bayes" target="_blank">Pati, D., Bhattacharya, A., & Yang, Y., *On statistical optimality of variational bayes*, CoRR, *()*,  (2017). </a> [↩](#2c492bb886c456a5902b643d9a6547e6)

<a id="pmlr-v38-srivastava15" target="_blank">Srivastava, S., Cevher, V., Dinh, Q., & Dunson, D., *WASP: Scalable Bayes via barycenters of subset posteriors*, In G. Lebanon, & S. V. N. Vishwanathan, Proceedings of the Eighteenth International Conference on Artificial Intelligence and Statistics (pp. 912–920) (2015). San Diego, California, USA: PMLR.</a> [↩](#fe703421bbe5a5c7e4c07c7126a629f3)

<a id="li16_simpl_scalab_accur_poster_inter_estim" target="_blank">Li, C., Srivastava, S., & Dunson, D. B., *Simple, scalable and accurate posterior interval estimation*, CoRR, *()*,  (2016). </a> [↩](#3c24d71d7ae6f354df816d37ea172f1a)

<a id="johndrow15_optim_approx_markov_chain_bayes_infer" target="_blank">Johndrow, J. E., Mattingly, J. C., Mukherjee, S., & Dunson, D., *Optimal approximating markov chains for bayesian inference*, CoRR, *()*,  (2015). </a> [↩](#ab108353672c4542f6a76b91c9eebcbc)

<a id="johndrow17_bayes_shrin_at_gwas_scale" target="_blank">Johndrow, J. E., Orenstein, P., & Bhattacharya, A., *Bayes shrinkage at gwas scale: convergence and approximation theory of a scalable mcmc algorithm for the horseshoe prior*, CoRR, *()*,  (2017). </a> [↩](#c5f035041f058fd1352e35f072c0a5d4)


## Backlinks {#backlinks}

-   [Arguments Against Bayesian Inference]({{< relref "arguments_against_bayesian_inference" >}})
-   [Non-informative Priors]({{< relref "20200216233133" >}})
-   [Interval Estimation in Bayesian Statistics]({{< relref "interval_estimation_bayesian" >}})
-   [Jeffreys Prior]({{< relref "20200216233737" >}})
