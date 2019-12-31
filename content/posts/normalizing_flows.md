+++
title = "Normalizing Flows"
author = ["Jethro Kuan"]
lastmod = 2019-12-31T13:10:37+08:00
draft = false
math = true
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

Flow-based models provide 2 operations:

1.  Sampling from the model, requiring ability to sample from
    \\(p\_{\mathrm{u}}(\mathbf{u})\\) and computing the forward
    transformation \\(T\\).
2.  Evaluating the model's density, requiring computing the inverse
    transformation \\(T^{-1}\\) and its Jacobian determinant.

These operations have different computational complexity.


## Resources {#resources}

-   Normalizing Flows for Probabilistic Modeling and Inference <a id="a4fefb8e3be96de786eb8c74324ec9e5" href="#papamakarios19_normal_flows_probab_model_infer" title="Papamakarios, Nalisnick, , Rezende, Mohamed, \&amp; Lakshminarayanan, Normalizing Flows for Probabilistic Modeling and  Inference, {CoRR}, v(), (2019).">(Papamakarios et al., 2019)</a>

# Bibliography
<a id="papamakarios19_normal_flows_probab_model_infer"></a>Papamakarios, G., Nalisnick, E., Rezende, D. J., Mohamed, S., & Lakshminarayanan, B., *Normalizing flows for probabilistic modeling and inference*, CoRR, *()*,  (2019).  [↩](#a4fefb8e3be96de786eb8c74324ec9e5)
