+++
title = "Metropolis-Hastings Method"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:26:35+08:00
draft = false
+++

In [Importance Sampling]({{< relref "importance_sampling" >}}) and [Rejection Sampling]({{< relref "rejection_sampling" >}}), the proposal
distribution \\(q(x)\\) needs to be similar to \\(p(x)\\). The
Metropolis-Hastings method uses a proposal density \\(q(x;x^(t))\\) that
is dependent on the current state \\(x^(t)\\). A simple distribution such
as a Gaussian centered on \\(x^(t)\\) can be used.


## Method {#method}

1.  Evaluate \\(p^\star(x)\\) for any \\(x\\).
2.  A tentative new state \\(x'\\) is generated from the proposal density \\(q(x';x^{(t)})\\).
3.  Compute \\(a = \frac{p^\star(x')}{p^\star(x^{(t)})} \frac{q(x^{(t)};x')}{q(x';x^{(t)})}\\)
4.  If \\(a \ge 1\\), accept new state and set \\(x^{(t+1)}= x'\\), else set
    \\(x^{(t+1)} = x^{(t)}\\)


## Pros and Cons {#pros-and-cons}

1.  Will still give answers in high-dimensional settings
2.  Lengthy simulations may be needed for convergence, because of the
    quadratic dependence on the lengthscale-ratio. A random walk is
    extremely slow, and should try to be suppressed.


## Suppressing Random Walks {#suppressing-random-walks}

Hamiltonian Monte-Carlo methods make use of gradient information to
reduce random-walk behaviour.


## Backlinks {#backlinks}

-   [Slice Sampling]({{< relref "slice_sampling" >}})
-   [Slice Sampling]({{< relref "slice_sampling" >}})
-   [Gibbs Sampling]({{< relref "gibbs_sampling" >}})
-   [Gibbs Sampling]({{< relref "gibbs_sampling" >}})
