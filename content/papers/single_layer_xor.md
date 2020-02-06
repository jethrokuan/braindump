+++
title = "Single Layer XOR"
author = ["Jethro Kuan"]
lastmod = 2020-02-06T12:38:38+08:00
draft = false
+++

paper
: <https://science.sciencemag.org/content/367/6473/83>

tags
: [§neuroscience]({{< relref "neuroscience" >}}), [§machine\_learning]({{< relref "machine_learning" >}})


## Finding {#finding}

The way the biological human neuron implements XOR is by a formerly
unknown type of local response to inputs, which is low below the
threshold, maximal at the threshold and decreases as the input
intensifies above the threshold.

{{< figure src="/ox-hugo/gcJFiIZ2020-01-04_10-31-19_.jpg" >}}


## Why is this interesting? {#why-is-this-interesting}

-   XOR used to be impossible to compute without inhibitory mechanisms,
    but this is makes that possible.
-   Hence the human brain can use a single-layered network to compute
    the XOR function.
