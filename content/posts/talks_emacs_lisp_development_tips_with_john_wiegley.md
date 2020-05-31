+++
title = "Talks: Emacs Lisp Development Tips with John Wiegley"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T20:21:00+08:00
slug = "emacs_lisp_development_tips_with_john_wiegley"
draft = false
+++

source
: [2015-04-08 Emacs Lisp Development Tips with John Wiegley - YouTube](https://www.youtube.com/watch?v=QRBcm6jFJ3Q)

author
: [John Wiegley]({{< relref "john_wiegley" >}})

## Interactive debugging {#interactive-debugging}

- In debug buffer: `e` to evaluate any lisp expression in stack-frame
- use `(debug)` to enter debugger
- `eldoc-mode` to show operation

## Profiling {#profiling}

- `elp-instrument-function`
- `elp-instrument-package`

## Speeding up Functions {#speeding-up-functions}

- mutation in place:
  - `nconc`
  - `nreverse`
  - `setcar`
  - `setcdr`
