+++
title = "Multi-modal Fusion"
author = ["Jethro Kuan"]
lastmod = 2020-02-21T15:22:24+08:00
slug = "multimodal_fusion"
draft = false
+++

Multi-modal fusion is the integration of information from multiple
modalities with the goal of predicting an outcome measure (e.g.
classification, or regression).

Multi-modal fusion is motivated by 3 main reasons:

1.  Access to multiple modalities help make predictions more robust
    (e.g. in AVSR)
2.  Multiple modalities may capture complementary information
3.  Multi-modal systems can still operate when some modalities are
    missing

Multi-modal fusion approaches can be classified as
<a id="fe1ca450aa5e404428b89a0e174b2e99" href="#baltrusaitis17:_multim_machin_learn">(Baltru\vsaitis et al., 2017)</a>:

-   **Model-agnostic**
    -   early fusion
    -   hybrid fusion
    -   late fusion
-   **Model-based**
    -   kernel-based
    -   graphical models
    -   neural networks


## Model-agnostic Approaches {#model-agnostic-approaches}

Early fusion approaches integrate features immediately after they are
extracted (for example, via concatenation). Late fusion performs
integration after each of the modalities make a decision, for example
via averaging. Hybrid fusion combines outputs form early fusion, and
individual unimodal predictors.

Model-agnostic approaches are easy to implement using uni-modal
machine learning methods.


## Model-based Approaches {#model-based-approaches}

These approaches are tailored towards handling multi-modal data.

[Multiple Learning Kernel]({{< relref "20200221151141_multiple_learning_kernel" >}}) (MKL) methods extend kernel [support vector machines]({{< relref "20200221151157_support_vector_machines" >}})
to use different kernels for different modalities. Modality-specific
kernels allow for better fusion of heterogeneous data. One advantage
of MKL is that the loss function is convex, which leads to easy
optimization and globally optimum solutions. However, MKL approaches
rely on support vectors (training data) at test time, which means
inference can be slow.

Generative graphical models such as factorial hidden markov networks, or
multi-stream hidden markov metods have been used. Discriminative
models such as [conditional random fields]({{< relref "20200221151841_conditional_random_fields" >}}) sacrifice the modeling of
joint probability for predictive power.

Lastly, neural networks fuse temporal multimodal information through
RNNs and LSTMs. These approaches have also been adapted for various
image captioning tasks. Neural networks have the capacity to learn
from large amounts of data, and are able to learn complex decision
boundaries. However, they lack interpretability, and require large
amounts of training data.

# Bibliography
<a id="baltrusaitis17:_multim_machin_learn" target="_blank">Baltru\vsaitis, Tadas, Ahuja, C., & Morency, L., *Multimodal machine learning: a survey and taxonomy*, CoRR, *()*,  (2017). </a> [↩](#fe1ca450aa5e404428b89a0e174b2e99)
