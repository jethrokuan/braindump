+++
title = "zhu_unsupervised_2018: Unsupervised Event-based Learning of Optical Flow, Depth, and Egomotion"
author = ["Jethro Kuan"]
draft = false
+++

## Unsupervised Event-based Learning of Optical Flow, Depth, and Egomotion {#zhu_unsupervised_2018}

### Contributions {#contributions}

The authors propose a new input representation that captures the spatiotemporal
distribution of events, and a set of unsupervised loss functions that allows for
learning of motion information only from the event stream.

### Input Representation {#input-representation}

Given a set of \\(N\\) input events \\(\left\\{\left(x\_{i}, y\_{i}, t\_{i}, p\_{i}\right)\right\\}\_{i \in\left[1, \infty^{n}\right.}\\), and a set of \\(B\\) bins to discretize the time dimension, the timestamps are scaled to the range \\([0, B-1]\\), and the event volume is generated as:

\begin{aligned}
t\_{i}^{\*} &=(B-1)\left(t\_{i}-t\_{0}\right) /\left(t\_{N}-t\_{1}\right) \\\\\\
V(x, y, t) &=\sum\_{i} p\_{i} k\_{b}\left(x-x\_{i}\right) k\_{b}\left(y-y\_{i}\right) k\_{b}\left(t-t\_{i}^{\*}\right) \\\\\\
k\_{b}(a) &=\max (0,1-|a|)
\end{aligned}

where \\(k\_{b}(a)\\) is the bilinear sampling kernel.

<biblio.bib>
