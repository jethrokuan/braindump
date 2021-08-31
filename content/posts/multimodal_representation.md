+++
title = "Multi-modal Representation"
author = ["Jethro Kuan"]
draft = false
+++

tags
: [Multi-modal Machine Learning]({{<relref "multimodal_machine_learning.md#" >}})

A multi-modal representation is a representation of data using
information from multiple modalities. The ability to represent data in
a meaningful way is crucial to multimodal problems.


## Key Challenges {#key-challenges}

-   how to combine data from heterogeneous sources
-   how to deal with differing levels of noise, and noise otpology
-   how to deal with missing data


## Categories of multi-modal representations {#categories-of-multi-modal-representations}

Baltrušaitis, Ahuja, and Morency, n.d. proposes two categories of
multimodal representation:

joint
: combining unimodal signals into the same representation space.

coordinated
: process unimodal signals separately, but enforcing
    certain similarity constraints on them to bring them into a
    coordinated space.


## Joint Representations {#joint-representations}

Joint representations are mostly used in tasks where multimodal data
is present during both training and inference.


### Neural Networks {#neural-networks}

A common approach is to use deep neural networks to create abstract
representations of unimodal data, beore combining them in the last
layer (for example, via concatenation). The hidden layers project the
modalities into a joint space. There is a close relationship between
multimodal representation learning and [Multi-modal Fusion]({{<relref "multi_modal_fusion.md#" >}}) when using
neural networks.

It is common to pretrain these representations using
an [Autoencoder]({{<relref "autoencoder.md#" >}}) on unsupervised data, because neural networks require a
lot of labelled data. The neural network approach often yields
superior performance, but is _unable to handle missing data naturally_.


### Probabilistic Graphical Models {#probabilistic-graphical-models}

[Probabilistic Graph Models]({{<relref "pgm.md#" >}}) construct representations through the use
of latent random variables.

A popular approach is [Deep Boltzmann Machines]({{<relref "deep_boltzmann_machines.md#" >}}), which uses [Restricted
Boltzmann machines]({{<relref "restricted_boltzmann_machines.md#" >}}) as building blocks. Each successive layer of a DBM
is expected to represent the data at a higher level of abstraction.
DBMs do not need supervised data for training. It is also possible to
convert them into a deterministic neural network, but this loses the
generative aspect of the model.

One advantage of using multimodal DBMs is that they are [generative
models]({{<relref "generative_models.md#" >}}), allowing them to:

1.  Naturally deal with missing data.
2.  Generate samples of one modality in the presence of at least 1
    modality


## Coordinated Representations {#coordinated-representations}

Separate representations are learnt from each modality, but later
coordinated through a constraint.

**Similarity models** minimize the distance between modalities in the
coordinated space. Neural network approaches such as DeViSE use inner
product and a ranking loss function.

Some models use a **structured coordinated space**, enforcing additional
constraints between the modality representations. These structural
constraints differ across applications, which include [Cross-modal Hashing]({{<relref "crossmodal_hashing.md#" >}}),
cross-modal retrieval, and image captioning.

Other examples of structured coordinated spaces use enforce a partial
order in the multimodal space. Another special case of this is
[Canonical Correlation Analysis]({{<relref "canonical_correlation_analysis.md#" >}}).

<biblio.bib>