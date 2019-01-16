+++
title = "Stochastic Processes"
author = ["Jethro Kuan"]
lastmod = 2019-01-16T08:58:24+08:00
draft = false
math = true
+++

Focus: _Discrete time, discrete state space Markov Chain_

-   Stochastic = random
-   A stochastic process describes random phenomena that change over
    time

-   values that \\(X\_t\\)'s take
-   set of all possible states, denoted by \\(\mathcal{S}\\).
-   can be thought of as time. If \\(T = \{0, 1, 2, \dots \}\\)
    then it is a discrete-time process. If \\(T\\) is an
    interval, it is a continuous time process.

Each \\(X\_t\\) is a random variable.

Example of stochastic process: Gambler's ruin

1.  A gambler starts with an initial fortune of \\(k\\) dollars.
2.  The gambler plays against \\(B\\) with an initial fortune of \\(N-k\\) dollars.
3.  Each game he bets $1, wins with probability \\(p\\)
4.  Let \\(\{X\_t = t = 0,1,2 \dots\}\\) represent his fortune as the
    betting goes on.
5.  Game only stops when either gambler or \\(B\\) is ruined.
6.  Here \\(\mathcal{S} = \{0,1,\dots,N\}\\)
7.  For a realization of the results of the first 10 games, (here
    \\(p=1/2\\)):

```R
sample(c(-1, 1), 10, replace=T)
```


## Reference Textbooks {#reference-textbooks}

<sup id="f5bf9e00e58b91654e7db48e02402403"><a href="#ross2014introduction" title="Ross, Introduction to probability models, Academic press (2014).">ross2014introduction</a></sup><sup>,</sup><sup id="685088059011ecabed3f6b757f8161de"><a href="#pinsky2010introduction" title="Pinsky \&amp; Karlin, An introduction to stochastic modeling, Academic press (2010).">pinsky2010introduction</a></sup>

# Bibliography
<a id="ross2014introduction"></a>Ross, S. M., *Introduction to probability models* (2014), : Academic press. [↩](#f5bf9e00e58b91654e7db48e02402403)

<a id="pinsky2010introduction"></a>Pinsky, M., & Karlin, S., *An introduction to stochastic modeling* (2010), : Academic press. [↩](#685088059011ecabed3f6b757f8161de)
