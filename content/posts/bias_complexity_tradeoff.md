+++
title = "The Bias-Complexity Tradeoff"
author = ["Jethro Kuan"]
tags = ["machine-learning"]
draft = false
+++

Training data can mislead the learner, and result in overfitting. To
overcome this problem, we can restrict the search space to some
hypothesis space \\(\mathcal{H}\\). This can be seen as introducing prior
knowledge to the learning task. Is such prior knowledge necessary?


## The No-Free-Lunch Theorem {#the-no-free-lunch-theorem}

The No-Free-Lunch theorem states that for binary classification tasks,
for every learner there exists a distribution on which it fails. We
say that the learner fails if, upon receiving i.i.d. examples from that
distribution, its output hypothesis is likely to have a large risk,
whereas for the same distribution, there exists another learner that
will output a hypothesis with a small risk. In other words, every
learner has tasks on which it fails while others succeed.

Therefore, when approaching a particular learning problem, defined by
some distribution \\(D\\), we should have some prior knowledge on \\(D\\). One
type of such prior knowledge is that \\(D\\) comes from some specific
parametric family of distributions. Another type of such prior
knowledge is that there exists \\(h\\) in some predefined hypothesis class
\\(H\\), such that \\(L\_D(h) = 0\\).


## Error Decomposition {#error-decomposition}

we can decompose the error of an \\(ERM\_H\\) predictor into two components
as follows. Let \\(h\_S\\) be an \\(ERM\_H\\) hypothesis. Then we can write:

\begin{equation}
  L\_D(h\_S) = \epsilon\_{\textrm{app}} + \epsilon\_{\textrm{est}}
\end{equation}

where \\(\epsilon\_{\textrm{app}} = \textrm{min}\_{h\in H} L\_D(h)=\\), and
\\(\epsilon\_{\textrm{est}} = L\_D(h\_S) - \epsilon\_{\textrm{app}}\\).

**The approximation error** is the minimum risk achievable by a predictor
in the hypothesis class. This term measures how much risk we have
because we restrict ourselves to a specific class (how much
[inductive bias]({{<relref "inductive_bias.md#" >}}) we have). This approximation error does not depend on
the sample size, and is solely determined by the hypothesis class
chosen.

Under the realizability assumption, the approximate error is zero. In
the agnostic case, the approximation error can be large (it always
includes the error of the Bayes optimal predictor).

**The estimation error** is the difference between the approximation error
and the error achieved by the ERM predictor. The estimation error
results because the empirical risk (training error) is only an
estimate of the true risk.

Since our goal is to minimize the total error, we face a tradeoff,
called the bias-complexity tradeoff. Choosing \\(H\\) to be a very rich
class decreases the approximation error, but may increase the
estimation error, as a rich \\(H\\) might lead to overfitting. Learning
theory studies how rich we can make \\(H\\) while still maintaining
reasonable estimation error.