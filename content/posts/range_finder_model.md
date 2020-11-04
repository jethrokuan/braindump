+++
title = "Range Finder Model"
author = ["Jethro Kuan"]
draft = false
+++

## Beam Model for Range Finders {#beam-model-for-range-finders}

4 types of measurement errors are incorporated, all essential to
making it work:

1.  small measurement noise
2.  errors due to unexpected objects
3.  errors due to failure to detect objects
4.  random unexplained noise

The desired model is a mixture of four densities, each of which
corresponds to a particular type of error.

### Small Measurement Noise {#small-measurement-noise}

Suppose the true range of the object is \\(z_t^{k\*}\\). The small
measurement noise is typically modelled as a narrow Gaussian with mean
\\(z_t^{k\*}\\) and standard deviation \\(\sigma\_{\text{hit}}\\). We denote
this Gaussian as \\(p\_{\text{hit}}\\).

In practice, the values of the range sensor are limited to the
interval \\([0; z\_{\text{max}}]\\), where \\(z\_{\text{max}}\\) denotes the
maximum sensor range. Hence, the measurement probability is given by:

\begin{equation}
p\_{\mathrm{hit}}\left(z\_{t}^{k} | x\_{t}, m\right)=\left\\{\begin{array}{ll}{\eta \mathcal{N}\left(z\_{t}^{k} ; z\_{t}^{k \*}, \sigma\_{\mathrm{hit}}^{2}\right)} & {\text { if } 0 \leq z\_{t}^{k} \leq z\_{\max }} \\ {0} & {\text { otherwise }}\end{array}\right.
\end{equation}

### Unexpected Objects {#unexpected-objects}

The environment of mobile robots are dynamics, whereas the map of the
environment is static. Examples of moving objects include humans in
the environment.

One method of handling these is to include them in the state vector
and estimate their position. The simpler way is to treat them as
sensor noise. These objects cause ranges to be shorter than
\\(z_t^{k\*}\\), not longer.

Since the likelihood of sensing unexpected objects decreases with
range, this probability can be described by an exponential
distribution, parameterized by \\(\lambda\_{\text{short}}\\).

\begin{equation}
p\_{\text {short }}\left(z\_{t}^{k} | x\_{t}, m\right)=\left\\{\begin{array}{ll}{\eta \lambda\_{\text {short }} e^{-\lambda\_{\text {short }} z\_{t}^{k}}} & {\text { if } 0 \leq z\_{t}^{k} \leq z\_{t}^{k \*}} \\ {0} & {\text { otherwise }}\end{array}\right
\end{equation}

### Failure to detect objects {#failure-to-detect-objects}

This is the situation where objects are missed altogether. This
happens often where the object is beyond the sensor's maximum range.
We can model this as a point-mass distribution centered at
\\(z\_{\text{max}}\\).

\begin{equation}
p\_{\max }\left(z\_{t}^{k} | x\_{t}, m\right)=I\left(z=z\_{\max }\right)=\left\\{\begin{array}{ll}{1} & {\text { if } z=z\_{\max }} \\ {0} & {\text { otherwise }}\end{array}\right.
\end{equation}

### Mixture of the four {#mixture-of-the-four}

The four distributions are mixed by a weighted average:

\begin{equation}
p\left(z\_{t}^{k} | x\_{t}, m\right)=\left(\begin{array}{c}{z\_{\text {hit }}} \\ {z\_{\text {short }}} \\ {z\_{\text {max }}} \\ {z\_{\text {rand }}}\end{array}\right)^{T} \cdot\left(\begin{array}{c}{p\_{\text {hit }}\left(z\_{t}^{k} | x\_{t}, m\right)} \\ {p\_{\text {short }}\left(z\_{t}^{k} | x\_{t}, m\right)} \\ {p\_{\text {max }}\left(z\_{t}^{k} | x\_{t}, m\right)} \\ {p\_{\text {rand }}\left(z\_{t}^{k} | x\_{t}, m\right)}\end{array}\right)
\end{equation}

{{< figure src="/ox-hugo/screenshot2019-12-03_22-37-21_.png" >}}

Parameters can be learnt from data via maximum likelihood estimation.

### Issues {#issues}

1.  Can be unsmooth in the presence of many small obstacles: this
    poses a problem for ML estimation
2.  Computationally expensive

### Alternatives {#alternatives}

- [Likelihood Field Model]({{<relref "likelihood_field_model.md" >}})
