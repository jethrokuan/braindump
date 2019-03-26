+++
title = "VC-Dimension"
author = ["Jethro Kuan"]
lastmod = 2019-03-27T07:29:19+08:00
draft = false
math = true
+++

Related posts: [Bias-Complexity Tradeoff]({{< relref "bias_complexity_tradeoff" >}}), [PAC Learning]({{< relref "pac_learning" >}})

<sup id="acdb3458f18ecb92e5037975d277d0fb"><a href="#shalev2014understanding" title="Shalev-Shwartz \&amp; Ben-David, Understanding machine learning: From theory to algorithms, Cambridge university press (2014).">(Shalev-Shwartz \& Ben-David, 2014)</a></sup>

What makes one class learnable and another unlearnable? The family of
learnable classes in the setup of binary valued classification with
the zero-one loss relies on a combinatorial notion called the
Vapnik-Chervonenkis dimension (VC-dimension).


## Infinite-size classes can be learnable {#infinite-size-classes-can-be-learnable}

To see that this is true, we provide a counterexample.

let \\(\mathcal{H}\\) be the set of threshold functions over the real
line, namely, \\(\mathcal{H} = \left\\{h\_a : a \in \mathbb{R}\right\\}\\),
where \\(h\_a : \mathbb{R} \rightarrow \left\\{0,1\rightarrow\\}\\) is a
function such that \\(h\_a(x) = \mathbb{I}\_{[x < a]}\\). Clearly \\(H\\) is of
infinite size. However, we can easily show that \\(\mathcal{H}\\) is PAC
learnable, with sample complexity:

\begin{equation}
  m\_H(\epsilon, \delta) \le \lceil \log (2/\delta) / \epsilon \rceil
\end{equation}


## The VC-dimension {#the-vc-dimension}

Hence, while finiteness of \\(\mathcal{H}\\) is a sufficient condition for
PAC learnability, it is not a necessary condition. Here we show that
the VC-dimension of a hypothesis class gives the correct
characterization of its learnability.

<div class="definition">
  <div></div>

Let \\(\mathcal{H}\\) be a class of functions from \\(\mathcal{X}\\) to
\\(\left\\{0,1\right\\}\\), and let \\(C = \\{c\_1, \dots, c\_m\\} \subset X\\). The
restriction of \\(\mathcal{H}\\) to \\(C\\) is the set of functions from \\(C\\)
to \\(\\{0, 1\\}\\) that can be derived from \\(\mathcal{H}\\). That is:

\begin{equation}
  \mathcal{H}\_C = \left\\{ h(c\_1), \dots, h(c\_m) : h \in \mathcal{H} \right\\}
\end{equation}

</div>

where we represent each function from \\(C\\) to \\(\\{0, 1\\}\\) as a vector in
\\(\\{0,1\\}^{|C|}\\).

<div class="definition">
  <div></div>

A hypothesis class \\(\mathcal{H}\\) shatters a finite set \\(C \subset
\mathcal{X}\\) if the restriction of \\(\mathcal{H}\\) to \\(C\\) is the set of
all functions from \\(C\\) to \\(\\{0, 1\\}\\). That is, \\(|\mathcal{H}\_C| =
2^{|C|}\\).

</div>

Whenever some set \\(C\\) is shattered by \\(\mathcal{H}\\), the adversary is
not restricted by \\(\mathcal{H}\\), as they can construct a distribution
over \\(C\\) based on any target function from \\(C\\) to \\(\\{0,1\\}\\), while
still maintaining the realizability assumption.

This leads us to the definition of VC-dimension:

<div class="definition">
  <div></div>

The VC-dimension of a hypothesis class \\(\mathcal{H}\\), denoted
\\(\textrm{VCdim}(\mathcal{H})\\), is the maximal size of a set \\(C \subset
\mathcal{X}\\) that can be shattered by \\(\mathcal{H}\\). If \\(\mathcal{H}\\)
can shatter \\(C\\) of any arbitrary size, then \\(\mathcal{H}\\) has infinite VC-dimension.

</div>


## Examples {#examples}


### Threshold Functions {#threshold-functions}

Let \\(\mathcal{H}\\) be the class of threshold functions over
\\(\mathbb{R}\\). We have shown that for an arbitrary set \\(C = \\{c\_1\\}\\),
\\(\mathcal{H}\\) shatters \\(C\\). However, we have shown that for an
arbitrary set \\(C = \\{c\_1, c\_2\\}\\) where \\(c\_1 \le c\_2\\), \\(\mathcal{H}\\)
does not shatter \\(C\\). Hence \\(\textrm{VCdim}(\mathcal{H}) = 1\\).


### Intervals {#intervals}

Take \\(C = {1, 2}\\), and we see that \\(\mathcal{H}\\) shatters \\(C\\). Hence
\\(\textrm{VCdim}(\mathcal{H}) \ge 2\\). However, take an arbitrary set \\(C
= \\{c\_1, c\_2, c\_3\\}\\) where \\(c\_1 \le c\_2 \le c\_3\\). Then the labelling
(1,0,1) cannot be obtained by an interval. Therefore,
\\(\textrm{VCdim}(\mathcal{H}) = 2\\).


## The Fundamental Theorem of Statistical Learning {#the-fundamental-theorem-of-statistical-learning}

Let \\(\mathcal{H}\\) be a hypothesis class of functions from a domain
\\(\mathcal{X}\\) to \\(\\{0, 1\\}\\) and let the loss function be the 0-1 loss.
Then the following are equivalent:

1.  \\(\mathcal{H}\\) has the uniform convergence property.
2.  Any ERM rule is a successful agnostic PAC learner for \\(\mathcal{H}\\).
3.  \\(\mathcal{H}\\) is agnostic PAC learnable.
4.  \\(\mathcal{H}\\) is PAC learnable.
5.  Any ERM rule is a successful PAC learner for \\(\mathcal{H}\\).
6.  \\(\mathcal{H}\\) has a finite VC-dimension.


## Sauer's Lemma and the Growth Function {#sauer-s-lemma-and-the-growth-function}

We have defined the notion of shattering, by considering the
restriction of \\(\mathcal{H}\\) to a finite set of instances. The growth
function measures the maximal "effective" size of \\(\mathcal{H}\\) on a
set of \\(m\\) examples. Formally:

<div class="definition">
  <div></div>

Let \\(\mathcal{H}\\) be a hypothesis class. Then the growth function of
\\(\mathcal{H}\\), denoted \\(\tau\_{\mathcal{H}}(m) : \mathbb{N} \rightarrow
\mathbb{N}\\), is defined as:

\begin{equation}
  \tau\_{\mathcal{H}}(m) = \textrm{max}\_{C \subset \mathcal{X} : |C| =
    m} |\mathcal{H}\_C|
\end{equation}

</div>

\\(\tau\_{\mathcal{H}}(m)\\) is the number of different functions from a
set \\(C\\) of size \\(m\\) to \\(\\{0,1\\}\\) that can be obtained by restricting
\\(\mathcal{H}\\) to \\(C\\). With this definition we can now state Sauer's
lemma:

<div class="definition">
  <div></div>

Let \\(\mathcal{H}\\) be a hypothesis class with
\\(\textrm{VCdim}(\mathcal{H}) \le d < \infty\\). Then for all \\(m\\),

\begin{equation}
  \tau\_{\mathcal{H}}(m) \le \sum\_{i=0}^{d}{m \choose i}
\end{equation}

In particular, if \\(m > d + 1\\), then \\(\tau\_{\mathcal{H}}(m) \le (em/d)^d\\).

</div>

# Bibliography
<a id="shalev2014understanding"></a>Shalev-Shwartz, S., & Ben-David, S., *Understanding machine learning: from theory to algorithms* (2014), : Cambridge university press. [↩](#acdb3458f18ecb92e5037975d277d0fb)
