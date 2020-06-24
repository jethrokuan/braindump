+++
title = "A critique of pure learning and what artificial neural networks can learn from animal brains"
author = ["Jethro Kuan"]
lastmod = 2020-06-24T16:08:22+08:00
draft = false
+++

## The Genomic Bottleneck {#the-genomic-bottleneck}

The compression into the genome whatever innate processes are captured
by evolution. This acts as a regularizing constraint on the rules for
wiring up the brain.

In large and sparsely connected brains, most of the information in the
genome has to be allocated to specify the non-zero elements of the
connection matrix in the brain, rather than their precise values. Even
if every nucleotide of the human genome is devoted to specifying brain
connections, the information capacity would still be at least six
orders of magnitude too small.

The implication of this is that the genome does not encode the
connections directly, but rules in forming these connections.
Evolution acts on the brain only indirectly through the genome.

## What this means for ANNs {#what-this-means-for-anns}

1.  There may be an outer-loop (evolution) that optimizes learning
    mechanisms, and an inner-loop that allows us to learn inductive
    biases quickly (i.e. [Meta Learning]({{< relref "meta_learning" >}}))
2.  ANNs should attempt as much as possible to build on solutions to
    related problems (transfer learning)
3.  Wiring rules and topology should be studies as a target for
    optimization in artificial neural systems
