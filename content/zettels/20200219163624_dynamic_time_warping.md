+++
title = "Dynamic Time Warping"
author = ["Jethro Kuan"]
lastmod = 2020-02-19T16:40:13+08:00
slug = "dynamic_time_warping"
draft = false
+++

Dynamic time warping (DTW) is a dynamic programming approach used to
align multi-view time series. The similarity between two sequences are
measured, and used to find an optimal match between them via
time-warping (inserting frames).

This approach requires timesteps in the two sequences to be
comparable, and requires a similarity measure between sequences.
Because DTW requires a pre-defined similarity measure, it has been
extended to [canonical correlation analysis]({{< relref "20200219160013_canonical_correlation_analysis" >}}) which does this computation
in a coordinated space for [multi-modal machine learning]({{< relref "20200219115844_multimodal_machine_learning" >}}). This allows
for both aligning and mapping between different modalities jointly in
ean unsupervised manner.
