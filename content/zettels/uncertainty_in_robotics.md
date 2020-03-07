+++
title = "Uncertainty in Robotics"
author = ["Jethro Kuan"]
lastmod = 2020-03-08T00:26:51+08:00
draft = false
+++

Robotic applications increasingly deal with more unstructured
environments. Robots that can perceive and deal with uncertainty are
much more robust in these scenarios.

Uncertainty arises from:

Environment
: unpredictability of the physical world

Sensors
: limitations in sensor perception

Robots
: robot actuations involve motors that have control noise

Models
: models of the world inherently inaccurate

Computation
: many algorithms are approximate

> A robot that carries a notion of its own uncertainty that acts
> accordingly is superior to one that does not.

<a id="835a6cfe6739deb9dedf830cd3072262" href="#thrun2005probabilistic">(Thrun et al., 2005)</a>


## Pros {#pros}

1.  Robust, and scale better to complex, unstructured environments
2.  Weaker requirements on the accuracy of the models compared to
    classical planning algorithms
3.  Sound methodology for many flavours of robot learning
4.  Broadly applicable to many problems, including perception and
    action


## Cons {#cons}

-   Relatively computationally inefficient
-   Requires approximation (exact posteriors are computationally intractable)

# Bibliography
<a id="thrun2005probabilistic" target="_blank">Thrun, S., Burgard, W., & Fox, D., *Probabilistic robotics* (2005), : MIT press.</a> [↩](#835a6cfe6739deb9dedf830cd3072262)


## Backlinks {#backlinks}

-   [Robotics]({{< relref "robotics" >}})
