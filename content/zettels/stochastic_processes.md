+++
title = "Stochastic Processes"
author = ["Jethro Kuan"]
lastmod = 2020-02-06T12:36:40+08:00
draft = false
+++

tags
: [§stochastic\_processes]({{< relref "stochastic_processes" >}})

A stochastic process \\(X(t), t \in T\\) is a collection of random
variables. For each \\(t \in T\\), \\(X(t)\\) is a random variable. The index
\\(t\\) is often interpreted as time, and as a result, we refer to \\(X(t)\\)
as the state of the process at time \\(t\\).

The set \\(T\\) is called the index set of the process. When \\(T\\) is a
countable set, the stochastic is a discrete-time process. If \\(T\\) is an
interval of the real line, the process is said to be a continuous-time
process.

Focus: _Discrete time, discrete state space Markov Chain_

-   Stochastic = random
-   A stochastic process describes random phenomena that change over
    time

-   values that \\(X\_t\\)'s take
-   set of all possible states, denoted by \\(\mathcal{S}\\).
-   can be thought of as time. If \\(T = \\{0, 1, 2, \dots \\}\\)
    then it is a discrete-time process. If \\(T\\) is an
    interval, it is a continuous time process.

Each \\(X\_t\\) is a random variable.

Example of stochastic process: Gambler's ruin

1.  A gambler starts with an initial fortune of \\(k\\) dollars.
2.  The gambler plays against \\(B\\) with an initial fortune of \\(N-k\\) dollars.
3.  Each game he bets $1, wins with probability \\(p\\)
4.  Let \\(\\{X\_t = t = 0,1,2 \dots\\}\\) represent his fortune as the
    betting goes on.
5.  Game only stops when either gambler or \\(B\\) is ruined.
6.  Here \\(\mathcal{S} = \\{0,1,\dots,N\\}\\)
7.  For a realization of the results of the first 10 games, (here
    \\(p=1/2\\)):

<!--listend-->

```R
sample(c(-1, 1), 10, replace=T)
```


## Reference Textbooks {#reference-textbooks}

<a id="f5bf9e00e58b91654e7db48e02402403" href="#ross2014introduction">(Ross, 2014)</a><a>, </a><a id="685088059011ecabed3f6b757f8161de" href="#pinsky2010introduction">(Pinsky \& Karlin, 2010)</a>

# Bibliography
<a id="ross2014introduction" target="_blank">Ross, S. M., *Introduction to probability models* (2014), : Academic press.</a> [↩](#f5bf9e00e58b91654e7db48e02402403)

<a id="pinsky2010introduction" target="_blank">Pinsky, M., & Karlin, S., *An introduction to stochastic modeling* (2010), : Academic press.</a> [↩](#685088059011ecabed3f6b757f8161de)
