+++
title = "Probabilistic Graph Modelling"
author = ["Jethro Kuan"]
lastmod = 2018-12-05T19:40:35+08:00
draft = false
math = true
+++

## Bayesian Networks {#bayesian-networks}

A Bayesian network is a directed graph \\(G = (V,E)\\) together with a
random variable \\(x\_i\\) for each node \\(i \in V\\), one conditional
probability distribution (CPD) p(x\_i | x<sub>A\_i</sub>) per node, specifying
the probability of \\(x\_i\\) conditioned on its parent's values.

We say that Q, W are _d-separated_ when variables \\(O\\) are observed if
they are not connected by an _active path_. An undirected path in the
Bayesian network \\(G\\) is called _active_ given observed variables \\(O\\)
if for every triple of variables \\(X, Y, Z\\) on the path, one of the
following holds:

-   \\(X \leftarrow Y \leftarrow Z, Y \not\in O\\)
-   \\(X \rightarrow Y \rightarrow Z, Y \not\in O\\)
-   \\(X \leftarrow Y \rightarrow Z, Y \not\in O\\)
-   \\(X \rightarrow Y \leftarrow Z, Y \text{ or any descendents} \in O\\)
