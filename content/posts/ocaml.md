+++
title = "OCaml"
author = ["Jethro Kuan"]
lastmod = 2018-12-22T20:33:55+08:00
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


## Writing JS with Ocaml {#writing-js-with-ocaml}

Currently there are 2 options:

-   [js\_of\_ocaml](https://github.com/ocsigen/js%5Fof%5Focaml)
-   [Bucklescript](https://bucklescript.github.io/)

According to Yaron Minsky, both options are good:

> We’ve made extensive use of js\_of\_ocaml for internal apps at Jane Street. I can’t give a detailed comparison with Bucklescript, but I can tell you what I know of the tradeoffs.
>
> First, js\_of\_ocaml runs pretty fast, but I’ve heard tell that Bucklescript is faster. js\_of\_ocaml now supports separate compilation of Javascript, so subsequent recompilations are quite zippy, in my experience. That said, the initial compilation takes material time. Dune does separate compilation for js\_of\_ocaml by default, and does a single, more compact javascript executable when run in production mode. Anyway, we haven’t found performance of the compiler to be an obstacle with js\_of\_ocaml.
>
> js\_of\_ocaml is highly compatible with OCaml’s semantics. Advanced libraries like Async and Incremental that make fairly aggressive use of OCaml’s memory model work under js\_of\_ocaml without modification, which is great. I believe you have to be a bit more careful when compiling with Bucklescript. (See incr\_dom 31 for an interesting application of Incremental to the browser.)
>
> js\_of\_ocaml is highly compatible in a another way: it is essentially always fully up to date with the latest OCaml. That’s because it’s easier to maintain, by virtue of operating only on OCaml bytecode. Bucklescript is a more fullsome set of patches to the compiler, and so it typically lags a few versions behind. That alone is for us a sufficiently compelling reason to stick to js\_of\_ocaml.
>
> Bucklescript seems to have a more active web-dev community, associated with the Reason community. I think this is mostly because Bucklescript generates easy to read javascript output. I don’t care much about readable JavaScript output (especially in a world with sourcemaps), but the community surely has value. For example, the OCaml React bindings are currently Bucklescript-only (though @jordwalke has suggested that porting to js\_of\_ocaml would be totally doable.)


## References {#references}

1.  [Real World OCaml](https://realworldocaml.org/)
