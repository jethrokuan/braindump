+++
title = "Contrastive Methods"
author = ["Jethro Kuan"]
lastmod = 2020-07-08T14:54:28+08:00
slug = "contrastive_methods"
draft = false
+++

Contrastive methods learn representations by contrasting positive and negative
examples. This is one of methods used in [Self-supervised Learning]({{< relref "self_supervised_learning" >}}).

The goal is to learn an encoder \\(f\\) such that:

\begin{equation}
\text{score}(f(x), f(x^{+})) >> \text{score}(f(x), f(x^{-}))
\end{equation}

where \\(x^{+}\\) is a positive example, and \\(x^{-}\\) is a negative example.
