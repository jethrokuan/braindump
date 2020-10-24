+++
title = "Optimal Stopping Theory"
author = ["Jethro Kuan"]
lastmod = 2020-10-24T21:44:15+08:00
slug = "optimal_stopping_theory"
draft = false
+++

Consider this toy scenario (also known as the [Secretary Problem](https://en.wikipedia.org/wiki/Secretary%5Fproblem)):

> Imagine that you wish to hire a suitable applicant for a position. \\(n\\) rankable
> applicants have applied, but the catch is that you have to make a decision for
> each applicant right after the interview. How do you maximize the probability of
> selecting the next applicant?

It turns out that the optimal stopping rule is always rejecting the first \\(n/e\\)
applicants, and then stopping at the first applicant who is better than every
applicant that has been interviewed so far.

This model makes several assumptions that reduces its applicability in real life:

1.  The number of applicants \\(n\\) must be known in advance
2.  The second-best applicant is often an okay choice, compared to hiring the worst
3.  Applicants do not give perfect information

If we suppose that the distribution of \\(n\\) follows some probability
distribution, then the optimal strategy yields the \\(1/e\\) law of best choice.
That is, it:

1.  Yields for all \\(N\\) a success probability of \\(1/e\\)
2.  Is the unique strategy guaranteeing this lower success probability bound
    \\(1/e\\), and the bound is optimal
3.  Selects, if there is one applicant, none at all with probability \\(1/e\\)
