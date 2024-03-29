+++
title = "Occam's Razor"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Information Theory]({{<relref "information_theory.md#" >}})

Occam's razor is the principle that states a preference for simpler
models. This is not just a philosophical choice: Bayesian
probabilistic inference automatically embodies this principle,
quantitatively. To see this, we evaluate 2 alternative theories
\\(\mathcal{H}\_1\\) and \\(\mathcal{H}\_2\\), in light of observing data
\\(\mathcal{D}\\).

\begin{equation}
  \frac{P(\mathcal{H}\_1|\mathcal{D})}{P(\mathcal{H}\_2|\mathcal{D})} =
  \frac{P(\mathcal{H}\_1)}{P(\mathcal{H}\_2)} \frac{P(\mathcal{D}|\mathcal{H}\_1)}{P(\mathcal{D}|\mathcal{H}\_2)}
\end{equation}

The ratio \\(\frac{P(\mathcal{H}\_1)}{P(\mathcal{H}\_2)}\\) denotes how much
our initial beliefs favoured \\(\mathcal{H}\_1\\) over \\(\mathcal{H}\_2\\). The
second ratio expresses how well relatively the observed data
\\(\mathcal{D}\\) were predicted by the 2 hypotheses.

Simple models make precise computations, while complex models spread
their predictive probabilities more thinly over their larger
hypothesis space. In the case where the data are compatible with both
theories, the simpler \\(\mathcal{H}\_1\\) would turn out to be more
probable than the more complex \\(\mathcal{H}\_2\\). Hence the second term
automatically embodies the Occam's razor.


## Gelman on the Occam Factor {#gelman-on-the-occam-factor}

Source: [David MacKay and Occam’s Razor « Statistical Modeling, Causal Inference, and ...](https://statmodeling.stat.columbia.edu/2011/12/04/david-mackay-and-occams-razor/)

Gelman is not fond of Mackay's above argument about Bayesian inference
embodying Occam razor. His argument seems to be about wanting to keep
more complex models:

> once I’ve set up a model I’d like to keep all of
> it, maybe shrinking some parts toward zero but not getting rid of
> coefficients entirely.

I still don't see a contradiction with Mackay's proposed argument.
Maybe I'm missing something...