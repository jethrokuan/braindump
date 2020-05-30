+++
title = "XGBoost"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T01:08:40+08:00
draft = false
+++

XGboost is an end-to-end boosting system. It is sparsity-aware. <a id="27bdf4df88994f426bdfbfa0603a3f15" href="#chen16_xgboos">(Chen \& Guestrin, 2016)</a>

## Regularized Learning Objective {#regularized-learning-objective}

For a given data set of \\(n\\) examples and \\(m\\) features, a tree ensemble
model uses \\(K\\) additive functions to predict the output:

\begin{equation}
\hat{y}\_i = \phi(\mathbf{x_i}) = \sum\_{k=1}^{K} f_k(\mathbf{x_i}),
f_k \in F
\end{equation}

where \\(F\\) is the space of regression trees, Each regression tree
contains a continuous score on each of the leaf.

{{< figure src="/ox-hugo/screenshot_2019-05-24_12-35-28.png" >}}

source:
<https://books.google.com.sg/books/about/Classification%5Fand%5FRegression%5FTrees.html?id=JwQx-WOmSyQC&redir%5Fesc=y>

We wish to minimise the regularized objective:

\begin{equation}
L(\phi) = \sum_i l(\hat{y}\_i, y_i) + \sum\_{k} \Omega(f_k)
\end{equation}

where

\begin{equation}
\Omega(f) = \gamma T + \frac{1}{2} \lambda \lVert w \rVert^2
\end{equation}

\\(T\\) being the number of leaves in the tree, and \\(w_i\\) being the ith
weight of the leaf.

## Gradient Tree Boosting {#gradient-tree-boosting}

Since the regularized objective contains functions, the objective
cannot be optimized in the Euclidean space.

Let \\(\hat{y}\_i^t\\) be the prediction of the ith instance on the $t$-th
iteration. We need to add \\(f_t\\) to minimize the following objective:

\begin{equation}
L^{(t)} = \sum\_{i=1}^{n} l(y_i, \hat{y}\_i^{(t-1)} +
f_t(\mathbf{x}\_i)) + \Omega(f_t)
\end{equation}

We can perform a Taylor expansion, and obtain:

\begin{equation}
L^{(t)} = \sum\_{i=1}^{n} l(y_i, \hat{y}\_i^{(t-1)}) + g_i
f_t(\mathbf{x}\_i) + \frac{1}{2}h_i f_t^2(\mathbf{x}\_i) + \Omega(f_t)
\end{equation}

where \\(g_i = \partial\_{\hat{y}^{(t-1)}} l(y_i, \hat{y}^{(t-1)})\\), and
\\(h_i = \partial^2\_{\hat{y}^{(t-1)}} l(y_i, \hat{y}^{(t-1)})\\) are the
first and second order gradient statistics (gradients and Hessians).
Removing the constant terms, at step \\(t\\), the objective is simplified to:

\begin{equation}
\tilde{L}^{(t)} = \sum\_{i=1}^{n} g_i f_t(\mathbf{x}\_i) + \frac{1}{2}h_i
f_t^2(\mathbf{x}\_i) + \Omega(f_t)
\end{equation}

If we define \\(I_j = \\{ i | q (x_i) = j\\}\\) as the instance set of leaf
\\(j\\), then we can rewrite:

\begin{equation}
\tilde{L}^{(t)} = \sum\_{j=1}^T [(\sum\_{i \in I\_j} g\_i) w\_j +
\frac{1}{2} (\sum\_{i \in I\_j} h\_i + \lambda) w\_j^2] + \gamma T
\end{equation}

and we find that for a fixed structure \\(q(x)\\), we can compute the
optimal weight \\(w_j^\*\\) of leaf \\(j\\):

\begin{equation}
w_j^{\*} = - \frac{\sum\_{i \in I_j} g_i}{\sum\_{i \in I_j} h_i + \lambda}
\end{equation}

This can then be used to score a tree structure \\(q\\). However, since
enumerating all possible trees is computationally expensive, we use
an algorithm to iteratively add branches to the tree, by computing the
loss reduction from splitting:

\begin{equation}
L\_{\text{split}} = \frac{1}{2} \left[ \frac{\left( \sum\_{i \in I\_L}
g\_i \right)^2}{\sum\_{i \in I\_L} h\_i + \lambda} + \frac{\left( \sum\_{i \in I\_R}
g\_i \right)^2}{\sum\_{i \in I\_R} h\_i + \lambda} - \frac{\left( \sum\_{i \in I}
g\_i \right)^2}{\sum\_{i \in I} h\_i + \lambda} \right]
\end{equation}

## Implementing Distributed XGBoost {#implementing-distributed-xgboost}

The implementation of distributed XGBoost uses [RABIT](https://github.com/dmlc/rabit), and the
Allreduce framework. XGBoost requires gradients and hessians from each
distributed worker. This fit the allreduce framework, which broadcasts
each worker's reduce result across all processes. <a id="933022bde41826547b7bf7c18f1e9b41" href="#chen3rabit">(Chen et al., )</a>

# Bibliography

<a id="chen16_xgboos" target="_blank">Chen, T., & Guestrin, C., _Xgboost: a scalable tree boosting system_, CoRR, _()_, (2016). </a> [↩](#27bdf4df88994f426bdfbfa0603a3f15)

<a id="chen3rabit" target="_blank">Chen, T., Cano, I., & Zhou, T., _RABIT: A reliable allreduce and broadcast interface_, Transfer, _3(2)_, (). </a> [↩](#933022bde41826547b7bf7c18f1e9b41)
