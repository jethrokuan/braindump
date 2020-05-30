+++
title = "Co-learning"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T02:57:32+08:00
slug = "colearning"
draft = false
+++

Co-learning is the technique of aiding of modeling of a
(resource-poor) modality by exploiting knowledge from another
(resource-rich) modality. The helper modality is only used in model
training, and is not used during test-time. <a id="fe1ca450aa5e404428b89a0e174b2e99" href="#baltrusaitis17:_multim_machin_learn">(Baltru\v saitis et al., 2017)</a>

Parallel-data approaches require the data to be directly linked to
observations in other modalites. Non-parallel approaches do not
require these direct links between modalities. Hybrid-data approaches
bridge the modalities through a shared modality, or a dataset.

## Parallel data {#parallel-data}

Co-training is the process of creating more labeled training samples
when we have few labeled samples in a multi-modal problem. Weak
classifiers are built for each modality to bootstrap each other with
labels for the unlabeled data.

[Transfer learning]({{< relref "transfer_learning" >}}) exploits co-learning with parallel data, by building
[multi-modal representations]({{< relref "multimodal_representation" >}}) with only some modalities used during test
time. Approaches like these include multimodal [Deep Boltzmann Machines]({{< relref "deep_boltzmann_machines" >}})
and [Multi-modal Autoencoders]({{< relref "multimodal_autoencoders" >}}).

## Non-parallel data {#non-parallel-data}

Non-parallel methods only require that different modalities share
similar categories or concepts. Methods include [transfer learning]({{< relref "transfer_learning" >}})
using coordinated multimodal representations, or [Concept Grounding]({{< relref "concept_grounding" >}}) via
word similarity, or [zero-shot learning]({{< relref "zeroshot_learning" >}}).

# Bibliography

<a id="baltrusaitis17:_multim_machin_learn" target="_blank">Baltru\v saitis, Tadas, Ahuja, C., & Morency, L., _Multimodal machine learning: A survey and taxonomy_, CoRR, _()_, (2017). </a> [↩](#fe1ca450aa5e404428b89a0e174b2e99)
