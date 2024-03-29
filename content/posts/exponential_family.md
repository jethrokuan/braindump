+++
title = "Exponential Family"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Statistics]({{<relref "statistics.md#" >}})

A one-parameter exponential family model is any model whose density
can be expressed as:

\begin{equation}
  p(y | \theta)=h(y) g(\theta) \exp \\{\eta(\theta) t(y)\\}
\end{equation}

where \\(\theta\\) is the parameter of the family, and \\(t(y)\\) is the
sufficient statistic for \\(\theta\\).

When a model belongs to the one-parameter exponential family, a family
of conjugate prior distributions is given by:

\begin{equation}
  p(\theta) \propto g(\theta)^{\nu} \exp \\{\eta(\theta) \tau\\}
\end{equation}

where \\(\nu\\) and \\(\tau\\) are parameters of the prior, such that
\\(p(\theta)\\) is a well-defined pdf.

Combining this prior with a sampling model \\(Y \sim p(y|\theta)\\) yields
the posterior:

\begin{align} p(\theta | y) & \propto p(y | \theta) p(\theta) \\ & \propto g(\theta) \exp \\{\eta(\theta) t(y)\\} \cdot g(\theta)^{\nu} \exp \\{\eta(\theta) \tau\\} \\ & \propto g(\theta)^{\nu+1} \exp \\{\eta(\theta)[\tau+t(y)]\\} \end{align}

which belongs to the same family as the prior distribution, with
parameters \\(\nu + 1\\) and \\(\tau + t(y)\\).