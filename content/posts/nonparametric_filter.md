+++
title = "Non-parametric Filters"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T02:57:40+08:00
draft = false
+++

tags
: [Bayes Filter]({{< relref "bayes_filter" >}}), [Particle Filter]({{< relref "particle_filter" >}}), [Histogram Filter]({{< relref "histogram_filter" >}})

Non-parametric filters do not make strong assumptions on the posterior
density, making them well suited for complex, multi-modal beliefs. The
representational power comes at the cost of computational complexity.

Some non-parametric techniques allow adaptivity. For example, particle filters
can adapt the number of particles based on the available compute resources.
