+++
title = "Dynamic Time Warping"
author = ["Jethro Kuan"]
draft = false
+++

Dynamic time warping (DTW) is a dynamic programming approach used to
align multi-view time series. The similarity between two sequences are
measured, and used to find an optimal match between them via
time-warping (inserting frames).

This approach requires timesteps in the two sequences to be
comparable, and requires a similarity measure between sequences.
Because DTW requires a pre-defined similarity measure, it has been
extended to [Canonical Correlation Analysis]({{<relref "canonical_correlation_analysis.md" >}}) which does this computation
in a coordinated space for [Multi-modal Machine Learning]({{<relref "multimodal_machine_learning.md" >}}). This allows
for both aligning and mapping between different modalities jointly in
ean unsupervised manner.
