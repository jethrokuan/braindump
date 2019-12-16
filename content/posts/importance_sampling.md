+++
title = "Importance Sampling"
author = ["Jethro Kuan"]
lastmod = 2019-12-16T13:22:47+08:00
draft = false
math = true
+++

Importance sampling is used to convert expectations under some unknown
distribution to some expectation under some known distribution.

\begin{aligned} E\_{x \sim p(x)}[f(x)] &=\int p(x) f(x) d x \\ &=\int \frac{q(x)}{q(x)} p(x) f(x) d x \\ &=\int q(x) \frac{p(x)}{q(x)} f(x) d x \\ &=E\_{x \sim q(x)}\left[\frac{p(x)}{q(x)} f(x)\right] \end{aligned}
