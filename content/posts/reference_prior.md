+++
title = "Reference Prior"
author = ["Jethro Kuan"]
lastmod = 2020-05-29T21:02:05+08:00
slug = "reference_prior"
draft = false
+++

The notion of reference prior is similar to that of a [non-informative
prior]({{< relref "noninformative_priors" >}}), but there are subtle differences. The uniform prior is arguably
non-informative, but is it not a good reference, because it is not
always invariant under reparamaterization.

Consider a reparameterization \\(\gamma = \log \theta\\), converting the
support of the parameter to the real line. The prior on \\(\gamma\\) is
given by:

\begin{equation}
p\_\gamma (\gamma) = p(\theta)|J| = |J|
\end{equation}

where \\(|J| = \frac{d \theta}{d \gamma}\\) from the [Change of Variables Theorem]({{< relref "change_of_variables_theorem" >}}).

\begin{equation}
p\_\gamma (\gamma) = e^\gamma, - \infty < \gamma < + \infty
\end{equation}

which is clearly not uniform. A prior that is invariant to
transformation, and easy to compute, is the [Jeffreys Prior]({{< relref "jeffreys_prior" >}}).
