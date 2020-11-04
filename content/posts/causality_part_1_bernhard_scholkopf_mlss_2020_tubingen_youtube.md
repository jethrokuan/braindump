+++
title = "Causality, part 1 - Bernhard Schölkopf - MLSS 2020, Tübingen - YouTube"
author = ["Jethro Kuan"]
draft = false
+++

source
: <https://www.youtube.com/watch?v=btmJtThWmhA&feature=youtu.be>

## Background and Motivation {#background-and-motivation}

Consider a dataset of temperature \\(t\\) vs altitude \\(a\\). We typically see that the
larger the altitude, the lower the temperature. How do we know if this is a
causal effect?

1.  Intervention: we can raise the city, and find that the temperature changes
2.  Hypothetical intervention: expect that \\(t\\) changes, since we can think of a
    physical mechanism \\(p(t|a)\\) that is independent of \\(p(a)\\). We expect that
    \\(p(t|a)\\) is invariant across different countries in similar climate zone.

A "structural" relation not only explains the observed data; it captures a
structure connecting the variables.

An equation becomes structural by virtue of invariance to a domain of
modifications.

## [Structural Causal Model]({{<relref "structural_causal_model.md" >}}) {#structural-causal-model--structural-causal-model-dot-md}
