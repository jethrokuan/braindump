+++
title = "Cross-modal Hashing"
author = ["Jethro Kuan"]
lastmod = 2020-07-08T14:53:50+08:00
slug = "crossmodal_hashing"
draft = false
+++

### Backlinks {#backlinks}

- [Multi-modal Representation]({{< relref "multimodal_representation" >}})

Cross-modal hashing is the compression of high dimensional data into
compact binary codes with similar binary codes for similar objects.
The key ideas is to create codes for cross-modal retrieval. The
constraints are :

1.  It has to be an N-dimensional hamming space -- a binary
    representation with a controllable number of bits.
2.  The same object from different modalities has to have a similar
    hash code
3.  The space has to be similarity-preserving

([Baltrušaitis, Ahuja, and Morency, n.d.](#org41b38e0)) has some good reference
papers.

## Bibliography {#bibliography}

<a id="org41b38e0"></a>Baltrušaitis, Tadas, Chaitanya Ahuja, and Louis-Philippe Morency. n.d. “Multimodal Machine Learning: A Survey and Taxonomy.” <http://arxiv.org/abs/1705.09406v2>.
