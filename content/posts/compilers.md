+++
title = "Compilers"
author = ["Jethro Kuan"]
lastmod = 2019-09-26T14:30:25+08:00
tags = ["proglang", "compilers"]
draft = false
math = true
+++

## What are compilers? {#what-are-compilers}

Compilers are programs that read in one (source) language, and translate them into another (target) language.

Compilers need to perform two main tasks:

1.  **Analysis**: breaking up a source program into constituent parts, and
    create an intermediate representation
2.  **Synthesis**: Construct the desired target program from an intermediate representation

A compiler is often designed in a number of phases:

lexical analyses
: reads a stream of characters, and groups them
    into a stream of tokens (logically cohesive character sequences).
    This often requires maintaining a symbol table

syntax analyses
: imposes a hierarchical structure on the token
    stream (parse tree)

semantic analyses
: checks parse tree for semantic errors (e.g.
    type errors)

Code optimization
: Optimizes the intermediate code representation
    in terms of efficiency

intermediate code generation
: a program for an abstract machine

To contrast this with interpreters, interpreters take as input the
program and the data, and produce an output. The interpreters do their
computation "online".


### Cousins of the Compiler {#cousins-of-the-compiler}

1.  Prepreprocessors
    1.  Macro Processing
    2.  File inclusion
    3.  Language Extension
2.  Assemblers
3.  Loaders and Link-editors


### The Economy of Programming Languages {#the-economy-of-programming-languages}

Why are there so many programming languages? Application domains have
distinctive/conflicting needs. For example, in scientific computing,
there needs to be good support for FP, arrays and parallelism. Julia
is a good example of a language designed for scientific computing. In
systems programming, we require fine control over resources, and
satisfy certain real-time constraints. Languages like C are suited for
these applications.

Programmer training is the dominant cost for a programming language.
It is difficult to modify a language, but easy to start a new one.


## Lexical Analyses {#lexical-analyses}

The lexical analyzer reads input characters of the source program,
group characters into lexemes, and outputs a sequence of tokens to the
parser.

It may also:

-   Filter out comments and whitespace
-   Correlating error messages with source program
-   Constructing symbol tables

<!--listend-->

-   Separation of concerns lead to simplicity of design
-   Compiler efficiency is improved, when using special techniques


### Term Definitions {#term-definitions}

token
: <Token name, attribute value>

pattern
: A description of the formthat can be recognized as a token

lexeme
: A sequence of characters matching the pattern for a token

E.g. `printf("Total = %d", score);`

| Tokens      | Lexemes |
|-------------|---------|
| id          |         |
| literal     |         |
| punctuation |         |

```text
ID(printf)  LBRACE LITERAL("Total = %d") COMMA ID(score) RBRACE SEMI
```

Tokens have several categories:

| Keywords    | if else return |
|-------------|----------------|
| Operators   | > < <> != !    |
| Identifiers | pi score temp1 |
| Constants   | 3.14 "hello"   |
| Punctuation | ( ) ; :        |

Attributes for tokens distinguish two lexemes belonging to the same symbol table:

<number, 0>, <number, 1>, <price, ptr to symbol table>


### Regular Languages {#regular-languages}

Since the lexical analyzer needs to split splits into token
classes, it must be specify the set of strings that belongs into a
token class. To do so, we use [regular languages]({{< relref "theory_of_computation" >}}).

{{< figure src="/ox-hugo/screenshot_2019-09-25_16-21-45.png" caption="Figure 1: Cycle of constructions" >}}


#### Thompson's construction {#thompson-s-construction}

Thompson's construction converts a regular expression into a NFA. The
NFAs derived have several specific properties that simplify an
implementation:

1.  Each NFA has one start state and one end state
2.  No transition other than the initial transition, enters the start state
3.  An \\(\epsilon\\)-transtition always connects two states that were,
    earlier in the process, the start state and accepting state of NFAs
    for some component REs
4.  Each state has at most 2 entering and 2 exiting \\(\epsilon\\)-moves,
    and at most one exiting move on a symbol in the alphabet.

{{< figure src="/ox-hugo/screenshot_2019-09-25_16-24-48.png" >}}


## Syntax Definition {#syntax-definition}

We use [context-free grammars]({{< relref "theory_of_computation" >}}) to specify the syntax of a language.

A grammar for arithmetic expressions can be constructed from a table
showing the associativity and precedence of operators.

```text
left-associative: + -
left-associative: * /
```

Two different non-terminals can be constructed for the two levels of
precedence:

```text
factor -> digit | (expr)
term -> term * factor
  | term / factor
  | factor
expr -> expr + term
  | expr - term
  | term
```


## Syntax Directed Translation {#syntax-directed-translation}

Syntax-directed translation is done by attaching rules or program
fragments to productions in a grammar. e.g. consider

```text
expr -> expr_1 + term
```

We can translate expr by:

```text
translate expr_1;
translate term;
handle +;
```


## Parsing {#parsing}

Parsers use [pushdown automata]({{< relref "theory_of_computation" >}}) to do parsing.


### Recursive-Descent Parsing {#recursive-descent-parsing}

Consists of a set of procedures, one for each non-terminal. The
construction of both top-down and bottom-up parsers is aided by two
functions: `first` and `follow`.

<div class="definition">
  <div></div>

\\(First(\alpha)\\), where \\(\alpha\\) is any string of grammar symbols, is
the set of terminals that begin strings derived from \\(\alpha\\). If
\\(\alpha\\) derives \\(\epsilon\\), then \\(\epsilon\\) is also in \\(First(\alpha)\\).

</div>

<div class="definition">
  <div></div>

Follow(A) for noterminal A, is the set of terminals \\(a\\) that can
appear immediately to the right of A in some sentential form.: the set
of terminals \\(a\\) such that there exists a derivation of the form \\(S
\overset{\*\*}{\Rightarrow} \alpha A a B\\).

</div>


#### Computing First(X) {#computing-first--x}

1.  If X is a terminal, then \\(First(X) = \\{ X \\}\\)

2.  If X is a non-terminal and $X &rarr; Y\_1 Y\_2 &hellip; Y\_k is a
    production for some \\(k \ge 1\\), then place \\(a\\) in \\(First(X)\\) for
    some i, a in \\(First(Y\_i)\\), and &epsilon; is in all of \\(First(Y\_1),
       \dots, First(Y\_{i-1})\\). If &epsilon; is in \\(First(Y\_j)\\), for all \\(j
       = 1, \dots, k\\) then add $&epsilon; to \\(First(X)\\).

3.  If \\(X \rightarrow \epsilon\\) is a production, add \\(\epsilon\\) to \\(First(X)\\).


#### Computing Follow(A) {#computing-follow--a}

1.  Place $ in \\(Follow(S)\\), where \\(S\\) is the start symbol, and $ is the
    input right endmarker

2.  If there is a production \\(A \rightarrow \alpha B \beta\\) then
    everything in \\(First(\beta)\\) except \\(\epsilon\\) is in \\(Follow(B)\\).

3.  IF there is a production \\(A \rightarrow \alpha \beta\\), or a
    production \\(A \rightarrow \alpha B \beta\\), where \\(First(B)\\)
    contains \\(\epsilon\\), then everything in \\(Follow(A)\\) is in
    \\(Follow(B)\\).

[A good video showcasing the computations](https://www.youtube.com/watch?v=dDoo5BF9T4E)


#### LL(1) {#ll--1}

A grammar \\(G\\) is LL(1) if and only if whenever \\(A \rightarrow \alpha |
\beta\\) are two distinct productions of \\(G\\), the following conditions
hold:

1.  For no terminal $a4 do both \\(\alpha\\) and \\(\beta\\) derive strings
    beginning with \\(a\\).
2.  At most one of \\(\alpha\\) and \\(\beta\\) can derive the empty string.
3.  If \\(\beta \overset{\*}{\Rightarrow} \epsilon\\) then $&alpha; does n ot
    derive any string beginning with a terminal in \\(Follow(A)\\), and
    vice versa.

Conditions 1 and 2 are equivalent to \\(First(\alpha)\\) and
\\(First(\beta)\\) being disjoint sets. The third condition is equivalent
to stating that if \\(\epsilon\\) is in \\(First(B)\\), then \\(First(\alpha)\\)
and \\(First(A)\\) are disjoint sets, and likewise interchanging \\(\alpha\\)
and \\(\beta\\).


### Bottom-up Parsing {#bottom-up-parsing}

The parse tree for an input string is constructed beginning from the
leaves (bottom) and working up towards the root (the top).

{{< figure src="/ox-hugo/screenshot_2019-09-10_10-25-22.png" caption="Figure 2: Bottom up parsing" >}}

LR grammars can be parsed with shift-reduce parsers.

One can think of bottom-up parsing as the process of "reducing" a
string \\(w\\) to the start symbol of the grammar. At each reduction, a
specific substring matching the body of a production is replaced by
the nonterminal at the head of the production.

Bottom-up parsing during a left-to-right scan of the input constructs
a right-most derivation in reverse.

A stack holds grammar symbols and an inptu buffer holds the rest of
the string to be parsed. During a left-to-right scan of the input
string, the parser shifts zero or more input symbols onto the stack,
until it is ready to reduce a string \\(\beta\\) of grammar symbols onto
the stack. It then reduces \\(\beta\\) to the head of the appropriate
production. The parser repeats this cycle until it has detected an
error, or until the stack contains the start symbol and the input is
empty.

{{< figure src="/ox-hugo/screenshot_2019-09-10_10-29-51.png" >}}

The use of a stack in shift-reduce parsing is because the handle will
always eventually appear on top of the stack, and never inside.


### Shift-reduce conflicts {#shift-reduce-conflicts}

1.  Cannot decide whether to shift or reduce (shift/reduce conflict)
2.  Cannot decide which of several reductions (reduce/reduce conflict)

These grammars are not in the \\(LR(k)\\) class of grammars.

In \\(LR(k)\\), L stands for-to-right scanning, R stands for rightmost
derivation. LR parsers are table-driven. The LR-parsing method is the
most general nonbacktracking shit-reduce parsing method known. An LR
parser can detect a syntactic error as soon as it is possible to do on
a left-to-right scan on the input. The class of grammars that can be
parsed using LR methods is a proper subset of the class of grammars
that can be parsed with predictive or LL methods.

The main downside to this is that construction of a LR parser is
tedious by hand.


## Tools {#tools}


### Lex {#lex}

A Lex compiler takes a Lex source program, and outputs a program. This
program is compiled in its source language (originally C, jFlex for
Java). The result program takes an input stream as input, and produces
a sequence of tokens as output.

A lex program has the following form:

```text
declarations
%%
translation rules
%%
auxiliary functions
```

The declaration section includes declarations of variables, manifest
constants, and regular definitions.

The translation rules have form: Pattern { Action }.

Each pattern is a regular expression, which may use the definitions of
the declaration section. The actions are fragments of code.

The auxiliary functions section contains used in these actions.
