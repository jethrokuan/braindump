+++
title = "GCC"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Compilers]({{<relref "compilers.md#" >}}), [The C Language]({{<relref "c_lang.md#" >}})


## Building GCC {#building-gcc}

Instead of downloading the tarball, we clone from the Git mirror,
because the tarball didn't contain the full GCC distribution.

```bash
git clone https://github.com/gcc-mirror/gcc
cd gcc
./contrib/download_prerequisites
mkdir build && cd build
../configure                                           \
    --prefix=/usr                                      \
    --disable-multilib                                 \
    --with-system-zlib                                 \
    --enable-languages=c,c++,d,fortran,go,objc,obj-c++
make
```


## Compiler Flow {#compiler-flow}

To scope this discussion, we shall focus on the compilation flow for
C, mentioning features involving other languages where necessary.

The GCC compiler can be split into 2 components, the front-end and the
back-end. Compilation is initiated at `gcc-main.c`, where a driver is
initialized. This driver collects required information about the
output it needs to create (for example, the language specifications).

The driver calls `toplev_main`, which in turn calls `do_compile`.
`do_compile` initializes the compiler, performing the following things:

1.  calls `process_options`, which sets global states based on the flags
2.  Set up the back-end if requested with `backend_init()`
3.  Initialize language-dependent structures, such as the symbol table.
4.  Calls `compile_file()` to compile the file.
5.  Calls `finalize()` to shut down.


### Front-end {#front-end}

The front-end is responsible for preprocessing, lexing, and parsing
the input source program into an intermediate representation. This
intermediate representation is common across all the languages that
GCC supports, including C, C++, Go and Fortran.

Multiple intermediate representations are available. For C, the
front-end uses the GENERIC tree representation, which is able to
represent entire functions in trees, and is defined in `gcc/tree.def`
using C macros. The GENERIC tree representations hold types,
attributes, and operations.

Each language is contained in the `./gcc/language` folder, e.g. `gcc/c`.
In each language folder, there are 2 important files:

config-lang.in
: a shell script containing important variables
    concerning the language

Make-lang.in
: a Makefile for building documentation, and
    installing the front-end


#### Invoking the Front-end {#invoking-the-front-end}

The front-end is invoked once to parse the entire input, via
`lang_hooks.parse_file()` in the `compile_file` function in
`gcc/toplev.c:450`.

For C, `compile_file` does various things:

1.  Initializes the call graph (cgraph)
2.  Parses the file using the parser defined in `gcc/c/c-parser.c.`
    1.  This parser is a recursive-descent parser, with the callback
        `finish_function()` being called after each recursive-descent
        function completes

`finish_function()` is declared in `gcc/c/c-decl.c`, which does multiple
things:

1.  Converts C code to the GENERIC tree representation by calling
    `c_genericize`
2.  Calls `cgraph_node::finalize_function(fndecl, false)` at the end (if
    nested, creates a call-graph node otherwise)


#### cgraphunit {#cgraphunit}

This cgraph\_node `finalize_function` is defined in `gcc/cgraphunit.c`,
which acts as the interface between tree-based front-ends like GENERIC
and the backend.

As mentioned earlier, `finalize_function` is called when the front-end
is done parsing the body. It queues nodes for processing in the
`enqueued_nodes` linked-list, for processing later.

In the `compile_file` function described earlier, after
`lang_hooks.parse_file()`, `symtab->finalize_compilation_unit()` is
called. This calls `cgraph_node::analyze_functions`, which loops
through the `enqueue_nodes` and:

-   Lowers representation into GIMPLE (gimplify)
-   build callgraph edges and references for all trivially needed
    symbols and all symbols referred by them.
-   lowers thunks
-   calls compile(), which runs IPA passes (interprocedural
    optimization). IPA uses information in the call graph to perform
    transformations across function boundaries. IPA passes include
    computation of reachability, and inlining functions.
    -   The GIMPLE representation is further lowered into SSA form, and
        optimization techniques are done there, including:
        -   Dead code elimination
        -   Building the control flow graph
        -   Alias analysis
        -   Copy Renaming
    -   calls `expand_all_functions()` which further lowers to RTL form by
        calling `init_function_start (decl)`. The RTL form generated is
        target-dependent.

All passes (optimization or otherwise) are managed by a pass
manager to ensure they are executed in the correct order. The passes
are defined in `gcc/passes.def`. Depending on the optimization level,
different passes are run.

RTL generation is done in `gcc/emit-rtl.c`. Some RTL optimization passes
are run over the RTL form, including:

-   common subexpression elimination
-   global subexpression elimination
-   web construction
-   LRA (local register allocation): virtual registers are converted
    into physical registers, with spilling where necessary
-   basic-block reordering
-   peephole optimizations

The files for backends are located in directories under `gcc/config`,
e.g. `gcc/config/aarch64`.

The final pass converts RTL code into assembly code for output. The
source files are final.c plus insn-output.c. Finally, code for the
target host is output.


## The C Parser {#the-c-parser}

The C parser is currently a handwritten recursive-descent parser. The
reasons for handwriting the parser include:

Simplicity
: Recursive-descent parsers are easy to read and debug

Performance
: Handwriting the parser enables for handwritten
    optimization

Error Recovery
: We can handwrite rules for common syntatic errors
    and recover from them.

The C parser used to be a generated parser via Bison, but extending
the parser was difficult. Historically, Objective-C and OpenMP support
was difficult to achieve with a generated parser.

In addition, the parser for C is relatively simple, in comparison to
other portions in GCC, such as optimization, so it is reasonable to
handwrite the parser to ensure that the parse trees obtained are
deterministic and easy to debug.


## The Intermediate Code Formats {#the-intermediate-code-formats}

We list the intermediate code formats in descending order of level.

GENERIC
: The purpose of GENERIC is to represent functions in a
    tree representation that is `language-independent`. The
    transition point is `c_genericize` in `gcc/c-decl.c`

GIMPLE
: GIMPLE is derived from GENERIC, by converting it into a
    three-address representation. The three-address
    representation allows for several higher-level
    optimization passes. The transition point is
    `gimplify_function_tree` in `cgraphunit.c:669`. Some
    optimization passes include:
    -   vectorization
    -   empty loops
    -   loop parallelization

RTL
: The Register Transfer Language is lowest level IR, where
    instructions are output one-by-one. RTL is closest to the
    machine language, and more optimizations can be done at this
    level. This also includes machine-specific optimizations, as
    different machines have different instruction sets. The
    entry-point to RTL generation happens in the CFG expansion
    pass, defined in `gcc/cfgexpand.c`. The source files for RTL
    generation include stmt.c, calls.c, expr.c, explow.c,
    expmed.c, function.c, optabs.c and emit-rtl.c. Some
    optimization passes include:
    -   loop optimization
    -   (global) common subexpression elimination
    -   Instruction scheduling
    -   Register allocation


## GCC's RTL representation {#gcc-s-rtl-representation}

RTL is inspired by Lisp lists. It has both an internal form, made up
of structures that point at other structures, and a textual form that
is used in the machine description and in printed debugging dumps. The
textual form uses nested parentheses to indicate the pointers in the
internal form.

Consider the code for `simple.c`:

```C
  #include <stdio.h>

  int main() {
    int a = 0;
    return 0;
  }
```

We compile with GCC dumping the RTL code:

```bash
  gcc -fdump-rtl-all-all /home/jethro/Dropbox/NUS/CS4212/assignments/simple.c
```

We get the list of RTLs at different RTL passes:

```bash
  +-- a.out
  +-- simple.c.229r.expand
  +-- simple.c.230r.vregs
  +-- simple.c.231r.into_cfglayout
  +-- simple.c.232r.jump
  +-- simple.c.244r.reginfo
  +-- simple.c.264r.outof_cfglayout
  +-- simple.c.265r.split1
  +-- simple.c.267r.dfinit
  +-- simple.c.268r.mode_sw
  +-- simple.c.269r.asmcons
  +-- simple.c.273r.ira
  +-- simple.c.274r.reload
  +-- simple.c.278r.split2
  +-- simple.c.282r.pro_and_epilogue
  +-- simple.c.285r.jump2
  +-- simple.c.298r.stack
  +-- simple.c.299r.alignments
  +-- simple.c.301r.mach
  +-- simple.c.302r.barriers
  +-- simple.c.306r.shorten
  +-- simple.c.307r.nothrow
  +-- simple.c.308r.dwarf2
  +-- simple.c.309r.final
  \-- simple.c.310r.dfinish
```

Each instruction has the form `(type id prev next n (statement))`. We
look at a instruction generated from the program:

```lisp
  (insn 5 2 6 2 (set (mem/c:SI (plus:DI (reg/f:DI 82 virtual-stack-vars)
                                        (const_int -4 [0xfffffffffffffffc])) [1 aD.2249+0 S4 A32])
                     (const_int 0 [0])) "/home/jethro/Dropbox/NUS/CS4212/assignments/simple.c":4 -1
                     (nil))
```

```lisp
  (mem/c:SI (plus:DI (reg/f:DI 82 virtual-stack-vars)
                     (const_int -4 [0xfffffffffffffffc])) [1 aD.2249+0 S4 A32])
```

Obtains a from an offset from the virtual stack, and loads it into
memory. `set` is the assign operation in `int a = 0. (const_int 0 [0])`
represents 0.

In `(insn 5 2 6 2 ...)`, 5 is the current instruction, the first 2 is the previous
instruction, 6 is the next instruction and the final 2 is the basic
block ID.


## Peephole Optimizations {#peephole-optimizations}

Peephole optimizations in GCC are defined in markdown files in
different target machines. For example, we look at the
`gcc/config/arm/arm.md`. These contain Lisp expressions of the form:

```lisp
  (define_peephole2
    [insn-p1
    insn-p2
    ...]
    "condition"
    [new-insn-p1
    new-insn-p2
    ...]
    "preparation statements")
```

This follows some form of pattern matching. Common matching functions
are found in
<https://gcc.gnu.org/onlinedocs/gcc-9.2.0/gccint/RTL-Template.html>. For
example, `match_operand` constrains the operands allowed for that
instruction. and captures it into group 1.

`match_dup` assumes that operand number n has already been determined by
a match\_operand appearing earlier in the recognition template, and it
matches only an identical-looking expression.

All of the peephole examples below are machine-dependent:
specifically, the instruction set of the machine is an important
factor.


### Example 1: `gcc/config/arm/arm.md:L9208` {#example-1-gcc-config-arm-arm-dot-md-l9208}

```lisp
  (define_peephole2
    [(set (reg:CC CC_REGNUM)
          (compare:CC (match_operand:SI 1 "register_operand" "")
                      (const_int 0)))
    (cond_exec (ne (reg:CC CC_REGNUM) (const_int 0))
               (set (match_operand:SI 0 "register_operand" "") (const_int 0)))
    (cond_exec (eq (reg:CC CC_REGNUM) (const_int 0))
               (set (match_dup 0) (const_int 1)))
    (match_scratch:SI 2 "r")]
    "TARGET_32BIT && peep2_regno_dead_p (3, CC_REGNUM)"
    [(parallel
      [(set (reg:CC CC_REGNUM)
            (compare:CC (const_int 0) (match_dup 1)))
      (set (match_dup 2) (minus:SI (const_int 0) (match_dup 1)))])
    (set (match_dup 0)
         (plus:SI (plus:SI (match_dup 1) (match_dup 2))
                  (geu:SI (reg:CC CC_REGNUM) (const_int 0))))]
    )
```

Here we look for instructions of the form: `Rd = (eq (reg1)
(const_int0))`. We substitute it for ARM instructions of the form:

```text
  negs Rd, reg1
  adc  Rd, Rd, reg1
```

which is shorter and more efficient. We do it where the target machine
is 32-bits.


### Example 2: `gcc/config/i386/i386.md:L12671` {#example-2-gcc-config-i386-i386-dot-md-l12671}

```lisp
  (define_peephole2
    [(set (match_operand:W 0 "register_operand")
          (match_operand:W 1 "memory_operand"))
    (set (pc) (match_dup 0))]
    "!TARGET_X32
     && !TARGET_INDIRECT_BRANCH_REGISTER
     && peep2_reg_dead_p (2, operands[0])"
    [(set (pc) (match_dup 1))])
```

Combines the simple jump instruction into a single instruction.


### Example 3: `gcc/config/aarch64/aarch64.md:L1852` {#example-3-gcc-config-aarch64-aarch64-dot-md-l1852}

```lisp
  (define_peephole2
    [(match_scratch:GPI 3 "r")
    (set (match_operand:GPI 0 "register_operand")
         (plus:GPI
          (match_operand:GPI 1 "register_operand")
          (match_operand:GPI 2 "aarch64_pluslong_strict_immedate")))]
    "aarch64_move_imm (INTVAL (operands[2]), <MODE>mode)"
    [(set (match_dup 3) (match_dup 2))
    (set (match_dup 0) (plus:GPI (match_dup 1) (match_dup 3)))]
    )
```

If there's a free register, and a constant can be loaded in with a
single instruction, we set it directly.