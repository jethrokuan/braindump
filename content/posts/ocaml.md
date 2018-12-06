+++
title = "OCaml"
author = ["Jethro Kuan"]
lastmod = 2018-12-06T12:03:08+08:00
draft = false
math = true
+++

## Pattern Matching {#pattern-matching}

Patterns cannot be used to expressed arbitrary conditions. this is a
design choice, that allows better support for patterns in the
compiler, as well as greater efficiency in match statements.

OCaml is often able to generate machine code that jumps directly to a
matched case based on an efficient set of runtime checks.

This is a more general phenomena: pattern matching is very efficient,
and pattern matching code is usually a win over what you might write
by hand.


## References {#references}

1.  [Real World OCaml](https://realworldocaml.org/)
