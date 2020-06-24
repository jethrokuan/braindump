+++
title = "Markov Logic Networks"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:10:20+08:00
draft = false
+++

tags
: [Machine Learning Papers]({{< relref "ml_papers" >}})

## Markov Logic Networks ([Richardson and Domingos 2006](#org5cdef32)). {#markov-logic-networks--richardson-and-domingos-2006--org5cdef32---dot}

### Problem {#problem}

Traditionally, first-order logic imposes hard constraints on the
world. This poses problems in the real world: formulae that may be
typically true in the real world are not always true. In most domains,
it is difficult to devise non-trivial formulae that are always true.
Probabilistic graphical models is a decent solution.

### What are Markov Logic Networks ? {#what-are-markov-logic-networks}

Markov logic networks relax the hard constraints that first-order
logic enforces. When a world violates one formula in a KB, it is less
probable, but not impossible. The fewer formulae a world violates, the
more probable it is. Each formula is associated with a weight that
reflects how strong a constraint it is: the higher the weight, the
greater the difference in log probability between a world that
satisfies the formula, and one that does not, other things equal.

Formally,

A Markov Logic Network \\(L\\) is a set of pairs \\((F_i, w_i)\\), where \\(F_i\\)
is a formula in first-order logic, and \\(w_i\\) is a real number.
Together with a finite set of constants \\(C = \left\\{ c_1, c-2, \dots,
c\_{|C|} \right\\}\\), it defines a Markov Logic Network as follows:

1.  \\(M\_{L,C}\\) contains one binary node for e ach possible grounding of
    each predicate appearing in \\(L\\). The binary node takes on value \\(1\\)
    if the ground atom is true, and 0 otherwise.
2.  \\(M\_{L,C}\\) contains one feature for each possible grounding of each
    formula \\(F_i\\) in \\(L\\). The value of this feature is \\(1\\) if the
    ground formula is true, and 0 otherwise. The weight of the feature
    is the \\(w_i\\) associated with \\(F_i\\) in \\(L\\).

## Bibliography {#bibliography}

<a id="org5cdef32"></a>Richardson, Matthew, and Pedro Domingos. 2006. “Markov Logic Networks.” _Machine Learning_ 62 (1-2):107–36.
