+++
title = "Rademacher Complexity"
author = ["Jethro Kuan"]
lastmod = 2020-03-07T23:43:24+08:00
draft = false
+++

tags
: [§machine\_learning]({{< relref "machine_learning" >}})

In [PAC Learning]({{< relref "pac_learning" >}}), We have shown that [uniform convergence is a
sufficient condition for learnability]({{< relref "pac_learning" >}}). Rademacher complexity measures
the rate of uniform convergence. Rademacher complexity can also be
used to provide generalization bounds.


## Definition {#definition}

Let us denote:

\begin{equation}
  \mathcal{F} \overset{\mathrm{def}}{=} l \circ \mathcal{H}
  \overset{\mathrm{def}}{=} \left\\{ z \rightarrow l(h,z) : h \in \mathcal{H} \right\\}
\end{equation}

given \\(f \in \mathcal{F}\\), we also define:

\begin{equation}
  L\_D(f) = \mathbb{E}\_{z \sim D} \left[ f(z) \right], L\_S(f) =
  \frac{1}{m} \sum\_{i=1}^{m} f(z\_i)
\end{equation}

We define the representativeness of \\(S\\) with respect to \\(\mathcal{F}\\)
as the largest gap between the true error of a function \\(f\\), and its
empirical error:

\begin{equation}
  \mathrm{Rep}\_D(\mathcal{F}, S) \overset{\mathrm{def}}{=}
  \mathrm{sup}\_{f \in \mathcal{F}} (L\_D(f) - L\_S(f))
\end{equation}

Suppose we would like to estimate the representativeness of \\(S\\) using
the sample \\(S\\) only. One simple idea is to split \\(S\\) into 2 disjoint
sets, \\(S = S\_1 \cup S\_2\\) ; refer to \\(S\_1\\) as the validation set and
\\(S\_2\\) as the training set. We can then estimate the representativeness
of \\(S\\) by:

\begin{equation}
  \mathrm{sup}\_{f \in \mathcal{F}} (L\_{S\_1}(f) - L\_{S\_2}(f))
\end{equation}

If we define \\(\mathbf{\sigma} = (\sigma\_1, \dots, \sigma\_m) \in
\left\\{ \pm 1\right\\}^m\\), to be a vector such that \\(S\_1 = \\{ z\_i :
\sigma\_i = 1\\}\\) and \\(S\_2 = \\{ z\_i : \sigma\_i = -1\\}\\). If we further
assume \\(|S\_1| = |S\_2|\\), then:

\begin{equation}
  \frac{2}{m} \mathrm{sup}\_{f \in \mathcal{F}} \sum\_{i=1}^{m} \sigma\_i f(z\_i)
\end{equation}

The Rademacher complexity measure captures this idea by considering
the expectation of the above with respect to a random choice of
\\(\mathcal{\sigma}\\). Formally, let \\(\mathcal{F} \circ S\\) be the set of
all possible evaluations a function \\(f \in \mathcal{F}\\) can achieve on
sample S, namely:

\begin{equation}
  \mathcal{F} \circ S = \left\\{ (f(z\_1), \dots, f(z\_m)) : f \in \mathcal{F} \right\\}
\end{equation}

Let the variables in \\(\mathbf{\sigma}\\) be distributed i.i.d. according
to \\(\mathbb{P}[\sigma\_i = 1] = \mathbb{P}[\sigma\_i = -1] =
\frac{1}{2}\\). Then the Rademacher complexity of \\(\mathcal{F}\\) with
respect to \\(S\\) is defined as:

\begin{equation}
  R(\mathcal{F} \circ S) \overset{def}{=} \frac{1}{m}
  \mathbb{E}\_{\mathbf{\sigma} \in \\{ \pm 1\\}^m} \left[ \mathrm{sup}\_{f
    \in \mathcal{F}} \sum\_{i=1}^{m} \sigma\_i f(z\_i) \right]
\end{equation}

More generally, given a set of vectors \\(A \subset \mathbb{R}^m\\), we
define

\begin{equation}
  R(A) \overset{\mathrm{def}}{=} \frac{1}{m}
  \mathbb{E}\_{\mathbf{\sigma}} \left[ \mathrm{sup}\_{f \in \mathcal{F}}
  \sum\_{i=1}^{m} \sigma\_i f(z\_i) \right]
\end{equation}

The following lemma bounds the expected value of the
representativeness of \\(S\\) by twice the expected Rademacher complexity.

<div class="lemma">
  <div></div>

\begin{equation}
  \mathbb{E}\_{S \sim \mathcal{D}^m} \left[ \mathrm{Rep}\_{\mathcal{D}}
    (\mathcal{F}, S) \right] \le 2 \mathbb{E}\_{S \sim \mathcal{D}^m}
  R(\mathcal{F} \circ S)
\end{equation}

</div>

This lemma yields that, in expectation, the ERM rule finds a
hypothesis which is close to the optimal hypothesis in \mathcal{H}.

<div class="theorem">
  <div></div>

\begin{equation}
  \mathbb{E}\_{S \sim \mathcal{D}^m} \left[ L\_D(ERM\_{\mathcal{H}}(S)) -
  L\_S(ERM\_{\mathcal{H}}(S))\right] \le 2 \mathbb{E}\_{S \sim
  \mathcal{D}^m} (l \circ \mathcal{H} \circ S)
\end{equation}

Furthermore, for any \\(h^\* \in \mathcal{H}\\)

\begin{equation}
  \mathbb{E}\_{S \sim \mathcal{D}^m} \left[ L\_D(ERM\_{\mathcal{H}}(S)) -
  L\_D(h^\*)\right] \le 2 \mathbb{E}\_{S \sim
  \mathcal{D}^m} (l \circ \mathcal{H} \circ S)
\end{equation}

Furthermore, if \\(h^\* = \mathrm{argmin}\_h L\_{\mathcal{D}}(h)\\) then for
each \\(\delta \in (0,1)\\) with probability of at least \\(1 - \delta\\) over
the choice of \\(S\\), we have:

\begin{equation}
  L\_{\mathcal{D}} (ERM\_{\mathcal{H}}(S) - L\_{\mathcal{D}}(h^\*)) \le
  \frac{2 \mathbb{E}\_{S' \sim \mathcal{D}^m} R(l \circ \mathcal{H}
    \circ S')}{\delta}
\end{equation}

</div>

Using [McDiarmid's Inequality](https://people.eecs.berkeley.edu/~bartlett/courses/281b-sp08/13.pdf), we can derive bounds with better
dependence on the confidence parameter:

<div class="theorem">
  <div></div>

Assume that for all \\(z\\) and \\(h \in \mathcal{H}\\) we have that \\(|l(h,z)
\le c|\\). Then,

1.  With probability at least \\(1 - \delta\\), for all \\(h \in
       \mathcal{H}\\),

\begin{equation}
  L\_{\mathcal{D}} (h) - L\_S(h) \le 2 \mathbb{E}\_{S' \sim
    \mathcal{D}^m} R(l \circ \mathcal{H} \circ S') + c \sqrt{\frac{2 \ln(2/\delta)}{m}}
\end{equation}

In particular, this holds for \\(h = ERM\_{\mathcal{H}}(S)\\).

1.  With probability at least \\(1 - \delta\\), for all \\(h \in
       \mathcal{H}\\),

\begin{equation}
  L\_{\mathcal{D}} (h) - L\_S(h) \le 2 R(l \circ \mathcal{H} \circ S) +
  4c\sqrt{\frac{2 \ln(4/\delta)}{m}}
\end{equation}

1.  For any \\(h^\*\\) , with probability at least \\(1 - \delta\\),

\begin{equation}
  L\_{\mathcal{D}} (ERM\_{\mathcal{H}} (S)) - L\_D(h^\*) \le 2 R(l \circ \mathcal{H} \circ S) +
  5c\sqrt{\frac{2 \ln(8/\delta)}{m}}
\end{equation}

</div>

Massart's lemma states that the Rademacher complexity of a finite set
grows logarithmically with the size of the set.

<div class="lemma">
  <div></div>

Let \\(A = \\{a\_1, \dots, a\_N\\}\\) be a finite set of vectors in
\\(\mathbb{R}^m\\). Define \\(\bar{a} = \frac{1}{N} \sum\_{i=1}^N a\_i\\).
Then,

\begin{equation}
  R(A) \le \mathrm{max}\_{a \in A} \lVert a - \bar{a} \rVert
  \frac{\sqrt{2 \log(N)}}{m}
\end{equation}

</div>

The contraction lemma shows that composing \\(A\\) with a Lipschitz
function does not blow up the Rademacher complexity.


## Rademacher complexity of linear classes {#rademacher-complexity-of-linear-classes}

We define 2 linear classes:

\begin{equation}
  \mathcal{H}\_1 = \left\\{x \rightarrow \langle w,x  \rangle : \lVert w
      \rVert\_1 \le 1\right\\}
\end{equation}

\begin{equation}
  \mathcal{H}\_2 = \left\\{x \rightarrow \langle w,x  \rangle : \lVert w
      \rVert\_2 \le 1\right\\}
\end{equation}

\\(\mathcal{H}\_2\\) is bounded by the following lemma:

<div class="lemma">
  <div></div>

Let \\(S = (x\_1, \dots, x\_m)\\) be vectors in an Hilbert space. Define
\\(\mathcal{H}\_2 \circ S = \left\\{( \langle w, x\_1 \rangle), \langle w,
x\_2 \rangle), \dots, \langle w, x\_m \rangle) : \lVert w \rVert\_2 \le 1
\right\\}\\). Then,

\begin{equation}
  R(\mathcal{H}\_2 \circ S) \le \frac{\mathrm{max}\_i \lVert x\_i \rVert\_2}{\sqrt{m}}
\end{equation}

</div>

The following lemma \\(\mathcal{H}\_1\\):

<div class="lemma">
  <div></div>

Let \\(S = (x\_1, \dots, x\_m)\\) be vectors in \\(\mathbb{R}^n\\). Then,

\begin{equation}
  R(\mathcal{H}\_1 \circ S) \le \mathrm{max}\_i \lVert x\_i \rVert\_\infty
  \sqrt{\frac{2 \log(2n)}{m}}
\end{equation}

</div>
