+++
title = "OCaml"
author = ["Jethro Kuan"]
lastmod = 2020-07-08T14:53:49+08:00
draft = false
+++

tags
: [Programming Languages]({{< relref "prog_lang" >}})

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

- [janestreet/ppx_let](https://github.com/janestreet/ppx%5Flet)
- [janestreet/ppx_expect](https://github.com/janestreet/ppx%5Fexpect)
- [janestreet/ppx_sexp_conv](https://github.com/janestreet/ppx%5Fsexp%5Fconv)

## Writing JS with Ocaml {#writing-js-with-ocaml}

Currently there are 2 options:

- [js_of_ocaml](https://github.com/ocsigen/js%5Fof%5Focaml)
- [Bucklescript](https://bucklescript.github.io/)

According to Yaron Minsky, both options are good:

> We’ve made extensive use of js_of_ocaml for internal apps at Jane Street. I can’t give a detailed comparison with Bucklescript, but I can tell you what I know of the tradeoffs.
>
> First, js_of_ocaml runs pretty fast, but I’ve heard tell that Bucklescript is faster. js_of_ocaml now supports separate compilation of Javascript, so subsequent recompilations are quite zippy, in my experience. That said, the initial compilation takes material time. Dune does separate compilation for js_of_ocaml by default, and does a single, more compact javascript executable when run in production mode. Anyway, we haven’t found performance of the compiler to be an obstacle with js_of_ocaml.
>
> js_of_ocaml is highly compatible with OCaml’s semantics. Advanced libraries like Async and Incremental that make fairly aggressive use of OCaml’s memory model work under js_of_ocaml without modification, which is great. I believe you have to be a bit more careful when compiling with Bucklescript. (See incr_dom 31 for an interesting application of Incremental to the browser.)
>
> js_of_ocaml is highly compatible in a another way: it is essentially always fully up to date with the latest OCaml. That’s because it’s easier to maintain, by virtue of operating only on OCaml bytecode. Bucklescript is a more fullsome set of patches to the compiler, and so it typically lags a few versions behind. That alone is for us a sufficiently compelling reason to stick to js_of_ocaml.
>
> Bucklescript seems to have a more active web-dev community, associated with the Reason community. I think this is mostly because Bucklescript generates easy to read javascript output. I don’t care much about readable JavaScript output (especially in a world with sourcemaps), but the community surely has value. For example, the OCaml React bindings are currently Bucklescript-only (though @jordwalke has suggested that porting to js_of_ocaml would be totally doable.)

## References {#references}

1.  [Real World OCaml](https://realworldocaml.org/)
