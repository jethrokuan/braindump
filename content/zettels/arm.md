+++
title = "ARM Assembly Programming"
author = ["Jethro Kuan"]
lastmod = 2020-02-06T16:14:04+08:00
draft = false
+++

tags
: [§operating\_systems]({{< relref "operating_systems" >}}), [§prog\_lang]({{< relref "prog_lang" >}})


## Background {#background}

In a _machine language_, instructions are encoded as 0's and 1's. This
is unwieldy for programmers  to write. Hence, to tell processors what
to execute, programmers use an _assembly language_, writing these
instructions in textual form, for example:

```text
MOV R9, R3
```

An _assembler_ translates the assembly language into machine language.

There are many machine languages, each designed with a processor in
mind, enabling fast and simple circuits to be built to execute the
instructions. Each machine language requires a corresponding assembly
language, since the assembly language must support a different set of
machine instructions. The design of the machine language encoding is
called the _instruction set architecture (ISA)_.


## Memory Organization {#memory-organization}

-   Byte-addressable, 32-bit address space
-   little- or big-endian addressable
-   32-bit word length
-   word, half-word and byte data transfers to and from processor registers
-   word and half-world transfers must be aligned


## Arm {#arm}
