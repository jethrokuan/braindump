+++
title = "Two Levels Of Inference"
author = ["Jethro Kuan"]
lastmod = 2020-03-07T23:43:12+08:00
draft = false
+++

There are 2 levels of inference: model fitting and model comparison.
In model fitting, assuming a model is true (say \\(\mathcal{H}\_i\\)), fit
the model to the data by inferring what values its free parameters
should possibly take.

\begin{equation}
  P\left(\mathbf{w} | D, \mathcal{H}\_{i}\right)=\frac{P\left(D | \mathbf{w}, \mathcal{H}\_{i}\right) P\left(\mathbf{w} | \mathcal{H}\_{i}\right)}{P\left(D | \mathcal{H}\_{i}\right)}
\end{equation}

The normalizing constant is irrelevant to the first level of
inference. It is common to use gradient-based methods to find the
maximum of the posterior \\(\mathbf{w}\_{\text{MP}}\\). Error bars for
these parameters can be obtained by evaluating the Hessian at
\\(\mathbf{w}\_{\text{MP}}\\), \\(\mathbf{A}=-\nabla \nabla \ln
P\left(\mathbf{w} | D, \mathcal{H}\_{i}\right)\\), and Taylor-expanding
the log posterior probability with \\(\Delta
\mathbf{w}=\mathbf{w}-\mathbf{w}\_{\mathrm{MP}}\\):

\begin{equation}
P\left(\mathbf{w} | D, \mathcal{H}\_{i}\right) \simeq P\left(\mathbf{w}\_{\mathrm{MP}} | D, \mathcal{H}\_{i}\right) \exp \left(-1 / 2 \Delta \mathbf{w}^{\mathrm{T}} \mathbf{A} \Delta \mathbf{w}\right)
\end{equation}

locally approximating the posterior as a Gaussian with covariance
matrix \\(\mathbf{A}^{-1}\\).

In model comparison, we compare models in light of the data, assign
some sort of preference.

Bayesian methods can consistently and quantitatively solve both types
of inferences, although adopting the Bayesian method for the first
type leads to similar results from orthodox statistical methods.
Orthodox statistical methods will find it difficult to perform model
comparisons, because _it is not possible simply to choose the model
that fits the data itself_. For example, maximum likelihood can fail
by choosing implausible, over-parameterized models that overfit the
data.

How do Bayesian methods perform model comparison? The posterior
probability for each model is:

\begin{equation}
  P\left(\mathcal{H}\_{i} | D\right) \propto P\left(D | \mathcal{H}\_{i}\right) P\left(\mathcal{H}\_{i}\right)
\end{equation}

Hence, if we assign equal priors to the alternative models, models
\\(\mathcal{H}\_i\\) are _ranked by evaluating the evidence_. If the
posterior is well approximated by a Gaussian, Bayesian model
comparison is a simple extension of maximum likelihood model
selection: the evidence is obtained by multiplying the best-fit
likelihood by the Occam factor, obtained from the determinant of the
covariance matrix \\(\mathbf{A}^{-1}\\) (the inverse Hessian).


## Related {#related}

-   [§occams\_razor]({{< relref "occams_razor" >}})
