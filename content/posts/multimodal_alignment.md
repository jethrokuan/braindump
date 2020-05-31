+++
title = "Multi-modal Alignment"
author = ["Jethro Kuan"]
lastmod = 2020-05-31T20:20:21+08:00
slug = "multimodal_alignment"
draft = false
+++

### Backlinks {#backlinks}

- [Multi-modal Machine Learning]({{< relref "multimodal_machine_learning" >}})

Multi-modal alignment is a sub-challenge in [Multi-modal Machine
Learning]({{< relref "multimodal_machine_learning" >}}), involving the finding of relationships and correspondences
between sub-components of instances from two-or-more modalities. For
example, we want to find areas of the image corresponding to the
caption's words or phrases.

In explicit multi-modal alignment, the objective of aligning
sub-components in modalities is of interest. In implicit multi-modal
alignment, this is typically an intermediate step for another task.

## Explicit Alignmnt {#explicit-alignmnt}

Explicit alignment algorithms can be further split into unsupervised
and weakly-supervised algorithms.

The unsupervised approaches do not require or use any direct alignment
labels. [Dynamic Time Warping]({{< relref "dynamic_time_warping" >}}) is a dynamic progamming approach to align
multi-view time series.

## Implicit Alignment {#implicit-alignment}

Implicit alignment allows for better performance in downstream tasks.
Both graphical models and neural network approaches are used here.
Examples of tasks where implicit alignment helps include machine
translation.

### Backlinks {#backlinks}

- [Multi-modal Machine Learning]({{< relref "multimodal_machine_learning" >}})
