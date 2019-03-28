+++
title = "Expectation Maximization and Mixture Models"
author = ["Jethro Kuan"]
lastmod = 2019-03-28T15:32:52+08:00
tags = ["machine-learning"]
draft = false
math = true
+++

## Introduction {#introduction}

If we define a joint distribution over observed and latent variables,
the corresponding distribution of the observed variables alone is
obtained by marginalization. This allows relatively complex marginal
distributions over observed variables to be expressed in terms of more
tractable joint distributions over the expanded space of observed and
latent variables.

Mixture distributions, such as the Gaussian mixture, can be
interpreted in terms of discrete latent variables. These mixture
models are also useful in clustering data. We first discuss the
problem of finding clusters using a non-probabilistic technique called
K-means clustering. Then we introduce the latent variable view of
mixture distributions where the discrete latent variables can be
interpreted as defining assignments of data points to specific
components of the mixture.

The EM algorithm is the general approach to finding maximum likelihood
estimators in latent variable models. We will see that K-means
clustering is the non-probabilistic version of the EM algorithm.


## K-means Clustering {#k-means-clustering}

We formulate the K-means clustering problem as follows:

Suppose we have a datset \\(\\{\mathbf{x\_1}, \dots, \mathbf{x}\_N\\}\\)
consisting of \\(N\\) observations of a random D-dimensional Euclidean
variable \\(\mathbf{x}\\). Our goal is to partition the data set into a
fixed number of clusters \\(K\\). We formalize this by introducing
\\(\mathbf{\mu}\_k\\), that represents the center of the clusters. Our goal
is then to minimize the objective function:

\begin{equation}
  J = \sum\_{n=1}^{N} \sum\_{k=1}^{N} r\_{nk} \lvert \textbf{x}\_n -
  \textbf{\mu}\_k^2 \rvert
\end{equation}

The K-means algorithm works as follows:

1.  Choose some initial values of $&mu;$\_k.
2.  Minimize \\(J\\) wrt \\(r\_{nk}\\), keeping \\(\mu\_k\\) fixed.
3.  Minimize \\(J\\) wrt \\(\mu\_k\\), keeping \\(r\_{nk}\\) fixed.
4.  Repeat steps 2 and 3 until convergence.

We shall see that updating \\(r\_{nk}\\) and \\(\mu\_k\\) respectively
correspond to the E-step and M-step of the EM algorithm.

Consider first the determination of \\(r\_{nk}\\). Because \\(J\\) is a ilnear
function of \\(r\_{nk}\\), this optimization can be performed easily to
give a closed-form solution:

\begin{equation}
  r\_{nk} = \begin{cases}
    1 & \text{if } k = \textrm{argmin}\_j \lvert \textbf{x}\_n -
    \textbf{\mu}\_j \rvert ^2 \\\\\\
    0 & \text{otherwise.}
  \end{cases}
\end{equation}

Now, consider the optimization of \\(\mu\_k\\) with \\(r\_{nk}\\) held fixed.
The objective function \\(J\\) is quadratic of \\(\mu\_k\\), and can be
minimized by setting the derivative wrt to \\(\mu\_k\\) to 0. We solve it
to be:

\begin{equation}
  \textbf{\mu}\_k = \frac{\sum\_{n} r\_{nk}\textbf{x}\_n}{\sum\_{n} r\_{nk}}
\end{equation}

This result can be interpreted as setting \\(\mu\_k\\) equal to the mean of
all the datapoints \\(\textbf{x}\_n\\) assigned to cluster \\(k\\).

Because each step reduces the objective function \\(J\\), the algorithm is
guaranteed to converge to some minimum. This minimum may be a local
minimum, instead of a global one.

One way of choosing the cluster centers \\(\mu\_k\\) is to choose a random
subset of \\(K\\) data points as the centers. K-means is often used to
initialize parameters in a Gaussian mixture model before applying the
EM algorithm.

The K-means algorithm described can be generalized to datasets by
using a dissimilarity measure \\(\mathcal{V}(x, x')\\) (instead of
Euclidean distance), and minimizing the distortion measure:

\begin{equation}
  \tilde{J} = \sum\_{n=1}^{N} \sum\_{k=1}^{K} r\_{nk}\mathcal{V}(\textbf{x}\_n, \textbf{x}\_k)
\end{equation}

which gives the _K-medoids algorithm_.

The computational cost of the E-step is O(KN), while the M-step
involves \\(O(N\_k^2)\\) evaluations of \\(\mathcal{V}(\dot, \dot)\\).

One feature of the K-means algorithm is that it assigns each datapoint
\\(\mathbf{x}\_i\\) to uniquely one of the clusters. There may be
datapoints that lie roughly halfway between two cluster centers. By
adopting a probabilistic approach, we can obtain 'soft' assignments
that reflect the level of uncertainty over the most appropriate
assignment.


## The Gaussian Mixture Model {#the-gaussian-mixture-model}

The Gaussian mixture model allows modelling more complex
distributions. We can formulate the Gaussian mixture model in terms of
discrete latent variables. the Gaussian mixture distribution can be
written as a linear superposition of Gaussians of the form:

\begin{equation}
  p(\textbf{x}) = \sum\_{k=1}^{K} \pi\_k \mathcal{N}(\textbf{x} |
  \textbf{\mu}\_k, \textbf{\Sigma}\_k)
\end{equation}

We can introduce a K-dimensional binary random variable \\(\mathbf{z}\\)
a 1-of-K representation such that all elements but one of them are 0s,
and \\(p(z\_k = 1) = \pi\_k\\). We can then define the joint distribution
\\(p(\mathbf{x}, \mathbf{z})\\) corresponding to the following graphical
model.

{{< figure src="/ox-hugo/screenshot_2019-03-28_15-06-34.png" caption="Figure 1: Mixture of Gaussians" >}}

The parameters \\(\pi\_k\\) must satisfy:

\begin{equation}
  0 \le \pi\_k \le 1, \sum\_{k=1}^{K}\pi\_k = 1
\end{equation}

we can then represent \\(p(\mathbf{z})\\) as:

\begin{equation}
  p(\mathbf{z}) = \prod\_{k=1}^{K}\pi\_k^{z\_k}
\end{equation}

The conditional distribution can also be written as:

\begin{equation}
  p(\textbf{x} | \textbf{z}) = \prod\_{k=1}^{K} \mathcal{N}(\textbf{x}
  | \textbf{\mu}\_k, \textbf{\Sigma}\_k)^{z\_k}
\end{equation}

Since the joint distribution is given by
\\(p(\mathbf{z})p(\mathbf{x}|\mathbf{z})\\), the marginal distribution of
\\(\mathbf{x}\\) is given by summing the joint distribution over all
possible states of \\(\mathbf{z}\\):

\begin{equation}
p(\textbf{x}) = \sum\_{z} p(\textbf{z}) p(\textbf{x} | \textbf{z}) =
\sum\_{k=1}^{K} pi-k \mathcal{N}(\textbf{x} | \textbf{\mu}\_k, \textbf{\Sigma}\_k)
\end{equation}

We define another quantity \\(\gamma(z\_k) = p(z\_k = 1 | \mathbf{x})\\), whose
quantity can be found via Bayes theorem:

\begin{equation}
  \gamma(z\_k) = \frac{\pi\_k \mathcal{N}(\textbf{x} | \textbf{\mu}\_k,
    \textbf{\Sigma}\_k)}{\sum\_{j=1}^{K} \pi\_j \mathcal{N}(\textbf{x} |
    \textbf{\mu}\_j, \textbf{\Sigma}\_j)}
\end{equation}

We shall view \\(\pi\_k\\) as the prior probability that \\(\z\_k = 1\\), and
\\(\gamma(z\_k)\\) is the _responsibility_ that component \\(k\\) takes for
explaining the observation \\(\mathbf{x}\\).

Suppose we have a dataset of observations \\(\\{\mathbf{x}\_1, \dots,
\mathbf{x}\_k\\}\\), and wish to model this data using a mixture of
Gaussians. We can find the maximum likelihood estimates of the mixture
model parameters. Before proceeding, it is worth noting that the
maximum likelihood approach has severe problems. In particular, the
maximimizing the log likelihood function is not a well-posed problem,
and there are singularities that can cause the log-likelihood to
become infinity in the limit where the variance is zero. This occurs
when a Gaussian component collapses onto a single data point. This can
be interpreted as overfitting. We can hope to avoid these
singularities by using suitable heuristics, using the MAP or Bayesian
approach.


## EM for Gaussian Mixture Model {#em-for-gaussian-mixture-model}

We can find maximum likelihood solutions for models with latent
variables using the EM algorithm. We demonstrate this for the case of
the Gaussian mixture model.

First, we find the derivatives of \\(\lnp(\mathbf{X} | \mathbf{\pi},
\mathbf{\mu}, \mathbf{\Sigma})\\) wrt to \\(\mu\_k\\) to 0:

\begin{equation}
  0 = \sum\_{n=1}^{N} \underbrace{\frac{\pi\_k \mathcal{N}(\textbf{x}\_n |
    \textbf{\mu}\_k, \textbf{\Sigma}\_k)}{\sum\_{j} \pi\_j \mathcal{N}
    (\textbf{x}\_n| \textbf{\mu}\_j \textbf{\Sigma}\_j)}}\_{\gamma (z\_{nk})}
  \textbf{\Sigma}^{-1}\_k \left( \textbf{x}\_n - \textbf{\mu}\_k \right)
\end{equation}
