+++
title = "Probability Theory"
author = ["Jethro Kuan"]
lastmod = 2020-07-17T00:57:38+08:00
draft = false
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
3.  For any sequence of events \\(E_1, E_2, \dots\\) that are mutually
    exclusive:

\begin{equation}
P( \mathop{\cup}\_{n=1}^{\infty} E_n) = \sum\_{n=1}^{\infty} P(E_n)
\end{equation}

## Conditional Probabilities {#conditional-probabilities}

Conditional probabilities are a powerful and useful concept. First, we
are often interested in calculating probabilities and expectations
when some partial information is available. Second, in calculating a
desired probability or expectation, it is often extremely useful to
first "condition" on some appropriate random variable.

We denote \\(P(E|F)\\) the conditional probability that \\(E\\) occurs given
that \\(F\\) has occurred. This is valid for all events \\(E\\) and \\(F\\) that
satisfy the 3 conditions above.

Recall that for any 2 events \\(E\\) and \\(F\\), the conditional probability
of \\(E\\) given \\(F\\) is defined, as long as \\(P(F) > 0\\), by:

\begin{equation}
P(E|F) = \frac{P(EF)}{P(F)}
\end{equation}

If \\(X\\) and \\(Y\\) are discrete random variables, it is natural to define
the conditional probability mass function of \\(X\\) given that \\(Y = y\\),
by:

\begin{align}
p\_{X|Y}(x|y) &= P\left\\{ X=x | Y=y \right\\} \\\\\\
&= \frac{P(X = x, Y = y)}{P( Y = y)} \\\\\\
&= \frac{p(x,y)}{p_Y(y)}
\end{align}

for all values of \\(y\\) such that \\(P(Y = y) > 0\\). Similarly, we can
define \\(F\_{X|Y}(x|y) = \sum\_{a\le x}p\_{X|Y}(x|y)\\).

Finally, the conditional expectation of \\(X\\) given that \\(Y = y\\) is
defined by:

\begin{align}
E[X|Y = y] &= \sum\_{x} P\left\\{ X = x | Y = y \right\\} \\\\\\
&= \sum\_{x} x p\_{X|Y} (x|y)
\end{align}

### Computing Expectations by Conditioning {#computing-expectations-by-conditioning}

Let us denote by \\(E[X|Y]\\) that function of the random variable \\(Y\\)
whose value at \\(Y=y\\) is \\(E[X|Y=y]\\). An extremely important property of
conditional expectation is that for all random variables \\(X\\) and \\(Y\\):

\begin{equation}
E[X] = E\left[ E[X|Y] \right]
\end{equation}

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
