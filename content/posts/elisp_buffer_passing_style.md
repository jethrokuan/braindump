+++
title = "Elisp: Buffer-passing Style"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Emacs Lisp]({{<relref "emacs_lisp.md#" >}})

Rather than have the callee instantiate the buffer, the caller
instantiates the buffer, and passes it implicitly as the current
buffer. The callee fills it with something. The caller should use
something like with-temp-buffer so that the buffer has a clean
life-cycle, fully managed by the caller ([Source](https://nullprogram.com/blog/2014/05/27/)).