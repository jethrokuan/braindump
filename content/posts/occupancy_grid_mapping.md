+++
title = "Occupancy Grid Mapping"
author = ["Jethro Kuan"]
draft = false
+++

In [Robot Localization]({{<relref "robot_localization.md#" >}}), it is assumed that the robot is given a map in
advance. This is sometimes not the case.

Acquiring maps with mobile robots is a challenging task, because:

1.  The hypothesis space of all possible maps is huge (infinite). Under
    discrete approximations like grid approximations, this space
    remains computationally intractable for many Bayesian approaches.
2.  Learning maps is a chicken-and-egg problem, hence it is often
    referred to as the simultaneous localization and mapping (SLAM)
    problem.


## Factors in hardness of mapping {#factors-in-hardness-of-mapping}

size
: the larger the environment, the more difficult

noise in perception
: noise-free sensors lead to simple mapping solutions

perceptual ambiguity
: the more frequently different places look
    alike, the harder to establish correspondence in different points in time

cycles
: cycles in the environment are particularly difficult to
    map. Cycles make robots return via different paths, resulting in
    large amounts of accumulated odometric errors.


## Occupancy Grid Mapping {#occupancy-grid-mapping}

**We assume some oracle informs us of the exact robot path during
mapping.**

Occupancy grid maps address the problem of generating consistent maps
from noisy and uncertain measurement data, under the assumption that
the robot pose is known. This technique is not useful in generating
maps for path-planning and navigating, since no robot odometry is
perfect.

The gold standard of any occupancy grid mapping algorithm is to
calculate the posterior over maps given the data:

\begin{equation}
  p( m | z\_{1:t},x\_{1:t})
\end{equation}

The controls \\(u\_{1:t}\\) play no role, since the robot pose is known.
The most common of occupancy maps are 2-D floorplan maps: a 2-D slice
of the 3D world. These techniques generalize to 3D at significant
computational expense.

Let \\(m\_{i}\\) done the grid cell with index \\(i\\). An occupancy grid map
partitions the space into finitely many grid cells:

\begin{equation}
  m=\sum\_{i} \mathbf{m}\_{i}
\end{equation}

Each \\(m\_i\\) is attached a binary occupancy value, which specifies
whether the cell is occupied.

With this decomposition, the problem remains computationally
intractable. The standard approach further breaks down the problem,
instead estimating:

\begin{equation}
  p\left(\mathbf{m}\_{i} | z\_{1: t}, x\_{1: t}\right)
\end{equation}

Assuming conditional independence between grid cells, the posterior
over maps is approximated as:

\begin{equation}
  p\left(m | z\_{1: t}, x\_{1: t}\right)=\prod\_i p\left(\mathbf{m}\_{i} | z\_{1: t}, x\_{1: t}\right)
\end{equation}

Occupancy is often represented in its log-odds form:

\begin{equation}
  l\_{t, i}=\log \frac{p\left(\mathbf{m}\_{i} | z\_{1: t}, x\_{1: t}\right)}{1-p\left(\mathbf{m}\_{i} | z\_{1: t}, x\_{1: t}\right)}
\end{equation}

The algorithm is as follows:

\begin{algorithm}
  \caption{Occupancy Grid Mapping}
  \label{occupancy\_grid\_mapping}
  \begin{algorithmic}[1]
    \Procedure{Occupancy Grid Mapping}{$\\{l\_{t-1, i}\\}, x\_t, z\_t$}
    \ForAll{cells $\mathbf{m}\_i$}
    \If {$\mathbf{m}\_i$ in perceptual field of $z\_t$}
    \State $l\_{t,i} = l\_{t-1,i} + \mathrm{inverse sensor
      model}(\mathbf{m}\_i, x\_t,z\_t) - l\_0$
    \Else
    \State $l\_{t,i} = l\_{t-1,i}$
    \EndIf
    \State \Return $l\_{t,i}$
    \EndProcedure
  \end{algorithmic}
\end{algorithm}

Occupancy grid mapping requires an _inverse sensor model_. One can
also utilize the space claimed by the robot itself during mapping, by
returning a large negative number for all grid cells occupied by the
robot when at \\(x\_t\\).


## Multi-sensor integration {#multi-sensor-integration}

Different sensors have different characteristics, and are sensitive to
different kinds of obstacles. There are 2 basic approaches to fusing
data from multiple sensors:

1.  Execute the algorithm with different sensor modalities, replacing
    the **inverse sensor model** accordingly.
    1.  This causes the result of Bayes filtering to be ill-defined.
2.  Build separate maps for different sensor types, and integrate them
    using the most conservative estimate.

2 is the more appropriate approach.


## Inverting the Measurement Model {#inverting-the-measurement-model}

The occupancy grid mapping algorithm requires a marginalized inverse
measurement model: \\(p\left(\mathbf{m}\_{i} | x, z\right)\\). It is
termed "inverse" because it reasons from effects to causes.

We can do so by using Bayes rule, assuming \\(p(m|x) = p(m)\\):

\begin{aligned}
  p(m | x, z) &=\frac{p(z | x, m) p(m | x)}{p(z | x)} \\ &=\eta p(z |
  x, m) p(m)
\end{aligned}

However, the occupancy grid mapping algorithm approximates the
posterior over maps by its marginals, so the inverse model for the ith
grid cell is obtained via:

\begin{equation}
  p\left(\mathbf{m}\_{i} | x, z\right)=\eta \int\_{m: m(i)=\mathbf{m}\_{i}} p(z | x, m) p(m) d m
\end{equation}

Which is impossible to compute given the large space of all maps. It
is often approximated via sampling. One simple way is to generate
random triplets of pose, measurements and map occupancy values for any
grid cell \\(m\_i\\). From which we can learn a simple network to predict
occupancy values.


## Maintaining Dependencies in Grid Cells {#maintaining-dependencies-in-grid-cells}

The standard algorithm decomposes the grid, making the assumption that
the occupancy value in each grid cell is conditionally independent
from the others. This is as strong assumption.

However, the full map posterior is not computable, due to the large
number of possible maps defined over a grid. However, despite this, it
is still maximizable (MAP). This leads to maps that are more
consistent with the data, but requires full availability of data.
Another downside is that the MAP map does not capture the residual
uncertainty in the map.