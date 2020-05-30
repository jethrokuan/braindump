+++
title = "Fisher information"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T02:57:45+08:00
slug = "fisher_information"
draft = false
+++

The Fisher information in a univariate model is given by:

\begin{equation}
I(\theta)=-\mathrm{E}\_{\mathbf{Y} | \theta}\left[\frac{\partial^{2}}{\partial \theta^{2}} \log p(\boldsymbol{y} | \theta)\right]
\end{equation}

for data \\(\mathbf{Y}\\). In a multivariate model, the Fisher information
matrix, has \\(ij\\) entry:

\begin{equation}
I\_{i j}(\boldsymbol{\theta})=-\mathrm{E}\_{\mathbf{Y} | \theta}\left[\frac{\partial^{2}}{\partial \theta\_{i} \partial \theta\_{j}} \log p(\boldsymbol{y} | \boldsymbol{\theta})\right]
\end{equation}
