+++
title = "Structural Causal Model"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:55:57+08:00
slug = "structural_causal_model"
draft = false
+++

A structural causal model satisfies the following conditions:

1.  It is a directed acyclic graph \\(G\\) with vertices \\(X\_{1}, \dots, X\_{n}\\)
2.  Vertices are observables, and arrows represent direct causation
3.  Each observable \\(X\_{i}\\) is a density, with independent unexplained random
    variables \\(U\_{i}, \dots, U\_{n}\\).

The structural causal model satisfies the [Reichenbach's principle]({{< relref "reichenbach_s_principle" >}}).
