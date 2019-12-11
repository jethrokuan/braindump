+++
title = "Markov Logic Networks"
author = ["Jethro Kuan"]
lastmod = 2019-12-11T23:46:56+08:00
draft = false
math = true
+++

## Markov Logic Networks <a id="ffcf484ffbed70c6ebcf595884716056" href="#richardson06_markov_logic_networ" title="Matthew Richardson \&amp; Pedro Domingos, Markov Logic Networks, {Machine Learning}, v(1-2), 107-136 (2006).">(Matthew Richardson \& Pedro Domingos, 2006)</a>. {#markov-logic-networks-dot}


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

A Markov Logic Network \\(L\\) is a set of pairs \\((F\_i, w\_i)\\), where \\(F\_i\\)
is a formula in first-order logic, and \\(w\_i\\) is a real number.
Together with a finite set of constants \\(C = \left\\{ c\_1, c-2, \dots,
c\_{|C|} \right\\}\\), it defines a Markov Logic Network as follows:

1.  \\(M\_{L,C}\\) contains one binary node for e ach possible grounding of
    each predicate appearing in \\(L\\). The binary node takes on value \\(1\\)
    if the ground atom is true, and 0 otherwise.
2.  \\(M\_{L,C}\\) contains one feature for each possible grounding of each
    formula \\(F\_i\\) in \\(L\\). The value of this feature is \\(1\\) if the
    ground formula is true, and 0 otherwise. The weight of the feature
    is the \\(w\_i\\) associated with \\(F\_i\\) in \\(L\\).

# Bibliography
<a id="richardson06_markov_logic_networ"></a>Richardson, M., & Domingos, P., *Markov Logic Networks*, Machine Learning, *62(1-2)*, 107–136 (2006).  http://dx.doi.org/10.1007/s10994-006-5833-1 [↩](#ffcf484ffbed70c6ebcf595884716056)
