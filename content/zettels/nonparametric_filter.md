+++
title = "Non-parametric Filters"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:26:21+08:00
draft = false
+++

Non-parametric filters do not make strong assumptions on the posterior
density, making them well suited for complex, multi-modal beliefs. The
representational power comes at the cost of computational complexity.

Some non-parametric techniques allow adaptivity. For example, particle
filters can adapt the number of particles based on the available
compute resources.


## Related {#related}

-   [§bayes\_filter]({{< relref "bayes_filter" >}})
-   [§particle\_filter]({{< relref "particle_filter" >}})
-   [§histogram\_filter]({{< relref "histogram_filter" >}})
