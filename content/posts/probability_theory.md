+++
title = "Probability Theory"
author = ["Jethro Kuan"]
lastmod = 2019-01-18T15:23:45+08:00
tags = ["statistics"]
draft = false
math = true
+++

## Setup {#setup}

Suppose that we are about to perform an experiment whose outcome is
not predictable in advance. The set of all possible outcomes of an
experiment is known as the _sample space_ \\(S\\).

For example, if the experiment consists of flipping a coin, then:

\begin{equation}
  S = (H, T)
\end{equation}

Any subset \\(E\\) of the sample space \\(S\\) is known as an _event_. Some
examples of event include: \\(E = (H)\\) where \\(E\\) is the event that a
head appears on the flip of the coin.

We can define unions and intersections between 2 or more events. The
union of two events \\(E \cup F\\) is a new event to consist of all
outcomes that are either in \\(E\\) or \\(F\\).


## Probabilities Defined on Events {#probabilities-defined-on-events}

Consider an experiment whose sample space is \\(S\\). For each event \\(E\\)
of the sample space \\(S\\), we assume that a number \\(P(E)\\) is defined and
satisfies 3 conditions:

1.  \\(0 \le P(E) \le 1\\)
2.  \\(P(S) = 1\\)
3.  For any sequence of events \\(E\_1, E\_2, \dots\\) that are mutually
    exclusive:

\begin{equation}
  P( \mathop{\cup}\_{n=1}^{\infty} E\_n) = \sum\_{n=1}^{\infty} P(E\_n)
\end{equation}


## Conditional Probabilities {#conditional-probabilities}

We denote \\(P(E|F)\\) the conditional probability that \\(E\\) occurs given
that \\(F\\) has occurred. This is valid for all events \\(E\\) and \\(F\\) that
satisfy the 3 conditions above.


## Independent Events {#independent-events}

Two events \\(E\\) and \\(F\\) are independent if:

\begin{equation}
  P(EF) = P(E) P(F)
\end{equation}

This also implies that \\(P(E|F) = P(E)\\).


## Bayes' Formula {#bayes-formula}

Let \\(E\\) and \\(F\\) be events. We may express \\(E\\) as \\(E = EF \cup EF^c\\).
Since \\(EF\\) and \\(EF^c\\) are mutually exclusive, we have:

\begin{align}
  P(E) &= P(EF) + P(EF^c) \\\\\\
       &= P(E|F)P(F) + P(E|F^c)P(F^c) \\\\\\
  &= P(E|F)P(F) + P(E|F^c)\left( 1 - P(F) \right)
\end{align}
