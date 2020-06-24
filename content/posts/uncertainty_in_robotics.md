+++
title = "Uncertainty in Robotics"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:10:30+08:00
draft = false
+++

### Backlinks {#backlinks}

- [Robotics]({{< relref "robotics" >}})

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

([Thrun, Burgard, and Fox 2005](#orgb314b9f))

## Pros {#pros}

1.  Robust, and scale better to complex, unstructured environments
2.  Weaker requirements on the accuracy of the models compared to
    classical planning algorithms
3.  Sound methodology for many flavours of robot learning
4.  Broadly applicable to many problems, including perception and
    action

## Cons {#cons}

- Relatively computationally inefficient
- Requires approximation (exact posteriors are computationally intractable)

## Bibliography {#bibliography}

<a id="orgb314b9f"></a>Thrun, Sebastian, Wolfram Burgard, and Dieter Fox. 2005. _Probabilistic Robotics_. MIT press.
