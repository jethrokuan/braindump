+++
title = "Multi-modal Alignment"
author = ["Jethro Kuan"]
slug = "multimodal_alignment"
draft = false
+++

Multi-modal alignment is a sub-challenge in [Multi-modal Machine
Learning]({{<relref "multimodal_machine_learning.md" >}}), involving the finding of relationships and correspondences
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
labels. [Dynamic Time Warping]({{<relref "dynamic_time_warping.md" >}}) is a dynamic progamming approach to align
multi-view time series.

## Implicit Alignment {#implicit-alignment}

Implicit alignment allows for better performance in downstream tasks.
Both graphical models and neural network approaches are used here.
Examples of tasks where implicit alignment helps include machine
translation.
