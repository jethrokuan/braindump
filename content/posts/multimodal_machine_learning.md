+++
title = "Multi-modal Machine Learning"
author = ["Jethro Kuan"]
lastmod = 2020-06-07T17:27:19+08:00
slug = "multimodal_machine_learning"
draft = false
+++

### Backlinks {#backlinks}

- [VisGel]({{< relref "visgel" >}})
- [Multi-modal Alignment]({{< relref "multimodal_alignment" >}})
- [Dynamic Time Warping]({{< relref "dynamic_time_warping" >}})
- [Multi-modal Representation]({{< relref "multimodal_representation" >}})
- [Multi-modal Translation]({{< relref "multimodal_translation" >}})

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
multiple modalities (see [Multi-modal Representation]({{< relref "multimodal_representation" >}}))

translation
: how to map data from one modality to another (see
[Multi-modal Translation]({{< relref "multimodal_translation" >}}))

alignment
: identifying the direct relationships between
sub-elements of two or more different modalities (see [Multi-modal
Alignment]({{< relref "multimodal_alignment" >}}))

fusion
: Join information from two ore more modalities to perform a
prediction (with possibly missing data from modalities). Different
modalities may have varying predictive power and noise topology.
(see [Multi-modal Fusion]({{< relref "multi_modal_fusion" >}}))

co-learning
: Transferring knowledge between modalities, their
representation, and predictive models. (see [Co-learning]({{< relref "colearning" >}}))

<biblio.bib>
