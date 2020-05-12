+++
title = "The Svelte Compiler Handbook | Tan Li Hau"
author = ["Jethro Kuan"]
lastmod = 2020-05-12T23:51:46+08:00
draft = false
+++

tags
: [Svelte]({{< relref "svelte" >}}), [Web Development]({{< relref "web_dev" >}})

Svelte's compilation process can be broken down into 4 steps:

- parsing source code into an AST
- tracking references and dependencies
- creating code blocks and fragments
- generating code
