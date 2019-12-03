+++
title = "Likelihood Field Model"
author = ["Jethro Kuan"]
lastmod = 2019-12-03T23:07:46+08:00
draft = false
math = true
+++

## Key Idea {#key-idea}

Project an individual sensor measurement \\(z\_t^k\\) into the global
coordinate frame of map \\(m\\). Discards max-range readings.

Assumes three types of noise, similar to [§range\_finder\_model]({{< relref "range_finder_model" >}}):

1.  Measurement noise: Gaussian
2.  Failures: point-mass distribution at \\(z\_{\text{max}}\\)
3.  Random measurements: Uniform distribution \\(p\_{\text{rand}}\\)

The model is a mixture of these 3 densities:

\begin{equation}
  z\_{\mathrm{hit}} \cdot p\_{\mathrm{hit}}+z\_{\mathrm{rand}} \cdot p\_{\mathrm{rand}}+z\_{\mathrm{max}} \cdot p\_{\mathrm{max}}
\end{equation}


## Issues {#issues}

1.  Does not explicitly model dynamic objects that cause short readings
2.  Treats sensors as being able to see through walls: ray casting
    replaced by nearest neighbour function: incapable of determining
    whether a path to a point is intercepted by an obstacle in the map
3.  Does not account for map uncertainty

These issues can be addressed via extensions to the algorithm.


## Related {#related}

-   [§range\_finder\_model]({{< relref "range_finder_model" >}})
-   [§map\_matching]({{< relref "map_matching" >}})
