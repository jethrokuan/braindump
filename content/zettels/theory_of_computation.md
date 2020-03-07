+++
title = "Theory Of Computation"
author = ["Jethro Kuan"]
lastmod = 2020-03-07T23:43:14+08:00
draft = false
+++

## Introduction {#introduction}

Finite automata are a useful model for many kinds of important
software and hardware. Automatas are found in compilers, software for
designing digital circuits, and many more systems.

_Grammars_ provide useful models when designing software that processes
data with a recursive structure. The compiler's parser deals with
recursively nested features. Regular Expressions also denote the
structure of data, especially in text strings.

The study of automata addresses the following questions:

1.  What can a computer do?
2.  What can a computer do efficiently?

Automata theory also provides a tool for making formal proofs, of both
the inductive and deductive type.


### Formal Proofs {#formal-proofs}

Here the more common proof requirements are here:

1.  Proving set equivalence: we can approach this by rephrasing it into
    an iff statement.
    1.  Prove that if `x` is in `E`, then `x`  is in `F`.
    2.  Prove that if `x` is in `F`, then `x` is in `E`.


### Inductive Proofs {#inductive-proofs}

Suppose we are given a statement \\(S(n)\\) to prove. The inductive
approach involves:

1.  The _basis_: where we show \\(S(i)\\) for a particular \\(i\\).
2.  The _inductive step_: where we show if \\(S(k)\\) (or \\(S(i), S(i+1),
       \dots, S(k)\\)) then \\(S(k+1)\\).


### Structural Inductions {#structural-inductions}

We can sometimes prove statements by construction. This is often the
case with recursively defined structures, such as with trees and
expressions. This works because we the recursive definition is invoked
at each step, so we are guaranteed that at each step of the
construction, the construction \\(X\_i\\) is valid.


## Automata Theory {#automata-theory}


### Definitions {#definitions}

alphabet
: An _alphabet_ is a finite, nonempty set of symbols. E.g.
    \\(\Sigma = \\{0, 1\\}\\) represents the binary alphabet

string
: A _string_ is a finite sequence of symbols chosen from some
    alphabet. For example, \\(01101\\) is a string from the binary
    alphabet. The empty string is represented by &epsilon;, and
    sometimes \\(\Lambda\\). The
    _length_ of a string is denoted as such: \\(|001| = 3\\)

Powers
: \\(\Sigma^k\\) represents strings of length \\(k\\).

Concatenation
: \\(xy\\) denotes the concatenation of strings \\(x\\) and
    \\(y\\).

Problem
: a _problem_ is the question of deciding whether a given
    string is a member of some particular language.


## Finite Automata {#finite-automata}

An automata has:

-   a set of states
-   its "control" moves from state to state in response to external inputs

A finite automata is one where the automaton can only be in a single
state at once (it is deterministic). Non-determinism allows us to
program solutions to problems using a higher-level language.

Determinism refers to the fact that on each input there is one and
only one state to which the automaton can transition from its current
state. Deterministic Finite Automata is often abbrieviated with _DFA_.


### Deterministic Finite Automata {#deterministic-finite-automata}

A _dfa_ consists of:

1.  A finite set of _states_, often denoted \\(Q\\).
2.  A finite set of _input symbols_, often denoted \\(\Sigma\\).
3.  A _transition function_ that takes as arguments a state and an input
    symbol and returns a state, often denoted \\(\delta\\). If \\(q\\) is a state,
    and \\(a\\) is an input symbol, then \\(\delta(q,a)\\) is that state \\(p\\) such
    that there is an arc labeled \\(a\\) from \\(q\\) to \\(p\\).
4.  A _start state_, one of the states in \\(Q\\).
5.  A set of _final_ or _accepting_ states \\(F\\). The set \\(F\\) is a subset of
    \\(Q\\).

In proofs, we often talk about a DFA in "five-tuple" notation:

\begin{equation}
  A = \left(Q, \Sigma, \delta, q\_0, F \right)
\end{equation}

-    Simpler Notations

    The two preferred notation for describing automata are:

    transition diagrams
    : a graph

    {{< figure src="/ox-hugo/subset-construction-nfa-from-transition-table_2018-08-14_12-47-06.jpg" >}}

    transition table
    : a tubular listing of the \\(\delta\\) function, which by
        implication tells us the states and the input alphabet.

    {{< figure src="/ox-hugo/jTETt_2018-08-14_12-49-00.png" >}}


### Language of a DFA {#language-of-a-dfa}

We can define the _language_ of a DFA \\(A = \left(Q, \Sigma, q\_0, F\right)\\).
This language is denoted \\(L(A)\\), and is defined by:

\begin{equation}
L(A) = \\{ w | \delta(q\_0, w) \text{ is in } F\\}
\end{equation}

The language of \\(A\\) is the set of strings \\(w\\) that take the start
state \\(q\_0\\) to one of the accepting states.


### Extending Transition Function to Strings {#extending-transition-function-to-strings}

Basis:

\begin{equation}
\hat{\delta}\left(q, \epsilon\right) = q
\end{equation}

Induction:

\begin{equation}
\hat{\delta}\left(q, xa\right) = \delta \left(\hat{\delta}\left(q, x\right), a \right)
\end{equation}


## Nondeterministic Finite Automata {#nondeterministic-finite-automata}

A NFA has can be in several states at once, and this ability is
expressed as an ability to "guess" something about its input. It can
be shown that NFAs accept exactly the regular languages, just as DFAs
do. We can always convert an NFA to a DFA, although the latter may
have exponentially more states than the NFA.


### Definition {#definition}

An NFA has:

1.  A finite set of states \\(Q\\).
2.  A finite set of input symbols \\(\Sigma\\).
3.  A starting state \\(q\_0 \in Q\\),
4.  A set of final states \\(F \subset Q\\).
5.  A transition function that takes a state in \\(Q\\) and an input symbol
    in \\(\Sigma\\) as arguments and returns a **subset** of \\(Q\\).


### The Language of an NFA {#the-language-of-an-nfa}

if \\(A = (Q, \Sigma, \delta, q\_0, F)\\) is an NFA, then

\begin{equation}
L(A) = \\{w | \hat{\delta}(q\_0, w) \cap F \neq \emptyset\\}
\end{equation}

That is, \\(L(A)\\) is the set of strings \\(w\\) in \\(\Sigma^\*\\) such that
\\(\hat{\delta}(q\_0, w)\\).


### The Equivalence of DFA and NFA {#the-equivalence-of-dfa-and-nfa}

{{< figure src="/ox-hugo/screenshot_2018-08-14_13-44-15.png" >}}


### Finite Automata with Epsilon-Transitions {#finite-automata-with-epsilon-transitions}

Transitions on &epsilon;, the empty string, allow NFAs to make a transition
spontaneously. This is sometimes referred to as &epsilon;-NFAs, and are
closely related to regular expressions.

{{< figure src="/ox-hugo/screenshot_2018-08-15_11-45-07.png" >}}

Of particular interest is the transition from \\(q\_0\\) to \\(q\_1\\), where the
\\(+\\) and \\(-\\) sign is optional.


### Epsilon-Closures {#epsilon-closures}

We &epsilon;-close a state \\(q\\) by following all transitions out of \\(q\\) that
are labelled &epsilon;, eventually finding all states that can be reached
from \\(q\\) along any path whose arcs are all labelled &epsilon;.

&epsilon;-closure allows us to explain easily what the transitions of an
&epsilon;-NFA look like when given a sequence of (non-&epsilon;) inputs. Suppose
that \\(E = (Q, \Sigma, \delta, q\_0, F)\\) is an &epsilon;-NFA. We first define \\(\hat{\delta}\\),
the extended transition function, to reflect what happens on a
sequence of inputs.

**BASIS**: \\(\hat{\delta}(q, \epsilon) = ECLOSE(q)\\). If the label of the path is &epsilon;,
then we can follow only &epsilon;-labeled arcs extending from state \\(q\\).

**INDUCTION**: Suppose \\(w\\) is of the form \\(xa\\), where \\(a\\) is the last
symbol of \\(w\\). Note that \\(a\\) is a member of \\(\Sigma\\); it cannot be &epsilon;.
Then:

\begin{align}
  \text{Let } & \hat{\delta}(q, x) = \\{p\_1, p\_2, \dots, p\_k\\} \\\\\\
   & \bigcup\limits\_{i=1}^k \delta(p\_i, a) = \\{r\_1, r\_2, \dots, r\_m\\} \\\\\\
  \text{Then } & \hat{\delta}(q,w) = \bigcup\limits\_{j=1}^m ECLOSE(r\_j)
\end{align}


### Eliminating &epsilon;-Transitions {#eliminating-and-epsilon-transitions}

Given any &epsilon;-NFA \\(E\\), we can find a DFA \\(D\\) that accepts the same
language as \\(E\\).

Let \\(E = (Q\_E, \Sigma, \delta\_E, q\_0, F\_E)\\), then the equivalent DFA \\(D = (Q\_D, \Sigma,
\delta\_D, q\_D, F\_D)\\) is defined as follows:

1.  \\(Q\_D\\) is the set of subsets of \\(Q\_E\\). All accessible states of \\(D\\)
    are &epsilon;-closed subsets of \\(Q\_E\\), i.e. \\(S \subseteq Q\_K s.t. S =
       ECLOSE(S)\\). Any &epsilon;-transition out of one of the states in \\(S\\)
    leads to another state in \\(S\\).
2.  \\(q\_D = ECLOSE(q\_0)\\), we get the start state of \\(D\\) by closing the set
    consisting of only the start state of \\(E\\).
3.  \\(F\_D\\) is those set of states that contain at least one accepting
    state of \\(E\\). \\(F\_D = \\{S | S \text{ is in } Q\_D \text{ and } S \cap F\_E
       \neq \emptyset \\}\\)
4.  \\(\delta\_D(S,a)\\) is computed for all \\(a\\) in \\(\Sigma\\) and sets \\(S\\) in \\(Q\_D\\) by:
    1.  Let \\(S = \\{p\_1, p\_2, \dots, p\_k\\}\\)
    2.  Compute \\(\bigcup\limits\_{i=1}^{k}\delta\_E(p\_i, a) = \\{r\_1, r\_2, \dots, r\_m\\}\\)
    3.  Then \\(\delta\_D(S, a) = \bigcup\limits\_{j=1}^{m}ECLOSE(r\_j)\\)


## Regular Expressions {#regular-expressions}

Regular expressions may be thought of as a "programming language", in
which many important applications like text search applications or
compiler components can be expressed in.

Regular expressions can define the exact same languages that various
forms of automata describe: the regular languages. Regular expressions
denote languages. We define 3 operations on languages that the
operators of regular expressions represent.

1.  The _union_ of two languages \\(L \bigcup M\\), is the set of strings
    that are either in \\(L\\) or \\(M\\).
2.  The _concatenation_ of languages \\(L\\) and \\(M\\) is the set of strings
    that can be formed by taking any string in \\(L\\) and concatenating it
    with any string in \\(M\\).
3.  The closure (or star, or _Kleene closure_) is denoted \\(L^\*\\) and
    represents the set of those strings that can be formed by taking
    any number of strings from \\(L\\), possibly with repetitions, and
    concatenating all of them.

We can describe regular expressions recursively. For each expression
\\(E\\), we denote the language it represents with \\(L(E)\\).

**BASIS**:

1.  The constants \\(\epsilon\\) and \\(\emptyset\\) are regular expressions, denoting the
    languages \\(\\{\epsilon\\}\\) and \\(\emptyset\\) respectively.
2.  If \\(a\\) is a symbol, then \\(\mathbb{a}\\) is a regular expression. This
    expression denotes the language \\(\\{a\\}\\).

**INDUCTION**:

1.  \\(L(E) + L(F) = L(E) \bigcup L(F)\\)
2.  \\(L(EF) = L(E)L(F)\\)
3.  \\(L(E^\*) = (L(E))^\*\\)
4.  \\(L((E)) = L(E)\\)


### Precedence of regular expression operators {#precedence-of-regular-expression-operators}

The precedence in order of highest to lowest, is:

1.  star
2.  dot (note that this operation is associative)
3.  union (\\(\plus\\) operator)


### Equivalence of DFA and Regular Expressions {#equivalence-of-dfa-and-regular-expressions}

We show this by showing that:

1.  Every language defined by a DFA is also defined by a regular
    expression.
2.  Every language defined by a regular expression is also defined by a
    $\epilon$-NFA, which we have already shown is equivalent to a DFA.

{{< figure src="/ox-hugo/screenshot_2018-08-28_12-46-13.png" >}}

-    From DFA to Regular Expression

    We can number the finite states in a DFA \\(A\\) with \\(1, 2, \dots, n\\).

    Let \\(R\_{ij}^{(k)}\\) be the name of a regular expression whose language is the
    set of strings \\(w\\) such that \\(w\\) is the label of a path from state \\(i\\)
    to state \\(j\\) in a DFA \\(A\\), and the path has no intermediate node whose
    number is greater than \\(k\\).
    To construct the expression \\(R\_{ij}^{(k)}\\), we use the following inductive
    definition, starting at \\(k= 0\\), and finally reaching \\(k=n\\).

    BASIS: \\(k=0\\).
    Since the states are numbered \\(1\\) or above, the restriction on paths
    is that the paths have no intermediate states at all. There are only 2
    kinds of paths that meet such a condition:

    1.  An arc from node (state) \\(i\\) to node \\(j\\).
    2.  A path of length \\(0\\) that consists only of some node \\(i\\).

    If \\(i \ne j\\), then only case \\(1\\) is possible. We must examine DFA \\(A\\)
    and find input symbols \\(a\\) such that there is a transition from state
    \\(i\\) to state \\(j\\) on symbol \\(a\\).

    1.  If there is no such symbol \\(a\\), then \\(R\_{ij}^{(0)} = \emptyset\\).
    2.  If there is exactly one such symbol \\(a\\), then \\(R\_{ij}^{(0)} = \mathbb{a}\\)
    3.  If there are symbols \\(a\_1, a\_2, \dots, a\_k\\) that label arcs from
        state \\(i\\) to state \\(j\\), then \\(R\_{ij}^{(0)} = \mathbb{a\_1} + \mathbb{a\_2} +
           \dots + \mathbb{a\_k}\\)

    In case (a), the expression becomes \\(\epsilon\\), in case (c), the expression
    becomes \\(\epsilon + \mathbb{a\_1} + \mathbb{a\_2} + \dots + \mathbb{a\_k}\\).

    INDUCTION: Suppose there is a path from state \\(i\\) to state \\(j\\) that
    goes through no state higher than \\(k\\). Then either:

    1.  The path does not go through state \\(k\\) at all. In this case, the
        label of the path is \\(R\_{ij}^{(k-1)}\\).
    2.  The path goes through state \\(k\\) at least once. We can break the
        path into several pieces:

    {{< figure src="/ox-hugo/screenshot_2018-08-28_12-58-35.png" >}}

    Then the set of labels for all paths of this type is represented by
    the regular expression \\(R\_{ik}^{(k-1)}(R\_{kk}^{(k-1)})^\*R\_{kj}^{(k-1)}\\). Then, we can
    combine the expressions for the paths of the two above:

    \begin{equation}
    R\_{ij}^{(k)} = R\_{ij}^{(k-1)} + R\_{ik}^{(k-1)}(R\_{kk}^{(k-1)})^\*R\_{kj}^{(k-1)}
    \end{equation}

    We can compute \\(R\_{ij}^{(n)}\\) for all \\(i\\) and \\(j\\), and the language of the
    automaton is then the sum of all expressions \\(R\_{ij}^{(n)}\\) such that state
    \\(j\\) is an accepting state.

-    Converting DFAs to regular expressions by eliminating states

    The above method of conversation always works, but is expensive. \\(n^3\\)
    expressions have to be constructed for an n-state automaton, but the
    length of the expression can grow by a factor of 4 on the average,
    with each of the \\(n\\) inductive steps, and the expressions themselves
    could reach on the order of \\(4^n\\) symbols.

    The approach introduced here avoids duplicating work at some points,
    by eliminating states. If we eliminate a state \\(s\\), then all paths
    that went through \\(s\\) no longer exist in the automaton. To preserve
    the language, we must include on an arc that goes directly from \\(q\\) to
    \\(p\\), the labels of paths that went from some state \\(q\\) to \\(p\\) through
    \\(s\\). This label now includes strings, but we can use a regular
    expression to represent all such strings.

    Hence, we can construct a regular expression from a finite automaton
    as follows:

    1.  For each accepting state \\(q\\), apply the reduction process to
        produce an equivalent automaton with regular-expression labels on
        the arcs. Eliminate all states except \\(q\\) and the start state \\(q\_0\\).
    2.  If \\(q \neq q\_0\\), then a two-state automaton remains, as depicted. The
        regular expression for the automaton is \\((R + SU^\*T)^\*SU^\*\\).

    {{< figure src="/ox-hugo/screenshot_2018-08-28_23-30-02.png" >}}

    1.  If the start state is also an accepting state, then we must perform
        a state-elimination from the original automaton that gets rid of
        every state but the start state, leaving a one-state automaton,
        which accepts \\(R^\*\\).

    {{< figure src="/ox-hugo/screenshot_2018-08-28_23-30-48.png" >}}

-    Converting regular expressions to automata

    We can show every language defined by a regular expression is also
    defined by a finite automaton, and we do so by converting any regular
    expression \\(R\\) to an $&epsilon;$-NFA \\(E\\) with:

    1.  Exactly one accepting state
    2.  No arcs into initial state
    3.  No arcs out of the accepting state

    The proof is conducted by structural induction on R, following the
    recursive definition of regular expressions.

    The basis of the induction involves constructing automatons for
    regular expressions (a) \\(\epsilon\\), (b) \\(\emptyset\\) and (c) \\(\mathbb{a}\\). They are displayed
    below:

    {{< figure src="/ox-hugo/screenshot_2018-08-28_23-36-18.png" >}}

    The inductive step consists of 4 cases: (a) The expression is \\(R + S\\)
    for some smaller expressions \\(R\\) and \\(S\\). (b) The expression is \\(RS\\)
    for smaller expressions \\(R\\) and \\(S\\). (c) The expression is \\(R\*\\) for
    some smaller expression \\(R\\). (d) The expression is (R) for some
    expression R. The automatons for (a), (b), and (c) are shown below:

    {{< figure src="/ox-hugo/screenshot_2018-08-28_23-39-41.png" >}}

    The automaton for \\(R\\) also serves as the automaton for \\(( R)\\).

-    Algebraic law for regular expressions

    commutativity
    : \\(x + y = y + x\\).

    associativity
    : \\((x \times y) \times z = x \times (y \times z)\\).

    distributive
    : \\(x \times (y + z) = x \times y + x \times z\\)

    <!--listend-->

    -   \\(L + M = M + L\\)
    -   \\((L + M) + N = L + (M + N)\\)
    -   \\((LM)N = L(MN)\\)
    -   \\(\emptyset + L = L + \emptyset = L\\). \\(\emptyset\\) is the identity for union.
    -   \\(\epsilon L = L \epsilon = L\\). \\(\epsilon\\) is the identity for concatenation.
    -   \\(\emptyset L = L\emptyset = \emptyset\\). \\(\emptyset\\) is the annihilator for concatenation.
    -   \\(L(M + N) = LM + LN\\) (left distributive)
    -   \\((M + N)L  = ML + NL\\) (right distributive)
    -   \\(L + L = L\\) (idempotence law)
    -   \\((L^\*)^\* = L^\*\\).
    -   \\(\emptyset^\* = \epsilon\\)
    -   \\(\epsilon^\* = \epsilon\\)
    -   \\(L^{+} = LL^\* = L^\*L\\).
    -   \\(L^\* = L^{+} + \epsilon\\)
    -   \\(L? = \epsilon + L\\)

-    Discovering laws for regular expressions

    The truth of a law reduces to the question of the equality of two
    languages. We show set equivalence: a string in one language must be
    in another, and vice-versa.


## Properties of Regular Languages {#properties-of-regular-languages}

Regular languages exhibit the "closure" property. These properties let
us build recognizers for languages that are constructed from other
languages by certain operations. Regular languages also exhibit
"decision properties", which allow us to make decisions about whether
two automata define the same language. This means that we can always
minimize an automata to have as few states as possible for a
particular language.


### Pumping Lemma {#pumping-lemma}

We have established that the class of languages known as regular
languages are accepted by DFAs, NFAs and by $&epsilon;$-NFAs.

However, not every language is a regular language. An easy way to see
this is that the number of languages is infinite, but DFAs have finite
number of states, and are finite.

The pumping lemma lets us show that certain languages are not regular.

<div class="theorem">
  <div></div>

<a id="org96ec5b7"></a>
Let \\(L\\) be a regular language. Then there exists a constant \\(n\\) (which
depends on \\(L\\)) such that for every string \\(w\\) in \\(L\\) such that
\\(| w |  \ge n\\), we can break \\(w\\) into three strings \\(w = xyz\\)
such that:

1.  \\(y \ne \epsilon\\)
2.  \\(| xy | \le n\\)
3.  For all \\(k \ge 0\\), the string \\(xy^k z\\) is also in \\(L\\)

</div>

That is, we can always find a non-empty string \\(y\\) not too far from
the beginning of \\(w\\) that can be "pumped". This means repeating \\(y\\)
any number of times, or deleting it, keeps the resulting string in the
language \\(L\\).

Note that there [has been other ways to prove irregularity of languages](https://bosker.wordpress.com/2013/08/18/i-hate-the-pumping-lemma/).


### Closure of Regular Languages {#closure-of-regular-languages}

If certain languages are regular, then languages formed from them by
certain operations are also regular. These are referred to as the
closure properties of regular languages. Below is a summary:

1.  Union of 2 regular languages
2.  Intersection of 2 regular languages
3.  Complement of 2 regular languages
4.  Difference of 2 regular languages
5.  Reversal of a regular language
6.  Closure (star) of a regular language
7.  The concatenation of regular languages
8.  A homomorphism (substitution of strings for symbols) of a regular language
9.  The inverse homomorphism of a regular language

The above are all regular.


## Context-free Grammars and Languages {#context-free-grammars-and-languages}

Context-free languages are a larger class of languages, that have
context-free grammars. We show how these grammars are defined, and how
they define languages.

Context-free grammars are recursive definitions. For example, the
context-free grammar for palindromes can be defined as:

1.  \\(P \rightarrow \epsilon\\)
2.  \\(P \rightarrow 0\\)
3.  \\(P \rightarrow 1\\)
4.  \\(P \rightarrow 0P0\\)
5.  \\(P \rightarrow 1P1\\)

There are four important components in a grammatical description of a
language:

1.  There is a finite set of symbols that form the strings of the
    language. These alphabets are called the _terminals_, or _terminal
    symbols_.
2.  There is a finite set of variables, or _nonterminals_ or _syntactic
    categories_. Each variable represents a language. In the language
    above, the only variable is \\(P\\).
3.  One of the variables represents the language being defined, called
    the _start symbol_.
4.  There is a finite set of productions or rules that represent the
    recursive definition of a language. Each production rule consists:
    1.  A variable that is being defined by the production (called the _head_).
    2.  The production symbol \\(\rightarrow\\).
    3.  A string of zero or more terminals and variables.

We can represent any CFG as these 4 components, we denote CFG \\(G = (V,
T, P, S)\\).


### Derivations using a Grammar {#derivations-using-a-grammar}

We can apply the productions of a CFG to infer that certain strings
are in the language of a certain variable.

The process of deriving strings by applying productions from head to
body requires the definition of a new relation symbol, \\(\Rightarrow\\). Suppose \\(G
= (V, T, P, S)\\) is a CFG> Let \\(\alpha A \beta\\) be a string of terminals and
variables, with \\(A\\) a variable. That is \\(\alpha\\) and \\(\beta\\) are strings in \\((V
\cup T)^\*\\), and \\(A\\) is in \\(V\\). Let \\(A \rightarrow \gamma\\) be a production of \\(G\\). We say
that \\(\alpha A \beta \Rightarrow\_{G} \alpha \gamma B\\). If \\(G\\) is understood, we can omit the
subscript.

We may extend the \\(\Rightarrow\\) relationship to represent zero, one or many
derivation steps, similar to the extended transition function.


### Leftmost and Rightmost Derivations {#leftmost-and-rightmost-derivations}

In order to restrict the number of choices we have in deriving a
string, it is often useful to require that at each step, we replace
the leftmost variable by one of its production bodies. Such a
derivation is called a _leftmost derivation_. Leftmost derivations are
indicated with \\(\Rightarrow\_{lm}\\) and \\(\Rightarrow\_{lm}^\*\\).

Similarly, it is possible to require that at each step the rightmost
variable is replaced by one of its bodies. These are called _rightmost
derivations_. These are similarly denoted \\(\Rightarrow\_{rm}\\) and \\(\Rightarrow\_{rm}^\*\\).


### The language of a Grammar {#the-language-of-a-grammar}

If \\(G = (V, T, P, S)\\) is a CFG, then the language of \\(G\\), denoted
\\(L(G)\\) is the set of terminal strings that have derivations from the
start symbol:

\begin{equation}
  L(G) = \right\\{w in T^\* | S \Rightarrow\_{G}^\* w \left\\}
\end{equation}


### Sentential Forms {#sentential-forms}

Derivations from the start symbol produce strings that have a special
role. These are called _sentential forms_. We also denote
left-sentential and right-sentential forms for leftmost derivations
and rightmost derivations respectively.


### Parse Trees {#parse-trees}

There is a tree representation of derivations, that clearly show how
symbols of a terminal string are grouped into substrings, each of
which belongs to the language of one of the variables of the grammar.
This tree is the data structure of choice when representing the source
of a program.

-    Construction

    The parse trees for a CFG \\(G\\) are trees with the following conditions:

    1.  Each interior node is labeled by variable in \\(V\\).
    2.  Each leaf is labeled by either a variable, a terminal, or \\(\epsilon\\).
        However, if the leaf is labeled \\(\epsilon\\), then it must be the only child
        of its parent.
    3.  If an interior node is labeled \\(A\\), and its children are labeled
        \\(X\_1, X\_2, \dots, X\_k\\), respectively from the left, then \\(A \rightarrow X\_1 X\_2 \dots
           X\_k\\) is a production in \\(P\\).

-    The yield

    The yield of the tree is the concatenation of the leaves of the parse
    tree from the left. This yield is a terminal string (all leaves are
    labeled either with a terminal or with \\(\epsilon\\)). The root is labeled by
    the start symbol.

-    Inferences and derivations

    The following statements are equivalent:

    1.  The recursive inference procedure determines that terminal string
        \\(w\\) is in the language of variable \\(A\\).
    2.  \\(A \Rightarrow^\* w\\)
    3.  \\(A \Rightarrow\_{lm}^\* w\\)
    4.  \\(A \Rightarrow\_{rm}^\* w\\)
    5.  There is a parse tree with root \\(A\\) and yield \\(w\\).

    We can prove these equivalences using the following arcs:

    {{< figure src="/ox-hugo/screenshot_2018-09-16_16-21-01.png" >}}


### Linear Grammars {#linear-grammars}

Right linear grammars have all the productions of form:

1.  \\(A \rightarrow wB\\) for \\(B \in V\\) and \\(w \in T^\*\\)
2.  \\(A \rightarrow  w\\), for \\(w \in T^\*\\)

Every regular language can be generated by some right-linear grammar.
Suppose \\(L\\) is accepted by DFA \\(A = (Q, \Sigma, \delta, q\_0, F)\\), Then, let \\(G =
(Q, \Sigma, P, q\_0)\\) where,

1.  For \\(q, p \in Q\\), \\(a \in \Sigma\\), if \\(\delta(q, a) = p\\), then we have a
    production in \\(P\\) of the form \\(q \rightarrow ap\\).
2.  We also have productions \\(q \rightarrow \epsilon\\) for each \\(q \in F\\).

We can prove by induction on \\(|w|\\) that \\(\hat{\delta}(q\_0, w) = p\\)  iff \\(q\_0
\Rightarrow^\* wp\\). This would give \\(\hat{\delta}(q\_0, w) \in F\\)  iff \\(q\_0 \Rightarrow^\* w\\).


### <span class="org-todo todo TODO">TODO</span> Ambiguous Grammars {#ambiguous-grammars}


### Chomsky Normal Form {#chomsky-normal-form}

Chomsky normal form is useful in giving algorithms for working with
context-free grammars. A context-free grammar is in Chomsky normal
form if every rule is of the form:

1.  \\(A \rightarrow BC\\)
2.  \\(A \rightarrow a\\)

weher \\(a\\) is any terminal and \\(A\\), \\(B\\), \\(C\\) are any variables, except
\\(B\\) and \\(C\\) cannot be the start variable. \\(S \rightarrow \epsilon\\) is also allowed.

Any context-free language is generated by a context-free grammar in
Chomsky normal form. This is because we can convert any grammar into
Chomsky normal form.


## Pushdown Automata {#pushdown-automata}

Pushdown automata are equivalent in power to context-free grammars
This equivalence is useful because it gives us two options for proving
that a language is context-free. Certain languages are more easily
described in terms of recognizers, while others aremore easily
described in terms of generators.


### Definition {#definition}

It is in essence a nondeterministic finite automaton with
&epsilon;-transitions permitted, with one additional capability: a stack on
which it can store a string of "stack symbols".

We can view the pushdown automaton informally as the device suggested
below:

{{< figure src="/ox-hugo/screenshot_2018-09-18_12-36-26.png" >}}

A "finite-state-control" reads inputs, one symbol at a time. The
automaton is allowed to observe the symbol at the top of the stack,
and to base its transition on its current state. It :

1.  Consumes from the input the symbol it uses in the transition. If &epsilon;
    is used for the input, then no input symbol is consumed.
2.  Goes to a new state
3.  Replaces the symbol at the top of the stack by any string. This
    corresponds to &epsilon;, which corresponds to a pop of the stack. It could
    also replace the top symbol by one other symbol. Finally the top
    stack symbol could be replaced by 2 or more symbols, which has the
    effect of changing the top stack symbol, and pushing one or more
    new symbols onto the stack.


### Formal Definition {#formal-definition}

We can specify a PDA \\(P\\) as follows:

\begin{equation}
  P = (Q,\Sigma, \Gamma, \delta, q\_0, Z\_0, F)
\end{equation}

-   \\(Q\\) is the finite set of states
-   \\(\Sigma\\) is the finite set of input symbols
-   \\(\Gamma\\) is the finite stack alphabet
-   \\(\delta\\) is the transition function, taking a triple $&delta;(q,a,X), where:
    -   \\(q\\) is a state in \\(Q\\)
    -   \\(a\\) is either an input symbol in \\(\Sigma\\) or \\(\epsilon\\).
    -   \\(X\\) is a stack symbol, that is a member of \\(\Gamma\\)
-   \\(q\_0\\) the start state
-   \\(Z\_0\\) the start symbol. Initially, the PDA's stack consists of this
    symbol, nothing else
-   \\(F\\) is the set of accepting states

The formal definition of a PDA contains no explicit mechanism to allow
the PDA to test for an empty stack. The PDA is able to get the same
effect by initially placing a special symbol $ on the stack. If it
sees the $ again, it knows that the stack effectively is empty.

We can also draw transition diagrams for PDAs. An example is shown
below.

{{< figure src="/ox-hugo/screenshot_2018-10-11_20-52-24.png" >}}


### Instantaneous Descriptions {#instantaneous-descriptions}

We represent the configuration of a PDA by a triple \\((q, w, \gamma)\\),
where:

1.  \\(q\\) is the state.
2.  \\(w\\) is the remaining input
3.  \\(\gamma\\) is the stack contents

Conventionally, we show the top of the stack at the left, and the
bottom at the right. This triple is called the _instantaneous
description_, or ID, of the pushdown automaton.

For finite automata, the \\(\hat{\gamma}\\) notation was sufficient to
represent sequences of instantaneous descriptions through which a
finite automaton moved. However, for PDAs we need a notation that
describes changes in the state, input and stack. Hence, we define
\\(\vdash\\) as follows. Supposed \\(\delta(q, a, X)\\) contains \\((p, \alpha)\\). Then for
all stings \\(w\\) in \\(\Sigma^\*\\) and \\(\beta\\) in \\(\Gamma^\*\\):

\begin{equation}
  (q, aw, X\beta) \vdash (p, w, \alpha\beta)
\end{equation}

We use \\(\vdash^\*\\) to represent zero or more moves of the PDA.


### The Languages of PDAs {#the-languages-of-pdas}

The class of languages for PDAs that accept by final state and accept
by empty stack are the same. We can show how to convert between the
two.

-    Acceptance by Final State

    Let \\(P = (Q, \Sigma, \Gamma, \delta, q\_0, Z\_0, F)\\) be a PDA. Then \\(L(P)\\), the language
    accepted by P by final state, is:

    \begin{equation}
    \\{w | (q\_0, w, Z\_0) \vdash^\* (q, \epsilon, \alpha) \\}
    \end{equation}

    for some state \\(q\\) in \\(F\\) and any stack string \\(\alpha\\).

-    Acceptance by Empty Stack

    Let \\(P = (Q, \Sigma, \Gamma, \delta, q\_0, Z\_0, F)\\) be a PDA. We define \\(N(P) = \\{w |
    (q\_0, w, Z\_0) \vdash^\* (q, \epsilon, \epsilon)\\}\\). That is \\(N(P)\\) is the set of inputs
    \\(w\\) that \\(P\\) can consume and at the same time empty its stack.

-    From Empty Stack to Final State

    **Theorem:**

    If \\(L = N(P\_N)\\) for some PDA \\(P\_N\\), then there is a PDA \\(P\_F\\)
    such that \\(L = L(P\_F)\\).

    **Proof**:

    We use a new symbol \\(X\_0\\), not a symbol of \\(\Gamma\\); \\(X\_0\\) is both the start
    symbol of \\(P\_F\\) and a marker on the bottom of the stack that lets us
    know when \\(P\_N\\) has reached an empty stack, then it knows that \\(P\_N\\)
    would empty its stack on the same input.

    We also use a new start state \\(p\_0\\), whose sole function is to push
    \\(Z\_0\\), the start symbol of \\(P\_N\\), onto the top of the stack and enter
    \\(q\_0\\), the start state of \\(P\_N\\). \\(P\_F\\) simulates \\(P\_N\\), until the stack of
    \\(P\_N\\) is empty, which \\(P\_F\\) detects because it sees \\(X\_0\\) on the top of
    the stack.

    {{< figure src="/ox-hugo/screenshot_2018-10-11_21-06-26.png" >}}

    Hence, we can specify \\(P\_F = (Q \cup \\{p\_0, p\_f\\}, \Sigma, \Gamma \cup \\{X\_0\\}, \delta\_F, p\_0,
    X\_0, \\{p\_f\\}\\):

    1.  \\(\delta\_F(p\_0, \epsilon, x\_0) = \\{(q\_0, Z\_0, X\_0\\}\\).
    2.  For all states \\(q\\) in \\(Q\\), inputs \\(a\\) in \\(\Sigma\\) or \\(a = \epsilon\\), and the
        stack symbols \\(Y\\) in \\(\Gamma\\), \\(\delta\_F(q,a,Y)\\) contains all the pairs in
        \\(\delta\_N(qa,Y)\\).
    3.  \\(\delta\_F(q, \epsilon, X\_0\\) contains \\((p\_f, \epsilon)\\) iff w is in \\(N(P\_N)\\).

-    From Final State to Empty Stack

    Whenever \\(P\_F\\) enters an accepting state after consuming input \\(w\\),
    \\(P\_N\\) will empty its stack after consuming \\(w\\).

    {{< figure src="/ox-hugo/screenshot_2018-10-11_21-10-12.png" >}}

    To avoid simulating a situation where \\(P\_F\\) accidentally empties its
    stack without accepting, \\(P\_N\\) also utilizes a marker \\(X\_0\\) on the
    bottom of its stack.

    That is \\(P\_N = (Q \cup \\{p\_0, p\\}, \Sigma, \Gamma \cup \\{X\_0\\}, \delta\_N, p\_0, X\_0)\\), where \\(\delta\_N\\)
    is:

    1.  \\(\delta\_N(p\_0, \epsilon, x\_0) = \\{(q\_0, Z\_0, X\_0)\\}\\)
    2.  For all states \\(q\\) in \\(Q\\), input symbols \\(a\\) in \\(\Sigma\\) or \\(a = \epsilon\\), \\(Y\\)
        in \\(\Gamma\\), \\(\delta\_N(q, a, Y)\\) contains every pair that is in \\(\delta\_F(q, a Y)\\).
    3.  For all accepting states \\(q\\) in \\(F\\), and stack symbols \\(Y\\) in \\(\Gamma\\)
        or \\(Y = X\_0\\), \\(\delta\_N(q, \epsilon, Y)\\) contains \\((p, \epsilon)\\). Whenever \\(P\_F\\)
        accepts, \\(P\_N\\) can start emptying its stack without consuming any input.
    4.  For all stack symbols \\(Y\\) in \\(\Gamma\\) or \\(Y = X\_0\\), \\(\delta\_N(p, \epsilon, Y) = \\{(p,
           \epsilon)\\}\\). Once in state \\(p\\), which only occurs when \\(P\_F\\) is accepted,
        \\(P\_N\\) pops every symbol on its stack, until the stack is empty.


### Equivalence of CFG and PDA {#equivalence-of-cfg-and-pda}

Let \\(A\\) be a CFL. From the definition we know that \\(A\\) has a CFG, \\(G\\),
generating it. We show how to convert \\(G\\) into an equivalent PDA.

The PDA \\(P\\) we now describe will work by accepting its input \\(w\\), if
\\(G\\) generates that input, by determining whether there is a derivation
for \\(w\\). Each step of the derivation yields an intermediate string of
variables and terminals. We design \\(P\\) to determine whether some
series of substitutions of \\(G\\) can lead from the start variable to
\\(w\\).

The PDA \\(P\\) begins by writing the start variable on its stack. It goes
through a series of intermediate strings, making one substitution
after another. Eventually it may arrive at a string that contains only
terminal symbols, meaning that it has used the grammar to derive a
string. Then \\(P\\) accepts if this string is identical to the string it
has received as input.

1.  Place the marker symbol $ and the start variable on the stack
2.  Repeat:
    -   If the top of stack is a variable symbol \\(A\\), nondeterministically
        select one of the rules for \\(A\\) and substitute \\(A\\) by the string
        on the right-hand side of the rule
    -   If the top of stack is a terminal symbol \\(a\\), read the next
        symbol from the input and compare it to \\(a\\). If they match,
        continue. Else, reject the branch of nondeterminism.
    -   If the top of stack is the symbol $, enter the accept state.

Now we prove the reverse direction. We have a PDA \\(P\\) and want to make
a CFG \\(G\\) that generates all the strings that \\(P\\) accepts.

For each pair of states \\(p\\) and \\(q\\), the grammar will have a variable
\\(A\_{pq}\\).

First, we simplify the task by modifying P slightly to give it the
following three features.

1.  It has a single accept state, \\(q\_{accept}\\).
2.  It empties its stack before accepting.
3.  Each transition either pushes a symbol onto the stack (a push move)
    or pops one off the stack (a pop move), but it does not do both at
    the same time.

Giving \\(P\\) features 1 and 2 is easy. To give it feature 3, we replace
each transition that simultaneously pops and pushes with a two
transition sequence that goes through a new state, and we replace each
transition that simultaneously pops and pushes with a two transition
sequence that goes through a new state, and we replace each transition
that neither pops nor pushes with a two transition sequence that
pushes then pops an arbitrary stack symbol.

To design \\(G\\) so that \\(A\_{pq}\\) generates all strings that take \\(P\\) from
\\(p\\) to \\(q\\), regardless of the stack contents at \\(p\\), leaving the stack
at \\(q\\) in the same condition as it was at \\(p\\).

First, we simplify our task by modifying \\(P\\) slightly to give it the
following three features.

-    Deterministic Pushdown Automata

    DPDAs accept a class of languages between the regular languages and
    the CFLs.

    We can easily show that DPDAs accept all regular languages by making
    it simulate a DFA (ignoring the stack).

    While DPDAs cannot represent all CFLs, it is able to represent
    languages that have unambiguous grammars.


## Properties of Context-Free Languages {#properties-of-context-free-languages}


### Simplification of CFG {#simplification-of-cfg}

The goal is to reduce all CFLs to Chomsky Normal Form. To get there,
we must make several preliminary simplifications, which are useful in
their own ways.

1.  Elimination of useless symbols
    1.  Remove all _non-reachable_ symbols: starting from \\(S\\), if it is
        impossible to reach a symbol, then it is non-reachable and can be
        removed. Example: \\(S \rightarrow a, B \rightarrow b\\), then \\(B\\) is not reachable.
    2.  Remove all _non-generating_ symbols: for each symbol, check if the
        symbol can ever generate a terminating string. If not, remove
        it. Example: \\(A \rightarrow A | Ab\\), \\(A\\) is non-generating and can be removed.
    3.  It is important to remove non-generating symbols first, because
        it can lead to more non-reachable symbols.

2.  Removal of unit productions
    1.  Unit productions look like \\(A \rightarrow B\\). We do unit production
        elimination to get a grammar into Chomsky Normal form.

    2.  To eliminate unit productions, we substitute the unit symbol
        into the production.

3.  Removal of \\(\epsilon\\) productions
    1.  Start from any symbol, remove the \\(\epsilon\\) production, by
        substituting all possibilities. E.g. \\(S \rightarrow AB | AC\\), and we
        eliminate $&epsilon;$-productions from \\(B\\): \\(S \rightarrow AB | A | AC\\).
    2.  Eliminate until no more $&epsilon;$-productions.
    3.  When an $&epsilon;$-production is eliminated from a symbol, it does not
        need to be reapplied if it appears again in the same symbol.

4.  Conversion to Chomsky Normal Form

After performing the preliminary simplifications, we can then:

1.  Arrange that all bodies of length 2 or more consist only of variables
2.  Break bodies of length 3 or more into a cascade of productions


### Pumping Lemma for CFLs {#pumping-lemma-for-cfls}

In any sufficiently long string in a CFL, it is possible to find at
most 2 short, nearby substrings, that we can pump in tandem. First, we
use several results, that we will state below.

1.  Conversion to CNF converts a parse tree into a binary tree.
2.  For a CNF grammar \\(G = (V, T, P, S)\\), if the length of the longest
    path is \\(n\\), then \\(|w| \le 2^{n-1}\\) for all terminal strings \\(w\\).

<div class="theorem">
  <div></div>

<a id="org83dfda1"></a>
Let \\(L\\) be a CFL. Then there exists a constant \\(n\\) (which
depends on \\(L\\)) such that for every string \\(z\\) in \\(L\\) such that
\\(| z |  \ge n\\), we can break \\(z\\) into three strings \\(z = uvwxy\\)
such that:

1.  $ vx &ne; &epsilon;$
2.  \\(| vwx | \le n\\)
3.  For all \\(i \ge 0\\), the string \\(uv^i wx^i y\\) is also in \\(L\\)

</div>

{{< figure src="/ox-hugo/600px-Pumping_lemma_for_context-free_languages.svg_2018-10-09_12-22-03.png" >}}

If \\(s\\) is sufficiently long, its derivation tree w.r.t. a Chomsky
normal form grammar must contain some nonterminal \\(N\\) twice on some
tree path (upper picture). Repeating \\(n\\) times the derivation part \\(N
\Rightarrow \dots \Rightarrow vNx\\) obtains a derivation for \\(u v^n w x^n y\\).


### Closure Properties of CFLs {#closure-properties-of-cfls}

First, we introduce the notion of substitutions. Let \\(\Sigma\\) be an
alphabet, and suppose that for every symbol \\(a\\) in \\(\Sigma\\), we choose a
language \\(L\_a\\). These chosen languages can be over any alphabets, not
necessarily \\(\Sigma\\) and not necessarily the same. The choice of languages
defines a function \\(s\\) on \\(\Sigma\\), and we shall refer to \\(L\_a\\) as \\(s(a)\\)
for each symbol \\(a\\).

If \\(w = a\_1 a\_2 \dots a\_n\\) in \\(\Sigma^\*\\), then \\(s(w)\\) is the language of
all strings \\(x\_1 x\_2 \dots x\_n\\) such that the string \\(x\_i\\) is in the
language \\(s(a\_i)\\). \\(s(L)\\) is the union of \\(s(w)\\) for all strings \\(w\\) in
\\(L\\).

The substitution theorem states that if we can find a substitution
function \\(a\\) on a CFL, then the resultant language \\(s(a)\\) is also a
CFL.

CFLs are closed under:

1.  Union

\\(L\_1 \cup L\_2\\) is the language \\(s(L)\\), where \\(L\\) is the language \\(\\{1,
2\\}\\), and \\(s(1) = L\_1\\) and \\(s(2) = L\_2\\).

1.  Concatenation

\\(L\_1 L\_2\\) is the language \\(s(L)\\), \\(L = {12}\\), and \\(s(1) = L\_1\\) and \\(s(2)
= L\_2\\).

1.  Closure, and positive closure (asterisk and plus)

\\(L\\) is the language \\({1}^\*\\), and \\(s\\) is the substitution \\(s(1) = L\_1\\),
then \\(L\_1^\* = s(L)\\). Similarly, for positive closure, \\(L = \\{1\\}^+\\) and
\\(L\_1^+ = s(L)\\).

1.  Homomorphism

\\(s(a) = \\{h(a)\\}\\), for all \\(a\\) in \\(\Sigma\\). Then \\(h(L) = s(L)\\).

These are the base closure properties. CFLs are also closed under
reversal. We can prove this by constructing a grammar for the reversed
CFL.

CFLs are not closed under intersection. However, CFLs are closed under
the operation of "intersection with a regular language". To prove
this, we use the PDA representation of CFLs, and FA representation of
regular languages. We can run the FA in parallel with the PDA.

CFLs are also closed under inverse homomorphism. The proof is similar
to that of regular languages, but using a PDA, but is more complex
because of the stack introduced in the PDA.


### Decision Properties of CFLs {#decision-properties-of-cfls}

First, we consider the complexity of converting from a CFG to a PDA,
and vice versa. Let \\(n\\) be the length of the entire representation of
a PDA or CFG.

Below, we list algorithms linear in the size of the input:

-   Converting a CFG to a PDA
-   Converting a PDA that accepts by final state to one that accepts by
    empty stack
-   Converting a PDA that accepts by empty stack to one that accepts by
    final state

The running time of conversion from a PDA to a grammar is much more
complex. The upper bound on the number of states and stack symbols is
\\(n^3\\), so there cannot be more than \\(n^3\\) variables of the form \\([pXq\\)
constructed for the grammar. However, the running time of conversion
could still be exponential because there are no limits to the number
of symbols put on the stack.

However, we can break the pushing of a long string of stack symbols
into a sequence of at most \\(n\\) steps that each pushes one symbol. Then
each transition has no more than 2 stack symbols, and the total length
of all the transition rules has grown by at most a constant factor,
i.e. it is still \\(O(n)\\). There are \\(O(n)\\) transition rules, and each
generates \\(O(n^2)\\) productions, since there are only 2 states that need
to be chosen in the productions that come from each rule. Hence, the
constructed grammar has length \\(O(n^3)\\), and can be constructed in
cubic time.

-    Running Time of Conversion to CNF

    1.  Detecting reachable and generating symbols can be done in \\(O(n)\\)
        time, and removing useless symbols takes \\(O(n)\\) time and does not
        increase the size of the grammar
    2.  Constructing unit pairs and eliminating unit productions takes
        \\(O(n^2)\\) time, and results in a grammar whose length is \\(O(n)\\).
    3.  Replacing terminals by variables in production bodies takes \\(O(n)\\)
        time and results in a grammar whose length is \\(O(n)\\).
    4.  Breaking production bodies of length 3 or more takes \\(O(n)\\) time
        and results in a grammar of length \\(O(n)\\).

    However eliminating $&epsilon;$-productions is tricky. If we have a production
    body of length \\(k\\), we can construct from that one production \\(2^{k-1}\\)
    productions for the new grammar, so this part of the construction
    could take \\(O(2^n)\\) time. However, we can break all long production
    bodies into a sequence of productions with bodies of length 2. This
    step takes \\(O(n)\\) time and grows only linearly, and makes eliminating
    $&epsilon;$-productions run in \\(O(n)\\) time.

    In all, converting to CNF form is a \\(O(n^2)\\) algorithm.

-    Testing for emptiness of CFL

    This is equivalent to testing if \\(S\\) is generating. The algorithm goes
    as follows:

    We maintain an array indexed by variable, which tells whether or not
    we have established that a variable is generating.For each variable
    there is a chain of all the positions in which the variable occurs
    (solid lines). The dashed lines suggest links from the productions to
    their counts.

    {{< figure src="/ox-hugo/screenshot_2018-10-12_17-24-55.png" >}}

    For each production, we count the number of positions holding
    variables whose ability to generate is not yet accounted for. Each
    time the count for a head variable reaches 0, we put the variable on a
    queue of generating variables whose consequences need to be explored.

    This algorithm takes \\(O(n)\\) time:

    1.  There are at most \\(n\\) variables in a grammar of size \\(n\\), creation
        and initialization of the array can be done in \\(O(n)\\) time.
    2.  Initialization of the links and counts can be done in \\(O(n)\\) time.
    3.  When we discover a production has count 0:
        1.  Discover a production has count \\(0\\), finding which variable is
            at the head, checking whether it is already known to be
            generating, and putting it on the queue if not. All these steps
            are \\(O(1)\\) for each production so \\(O(n)\\) in total.
        2.  work done when visiting the production bodies that have the head
            variable \\(A\\). This work is proportional to the number of
            positions with \\(A\\). Hence, \\(O(n)\\).

-    Testing Membership in a CFL

    First, we can easily see that algorithms exponential in \\(n\\) can
    decide membership. We can convert the grammar to CNF form. As the
    parse trees are binary trees, there will be exactly \\(2n-1\\) nodes
    labeled by variables in the tree for a string \\(w\\) of length \\(n\\). The
    number of possible trees and node-labelings is only exponential in
    \\(n\\).

    Fortunately, more efficient techniques exist, based on the idea of
    dynamic programming. Once such algorithm is the CYK Algorithm.

    We construct a triangular table, and begin the fill the table
    row-by-row upwards. The horizontal axis corresponds to the positions
    of the string \\(w = a\_1 a\_2 \dots a\_n\\), and the table entry \\(X\_ij\\) is the
    set of variables $A such that \\(A \overset{\*}{\Rightarrow} a\_i a\_{i+1} \dots a\_j\\). We
    are interested in whether \\(S\\) is in the set \\(X\_{1n}\\).

    {{< figure src="/ox-hugo/screenshot_2018-10-12_17-37-31.png" >}}

    It takes \\(O(n)\\) time to compute any one entry of the table. Hence, the
    table-construction process takes \\(O(n^3)\\) time.

    The algorithm for computing \\(X\_{ij}\\) is as such:

    **BASIS**: We compute the first row as follows. Since the string beginning
     and ending at position \\(i\\) is just the terminal \\(a\_i\\), and the grammar
     is in \\(CNF\\),the only way to derive the string \\(a\_i\\) is to use a
     production of the form \\(A \rightarrow a\_i\\). Hence \\(X\_ii\\) is the set of variables
     \\(A\\) such that \\(A \rightarrow a\_i\\) is a production of \\(G\\).

    **INDUCTION**: To compute \\(X\_{ij}\\) that is in row \\(j - i + 1\\), we would have
     computed all the \\(X\\) in the rows below i.e. we know about all strings
     shorter than \\(a\_i a\_{i+1} \dots a\_j\\), and we know all the proper prefix
     and proper suffixes of that string.

    For \\(A\\) to be in \\(X\_{ij}\\), we must find variables \\(B\\), \\(C\\), and integer
    \\(k\\) such that:

    1.  \\(i \le k < j\\)
    2.  \\(B\\) is in \\(X\_{ik}\\)
    3.  \\(C\\) is in \\(I\_{k+1,j}\\)
    4.  \\(A \rightarrow BC\\) is a production of \\(G\\)

    Finding such variables \\(A\\) requires us to compare at most \\(n\\) pairs of
    previously computed sets. Hence it can be done in \\(O(n)\\) time.


## Turing Machines {#turing-machines}

We now look at what languages can be defined by any computational
device. The Turing Machine is an accurate model for what any physical
computing device is capable of doing. More technically, turing
machines facilitate proving everyday questions to be undecidable or
intractable.

Turing machines are finite automata with a tape of infinite length on
which it may read and write data. The machine consists of a _finite
control_, which can be in any of a finite set of states. There is a
tape divided into squares or _cells_; each cell can hold any one of a
finite number of symbols.

{{< figure src="/ox-hugo/screenshot_2018-10-16_12-52-06.png" caption="Figure 1: A Turing Machine" >}}

Initially, the input, which is a finite-length string of symbols
chosen from the input alphabet, is placed on the tape. All other tape
cells, extending infinitely to the left and right, initially hold a
special symbol called the _blank_. The blank is a tape symbol, but not
an input symbol, and there may be other tape symbols.

There is a _tape head_ that is always positioned at one of the tape
cells. The Turing machine is said to be scanning that cell.

A move of the Turing machine is a function of the state of the finite
control and the tape symbol scanned.

1.  **Change state**: The next state optionally may be the same as the
    current state.
2.  **Write a tape symbol in the cell scanned**. This tape symbol replaces
    whatever symbol was in that cell.
3.  **Move the tape head left or right.**


### Formal Notation {#formal-notation}

The formal notation used for a Turing Machine (TM) is by a 7-tuple:

\begin{equation}
  M = (Q, \Sigma, \Gamma, \delta, q\_0, B, F)
\end{equation}

where:

Q
: The finite set of states of the finite control

&Sigma;
: The finite set of input symbols

&Gamma;
: The complete set of tape symbols. &Sigma; is a subset of &Gamma;.

&delta;
: The transition function. The arguments of \\(\delta(q, X)\\) are a state \\(q\\)
    and a tape symbol \\(X\\). The value of \\(\delta(q, X)\\) is a triple
    \\((p, Y, D)\\) where \\(p\\) is the next state, \\(Y\\) is the symbol
    in \\(\Gamma\\) written in the cell being scanned, \\(D\\) is a
    direction, either left or right.

q\_0
: The start state, a member of Q

B
: the blank symbol, in &Gamma; but not &Sigma;

F
: the set of final or accepting states


### Instantaneous Descriptions {#instantaneous-descriptions}

We use the string \\(X\_1 X\_2 \dots X\_{i-1} q X\_i X\_{i+1} \dots X\_n\\) to represent
an ID in which:

1.  \\(q\\) is the state of the Turing machine.
2.  The tape head is scanning the $i$th symbol from the left.
3.  \\(X\_1 X\_2 \dots X\_n\\) is the portion of the tape between the leftmost
    and the rightmost nonblank. As an exception, if the head is to the
    left of the leftmost nonblank, or to the right of the rightmost
    nonblank, then some prefix or suffix of \\(X\_1 X\_2 \dots X\_n\\) will be
    blank, and \\(i\\) will be 1 or n, respectively.

We describe moves of a Turing machine \\(M = (Q, \Sigma, \Gamma, \delta, q\_0, B, F)\\) by
the \\(\vdash\\) notation that was used for PDAs. Suppose \\(\delta(q, X\_i) = (p,
Y, L)\\). Then \\(X\_1 X\_2 \dots X\_{i-1} q X\_{i+1} \dots X\_n \vdash X\_1 X\_2 \dots X\_{i-2}
p X\_{i-1} Y X\_{i+1} \dots X\_n\\).

There are 2 important exceptions, when \\(i=1\\) and M moves to the blank
to the left of \\(X\_1\\) and when \\(i=n\\) and \\(Y=B\\).


### Transition Diagrams {#transition-diagrams}

Turing machines can be denoted graphically, as with PDAs.

An arc from state \\(q\\) to state \\(p\\) is labelled by one or more items of
the form \\(X/YD\\), where \\(X\\) and \\(Y\\) are tape symbols, and \\(D\\) is a
direction from either \\(L (\leftarrow)\\) or \\(R (\rightarrow)\\).

{{< figure src="/ox-hugo/screenshot_2018-10-16_16-09-40.png" caption="Figure 2: Transition diagram for TM accepting \\(0^n 1^n\\)" >}}


### The Language of a TM {#the-language-of-a-tm}

\\(L(M)\\) is the set of strings \\(w\\) in \\(\Sigma^\*\\) such that \\(q\_0 w \vdash \alpha p \beta\\)
for some state in \\(p\\) in \\(F\\) and any tape strings \\(\alpha\\) and \\(\beta\\). The set
of languages we can accept using a TM is often called the _recursively
enumerable languages_ or RE languages.


### Turing machines and halting {#turing-machines-and-halting}

A TM halts if it enters a state \\(q\\), scanning a tape symbol \\(X\\), and
there is no move in this situation: \\(\delta(q, X)\\) is undefined. This is
another notion of "acceptance". We can assume that a TM halts if it
accepts. That is, without changing the language accepted, we can make
\\(\delta(q, X)\\) undefined whenever \\(q\\) is an accepting state. However, it is
not always possible to require that a TM halts even if it does not
accept.

Languages that halt eventually, regardless of whether they accept, are
called _recursive_. If an algorithm to solve a given problem exists,
then we say the problem is decidable, so TMs that always halt figure
importantly into decidability theory.


### Programming Techniques for Turing Machines {#programming-techniques-for-turing-machines}

-    Storage in the State

    We can use the finite control not only to represent a position in the
    "program" of a TM, but to hold a **finite amount of data**. We extend
    the state as a tuple \\([q, A, B, C]\\), and having multiple tracks.

-    Multiple Tracks

    One can also think of the tape of a Turing machine as composed of
    several tracks. Each track can hold one symbol, and the tape alphabet
    of the TM consists of tuples, with each component for each "track". A
    common use of multiple tracks is to treat one track as holding the
    data, and another track as holding a mark. We can check off each
    symbol as we "use" it, or we can keep track of a small number of
    positions within the data by only marking these positions.

-    Subroutines

    A Turing machine subroutine is a set of states that perform some
    useful process. This set of states includes a start state and another
    state to pass control to whatever other set of states called the
    subroutine. Since the TM has no mechanism for remembering a "return
    address", that is, a state to go to after it finishes, should our
    design of a TM call for one subroutine to be called from several
    states, we can make copies of the subroutine, using a new set of
    states for each copy. The "calls" are made to the start states of
    different copies of the subroutine, and each copy "returns" to a
    different state.

-    Multitape Turing Machines

    The device has a finite control (state), and some finite number of
    tapes. Each tape is divided into cells, and each cell can hold any
    symbol of the finite tape alphabet.

    Initially, the head of the first tape is at the left end of the input,
    but all other tape heads are at some arbitrary cell.

    {{< figure src="/ox-hugo/screenshot_2018-10-16_16-29-52.png" caption="Figure 3: A multitape Turing machine" >}}

    A move on the multitape TM depends on the state and symbol scanned by
    each of the tape heads. On each move:

    1.  the control enters a new state, which could be the same as a
        previous state.
    2.  On each tape, a new tape symbol is written on the cell scanned.
        This symbol could be the same as the previous symbol.
    3.  Each tape head makes a move, which can be either left, right or stationary.

-    Equivalence of one-tape and multitape TMs

    Suppose language \\(L\\) is accepted by a k-tape TM \\(M\\). We simulate \\(M\\)
    with a one-tape TM \\(N\\) whose tape we think of as having 2k tracks.
    Half of these tracks hold the tapes of \\(M\\), and the other half of the
    tracks each hold only a single marker that indicates where the head
    for the corresponding tape of \\(M\\) is currently located.

    {{< figure src="/ox-hugo/screenshot_2018-10-16_16-33-42.png" caption="Figure 4: Simulation of two-tape Turing machine by a one-tape Turing machine" >}}

    To simulate a move of \\(M\\), \\(N\\)'s head must visit the \\(k\\) head markers.
    So that \\(N\\) does not get lost, it must remember how many head markers
    are to its left at all times. That count is stored as a component of
    \\(N\\)'s finite control. After visiting each head marker and storing the
    scanned symbol in a component of the finite control, \\(n\\) knows what
    tape symbols have been scanned by each of \\(M\\)'s heads. \\(N\\) also knows
    the state of \\(M\\), which it stores in \\(N\\)'s own finite control. Thus,
    \\(N\\) knows what move \\(M\\) will make.

    \\(N\\) can now revisit each of the head markers on its tape, changing the
    symbol in the track representing the corresponding tapes of \\(M\\), and
    move the head markers left or right, if necessary. \\(N\\)'s accepting
    states are all the states that record \\(M\\)'s states as one of the
    accepting states of \\(M\\). When the simulated \\(M\\) accepts, \\(N\\) also
    accepts, and \\(N\\) does not accept otherwise.

    The time taken by the one-tape TM \\(N\\) to simulate \\(n\\) moves of the
    k-tape TM \\(M\\) is \\(O(n^2)\\).

-    Non-deterministic Turing Machines

    A NTM differs from the deterministic variety by having a transition
    \\(\delta\\) such that for each state \\(q\\) and tape symbol \\(X\\), \\(\delta(q,X)\\) is a
    set of triples \\(\\{(q\_1, Y\_1, D\_1), \dots, (q\_k, Y\_k, D\_k)\\}\\).

    The NTM can choose at each step any of the triples to be the next
    move. We can show that NTM and TM are equivalent. The proof involves
    showing that for every NTM \\(M\_N\\), we can construct a DTM \\(M\_D\\) that
    explores the ID's that \\(M\_N\\) can reach by any sequence of its choices.
    If \\(M\_D\\) has an accepting state, then \\(M\_D\\) enters an accepting state of
    its own. \\(M\_D\\) must be systematic, putting new ID's on a queue, rather
    than a stack, so \\(M\_D\\) would have simulated all sequences up to k moves
    of \\(M\_N\\) after some finite time.

    \\(M\_D\\) is designed as a multi-tape TM. The first tape of \\(M\_D\\) holds a
    sequence of ID's of \\(M\_N\\), including the state of \\(M\_N\\). One ID of \\(M\_N\\)
    is marked as the current ID, whose successor ID's are in the process
    of being discovered. All IDs to the left of the current one have been
    explored and can be ignored subsequently.

    {{< figure src="/ox-hugo/screenshot_2018-10-16_16-41-48.png" caption="Figure 5: Simulation of NTM by a DTM" >}}

    To process the current ID, \\(M\_D\\) does:

    1.  \\(M\_D\\) examines the state and scanned symbol of the current ID. Built
        into the finite control of \\(M\_D\\) is the knowledge of what choices of
        move \\(M\_N\\) has for each state and symbol. If the state in the
        current ID is accepting, then \\(M\_D\\) accepts and simulates \\(M\_N\\) no further.
    2.  However, if the state is not accepting, and the state-symbol
        combination has \\(k\\) moves, then \\(M\_D\\) uses its second tape to copy
        the ID and the make k copies of that ID at the end of the sequence
        of ID's on tape 1.
    3.  \\(M\_D\\) modifies each of those k ID's according to a different one of
        the k choices of move that \\(M\_N\\) has from its current ID.
    4.  \\(M\_D\\) returns to the marked current ID, erases the mark and moves to
        the next ID to the right. The cycle the repeats with step (1).

    This can be viewed as a breadth-first search on all possible IDs
    reached.


### Restricted Turing Machines {#restricted-turing-machines}

-    Turing Machines with Semi-infinite Tapes

    We can assume the tape to be semi-infinite, having no cells to the
    left of the initial head position, an still retain the full power of
    TMs.

    The trick behind the construction is to use two tracks on the
    semi-infinite tape. The upper track represents the cells of the
    original TM that are at or to the right of the initial head position,
    but in reverse order. The upper track represents \\(X\_0 , X\_1 \dots\\) where
    \\(X\_0\\) is the initial position of the head; \\(X\_1, X\_2\\) so on are the cells
    to its right. The \\(\*\\) on the leftmost cell bottom track serves as an
    end marker and prevents the head of the semi-infinite TM from falling
    off the end of the tape.

    {{< figure src="/ox-hugo/screenshot_2018-10-30_09-22-16.png" >}}

    Another restriction we make is to never write a blank. This combined
    with the semi-infinite tape restriction means that the tape is at all
    times a prefix of non-blank symbols followed by an infinity of blanks.

    We can construct an equivalent TM \\(M\_2\\) from a TM \\(M\_1\\) by restricting
    that \\(M\_1\\) never writes a blank, by creating a new tape symbol \\(B'\\)
    that functions as a blank, but is not the blank \\(B\\).


### Multistack Machines {#multistack-machines}

A $k$-stack machine is a deterministic PDA with \\(k\\) stacks. The
multistack machine has a finite control, which is in one of a finite
state set of states. A move of the multistack machine is based on:

1.  The state of the finite control
2.  The input symbol read, which is chosen from the finite input
    alphabet.

Each move allows the multistack machine to:

1.  Change to a new state
2.  Replace the top symbol of each stack with a string of zero or more
    stack symbols.

If a language is accepted by a TM, it is also accepted by a two-stack
machine.


### Counter Machines {#counter-machines}

Counter machines have the same structure as the multistack machine,
but in place of each stack is a counter. Counters holdd any
non-negative integer, but we can only distinguish between zero and
non-zero counters. That is, the move of the counter machine depends on
its state, input symbol, and which, if any, of the counters are zero.

Each move can:

1.  Change state
2.  Add or subtract 1 from any of its counters independently

A counter machine can be thought of as a restricted multistack
machine, where:

1.  There are only 2 stack symbols, which is the bottom-of-stack marker
    \\(Z\_0\\), and \\(X\\).
2.  \\(Z\_0\\) is initially on each stack.
3.  We may replace \\(Z\_0\\) only with \\(X^i Z\_0\\), \\(i \ge 0\\).
4.  We may replace \\(X\\) only with \\(X^i\\), \\(i \ge 0\\).

We observe the following properties:

1.  Every language accepted by a counter machine is recursively
    enumerable.
2.  Every language accepted by a one-counter machine is a CFL. This is
    made immediately obvious by considering that it is a one-stack
    machine (a PDA).
3.  Every language accepted by a two-counter machine is RE.

The proof is done by showing that three counters is enough to simulate
a TM, and that two counters can simulate three counters.

Proof outline: Suppose there are \\(r-1\\) symbols used by the stack
machine. We can identify the symbols with the digits \\(1\\) through
\\(r-1\\), and think of the stack as an integer in base \\(r\\). We use two
counters to hold the integers that represent each of the two stacks in
a two-stack machine. The third counter is used to adjust the other two
counter, by either dividing or multiplying a count by \\(r\\), where
\\(r-1\\) tape symbols are used by the stack machine.


### Turing Machines and Computers {#turing-machines-and-computers}

1.  A computer can simulate a Turing machine, and
2.  A Turing machine can simulate a computer, and can do so in an
    amount of time that is at most some polynomial in the number of
    steps taken by the computer

{{< figure src="/ox-hugo/screenshot_2018-10-30_10-13-41.png" >}}

We can prove the latter by using a TM to simulate the instruction
cycle of the computer, as follows:

1.  Search the first tape for an address matching the instruction
    number on tape 2.
2.  Examine the instruction address value, if it requires the value of
    some address, that address is part of the instruction. Mark the
    position of the instruction using a second tape, not shown in the
    picture. Search for the memory address on the first tape, an dcopy
    its value onto tape 3, the tape holding the memory address
3.  Execute the instruction. Examples of instructions are:
    1.  Copying values to some other address
    2.  Adding value to some other address
    3.  The jump instruction


### Runtime of Computers vs Turing Machines {#runtime-of-computers-vs-turing-machines}

Running time is an important consideration, because we want to know
what can be computed with enough efficiency. We divide between
tractable and intractable problems, where tractable problems can be
solved efficiently.

Hence, we need to assure ourselves that a problem can be solved in
polynomial time on a typical computer, can be solved in polynomial
time on a TM, and conversely.

A TM can simulate \\(n\\) steps of a computer in \\(O(n^3)\\) time. Consider
the multiplication instruction: if a computer were to start with a
word holding the integer 2, and multiply the word by itself \\(n\\) times,
it would hold the number \\(2^{2^n}\\), and would take \\(2^n + 1\\) bits to
represent, exponential in \\(n\\).

To resolve this issue, one can assert that words retain a maximum
length. We take another approach, imposing the restriction that instructions
may use words of any length, but can only produce words one bit longer
than its arguments.

The prove the polynomial time relationship, we note that after \\(n\\)
instructions have been executed, the number of words mentioned on the
memory tape of the TM is \\(O(n)\\), and hence requires \\(O(n)\\) TM cells to
represent. The tape is hence \\(O(n^2)\\) cells long, and the TM can locate
the finite number of words required by one computer instruction in
\\(O(n^2)\\) time.

Hence, if a computer:

1.  Has only instructions that increase the maximum word length by at
    most 1, and
2.  Has only instructions that a multitape TM can perform on wordsd of
    length \\(k\\) in \\(O(k^2)\\) steps or less, then

the Turing machine can simulate \\(n\\) steps of the computer in \\(O(n^3)\\)
of its own steps.
