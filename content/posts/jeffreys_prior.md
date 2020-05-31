+++
title = "Jeffreys Prior"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T20:19:00+08:00
slug = "jeffreys_prior"
draft = false
+++

## Backlinks {#backlinks}

- [Reference Prior]({{< relref "reference_prior" >}})

The Jeffrey's prior is an easy-to-compute reference prior that is
invariant to transformation, used in [Bayesian Inference]({{< relref "bayesian_inference" >}}). If the model
only has a univariate parameter \\(\theta\\), the prior is given by:

\begin{equation}
p(\theta) \propto \sqrt{I(\theta)}
\end{equation}

where \\(I(\theta)\\) is the expected [Fisher information]({{< relref "fisher_information" >}}) in the model.

If \\(\mathbf{\theta}\\) is multi-dimensional, then the Jeffrey's prior is
given by:

\begin{equation}
p(\theta) \propto \sqrt{\operatorname{det}\\{l(\theta)\\}}
\end{equation}

where I is the [Fisher information matrix]({{< relref "fisher_information" >}}). When the number of
dimensions is large, this method becomes cumbersome. A common approach
is to obtain non-informative priors for the parameters individually,
and form the joint prior as a product of these individual priors.

## Backlinks {#backlinks}

- [Reference Prior]({{< relref "reference_prior" >}})
