+++
title = "Code Litmus Tests"
author = ["Jethro Kuan"]
lastmod = 2020-07-08T14:55:57+08:00
draft = false
+++

tags
: [Software Engineering]({{< relref "software_engineering" >}})

Here are some questions you can ask yourself when evaluating the code
you write:

1.  **API Modularity**: Can you describe well your API, if written in a purely human
    language with no code extracts?
2.  **Compactness**: Does an experienced user need a manual?
3.  **Orthogonality**: Does changing a part of code affect other system properties?
4.  **Single Point of Truth**: Do data structures have states with 1-1
    correspondence with the states of the real-world system?
5.  **Code Modularity**: Are there any global variables? Is the size of
    modules too large? Are there any large functions? What is the call
    maximum stack depth (excluding recursion)? Are there many internal
    APIs? What is the number of entry points to the module?
6.  **Transparency**: Are there any special cases? Are there any magic
    numbers? Are each function calls orthogonal? Are there many mode
    flags? Is the high-level state of the system easily inspectable?
    Can you see what the system is doing through any debug output?

Others:

1.  Are you using a binary format? Have you considered the pros and
    cons of that, against a simple textual format?
