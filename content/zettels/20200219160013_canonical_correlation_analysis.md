+++
title = "Canonical Correlation Analysis"
author = ["Jethro Kuan"]
lastmod = 2020-02-19T16:02:07+08:00
slug = "canonical_correlation_analysis"
draft = false
+++

Canonical Correlation Analysis computes a linear projection which
maximizes the correlation between two random variables andn enforces
orthogonality in the new space. This is commonly used in [multi-modal
representation]({{< relref "20200219120814_multimodal_representation" >}}) learning, where the random variables are modalities.

Extensions of CCA include Kernel CCA, which uses a non-linear
projection, and Deep CCA, which addresses the scalability issues of KCCA.
