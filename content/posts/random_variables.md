+++
title = "Random Variables"
author = ["Jethro Kuan"]
lastmod = 2020-05-29T21:01:23+08:00
tags = ["statistics"]
draft = false
+++

tags
: [§statistics]({{< relref "statistics" >}})

## Introduction {#introduction}

It frequently occurs that in performing an experiment, we are mainly
interested in some function of the outcome rather than the outcome
itself. These quantities of interest, are real-valued functions
defined on the sample space \\(\mathcal{S}\\), known as _random variables_.

## Discrete Random Variables {#discrete-random-variables}

For a discrete random variable, we define the probability mass
function \\(p(a)\\) of \\(X\\) by:

\begin{equation} \label{dfn:pmf}
p(a) = P(X = a)
\end{equation}

The probability mass function \\(p(a)\\) is positive for at most a
countable number of values of \\(a\\).

Since \\(X\\) must take on one of the values \\(x_i\\), we have
\\(\sum\_{i=1}^{\infty} p(x_i) = 1\\).

The cumulative distribution function \\(F\\) can be expressed in terms of
\\(p(a)\\) by:

\begin{equation} \label{dfn:cdf}
F(a) = \sum\_{\text{all } x_i \le a} p(x_i)
\end{equation}

### Bernoulli Random Variable {#bernoulli-random-variable}

A random variable \\(X\\) is said to be a Bernoulli random variable if its
probability mass function is given by:

\begin{equation}
p(0) = P(X = 0) = 1 - p, p(1) = P(X = 1) = p
\end{equation}

This corresponds to the outcome of a trial with binary outcomes.

### Binomial Random Variable {#binomial-random-variable}

Suppose \\(n\\) independent trials, each of which have binary outcomes and
result in a success with probability \\(p\\). If \\(X\\) represents the number
of successes that occur in the \\(n\\) trials, then \\(X\\) is a binomial
random variable denoted by \\(Bin(n, p)\\).

The pmf of a binomial random variable is given by:

\begin{equation}
p(i) = P(X = i) = {n \choose i}p^i (1-p)^i, i = 0,1,\dots,n
\end{equation}

### Geometric Random Variable {#geometric-random-variable}

Suppose that independent trials, each having probability \\(p\\) of being
a success, are performed until a success occurs. If we let \\(X\\) be the
number of trials required until the first success, then \\(X\\) is said to
be a geometric variable with parameter \\(p\\).

\begin{equation}
p(n) = P(X = n) = (1-p)^{n-1}p
\end{equation}

### Poisson Random Variable {#poisson-random-variable}

A random variable \\(X\\), taking on one of the values \\(0, 1, 2, \dots\\) is
said to be a poisson random variable with parameter \\(\lambda\\) if for
some \\(\lambda > 0\\),

\begin{equation}
p(i) = p(X = i) = e^{-\lambda}\frac{\lambda^i}{i!}, i = 0, 1, \dots
\end{equation}

An important property of the Poisson random variable is that it may be
used to approximate a binomial random variable when the binomial
parameter \\(n\\) is large and \\(p\\) is small.

## Continuous Random Variables {#continuous-random-variables}

Continuous random variables have an uncountable set of possible
values.

\begin{equation}
P[X \in B] = \int\_{B}f(x)dx
\end{equation}

The cumulative distribution \\(F(\cdot)\\) and the probability density
function is expressed by:

\begin{equation}
F(a) = P(X \in (-\infty, a]) = \int\_{-\infty}^{a} f(x) dx
\end{equation}

### Uniform Random Variable {#uniform-random-variable}

\\(X\\) is a uniform random variable on the interval \\((a, b)\\) if its
probability density function is given by:

\begin{equation}
f(x) = \begin{cases}
\frac{1}{b - a} & a < x < b \\\\\\
0 & \text{otherwise}
\end{cases}
\end{equation}

### Exponential Random Variables {#exponential-random-variables}

\begin{equation}
f(x) = \begin{cases}
\lambda e^{-\lambda x} & x \ge 0 \\\\\\
0 & x < 0
\end{cases}
\end{equation}

\begin{equation}
F(a) = 1 - e^{-\lambda }, a \ge 0
\end{equation}

### Gamma Random Variables {#gamma-random-variables}

\begin{equation}
f(x) =
\begin{cases}
\frac{\lambda^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\lambda
x} & x \ge 0 \\\\\\
0 & x < 0
\end{cases}
\end{equation}

The quantity \\(\Gamma(\alpha)\\) is called the gamma function and is
defined by:

\begin{equation}
\Gamma(\alpha) = \int\_{0}^{\infty}e^{-x}x^{\alpha-1}dx
\end{equation}

and \\(\Gamma(n) = (n - 1)!\\) for some integral \\(\alpha = n\\).

### Normal Random Variables {#normal-random-variables}

\begin{equation}
f(x) = \frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}}, -\infty < x < \infty
\end{equation}

if \\(X ~ N(\mu, \sigma^2)\\) and \\(Y = aX + b\\), then \\(Y ~ N(a\mu + b, a^2\sigma^2)\\).

## Expectation of Random Variables {#expectation-of-random-variables}

The expected value of a discrete random variable \\(X\\) is defined by:

\begin{equation}
E(X) = \sum\_{x:p(x)>0} x p(x)
\end{equation}

and for a continuous random variable is defined similarly:

\begin{equation}
E(X) = \int\_{-\infty}^{\infty} x f(x) dx
\end{equation}

Suppose we are interested in getting the expected value of a function
of a random variable \\(E(g(X))\\). One way is to obtain the distribution
of \\(g(X)\\), and compute \\(E(g(X))\\) by definition of expectation.

\begin{equation}
E(g(X)) = \sum\_{x:p(x)>0} g(x) p(x)
\end{equation}

We also have linearity of expectations:

\begin{equation}
E(aX + b) = aE(X) + b
\end{equation}

\\(E(X)\\) is the first moment of \\(X\\), and \\(E(X^n)\\) is the nth moment of
\\(X\\).

The variance of \\(X\\), \\(Var(X)\\) measures the expected square of the
deviation of \\(X\\) from its expected value:

\begin{equation}
Var(X) = E((X-E(X))^2) = E(X^2) - (E(X))^2
\end{equation}

## Jointly Distributed Random Variables {#jointly-distributed-random-variables}

The joint cumulative probability distribution function of \\(X\\) and \\(Y\\)
is given by:

\begin{equation}
F(a, b) = P(X \le a, Y \le b), -\infty < a , b < \infty
\end{equation}

The distribution of \\(X\\) can then be obtained from the joint
distribution of \\(X\\) and \\(Y\\) as follows:

\begin{align}
F_X(a) &= P(X \le a, Y \le \infty) \\\\\\
&= F(a, \infty)
\end{align}

## Covariance and Variance of Sums of Random Variables {#covariance-and-variance-of-sums-of-random-variables}

The covariance of any 2 random variables \\(X\\) and \\(Y\\), denoted by
\\(Cov(X,Y)\\), is defined by:

\begin{align}
Cov(X,Y) &= E\left[ (X - E[X])(Y - E[Y]) \right] \\\\\\
&= E[XY] - E[X]E[Y]
\end{align}

If \\(X\\) and \\(Y\\) are independent, then \\(Cov(X,Y) = 0\\).

Some properties of covariance:

1.  \\(Cov(X,X) = Var(X)\\)
2.  \\(Cov(X,Y) = Cov(Y,X)\\)
3.  \\(Cov(cX, Y) = c Cov(X,Y)\\)
4.  \\(Cov(X, Y+Z) = Cov(X,Y) + Cov(X,Z)\\)
