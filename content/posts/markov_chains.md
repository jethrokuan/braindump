+++
title = "Markov Chains"
author = ["Jethro Kuan"]
lastmod = 2019-02-09T16:21:06+08:00
tags = ["statistics", "machine-learning"]
draft = false
math = true
+++

## Introduction {#introduction}

Consider a process that has a value in ecah time period. Let \\(X\_n\\)
denote its value in time period \\(n\\), and suppose we want to make a
probability model for the sequence of successive values $X\_0, X\_1,
&hellip;, $. The simplest model would probably assume that the \\(X\_n\\) are
independent random variables, but often such an assumption is clearly
unjustified. However, it may be reasonable to assume that the
conditional distribution of \\(X\_{n+1}\\) given all the past observations,
only depends on \\(X\_n\\). Such an assumption defines a Markov chain, a
type of stochastic process.

Let \\(\left\\{ X\_n, n = 0,1,2,\dots \right\\}\\) be a stochastic process
that takes on a finite or countable number of possible values. Unless
otherwise mentioned, this set of possible values of the process will
be denoted by the set of nonnegative integers \\(\left\\{ 0,1,2, \dots
\right\\}\\). If \\(X\_n = i\\), then the process is said to be in state \\(i\\)
at time \\(n\\). We suppose that whenever the process is in state \\(i\\),
there is a fixed probabibility \\(P\_{ij}\\) that it will be next be in
state \\(j\\). That is, we suppose that:

\begin{equation}
  P\left\\{ X\_{n+1} = j | X\_n = i, X\_{n-1} = i\_{n-1}, \dots \right\\} = P\_{ij}
\end{equation}

for all states \\(i\_0, i\_1, \dots, i\_{n-1}, i, j\\) and all \\(n \ge 0\\). The
value \\(P\_{ij}\\) represents the probability that the proces will, when
in state \\(i\\), next make a transition into state \\(j\\).


## Chapman-Kolmogorov Equations {#chapman-kolmogorov-equations}

Having defined the one-step transition probabilities \\(P\_{ij}\\), we can
now define the \\(n\\) -step transition probaiblities \\(P\_{ij}^n\\) to be the
probability that the process in state \\(i\\) will be in state \\(j\\) after
\\(n\\) additional transitions. That is:

\begin{equation}
  P\_{ij}^n = P\left\\{ X\_{n+k} = j | X\_k = i \right\\}
\end{equation}

The Chapman-Kolmogorov equations provide a method for computing these
n-step transition probabilities. These equations are:

\begin{equation}
  P\_{ij}^{n+m} = \sum\_{k=0}^{\infty} P\_{ij}^n P\_{kj}^m \text{ for all
  } n,m \ge 0, \text{ all } i,j
\end{equation}

and are most easily understood by noting that \\(P\_{ik}^n P\_{kj}^m\\)
represents the probability that starting in \\(i\\) the process will go to
state \\(j\\) in \\(n+m\\) transitions through a path which takes it into
state \\(k\\) at the nth transition. Summing over all intermediate states
yields the total probability that the process will be in state \\(j\\)
after \\(n+m\\) transitions.

If we let \\(\mathbf{P}^{(n)}\\) denote the matrix of $n$-step transition
probabilities \\(P\_{ij}^n\\) then the Chapman-Kolmogorov equation asserts
that:

\begin{equation}
  \mathbf{P}^{(n+m)} = \mathbf{P}^n \dot \mathbf{P}^m
\end{equation}

The $n$-step transition matrix can be obtained by multiplying the
matrix \\(\mathbf{P}\\) by itself \\(n\\) times.


## Classification of States {#classification-of-states}

State \\(j\\) is said to be _accessible_ from state \\(i\\) if \\(P^{n}\_{ij} > 0\\)
for some \\(n \ge 0\\). Two states \\(i\\) and \\(j\\) that are accessible to each
other are said to _communicate_, and we write \\(i \leftrightarrow j\\).

Any state communicates with itself, since by definition \\(P\_{ii}^0 =
1\\).

The relation of communication satisfies the following 3 properties:

1.  State \\(i\\) communicates with state \\(i\\), for all \\(i \ge 0\\)
2.  If state \\(i\\) communicates with state \\(j\\), then state \\(j\\)
    communicates with state \\(i\\).
3.  If state \\(i\\) communicates with state \\(j\\), and state \\(j\\)
    communicates with state \\(k\\), then state \\(i\\) communicates with state
    \\(k\\).

Two states that communicate are said to be in the same _class._ The
concept of communication divides the state space into several separate
classes. The Markov chain is said to be _irreducible_ if there is only 1
class, that is all states communicate with each other.
