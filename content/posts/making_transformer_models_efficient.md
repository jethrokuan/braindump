+++
title = "Making Transformer Models Efficient"
author = ["Jethro Kuan"]
draft = false
+++

The traditional [Transformer]({{< relref "transformer" >}}) model has memory and computational complexities that
are quadratic with the input sequence length (\\(O(N^2)\\)). This limits the utility
of Transformer models, since their main benefit is the ability to learn
alignments across long sequences.

Efficient transformer models attempt to alleviate the cost of computing the
attention matrix, either by approximating the matrix, or by introducing
sparsity. (NO_ITEM_DATA:tayEfficientTransformersSurvey2020) provides a good overview of
these efficient Transformer models. The key summary table in the paper is
reproduced below.

{{< figure src="/ox-hugo/screenshot2020-11-07_16-18-25_.png" caption="Figure 1: Summary of Efficient Transformer Models" >}}

## Bibliography {#bibliography}

NO_ITEM_DATA:tayEfficientTransformersSurvey2020
