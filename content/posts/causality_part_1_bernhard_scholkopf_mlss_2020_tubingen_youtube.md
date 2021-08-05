+++
title = "Causality, part 1 - Bernhard Schölkopf - MLSS 2020, Tübingen - YouTube"
author = ["Jethro Kuan"]
draft = false
+++

source
: <https://www.youtube.com/watch?v=btmJtThWmhA&feature=youtu.be>


## Background and Motivation {#background-and-motivation}

Consider a dataset of temperature \\(t\\) vs altitude \\(a\\). We typically see that the
larger the altitude, the lower the temperature. How do we know if this is a
causal effect?

1.  Intervention: we can raise the city, and find that the temperature changes
2.  Hypothetical intervention: expect that \\(t\\) changes, since we can think of a
    physical mechanism \\(p(t|a)\\) that is independent of \\(p(a)\\). We expect that
    \\(p(t|a)\\) is invariant across different countries in similar climate zone.

A "structural" relation not only explains the observed data; it captures a
structure connecting the variables.

An equation becomes structural by virtue of invariance to a domain of
modifications.


## Structural Causal Model {#structural-causal-model}

A structural causal model satisfies the following conditions:

1.  It is a directed acyclic graph \\(G\\) with vertices \\(X\_{1}, \dots, X\_{n}\\)
2.  Vertices are observables, and arrows represent direct causation
3.  Each observable \\(X\_{i}\\) is a density, with independent unexplained random
    variables \\(U\_{i}, \dots, U\_{n}\\).

The structural causal model satisfies the [Reichenbach's principle](#reichenbach-s-principle).


## <span class="org-todo todo TODO">TODO</span> Reichenbach's principle {#reichenbach-s-principle}