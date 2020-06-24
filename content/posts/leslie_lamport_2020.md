+++
title = "If You're Not Writing a Programming Language, Don't Use A Programming Language - Leslie Lamport"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:09:47+08:00
draft = false
+++

title
: If You're Not Writing a Programming Language, Don't Use A Programming Language

speaker
: [Leslie Lamport]({{< relref "leslie_lamport" >}})

date
: <span class="timestamp-wrapper"><span class="timestamp">&lt;2020-01-16 Thu&gt;</span></span>

> Inside every program, there is an algorithm trying to get out.

We should find and understand the algorithm before writing the
program. The best way to describe these algorithms is with mathematics.

Don't be "brainwashed" by programming languages. Free your mind with mathematics.

## Algorithms vs Programs {#algorithms-vs-programs}

Programs tend to contain more low-level details:

1.  What types are the arguments?
2.  What are the boundary conditions?
3.  Should I throw an exception?

**Key insights:**

- Programs are hard to debug, because we're debugging an algorithm at
  the code level.
- Algorithms are hard to optimize at the code level

**Solution: Describe algorithms in math!**

## Describing an execution of an algorithm {#describing-an-execution-of-an-algorithm}

Algorithms are described by a sequence of states, characterized by a
set of behaviours. Set of behaviours are described by an initial
predicate on state \\(s_1\\), and predicates on pairs of states \\(s_m,
s_n\\).

E.g. Euclid's algorithm:

1.  Initial Predicate: \\((x = M) \wedge (y = N)\\)
2.  Next state predicate:

\begin{equation}
\text{Next}\_E : ((x > y) \wedge (x' = x - y) \wedge (y' = y)) \vee
((y > x) \wedge (y' = y - x) \wedge (x' = x))
\end{equation}

### Predicate on Behaviours {#predicate-on-behaviours}

This can be written as:

\begin{equation}
\mathrm{Init}\_E \wedge \Box \mathrm{Next}\_E
\end{equation}

### Safety and Liveness {#safety-and-liveness}

safety
: what is allowed to happen

liveness
: what must eventually happen

Any property can be expressed as \\(\text{safety} \wedge
\text{liveness}\\).

### Invariance {#invariance}

If Euclid's algorithm has terminated, then \\(x = GCD(M, N)\\). This can
be expressed as a property:

\begin{equation}
\Box ((x = y) \rightarrow (x = GCD(M,N)))
\end{equation}

Invariance can be proved by showing:

\begin{equation}
\text{Init}\_E \wedge \Box \text{Next}\_E \rightarrow \Box I_E
\end{equation}

where \\(I_E\\) is the invariance property.

## Impact of Using Math to Describe Systems {#impact-of-using-math-to-describe-systems}

### Example 1: Virtuoso {#example-1-virtuoso}

The next iteration of Virtuoso used the [TLA+] abstraction.

> We witnessed first-hand the brainwashing done by years of C programming

Better algorithm led to 10x size decrease in Virtuoso.

### Example 2: Amazon Web Services ([Newcombe et al. 2015](#orgd22a7c7)) {#example-2-amazon-web-services--newcombe-et-al-dot-2015--orgd22a7c7}

AWS uses formal methods (TLA+). Key insights:

- Formal methods allow for finding bugs that other methods cannot discover
- Formal methods are routinely applied to the design of complex,
  real-world software
- They are surprisingly applicable to daily work

TLA+ is also used at Microsoft.

## TL;DR {#tl-dr}

Use TLA+.

## Related {#related}

- [Hoare logic](https://en.wikipedia.org/wiki/Hoare%5Flogic)

## Bibliography {#bibliography}

<a id="orgd22a7c7"></a>Newcombe, Chris, Tim Rath, Fan Zhang, Bogdan Munteanu, Marc Brooker, and Michael Deardeuff. 2015. “How Amazon Web Services Uses Formal Methods.” _Communications of the ACM_ 58 (4):66–73.
