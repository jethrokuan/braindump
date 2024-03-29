+++
title = "Normalizing Flows"
author = ["Jethro Kuan"]
draft = false
+++

Normalizing flows provide a way of constructing probability
distributions over continuous random variables. In flow-based
modelling, we would like to express a D-dimensional vector
\\(\mathbf{x}\\) as a transformation \\(T\\) of a real vector \\(\mathbf{u}\\)
sampled from \\(p\_u(\mathbf{u})\\):

\begin{equation}
  \mathbf{x}=T(\mathbf{u}) \quad \text { where } \quad \mathbf{u} \sim p\_{\mathrm{u}}(\mathbf{u})
\end{equation}

The transformation \\(T\\) must be invertible and both \\(T\\) and \\(T^{-1}\\)
must be differentiable. These transformations are known as
_diffeomorphisms_, and require that \\(\mathbf{u}\\) must be
D-dimensional. Under these conditions, the density of \\(x\\) is
well-defined, and can be obtained via the change-of-variables theorem:

\begin{equation}
  p\_{\mathbf{x}}(\mathbf{x})=p\_{\mathbf{u}}(\mathbf{u})\left|\operatorname{det} J\_{T}(\mathbf{u})\right|^{-1} \quad \text { where } \quad \mathbf{u}=T^{-1}(\mathbf{x})
\end{equation}

The density can also be equivalently written in terms of the Jacobian
of \\(T^{-1}\\):

\begin{equation}
  p\_{\mathbf{x}}(\mathbf{x})=p\_{\mathbf{u}}\left(T^{-1}(\mathbf{x})\right)\left|\operatorname{det} J\_{T-1}(\mathbf{x})\right|
\end{equation}

In practice, a flow-based model is constructed by implementing \\(T\\) or
\\(T^{-1}\\) with a neural network, and \\(p\_{\mathrm{u}}(\mathbf{u})\\) as a
simple density such as a multivariate normal.

One can think of transformations \\(T\\) as expanding and contracting the
space \\(R^{D}\\) in order to mold the density
\\(p\_{\mathrm{u}}(\mathbf{u})\\) into \\(p\_{\mathrm{x}}(\mathbf{x})\\).

These invertible, differentiable transformations are composable.
Complex transformations can be constructed by composing simple
transformations.

\begin{aligned}
  \left(T\_{2} \circ T\_{1}\right)^{-1} &=T\_{1}^{-1} \circ T\_{2}^{-1} \\ \operatorname{det} J\_{T\_{2} \circ T\_{1}}(\mathbf{u}) &=\operatorname{det} J\_{T\_{2}}\left(T\_{1}(\mathbf{u})\right) \cdot \operatorname{det} J\_{T\_{1}}(\mathbf{u})
\end{aligned}

Flow-based models provide 2 operations, with differing computational complexity:

1.  Sampling from the model, requiring ability to sample from
    \\(p\_{\mathrm{u}}(\mathbf{u})\\) and computing the forward
    transformation \\(T\\).
2.  Evaluating the model's density, requiring computing the inverse
    transformation \\(T^{-1}\\) and its Jacobian determinant.

Flow-based models can represent any distribution \\(p\_x(\mathbf{x})\\),
under reasonable conditions on \\(p\_x(\mathbf{x})\\).


## Flow-based models for modeling and inference {#flow-based-models-for-modeling-and-inference}

Fitting a flow-based model \\(p\_x(\mathbf{x}; \theta)\\) to a target
distribution \\(p\_{x^\star}(\mathbf{x})\\) can be done by minimizing some
divergence or discrepancy between them. The minimization is performed
with respect to the model's parameters, \\(\theta = \\{\phi, \psi\\}\\),
where \\(\phi\\) are parameters of \\(T\\) and \\(\psi\\) are parameters of
\\(p\_{\mathrm{u}}(\mathbf{u})\\).

For example, one can use the forward KL divergence:

\begin{aligned} \mathcal{L}(\boldsymbol{\theta}) &=D\_{\mathrm{KL}}\left[p\_{\mathbf{x}}^{\*}(\mathbf{x}) \\| p\_{\mathbf{x}}(\mathbf{x} ; \boldsymbol{\theta})\right] \\ &=-\mathbb{E}\_{p\_{\mathbf{x}}^{\*}(\mathbf{x})}\left[\log p\_{\mathbf{x}}(\mathbf{x} ; \boldsymbol{\theta})\right]+\text { const. } \\ &=-\mathbb{E}\_{p\_{\mathbf{x}}^{\*}(\mathbf{x})}\left[\log p\_{\mathbf{u}}\left(T^{-1}(\mathbf{x} ; \boldsymbol{\phi}) ; \boldsymbol{\psi}\right)+\log \left|\operatorname{det} J\_{T^{-1}}(\mathbf{x} ; \boldsymbol{\phi})\right|\right]+\text { const. } \end{aligned}

The forward KL divergence is well-suited where we have samples from
the target distribution, but cannot necessarily evaluate the target
density \\(p\_{x^\star}(\mathbf{x})\\). We can estimate this expectation by
Monte Carlo using samples from \\(p\_{x^\star}(\mathbf{x})\\).

Fitting the model requires computing \\(T^{-1}\\), its Jacobian
determinant and the density \\(p\_u(\mathbf{u}; \psi)\\), and
differentiating through all three. We do not need to compute \\(T\\) or
sample from \\(p\_u(\mathbf{u}, \psi)\\), although these operations will be
needed if we want to sample from the model after fitting.

The reverse KL-divergence is suitable when we have the ability to
evaluate the target density \\(p\_{x^\star}(\mathbf{x})\\), but are not
necessarily able to sample from it.

There is some duality between the forward and reverse-mode
KL-divergence in flow-based models. Fitting the model to the target
via reverse KL-divergence is equivalent to fitting
\\(p\_{u^\star}(\mathbf{u}; \phi)\\) to the base via forward KL-divergence.

Alternative divergences include f-divergences, which use density
ratios, or integral probability metrics (IPM) that uses differences.


## Computational Complexities {#computational-complexities}

Increasing the "depth" (number of composed sub-flows) of the
transformation results in only \\(O(K)\\) growth in computation
complexity, where \\(K\\) is the depth of the flow.

One crucial operation is the computation of the Jacobian determinant.
In automatic-differentiation frameworks, this has computational cost
of \\(O(D^3)\\), where \\(D\\) is the number of inputs and outputs of a neural
network. For practical applications we choose neural network designs
that reduce the cost to \\(O(D)\\).

Examples of such efficient sub-flow transformations include:

-   autoregressive flows
-   linear flows
-   residual flows


## Practical Considerations {#practical-considerations}

Composing a large number of flows bring their own challenges.


### Normalization {#normalization}

As with deep neural networks, normalizing the intermediate
representation is crucial for stable gradients throughout the flow.
Models such as Glow employ variants of batch normalization. Batch
normalization can be implemented as a composition of 2 affine
transformations. The first has scale and translation parameters set
by the batch statistics, and the second has free parameters \\(\alpha\\)
(scale) and \\(\beta\\) (translation):

\begin{equation}
  \mathrm{BN}(\mathrm{z})=\alpha \odot \frac{\mathrm{z}-\hat{\mu}}{\sqrt{\hat{\sigma}^{2}+\epsilon}}+\beta, \quad \mathrm{BN}^{-1}\left(\mathrm{z}^{\prime}\right)=\hat{\mu}+\frac{\mathrm{z}^{\prime}-\beta}{\alpha} \odot \sqrt{\hat{\sigma}^{2}+\epsilon}
\end{equation}

Glow uses a variant called activation normalization, which is
preferable when training with small mini-batches since batch norm's
statistics become noisy and can destabilize training.


### Multi-scale architectures {#multi-scale-architectures}

Because \\(\mathbf{x}\\) and \\(\mathbf{u}\\) must have the same
dimensionality, and \\(T\_k\\) must preserve this dimensionality, the
transformations can be extremely expensive. To combat this issue, one
can clamp sub-dimensions of the intermediate flow \\(z\_k\\) such that no
additional transformation is applied. Doing so allows us to apply
steps to a subset of dimensions, which is less costly.

This kind of optimization is natural when dealing with granular data
types such as pixels.


## Continuous Flows {#continuous-flows}

We can construct flows in continuous time by parameterizing the flow's
infinitesimal dynamics, and then integrating to find the corresponding
transformation. The flow is defined by an ordinary differential
equation (ODE) that describes the flow's evolution in time.