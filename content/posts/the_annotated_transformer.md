+++
title = "The Annotated Transformer"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T02:58:05+08:00
slug = "the_annotated_transformer"
draft = false
+++

source
: <http://nlp.seas.harvard.edu/2018/04/03/attention.html>

author
: [Alexander Rush]({{< relref "alexander_rush" >}})

To reduce sequential computation, many models use [CNNs]({{< relref "cnns" >}}) as building
blocks., computing hidden representations in parallel for all input
and output positions. However, the number of operations required to
relate signals from two arbitrary input or output positions grows in
the distance between the positions, making it _difficult to learn
dependencies between distant positions_.

**The transformer reduces this to a constant number of operations, at the cost of reduced effective resolution due to averaging attention-weighted positions. This effect is counteracted with multi-head attention.**

The Transformer model relies entirely on [self-attention]({{< relref "self_attention" >}}) (or intra-attention) to compute representations of its input and output without using sequence-aligned RNNs or convolution.

## Model Architecture {#model-architecture}

Most neural sequence transduction models have an encoder-decoder architecture. The encoder maps an input sequence of symbol representations \\((x_1, \dots, x_n)\\) to a sequence of continuous representations \\(\boldsymbol{z} = (z_1, \dots, z_n)\\). Given \\(\boldsymbol{z}\\), the decoder generates an output sequence \\((y_1, \dots, y_n)\\) of symbols one element at a time. The model is auto-regressive: it consumes the previously generated symbols as additional input when generating the text.
