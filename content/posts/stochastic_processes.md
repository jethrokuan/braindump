+++
title = "Stochastic Processes"
author = ["Jethro Kuan"]
draft = false
+++

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

, Ross, n.d., @pinsky2010introduction