+++
title = "OCaml"
author = ["Jethro Kuan"]
lastmod = 2018-12-13T13:40:48+08:00
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


## Error Handling {#error-handling}

> The use of options to encode errors underlines the fact that it’s not
> clear whether a particular outcome, like not finding something on a
> list, is an error or is just another valid outcome. This depends on
> the larger context of your program, and thus is not something that a
> general-purpose library can know in advance. One of the advantages of
> error-aware return types is that they work well in both situations.


## Ocaml ppx {#ocaml-ppx}

[PPX](http://ocamllabs.io/doc/ppx.html) provides a new API for syntactic extensions in OCaml.

Some common ppx's:

-   [janestreet/ppx\_let](https://github.com/janestreet/ppx%5Flet)
-   [janestreet/ppx\_expect](https://github.com/janestreet/ppx%5Fexpect)
-   [janestreet/ppx\_sexp\_conv](https://github.com/janestreet/ppx%5Fsexp%5Fconv)
-


## References {#references}

1.  [Real World OCaml](https://realworldocaml.org/)
