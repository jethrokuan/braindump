+++
title = "Multi-modal Machine Learning"
author = ["Jethro Kuan"]
lastmod = 2020-02-21T15:59:20+08:00
slug = "multimodal_machine_learning"
draft = false
+++

## Definitions {#definitions}

modality
: the way in which something happens or is experienced.
    Typically associated with sensory modalities.

multi-modal models
: models that can process and relate information
    from multiple modalities (e.g. speech and vision).


## Key Challenges {#key-challenges}

representation
: learning how to represent and summarize multimodal
    data in a way that exploits the complementarity and redundancy of
    multiple modalities (see [Multi-modal Representation]({{< relref "20200219120814_multimodal_representation" >}}))

translation
: how to map data from one modality to another (see
    [Multi-modal Translation]({{< relref "20200219160409_multimodal_translation" >}}))

alignment
: identifying the direct relationships between
    sub-elements of two or more different modalities (see [Multi-modal
    Alignment]({{< relref "20200219163103_multimodal_alignment" >}}))

fusion
: Join information from two ore more modalities to perform a
    prediction (with possibly missing data from modalities). Different
    modalities may have varying predictive power and noise topology.
    (see [Multi-modal Fusion]({{< relref "20200219121628_multimodal_fusion" >}}))

co-learning
: Transferring knowledge between modalities, their
    representation, and predictive models. (see [Co-learning]({{< relref "20200221152911_colearning" >}}))

<./biblio/biblio.bib>
