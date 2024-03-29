+++
title = "Uncertainty in Robotics"
author = ["Jethro Kuan"]
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

Thrun, Burgard, and Fox, n.d.


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