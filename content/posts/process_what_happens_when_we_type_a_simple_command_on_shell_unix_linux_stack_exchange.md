+++
title = "What happens when we type a simple command on shell?"
author = ["Jethro Kuan"]
lastmod = 2020-06-07T17:28:26+08:00
slug = "what_happens_when_we_type_a_simple_command_on_shell"
draft = false
+++

tags
: [Operating Systems]({{< relref "operating_systems" >}})

-source ::
<https://unix.stackexchange.com/questions/123457/what-happens-when-we-type-a-simple-command-on-shell>

The [shell]({{< relref "shell" >}}) is a program, that uses 2 important native C system calls:
`fork()` and `exec()`. These 2 system calls are used in the creation
of subprocesses.

## Fork() {#fork}

Fork creates a copy of the calling process as its child. This is how
most processes (except for init) begins.

## Exec() {#exec}

Exec refers to a family of functions that replace the current image
with a new process image. It replaces defining parts of the current
process's memory stack with new parts loaded from an executable (e.g.
`/bin/ls`).

`fork()` is usually a necessary first step, otherwise the calling
process will be replaced and no new process will be created.

## Isn't this inefficient? {#isn-t-this-inefficient}

No. The copy produced by the `fork()` is an abstraction, as the kernel
uses a copy-on-write system. `fork()` creates a virtual memory map. If
the copy is immediately followed by `exec()`, parts that are
overwritten need not be copied. In addition, many parts of the child
process (e.g. its environment) need not be duplicated.
