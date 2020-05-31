+++
title = "Grid & Monte Carlo Localization"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T20:20:18+08:00
draft = false
+++

### Backlinks {#backlinks}

- [EKF Localization]({{< relref "ekf_localization" >}})

Grid & Monte Carlo Localization methods are able to solve global
localization problems (in comparison to [EKF Localization]({{< relref "ekf_localization" >}}) and
[Markov Localization]({{< relref "markov_localization" >}})).

They also:

- process raw sensor measurements
- are non-parametric: not bound to uni-modal distributions

## Grid Localization {#grid-localization}

The grid localization algorithm uses a histogram filter to represent
the posterior belief. Coarseness of the grid is an accuracy,
computational-complexity tradeoff. A grid too coarse might prevent the
filters from working altogether.

\begin{algorithm}
\caption{Grid Localization}
\label{grid_localization}
\begin{algorithmic}[1]
\Procedure{Grid Localization}{$\\{p\_{k, t-1}\\}, u\_t, z\_t, m$}
\ForAll{$k$}
\State $\overline{p}\_{k,t} = \sum\_i p\_{i, t-1}
    \mathbf{\mathrm{motion model}}(\mathrm{mean}(x\_k), u\_t, \mathrm{mean}(x\_i))$
\State $p\_{k,t} = \eta \textbf{measurement model}(z\_t,
    \mathrm{mean}(x\_k), m)$
\EndFor
\State \Return $p\_{k,t}$
\EndProcedure
\end{algorithmic}
\end{algorithm}

## Monte-Carlo Localization {#monte-carlo-localization}

MC localization uses the [Particle Filter]({{< relref "particle_filter" >}}) to
represent the posterior belief. The accuracy is determined by the size
of the particle set.

{{< figure src="/ox-hugo/screenshot2019-12-05_18-05-16_.png" caption="Figure 1: Illustration of MC localization" >}}

This algorithm is unable to recover when the pose is incorrect, hence
is, without modification, unsuitable for the kidnapped robot problem.
This problem is particularly important when the number of particles is
small, and when particles are spread over a large volume (with global
localization).

This problem can be easily solved by injecting random particles into
the particle set. This can be seen as having a small probability of
the robot being kidnapped. One can add a fixed number of random
particles per iteration, or use an estimate correlated with the
localization accuracy, which can be estimated from data.

Another limitation is the proposal mechanism. The particle filter uses
the motion model as a proposal distribution, but it seeks to
approximate a product of this distribution and the perceptual
likelihood. The larger the difference between the proposal and target
distribution, the more samples required.

In MCL, this induces a failure mode. A perfect, noiseless sensor would
always inform the robot of its correct pose, but MCL would fail. A simple
trick that works is to artificially inflate the amount of noise in the
sensor. An alternative is to modify the sampling process, by reversing
the role of the measurement and motion model for a small number of
particles. This results in an algorithm called the _mixture MCL_.

### Backlinks {#backlinks}

- [EKF Localization]({{< relref "ekf_localization" >}})
