+++
title = "Concept Learning"
author = ["Jethro Kuan"]
draft = false
+++

A concept is a boolean-valued function over a set of input instances
(each comprising input attributes). Concept learning is a form of
supervised learning. Infer an unknown boolean-valued function from
training-examples.


## Hypothesis {#hypothesis}

There is a trade-off between _expressive power_ and smaller
_hypothesis space_. Large hypothesis spaces are bad, because search is
going to take a long time, and also requires more data. Humans exploit
structure in the hypothesis space to guide search and learn faster.

A hypothesis \\(h\\) is consistent with a set of training examples \\(D\\) iff
\\(h(x) = c(x)\\) for all \\(<x,c(x)> \in D\\).


## Inductive Learning {#inductive-learning}

Any hypothesis found to approximate the target function well over a
sufficient large set of **training examples** will also approximate the
target function well over other **unobserved examples**.


## Concept Learning is Search {#concept-learning-is-search}

The goal is to search for a hypothesis \\(h \in H\\) that is consistent
with \\(D\\).


## Exploit Structure in Concept Learning {#exploit-structure-in-concept-learning}

\\(h\_j\\) is more general than or equal to \\(h\_k\\) (denoted \\(h\_j \ge\_{g}
ph\_k\\)) iff any input instance \\(x\\) that satisfies \\(h\_j\\) also satisfies
\\(h\_k\\).

This is relation is a **partial order**.


## Find-S Algorithm {#find-s-algorithm}

Intuition: Start with the most specific hypothesis \\(h\\). Whenever it
wrongly classifies a positive training example, we "minimally"
generalize it to satisfy its input instance.


### Limitations {#limitations}

1.  Can't tell whether Find-S has learnt the target concept
2.  Can't tell when training examples are _inconsistent_
3.  Picks a maximally specific \\(h\\)
4.  Depending on \\(H\\), there may be several solutions


## Version Space {#version-space}

\begin{equation\*}
  VS\_{H,D} = {h \in H | h \text{ is consistent with }D}
\end{equation\*}

-   If \\(c \in H\\), then D can reduce \\(VS\_{H,D}\\) to \\({c}\\).
-   If D is insufficient, then \\(VS\_{H,D}\\) represents the _uncertainty_
    of what the target concept is
-   \\(VS\_{H,D}\\) contains all consistent hypotheses, including maximally
    specific hypotheses

The **general boundary** G of \\(VS\_{H,D}\\) is the set of maximally general
members of \\(H\\) consistent with \\(D\\).

The **specific boundary** S of \\(VS\_{H,D}\\) is the set of maximally general
members of \\(H\\) consistent with \\(D\\).

\begin{equation\*}
  VS\_{H,D} = {h \in H | \exists s \in S \exists g \in G g \ge\_g h
    \ge\_g s }
\end{equation\*}


## List-Then-Eliminate Algorithm {#list-then-eliminate-algorithm}

Iterate through all hypotheses in \\(H\\), and eliminate any hypothesis
found inconsistent with any training example. This algorithm is often
prohibitively expensive.


## Candidate-Elimination Algorithm {#candidate-elimination-algorithm}

Start with most general and specific hypotheses. Each training example
"minimally" generalizes S and specializes G to remove inconsistent
hypotheses from version space.