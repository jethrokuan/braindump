+++
title = "Spike Train Metrics"
author = ["Jethro Kuan"]
lastmod = 2020-01-26T16:43:32+08:00
draft = false
+++

We study spike train metrics to quantify differences between event
sequences. These metrics apply at both the single-neuron level and the
multi-neuronal level. Studying these metrics helps us identify
candidate features for neuronal codes. <a id="a63689696e88c37b5fc0502e67a08383" href="#victor2005spike">(Victor, 2005)</a>


## Spike Trains as Point Processes {#spike-trains-as-point-processes}

Action potentials are propagated without loss and result in the
release of neurotransmitter. Hence, sequences of action potentials
emitted by individual neurons are the natural focus of brain activity.
The choice of representing spike trains as point processes means we do
not have some algebraic operations defined. If a vector representation
(neuronal activity as continuous voltage records) were chosen instead,
vector-space operations like addition, dot-product would be
immediately available.

One issue with choosing a vectorial representation is that in vector
space, linearity plays a fundamental role, but this is at odds with
the nature of neural dynamics. Choosing to represent spike trains as
point processes prevents us from artificially limiting ourselves in
this manner.


## Spike Train Distance {#spike-train-distance}

We consider the dissimilarity of spike trains \\(d(A,B)\\), without the
need to define addition and multiplication on these spike trains.
Typical metric spaces often do not have Euclidean geometry, and are
more general than vector spaces.

These distances are required to be a metric. This means:

1.  \\(d(A, B) > 0\\) with equality when \\(A = B\\)
2.  \\(d(A,B) = d(B,A)\\)
3.  \\(d(A,C) \le d(A,B) + d(B, C)\\)


## Edit-distance Metrics {#edit-distance-metrics}

One simple way to derive a metric is to consider the total cost of
transforming \\(A\\) to \\(B\\) via elementary steps:

\begin{equation}
  d(A, B)=\min \left\\{\sum\_{j=0}^{n-1} c\left(X\_{j}, X\_{j+1}\right)\right\\}
\end{equation}

where \\(\left\\{X\_{0}, X\_{1}, \dots, X\_{n}\right\\}\\) is a sequence of
spike trains. These metrics often have an efficient
dynamic-programming algorithm.


## Spike Train Metrics {#spike-train-metrics}

We know that the timings of individual spikes are crucial. To capture
this dependence, we consider 2 elementary steps:

1.  Inserting or deleting a spike has a cost of 1 -- this ensures that
    every spike train can be transformed to any other spike train by
    some path
2.  The cost of moving a single spike is proportional to the time that
    the spike is moved: $c(X,Y) = q| t\_X - t\_Y| for some parameter \\(q\\).
    This introduces the sensitivity to spike timing.

\\(q\\) is a tunable parameter that needs to be experimented with.


## Spike Interval Metrics {#spike-interval-metrics}

Similarly, we can define a metric that is sensitive to patterns of
spike intervals, rather than individual times. We again introduce 2
elementary steps:

1.  Insertion or deletion of an interspike interval, having a cost
    of 1.
2.  Shortening or lengthening an existing interspike interval. This is
    equal to \\(q \Delta T\\) where \\(\Delta T\\) is the amount of time by
    which the interval has been lengthened or shortened.


## Multi-neuronal Cost-based Metrics {#multi-neuronal-cost-based-metrics}

To extend spike-train metrics to multiple neurons, an additional
elementary step is added:

1.  Changing the label associated with an event, with cost \\(k\\)

When \\(k = 0\\), the metric ignores the label associated with each event.
When \\(k = 2\\), the effect of the label is maximal, since it costs as
much to delete a spike and reinsert it with a new label.

There exists other kinds of elementary steps, or tweaks of the
existing elementary steps. These cost-based metrics can be thought of
as formalizing a hypothesis that certain aspects of spike train
structure are meaningful.

One can find algorithms implementing these metrics in the public
domain:

-   <https://neuroanalysis.org/toolkit/>
-   <https://www.apst.spiketrain-analysis.org/>


## Spike Train Metrics on Vector-Space Embeddings {#spike-train-metrics-on-vector-space-embeddings}

Another class of metrics embed the spike trains into a vector space.
Typically, the embedding is linear, and the resulting metric respects
linearity. However, this is not a prerequisite.

By expressing a spike train as a function of time \\(A(t)\\), we abstract
what happens at a synapse. Vector-space metrics are also simpler to
calculate.


### Steps {#steps}

1.  Express the event sequence as a sum of dirac-delta functions:

\begin{equation}
  \delta\_{A}(t)=\sum\_{j=1}^{M(A)} \delta\left(t-t\_{j}\right)
\end{equation}

Convolve the sum with a kernel function \\(K(t)\\):

\begin{equation}
  A(t)=\left(\delta\_{A} \* K\right)(t)=\int\_{-\infty}^{\infty} \delta\_{A}(\tau) K(t-\tau) d \tau=\sum\_{j=1}^{M(A)} K\left(t-t\_{j}\right)
\end{equation}

Any vector-space distance can then be used to define a distance. The
$L^p$-norm yields the distance:

\begin{equation}
  d(A, B)=\left(\int\_{-\infty}^{\infty}|A(t)-B(t)|^{p} d t\right)^{1 / p}
\end{equation}

The van Rossum distance uses the $L^2$-distance, and the exponential
kernel:

\begin{equation}
  K^{V R}\left(t\_{c} ; t\right)=\left\\{\begin{array}{ll}{\frac{1}{\sqrt{t\_{c}}} e^{-t / t\_{c}},} & {t \geq 0} \\ {0,} & {t<0}\end{array}\right.
\end{equation}

Houghton and Sen consider \\(L^1\\) - norms, and a kernel that makes the
correspondence to the edit-distance-based spike-train metric even
closer. They chose the kernel:

\begin{equation}
K^{H S}(q ; t)=\left\\{\begin{array}{ll}{q / 2,} & {0 \leq t<2 / q} \\ {0,} & {\text { otherwise }}\end{array}\right.
\end{equation}

with \\(p=1\\).


### Multi-neuronal Metrics on Vector-Space Embeddings {#multi-neuronal-metrics-on-vector-space-embeddings}

First, we extend the representation of a single neuron's spike train
\\(A\\) to a sequence of delta-functions \\(\delta\_A(t)\\). They augment the
delta-function corresponding to each spike by a unit vector
\\(\vec{c\_l}\\), where the direction vector represents the label \\(l\\) of
that spike. These directions are allowed to be non-orthogonal.
Collinear labels correspond to a summed population code.

Therefore, a multi-neuronal spike train (\\(L\\) neurons), with events at
times \\(t\_j\\) and associated with labels \\(l\_j\\) is represented by an
L-dimensional array of sums of scaled dirac-delta functions:

\begin{equation}
  \vec{\delta}\_{A}(t)=\sum\_{i=1}^{M(A)} \vec{c}\_{l\_{j}} \delta\left(t-t\_{j}\right)
\end{equation}

Temporal factors are accounted for by convolving by a kernel, yielding
\\(\vec{A}(t)=\left(\vec{\delta}\_{A} \* K\right)(t)\\). The distance
between 2 multi-neuronal spike trains \\(A\\) and \\(>\\) is the $L^p$-norm
between their associated temporal functions:

\begin{equation}
d(A, B)=\left(\int\_{-\infty}^{\infty} \sum\_{l=1}^{L}\left|A\_{l}(t)-B\_{l}(t)\right|^{p} d t\right)^{1 / p}
\end{equation}

for each of their components.


## References {#references}

# Bibliography
<a id="victor2005spike" target="_blank">Victor, J. D., *Spike train metrics*, Current opinion in neurobiology, *15(5)*, 585–592 (2005). </a> [↩](#a63689696e88c37b5fc0502e67a08383)
