+++
title = "Histogram Filter"
author = ["Jethro Kuan"]
lastmod = 2020-06-07T17:27:32+08:00
draft = false
+++

### Backlinks {#backlinks}

- [Non-parametric Filters]({{< relref "nonparametric_filter" >}})

The state space is decomposed into finitely many regions, and the
cumulative posterior for each region is represented by a single
probability value. In discrete spaces, these are known as discrete
Bayes filters, while in continuous spaces, as histogram filters.

## Discrete Bayes Filter {#discrete-bayes-filter}

The discrete Bayes filter is directly obtained from the Bayes filter,
replacing the integral with a sum. The input is a discrete probability
distribution \\(\\{p\_{k,t}\\}\\), and most recent control and measurement
\\(u_t\\) and \\(z_t\\).

\begin{algorithm}
\caption{Discrete Bayes Filter}
\label{discrete_bayes_filter}
\begin{algorithmic}[1]
\Procedure{DiscreteBayesFilter}{$\left\\{p\_{k,t-1}\\}, u\_t, z\_t$}
\ForAll{$k$}
\State $\overline{p}\_{k,t} = \sum\_i p(X\_t = x\_k | u\_t, XK\_{t-1} =
    x\_i) p\_{i, t-1}$
\State $p\_{k,t} = \eta p(z\_t | X\_t = x\_k)\overline{p}\_{k, t}$
\EndFor
\State \Return $\\{p\_{k,t}\\}$
\EndProcedure
\end{algorithmic}
\end{algorithm}

## Histogram Filter {#histogram-filter}

Histogram filters decompose a continuous state space into finitely
many regions:

\begin{equation}
\text{range}(X_t) = x\_{1,t} \cup x\_{2,t } \dots x\_{K, t}
\end{equation}

where \\(X_t\\) is the random variable describing the robot at time \\(t\\).
Each \\(x\_{k,t}\\) is a convex region, and form a partitioning of the
state space. A simple decomposition is a multi-dimensional grid.

### Decomposition Techniques {#decomposition-techniques}

<!--list-separator-->

- Static Techniques

  Static techniques rely on a fixed decomposition that is chosen in
  advance. These are easier to implement, but can be computationally wasteful.

<!--list-separator-->

- Dynamic Techniques

  Dynamic techniques adapt the decomposition to the shape of the
  posterior distribution.

  _Density trees_ decompose the state space recursively, adapting the
  resolution to the posterior probability mass.

  _Selective updating_ chooses a subset of grid cells to update for the
  posterior. These are the grid cells whose posterior probability
  exceeds some user-set threshold.
