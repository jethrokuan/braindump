+++
title = "PAC Learning"
author = ["Jethro Kuan"]
lastmod = 2019-03-13T19:01:35+08:00
tags = ["machine-learning"]
draft = false
math = true
+++

## ERM for finite hypothesis classes {#erm-for-finite-hypothesis-classes}

We note that [empirical risk minimization]({{< relref "machine_learning" >}}) can easily overfit
to the training data. To correct for this, we introduce inductive
bias, restricting the hypothesis space \\(\mathcal{H}\\).

The simplest type of restriction is to impose an upper bound on the
size of a class. Here, we show that if a hypothesis class is finite,
then ERM will not overfit given a sufficiently large sample size.

Let \\(h\_S\\) denote the result of applying ERM to \\(S\\):

\begin{equation}
  h\_S \in \textrm{argmin}\_{h \in \mathcal{H}} L\_S(h)
\end{equation}

We make 2 assumptions. First, the realizability assumption, implying
that every ERM hypothesis we have that \\(L\_S(h\_S) = 0\\). However, we are
more interested in the true risk \\(L\_{(D,f)}(h\_S)\\) rather than the
empirical risk.

<div class="definition">
  <div></div>

The Realizability Assumption: There xists \\(h^\* \in \mathcal{H}\\) such
that $L<sub>(D,f)(h^\*) = 0</sub>. That is, with probability 1 over random
samples \\(S\\), where the instances are sampled according to \\(D\\), and
labelled according to \\(f\\), we have \\(L\_S(h^\*) = 0\\).

</div>

Any guarantee on the error with respect to the underlying distribution
\\(D\\), must depend on the relationship between \\(D\\) and \\(S\\). Here, we
make the second assumption that the training examples are drawn i.i.d.

Since \\(L\_{(D,f)}(h\_S)\\) depends on the training set, which is drawn via
a random process, it is also a random variable.

We introduce 2 parameters:

1.  the probability of getting a non-representative sample, denoted by
    \\(\delta\\). We denote \\((1 - \delta)\\) the confidence parameter of our prediction.
2.  We denote \\(\epsilon\\) as the accuracy parameter of the prediction.
    The event that \\(L\_{(D,f)}(h\_S) > \epsilon\\) is a failure of the
    learner, while \\(L\_{(D,f)}(h\_S) \le \epsilon\\) is the event where the
    predictor is approximately correct.

We are interested in upper bounding the probability to sample m-tuple
of instances that will lead to failure of the learner. Formally, let
\\(S\_x = \left(x\_1, \dots, x\_m \right)\\) be the instances of the training
set. We would like to upper-bound:

\begin{equation}
  D^M(\left\\{ S\_x ; L\_{(D,f)}(h\_S) > \epsilon \right\\})
\end{equation}

Let \\(H\_B\\) be the set of bad hypotheses, that is,

\begin{equation}
  \mathcal{H}\_B = \left\\{ h \in \mathcal{H} : L\_{(D,f)}(h)> \epsilon \right\\}
\end{equation}

In addition, let:

\begin{equation}
M = \left\\{ S\_x: \exists h \in \mathcal{H}\_B, L\_S(h) = 0 \right\\}
\end{equation}

be the set of misleading samples. For every \\(S\_x \in M\\), there is a
bad hypothesis, \\(h \in \mathcal{H}\_B\\) that looks like a good
hypothesis in \\(S\_x\\).

Since the realizability assumption implies \\(L\_S(h\_S) = 0\\), then the
event \\(L\_{(D,f)}(h\_S) > \epsilon\\) will only happen if our sample is
in the set of misleading examples \\(M\\).

Then:

\begin{equation}
  D^m(\left\\{ S\_x : L\_{(D,f)}(h\_S) > \epsilon \right\\}) \le D^m(M)
  =D^m(\cups\_{h \in \mathcal{H}\_B} {S\_x: L\_S(h) = 0})
\end{equation}

Because the training samples are i.i.d.:

\begin{align}
  D^m(\left\\{ S\_x: L\_S(h) = 0\right\\}) &= D^m(\left\\{ S\_x: \forall i,
                                         h(x\_i) = f(x\_i) \right\\}) \\\\\\
  &=  \prod\_{i=1}^{m}D(\left\\{ x\_i: h(x\_i) = f(x\_i) \right\\})
\end{align}

for each individual sampling of an element of the training set, we
have:

\begin{equation}
  D(\left\\{ x\_i: h(x\_i) = y\_i \right\\}) = 1 - L\_{(D,f)}(h) \le 1- \epsilon
\end{equation}

Using the inequality \\(1 - \epsilon \le e^{-\epsilon}\\), we obtain that:

\begin{equation}
  D^m(\left\\{ S\_x: L\_S(h) = 0 \right\\}) \le (1 - \epsilon)^m \le
  e^{-\epsilon m}
\end{equation}

Applying the union bound, we get:

\begin{equation}
  D^m(\left\\{ S\_x: L\_{(D,f)}(h\_S) > \epsilon \right\\}) \le \left| \mathcal{H}\_B \right|(1 - \epsilon)^m \le
  \left| \mathcal{H}\_B \right| e^{-\epsilon m}
\end{equation}

With this result, we can show that where \\(m \ge
\frac{\log(|\mathcal{H}|/\delta)}{\epsilon}\\), the error \\(L\_{(D,f)(h\_S)
\le \epsilon}\\) for every ERM hypothesis \\(h\_S\\).


## Formulation {#formulation}
